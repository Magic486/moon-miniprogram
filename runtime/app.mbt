///|
/// 小程序框架错误
pub(all) suberror MpError {
  /// page_config 未找到对应页面定义
  PageNotFound(String)
  /// component_config 未找到对应组件定义
  ComponentNotFound(String)
  /// launch 前未注册 App 定义
  AppNotRegistered
} derive(Debug, Eq)

///|
/// 应用上下文
pub struct AppCtx {
  priv app : JsVal
}

///|
fn AppCtx::new(app : JsVal) -> AppCtx {
  { app, }
}

///|
/// 应用处理器统一签名
pub type AppHandler = (AppCtx, Payload) -> Unit

///|
/// 应用定义：生命周期处理器 + 全局数据
pub(all) struct AppDef {
  /// "onLaunch" / "onShow" / "onHide" / "onError"
  handlers : Array[(String, AppHandler)]
  /// 全局数据（globalData，JSON 值）
  global_data : Json
}

///|
let app_registry : Ref[AppDef?] = Ref(None)

///|
/// 注册应用定义（在 app.js 引擎初始化时执行）
pub fn register_app(def : AppDef) -> Unit {
  app_registry.val = Some(def)
}

///|
/// 供 JS 侧调用：构建 App() 配置对象
pub fn app_config() -> JsVal raise MpError {
  guard app_registry.val is Some(def) else { raise MpError::AppNotRegistered }
  let names : FixedArray[String] = FixedArray::make(def.handlers.length(), "")
  let fns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    def.handlers.length(),
    (_, _) => (),
  )
  for i, kv in def.handlers {
    let (name, h) = kv
    names[i] = name
    fns[i] = fn(app, arg) { h(AppCtx::new(app), Payload::new(arg)) }
  }
  build_app_cfg(def.global_data.stringify(), names, fns)
}

///|
extern "js" fn build_app_cfg(
  global_data_json : String,
  names : FixedArray[String],
  handlers : FixedArray[(JsVal, JsVal) -> Unit],
) -> JsVal =
  #|(globalDataJson, names, handlers) => {
  #|  const cfg = { globalData: JSON.parse(globalDataJson) };
  #|  for (let i = 0; i < names.length; i++) {
  #|    cfg[names[i]] = function(arg) { handlers[i](this, arg); };
  #|  }
  #|  return cfg;
  #|}

///|
extern "js" fn js_app(cfg : JsVal) -> Unit =
  #|(cfg) => App(cfg)

///|
/// 启动应用：构建配置并调用微信全局 App()。
/// app.js 只需：`require("./engine/moon-engine.js").launch()`
pub fn launch() -> Unit raise MpError {
  js_app(app_config())
}

///|
/// 读取 getApp().globalData 并解析为 JSON（任何页面/组件回调中可用）
extern "js" fn js_global_data() -> String =
  #|() => {
  #|  try {
  #|    return JSON.stringify(getApp().globalData);
  #|  } catch (err) {
  #|    return "";
  #|  }
  #|}

///|
/// 读取应用全局数据（globalData）。尚未 launch 或解析失败时返回 None。
pub fn get_global_data() -> Json? {
  let s = js_global_data()
  if s is "" {
    None
  } else {
    Some(@json.parse(s)) catch {
      _ => None
    }
  }
}

///|
/// 覆写应用全局数据（getApp().globalData = value）
extern "js" fn js_set_global_data(json : String) -> Unit =
  #|(json) => {
  #|  getApp().globalData = JSON.parse(json);
  #|}

///|
/// 写入应用全局数据
pub fn set_global_data(data : Json) -> Unit {
  js_set_global_data(data.stringify())
}
