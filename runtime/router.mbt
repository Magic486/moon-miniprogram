///|
/// 声明式路由（对标 React Router 在小程序侧的合理形态）。
///
/// 集中声明页面路径 + 可接受的 query 参数白名单，导航不再手拼字符串 url：
///
/// ```moonbit nocheck
/// @mp.register_route({ path: "pages/about/about", params: ["from"] })
///
/// // 页面 handler 里：
/// @mp.navigate_to_route("pages/about/about", params={ "from": "index" })
/// // → wx.navigateTo({ url: "pages/about/about?from=index" })
/// ```
///
/// 安全设计：路由未注册 / 传了白名单外的键 → **console.warn 提示 + 剥离多余键**，
/// 绝不 raise —— 保证页面 handler 内调用不会因异常而静默失败或崩溃。
/// 页面接收端用 Payload（onLoad query）读取：payload.string_at(["from"])。
pub(all) struct RouteDef {
  /// 页面路径，须与 register_page 的 PageDef.path 一致，如 "pages/about/about"
  path : String
  /// 允许的 query 键白名单；空数组 = 该页面不接受任何参数
  params : Array[String]
}

///|
let route_registry : Map[String, RouteDef] = Map([])

///|
/// 注册路由（app 初始化时执行一次；幂等，重复注册覆盖）
pub fn register_route(def : RouteDef) -> Unit {
  route_registry[def.path] = def
}

///|
/// 路由是否已注册（调试/测试）
pub fn route_registered(path : String) -> Bool {
  route_registry.contains(path)
}

///|
/// 已注册路由数（测试用）
pub fn route_count() -> Int {
  route_registry.length()
}

///|
/// 该路由允许的 query 键白名单；未注册返回 None
pub fn route_allowed_params(path : String) -> Array[String]? {
  match route_registry.get(path) {
    Some(r) => Some(r.params)
    None => None
  }
}

///|
/// 开发警告（无 wx 环境与 node 单测均安全）
extern "js" fn js_dev_warn(msg : String) -> Unit =
  #|(msg) => {
  #|  try {
  #|    console.warn("[moon-miniprogram] " + msg);
  #|  } catch (_) {}
  #|}

///|
extern "js" fn js_encode_uri(s : String) -> String =
  #|(s) => encodeURIComponent(s)

///|
/// query 值 → url 编码文本（String 原样编码；数字去 .0；Bool 转 true/false；
/// 其余 Json 形式输出 null/对象/数组的紧凑 JSON 编码）
fn encode_query_value(v : Json) -> String {
  match v {
    Json::String(s) => js_encode_uri(s)
    Json::Number(d, ..) =>
      if d == d.floor() {
        js_encode_uri(d.to_int().to_string())
      } else {
        js_encode_uri(d.to_string())
      }
    Json::True => "true"
    Json::False => "false"
    Json::Null => "null"
    _ => js_encode_uri(v.stringify())
  }
}

///|
/// 纯函数：由路径 + 有序 query 构造 url（可单测）
pub fn route_url(path : String, query : Array[(String, Json)]) -> String {
  if query.is_empty() {
    return path
  }
  let buf = StringBuilder()
  buf.write_string(path)
  buf.write_string("?")
  let mut first = true
  for pair in query {
    let (k, v) = pair
    if first {
      first = false
    } else {
      buf.write_string("&")
    }
    buf.write_string(k)
    buf.write_string("=")
    buf.write_string(encode_query_value(v))
  }
  buf.to_string()
}

///|
/// 从 params 对象提取白名单内的键；多余键发 dev 警告并剥离。
/// 返回 (合法键列表, 是否发生剥离)
fn pick_allowed(
  path : String,
  allowed : Array[String],
  params : Json,
) -> (Array[(String, Json)], Bool) {
  let pairs : Array[(String, Json)] = []
  let mut stripped = false
  match params {
    Json::Object(m) =>
      for k, v in m {
        if allowed.contains(k) {
          pairs.push((k, v))
        } else {
          stripped = true
          js_dev_warn(
            "navigate(\{path}): 参数 \"\{k}\" 不在白名单 [\{allowed.join(", ")}]，已忽略",
          )
        }
      }
    _ =>
      // 非对象参数：仅空对象可接受，其余视为写法错误
      if !(params is Json::Null) {
        stripped = true
        js_dev_warn(
          "navigate(\{path}): 参数必须是对象（params={...}）",
        )
      }
  }
  (pairs, stripped)
}

///|
/// 白名单路由导航（保留当前页跳转）。未注册路由 / 多余参数 → dev 警告 + 安全降级。
pub fn navigate_to_route(
  path : String,
  params? : Json = Json::empty_object(),
) -> Unit {
  match route_registry.get(path) {
    None =>
      js_dev_warn(
        "navigate_to_route: 路由未注册 \"\{path}\"，请先 register_route。可用：\{route_registry.keys().join(", ")}",
      )
    Some(r) => {
      let (pairs, _stripped) = pick_allowed(path, r.params, params)
      navigate_to(route_url(path, pairs))
    }
  }
}

///|
/// 白名单路由导航（关闭当前页跳转）
pub fn redirect_to_route(
  path : String,
  params? : Json = Json::empty_object(),
) -> Unit {
  match route_registry.get(path) {
    None =>
      js_dev_warn(
        "redirect_to_route: 路由未注册 \"\{path}\"，请先 register_route",
      )
    Some(r) => {
      let (pairs, _stripped) = pick_allowed(path, r.params, params)
      redirect_to(route_url(path, pairs))
    }
  }
}

///|
/// 白名单路由导航（跳 tab 页，不支持带参；多余参数一律 dev 警告）
pub fn switch_tab_route(path : String) -> Unit {
  match route_registry.get(path) {
    None =>
      js_dev_warn(
        "switch_tab_route: 路由未注册 \"\{path}\"，请先 register_route",
      )
    Some(_r) => switch_tab(path)
  }
}
