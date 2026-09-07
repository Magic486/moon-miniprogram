///|
/// 传给回调的原始参数（生命周期入参或事件对象）的只读包装
pub struct Payload {
  priv raw : JsVal
}

///|
pub fn Payload::new(raw : JsVal) -> Payload {
  { raw, }
}

///|
/// 原始 JS 值（仅在写 wx 绑定时需要）
pub fn Payload::raw(self : Payload) -> JsVal {
  self.raw
}

///|
/// 整体转 Json（onLoad 的 query 对象、tap 事件对象等）
pub fn Payload::json(self : Payload) -> Json? {
  self.raw.to_json()
}

///|
/// 按路径取字符串，如 ["detail", "value"] 取输入框内容
pub fn Payload::string_at(self : Payload, path : Array[String]) -> String? {
  self.raw.string_at(path)
}

///|
/// 按路径取数值
pub fn Payload::number_at(self : Payload, path : Array[String]) -> Double? {
  self.raw.number_at(path)
}

///|
/// 页面上下文：包住页面实例，提供类型安全的数据更新
pub struct PageCtx {
  priv page : JsVal
}

///|
fn PageCtx::new(page : JsVal) -> PageCtx {
  { page, }
}

///|
/// setData 桥：把 JSON 字符串解析后传给页面 setData
extern "js" fn js_set_data(page : JsVal, json : String) -> Unit =
  #|(page, json) => page.setData(JSON.parse(json))

///|
/// 更新页面 data（等价 this.setData；只合并给出的键）
pub fn PageCtx::set_data(self : PageCtx, data : Json) -> Unit {
  js_set_data(self.page, data.stringify())
}

///|
/// 状态式更新（部分合并语义，推荐默认）：与当前 data 自动 diff，
/// 只把变化的叶子路径发给 setData。
///
/// - 未提及的键保持不变（React setState / setData 的合并语义）
/// - 变化的子树被展开到叶子路径（如 `"list[5]"`、`"user.name"`）
/// - 无变化时不调用 setData（免费获得 no-op 优化）
///
/// ```moonbit nocheck
/// // data: { "list": [...5 项], "total": 0 }
/// ctx.set_state({ "total": 42 })
/// // 实际调用 setData({ "total": 42 })
/// ctx.set_state({ "list": [..原 6 项] })
/// // 实际调用 setData({ "list[5]": 新项 })
/// ```
///
/// 镜像永远是 `this.data`（由微信运行时维护），框架不另存状态；
/// 与 `set_data`（补丁式透传）可混用。需要删除键时把状态放进子对象容器
/// 后用 `replace_state` 整体替换该容器（根键无法删除，见 replace_state）。
pub fn PageCtx::set_state(self : PageCtx, new_state : Json) -> Unit {
  let old : Json? = Some(@json.parse(js_data_string(self.page))) catch {
    _ => None
  }
  let patch = match old {
    Some(o) => diff_partial(o, new_state)
    None => diff_from_scratch(new_state)
  }
  if patch.length() > 0 {
    js_apply_patch(self.page, patch_to_json(patch).stringify())
  }
}

///|
/// 全量状态替换：与当前 data 全树 diff，只对变化路径发送 setData。
/// 部分更新请用 `set_state`。
///
/// 数据根模型：页面 data 的**根键**应视为稳定 schema（创建后不增删）；
/// 需要整体替换的业务状态放进单一容器键（如 `state`），对它调用
/// `replace_state` 时容器内部的删除会以父级替换生效。微信 setData 无法删除
/// 根键，因此当新状态**缺少旧状态已有的根键**时会发出 dev 警告，
/// 该键在微信 data 中会保留——此时请把状态收敛进子对象。
pub fn PageCtx::replace_state(self : PageCtx, new_state : Json) -> Unit {
  let old : Json? = Some(@json.parse(js_data_string(self.page))) catch {
    _ => None
  }
  // 根键删除检测：微信 setData 无法删除根键，提醒收敛到子对象容器
  match (old, new_state) {
    (Some(Json::Object(om)), Json::Object(nm)) =>
      for k, _ in om {
        if !nm.contains(k) {
          js_dev_warn(
            "replace_state: 新状态缺少旧根键 \"\{k}\"——微信无法删除 data 根键，该键将保留。如需删除请把状态放进子对象容器后整体替换",
          )
        }
      }
    (_, _) => ()
  }
  let patch = match old {
    Some(o) => diff_to_paths(o, new_state)
    None => diff_from_scratch(new_state)
  }
  if patch.length() > 0 {
    js_apply_patch(self.page, patch_to_json(patch).stringify())
  }
}

///|
/// 读取当前 data（整体）
pub fn PageCtx::get_data(self : PageCtx) -> Json? {
  js_get(self.page, "data").to_json()
}

///|
/// 组件事件桥：自定义组件向页面 triggerEvent（组件实例才有效）
extern "js" fn js_trigger_event(
  self_ : JsVal,
  name : String,
  detail : String,
) -> Unit =
  #|(self_, name, detail) => {
  #|  if (self_.triggerEvent) {
  #|    self_.triggerEvent(name, JSON.parse(detail));
  #|  }
  #|}

///|
/// 触发组件自定义事件（detail 为 JSON 值）
pub fn PageCtx::trigger_event(
  self : PageCtx,
  name : String,
  detail : Json,
) -> Unit {
  js_trigger_event(self.page, name, detail.stringify())
}

///|
/// 页面处理器统一签名
pub type PageHandler = (PageCtx, Payload) -> Unit

///|
/// 带返回值的处理器签名：onShareAppMessage / onShareTimeline /
/// onPullDownRefresh(可 stopPullDownRefresh) 等需要向运行时返回值的钩子
pub type PageReturn = (PageCtx, Payload) -> Json

///|
/// 页面定义：path + 初始 data + 生命周期/事件处理器
///
/// 处理器名即 WXML 中的绑定名：生命周期写 "onLoad"/"onShow"/"onReady"/
/// "onUnload"/"onPullDownRefresh"，事件写 WXML bind:tap="onConvert"
/// 对应的 "onConvert"。
pub(all) struct PageDef {
  /// 页面路径，须与 app.json 中 pages 注册一致，如 "pages/index/index"
  path : String
  /// 初始 data（JSON 值）
  data : Json
  /// 生命周期与事件处理器
  handlers : Array[(String, PageHandler)]
  /// 需要向微信运行时返回 JSON 值的钩子（如 onShareAppMessage）。
  /// 返回值经 JSON 序列化后原样交回（转发卡片等场景）。
  returns : Array[(String, PageReturn)]
}

///|
let page_registry : Map[String, PageDef] = Map([])

///|
/// 注册页面定义（须在对应页面 JS 执行前完成，通常在 app 入口处）。
///
/// dev-time 一致性校验（console.warn，不 raise）：
/// - 路径格式：非空且建议以 "pages/" 开头（与 app.json 保持一致）
/// - handlers 内部重名、returns 内部重名、handlers 与 returns 交叉重名
pub fn register_page(def : PageDef) -> Unit {
  if page_registry.contains(def.path) {
    js_dev_warn(
      "register_page: 页面 \"\{def.path}\" 重复注册，旧定义被覆盖（幂等注册请收敛到 ensure_registered）",
    )
  }
  if def.path == "" {
    js_dev_warn("register_page: 页面路径为空，请检查 PageDef.path")
  } else if !def.path.has_prefix("pages/") {
    js_dev_warn(
      "register_page: \"\{def.path}\" 不以 pages/ 开头——请确认与 app.json 的 pages 注册一致",
    )
  }
  let seen : Map[String, Unit] = Map([])
  for kv in def.handlers {
    let (name, _) = kv
    if seen.contains(name) {
      js_dev_warn(
        "register_page(\{def.path}): handlers 存在重名事件 \"\{name}\"",
      )
    }
    seen[name] = ()
  }
  let rseen : Map[String, Unit] = Map([])
  for kv in def.returns {
    let (name, _) = kv
    if rseen.contains(name) {
      js_dev_warn(
        "register_page(\{def.path}): returns 存在重名钩子 \"\{name}\"",
      )
    }
    if seen.contains(name) {
      js_dev_warn(
        "register_page(\{def.path}): \"\{name}\" 同时出现在 handlers 与 returns，将相互覆盖",
      )
    }
    rseen[name] = ()
  }
  page_registry[def.path] = def
}

///|
/// 供 JS 侧调用：按路径构建 Page() 配置对象。
///
/// 生命周期兜底：无论页面是否自定义 onUnload，构建出的配置都保证卸载时
/// 自动执行 `unbind_all`（清除该页面在所有 store 上的订阅）。
/// 用户 onUnload 的用户逻辑与清理分别放在 fns / clean_fns 两个槽，
/// JS 包装层用 try/finally 执行——即使用户逻辑抛异常，退订也必然发生。
pub fn page_config(path : String) -> JsVal raise MpError {
  guard page_registry.get(path) is Some(def) else {
    raise MpError::PageNotFound(path)
  }
  let has_unload = def.handlers.any(fn(kv) { kv.0 == "onUnload" })
  let total = def.handlers.length() + (if has_unload { 0 } else { 1 })
  let names : FixedArray[String] = FixedArray::make(total, "")
  let fns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(total, (_, _) => {
    ()
  })
  let cfns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(total, (_, _) => {
    ()
  })
  let noop = fn(_page : JsVal, _arg : JsVal) -> Unit { () }
  for i, kv in def.handlers {
    let (name, h) = kv
    names[i] = name
    if name == "onUnload" {
      // 用户逻辑槽 + 独立清理槽（JS finally 保证执行）
      fns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
      cfns[i] = fn(page, _arg) { unbind_all(PageCtx::new(page)) }
    } else {
      fns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
      cfns[i] = noop
    }
  }
  if !has_unload {
    let last = def.handlers.length()
    names[last] = "onUnload"
    fns[last] = noop
    cfns[last] = fn(page, _arg) { unbind_all(PageCtx::new(page)) }
  }
  let rnames : FixedArray[String] = FixedArray::make(def.returns.length(), "")
  let rfns : FixedArray[(JsVal, JsVal) -> String] = FixedArray::make(
    def.returns.length(),
    (_, _) => "null",
  )
  for i, kv in def.returns {
    let (name, h) = kv
    rnames[i] = name
    rfns[i] = fn(page, arg) {
      h(PageCtx::new(page), Payload::new(arg)).stringify()
    }
  }
  build_page_cfg(def.data.stringify(), names, fns, cfns, rnames, rfns)
}

///|
/// 构建 Page() 配置：data 解析 JSON；处理器包一层普通函数以绑定 this；
/// clean_fns 在 finally 中执行（onUnload 时即便用户逻辑抛异常也保证退订）；
/// 处理器与 returns 钩子抛错会被记录而不是中断微信运行时。
extern "js" fn build_page_cfg(
  data_json : String,
  names : FixedArray[String],
  handlers : FixedArray[(JsVal, JsVal) -> Unit],
  clean_fns : FixedArray[(JsVal, JsVal) -> Unit],
  return_names : FixedArray[String],
  return_fns : FixedArray[(JsVal, JsVal) -> String],
) -> JsVal =
  #|(dataJson, names, handlers, cfns, rnames, rfns) => {
  #|  const cfg = { data: JSON.parse(dataJson) };
  #|  const warn = (n, e) =>
  #|    console.error("[moon-miniprogram] handler '" + n + "' threw:", e);
  #|  for (let i = 0; i < names.length; i++) {
  #|    const n = names[i];
  #|    cfg[n] = function(arg) {
  #|      try { handlers[i](this, arg); }
  #|      catch (e) { warn(n, e); }
  #|      finally { cfns[i](this, arg); }
  #|    };
  #|  }
  #|  for (let i = 0; i < rnames.length; i++) {
  #|    const n = rnames[i];
  #|    cfg[n] = function(arg) {
  #|      try { return JSON.parse(rfns[i](this, arg)); }
  #|      catch (e) { warn(n, e); return null; }
  #|    };
  #|  }
  #|  return cfg;
  #|}

///|
/// 调用微信全局 Page()
extern "js" fn js_page(cfg : JsVal) -> Unit =
  #|(cfg) => Page(cfg)

///|
/// 供 JS 侧调用：按路径注册并返回 Page() 配置的便捷入口。
/// 页面文件只需：`Page(engine.page("pages/index/index"))`
pub fn page(path : String) -> Unit raise MpError {
  js_page(page_config(path))
}
