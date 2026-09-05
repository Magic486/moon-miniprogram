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
/// 读取当前 data（整体）
pub fn PageCtx::get_data(self : PageCtx) -> Json? {
  js_get(self.page, "data").to_json()
}

///|
/// 页面处理器统一签名
pub type PageHandler = (PageCtx, Payload) -> Unit

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
}

///|
let page_registry : Map[String, PageDef] = Map([])

///|
/// 注册页面定义（须在对应页面 JS 执行前完成，通常在 app 入口处）
pub fn register_page(def : PageDef) -> Unit {
  page_registry[def.path] = def
}

///|
/// 供 JS 侧调用：按路径构建 Page() 配置对象。
pub fn page_config(path : String) -> JsVal raise MpError {
  guard page_registry.get(path) is Some(def) else {
    raise MpError::PageNotFound(path)
  }
  let names : FixedArray[String] = FixedArray::make(def.handlers.length(), "")
  let fns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    def.handlers.length(),
    (_, _) => (),
  )
  for i, kv in def.handlers {
    let (name, h) = kv
    names[i] = name
    fns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
  }
  build_page_cfg(def.data.stringify(), names, fns)
}

///|
/// 构建 Page() 配置：data 解析 JSON；处理器包一层普通函数以绑定 this。
/// 注：跨 FFI 传处理列表用平行数组，不依赖元组/结构体的内部表示。
extern "js" fn build_page_cfg(
  data_json : String,
  names : FixedArray[String],
  handlers : FixedArray[(JsVal, JsVal) -> Unit],
) -> JsVal =
  #|(dataJson, names, handlers) => {
  #|  const cfg = { data: JSON.parse(dataJson) };
  #|  for (let i = 0; i < names.length; i++) {
  #|    cfg[names[i]] = function(arg) { handlers[i](this, arg); };
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
