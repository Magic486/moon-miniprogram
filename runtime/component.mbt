///|
/// 自定义组件定义。
///
/// 与 PageDef 同构：key 对应 usingComponents 里的路径；properties 用
/// JSON 描述（`"t"` 为类型名字符串，由 JS 桥转换为微信的构造函数，
/// 因为 `type: String` 是 JS 函数无法走 JSON 通道）：
///
/// ```text
/// { "text": { "t": "String", "value": "" },
///   "count": { "t": "Number", "value": 0 },
///   "options": { "t": "Array", "value": [] } }
/// ```
///
/// methods 与生命周期（attached/ready/detached/moved）都写在 handlers，
/// 名字即微信组件选项名。observers 的键支持微信的字段路径/通配语法。
pub(all) struct ComponentDef {
  /// 组件标识，须与 usingComponents 注册路径一致，如 "components/tag/tag"
  key : String
  /// 属性定义（上述 JSON 规范）
  properties : Json
  /// 组件初始 data
  data : Json
  /// 方法与生命周期
  handlers : Array[(String, PageHandler)]
  /// 数据观察器：字段变化时触发（键为 "field" / "a.b" / "a, b"）
  observers : Array[(String, PageHandler)]
  /// 组件所在页面的生命周期（"show" / "hide" / "resize"）
  page_lifetimes : Array[(String, PageHandler)]
}

///|
let component_registry : Map[String, ComponentDef] = Map([])

///|
/// 注册组件定义（在 app 入口或引擎初始化时执行一次）。
///
/// dev-time 一致性校验（console.warn，不 raise）：
/// - key 格式：建议以 "components/" 开头（与 usingComponents 路径一致）
/// - handlers 内部重名、observers 与 handlers 交叉重名
pub fn register_component(def : ComponentDef) -> Unit {
  if component_registry.contains(def.key) {
    js_dev_warn(
      "register_component: 组件 \"\{def.key}\" 重复注册，旧定义被覆盖（幂等注册请收敛到 ensure_registered）",
    )
  }
  if def.key == "" {
    js_dev_warn(
      "register_component: 组件 key 为空，请检查 ComponentDef.key",
    )
  } else if !def.key.has_prefix("components/") {
    js_dev_warn(
      "register_component: \"\{def.key}\" 不以 components/ 开头——请确认与 usingComponents 注册路径一致",
    )
  }
  let seen : Map[String, Unit] = Map([])
  for kv in def.handlers {
    let (name, _) = kv
    if seen.contains(name) {
      js_dev_warn(
        "register_component(\{def.key}): handlers 存在重名方法 \"\{name}\"",
      )
    }
    seen[name] = ()
  }
  for kv in def.observers {
    let (name, _) = kv
    if seen.contains(name) {
      js_dev_warn(
        "register_component(\{def.key}): \"\{name}\" 同时出现在 handlers 与 observers，将相互覆盖",
      )
    }
  }
  component_registry[def.key] = def
}

///|
/// 组件生命周期名集合（这些进配置顶层；其余名字为自定义方法进 cfg.methods）
fn is_component_lifecycle(name : String) -> Bool {
  name == "created" ||
  name == "attached" ||
  name == "ready" ||
  name == "moved" ||
  name == "detached" ||
  name == "error"
}

///|
/// 供 JS 侧调用：按 key 构建 Component() 配置对象。
///
/// 微信原生契约：自定义方法必须在 cfg.methods 内，组件模板事件才能命中；
/// 生命周期钩子放配置顶层（微信接受顶层生命周期）。
///
/// 生命周期兜底：组件销毁（detached）时自动执行 unbind_all，
/// 清除该组件在所有 store 上的订阅（防悬挂引用）。用户自定义 detached
/// 会被包装（先用户后清理），未定义则框架追加。
pub fn component_config(key : String) -> JsVal raise MpError {
  guard component_registry.get(key) is Some(def) else {
    raise MpError::ComponentNotFound(key)
  }
  // 先统计自定义 detached 是否存在，决定是否追加兜底
  let has_detached = def.handlers.any(fn(kv) { kv.0 == "detached" })
  let life_count = def.handlers
    .filter(fn(kv) { is_component_lifecycle(kv.0) })
    .length()
  let life_total = life_count + (if has_detached { 0 } else { 1 })
  let method_total = def.handlers.length() - life_count
  let lnames : FixedArray[String] = FixedArray::make(life_total, "")
  let lfns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(life_total, (
    _,
    _,
  ) => ())
  let mnames : FixedArray[String] = FixedArray::make(method_total, "")
  let mfns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    method_total,
    (_, _) => (),
  )
  let mut li : Int = 0
  let mut mi : Int = 0
  // 清理槽（lcfns）：仅 detached 执行 unbind_all，其余 noop；
  // JS 层 finally 调用，保证用户逻辑抛异常也必然退订
  let lcfns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    life_total,
    (_, _) => (),
  )
  let noop = fn(_page : JsVal, _arg : JsVal) -> Unit { () }
  for kv in def.handlers {
    let (name, h) = kv
    if is_component_lifecycle(name) {
      lnames[li] = name
      if name == "detached" {
        lfns[li] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
        lcfns[li] = fn(page, _arg) { unbind_all(PageCtx::new(page)) }
      } else {
        lfns[li] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
        lcfns[li] = noop
      }
      li = li + 1
    } else {
      mnames[mi] = name
      mfns[mi] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
      mi = mi + 1
    }
  }
  if !has_detached {
    lnames[li] = "detached"
    lfns[li] = noop
    lcfns[li] = fn(page, _arg) { unbind_all(PageCtx::new(page)) }
  }
  let onames : FixedArray[String] = FixedArray::make(def.observers.length(), "")
  let ofns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    def.observers.length(),
    (_, _) => (),
  )
  for i, kv in def.observers {
    let (name, h) = kv
    onames[i] = name
    ofns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
  }
  let pnames : FixedArray[String] = FixedArray::make(
    def.page_lifetimes.length(),
    "",
  )
  let pfns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    def.page_lifetimes.length(),
    (_, _) => (),
  )
  for i, kv in def.page_lifetimes {
    let (name, h) = kv
    pnames[i] = name
    pfns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
  }
  js_build_component_cfg(
    def.properties.stringify(),
    def.data.stringify(),
    lnames,
    lfns,
    lcfns,
    mnames,
    mfns,
    onames,
    ofns,
    pnames,
    pfns,
  )
}

///|
/// 构建 Component() 配置：properties 规范转微信格式（"t" 字符串 →
/// 构造函数）；生命周期顶层绑定 this（清理槽经 finally 调用）；
/// 自定义方法进 cfg.methods；observers 收全部实参数组；
/// pageLifetimes 组装嵌套对象。平行数组传列表。
extern "js" fn js_build_component_cfg(
  props_json : String,
  data_json : String,
  life_names : FixedArray[String],
  life_fns : FixedArray[(JsVal, JsVal) -> Unit],
  life_clean_fns : FixedArray[(JsVal, JsVal) -> Unit],
  method_names : FixedArray[String],
  method_fns : FixedArray[(JsVal, JsVal) -> Unit],
  observer_names : FixedArray[String],
  observer_fns : FixedArray[(JsVal, JsVal) -> Unit],
  plifetime_names : FixedArray[String],
  plifetime_fns : FixedArray[(JsVal, JsVal) -> Unit],
) -> JsVal =
  #|(propsJson, dataJson, lnames, lfns, lcfns, mnames, mfns, onames, ofns, pnames, pfns) => {
  #|  const TYPES = {
  #|    String: String,
  #|    Number: Number,
  #|    Boolean: Boolean,
  #|    Object: Object,
  #|    Array: Array,
  #|  };
  #|  const spec = JSON.parse(propsJson);
  #|  const props = {};
  #|  for (const k of Object.keys(spec)) {
  #|    const p = spec[k];
  #|    const def = {};
  #|    if (p.t) {
  #|      def.type = TYPES[p.t] || null;
  #|    }
  #|    if ("value" in p) {
  #|      def.value = JSON.parse(JSON.stringify(p.value));
  #|    }
  #|    if (p.optional) {
  #|      def.optional = true;
  #|    }
  #|    props[k] = def;
  #|  }
  #|  const cfg = { properties: props, data: JSON.parse(dataJson) };
  #|  const warn = (n, e) =>
  #|    console.error("[moon-miniprogram] lifecycle '" + n + "' threw:", e);
  #|  // 生命周期（created/attached/ready/moved/detached/error）放顶层；
  #|  // 清理槽 lcfns 在 finally 中执行：用户逻辑抛异常也保证 detached 退订
  #|  for (let i = 0; i < lnames.length; i++) {
  #|    const n = lnames[i];
  #|    cfg[n] = function(arg) {
  #|      try { lfns[i](this, arg); }
  #|      catch (e) { warn(n, e); }
  #|      finally { lcfns[i](this, arg); }
  #|    };
  #|  }
  #|  // 自定义方法必须进 cfg.methods（微信原生契约：模板事件绑定查找 methods）
  #|  if (mnames.length > 0) {
  #|    const methods = {};
  #|    for (let i = 0; i < mnames.length; i++) {
  #|      methods[mnames[i]] = function(arg) { mfns[i](this, arg); };
  #|    }
  #|    cfg.methods = methods;
  #|  }
  #|  if (onames.length > 0) {
  #|    const obs = {};
  #|    for (let i = 0; i < onames.length; i++) {
  #|      // 微信 observer 的实参数随监听字段数变化（单字段 newVal,oldVal；
  #|      // 逗号多字段 newA,newB,…）。把全部实参作为数组传入，
  #|      // MoonBit 侧经 Payload::observer_value/observer_args 读取，不再丢参。
  #|      obs[onames[i]] = function(...args) { ofns[i](this, args); };
  #|    }
  #|    cfg.observers = obs;
  #|  }
  #|  if (pnames.length > 0) {
  #|    const plt = {};
  #|    for (let i = 0; i < pnames.length; i++) {
  #|      plt[pnames[i]] = function(arg) { pfns[i](this, arg); };
  #|    }
  #|    cfg.pageLifetimes = plt;
  #|  }
  #|  return cfg;
  #|}

///|
/// 调用微信全局 Component()（须在组件自己的 JS 文件中调用）
extern "js" fn js_component(cfg : JsVal) -> Unit =
  #|(cfg) => Component(cfg)

///|
/// 供 JS 侧调用：组件文件只需一行
/// `require("../../engine/moon-engine.js").component("components/tag/tag")`
pub fn component(key : String) -> Unit raise MpError {
  js_component(component_config(key))
}
