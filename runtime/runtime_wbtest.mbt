///|
/// 以指定 this 调用 JS 函数（模拟微信运行时调用处理器）
extern "js" fn js_invoke_with(self_ : JsVal, f : JsVal, arg : JsVal) -> Unit =
  #|(self_, f, arg) => f.call(self_, arg)

///|
/// 求值 JS 对象字面量（JSON.parse 无法表达函数成员）
extern "js" fn js_eval(src : String) -> JsVal =
  #|(src) => new Function("return (" + src + ")")()

///|
test "payload accessors via JSON round trip" {
  let src =
    #|{ "type": "tap", "detail": { "value": "1680.32", "x": 42 } }
  let p = Payload::new(js_parse(src))
  debug_inspect(p.string_at(["type"]), content="Some(\"tap\")")
  debug_inspect(p.string_at(["detail", "value"]), content="Some(\"1680.32\")")
  debug_inspect(p.number_at(["detail", "x"]), content="Some(42)")
  debug_inspect(p.number_at(["detail", "value"]), content="Some(1680.32)")
  debug_inspect(p.string_at(["missing", "deep"]), content="None")
  inspect(p.json() is Some(_), content="true")
}

///|
test "page registry: register then build config" {
  register_page({
    path: "pages/test/index",
    data: jobj([("count", jnum(0.0)), ("label", jstr("月兔"))]),
    handlers: [
      (
        "onLoad",
        (ctx, _payload) => ctx.set_data(jobj([("ready", jbool(true))])),
      ),
      ("onTap", (_ctx, _payload) => ()),
    ],
    returns: [],
  })
  let cfg = page_config("pages/test/index")
  // data 正确进入配置对象
  let data = js_get(cfg, "data").to_json()
  match data {
    Some(Json::Object(m)) => {
      match m.get("count") {
        Some(Json::Number(d, ..)) => inspect(d, content="0")
        _ => fail("count should be a number")
      }
      match m.get("label") {
        Some(Json::String(s)) => inspect(s, content="月兔")
        _ => fail("label should be a string")
      }
    }
    _ => fail("data should be an object")
  }
  // 处理器以函数形式挂载
  inspect(js_typeof(js_get(cfg, "onLoad")), content="function")
  inspect(js_typeof(js_get(cfg, "onTap")), content="function")
}

///|
test "page registry: unknown path raises" {
  try page_config("pages/nope/nope") catch {
    MpError::PageNotFound(path) => inspect(path, content="pages/nope/nope")
    _ => fail("expected PageNotFound")
  } noraise {
    _ => fail("expected to raise")
  }
}

///|
test "app config after register" {
  register_app({
    handlers: [("onLaunch", (_ctx, _payload) => ())],
    global_data: jobj([("version", jstr("0.1.0"))]),
  })
  let cfg = app_config()
  let gd = js_get(cfg, "globalData").to_json()
  match gd {
    Some(Json::Object(m)) =>
      match m.get("version") {
        Some(Json::String(s)) => inspect(s, content="0.1.0")
        _ => fail("version should be a string")
      }
    _ => fail("globalData should be an object")
  }
  inspect(js_typeof(js_get(cfg, "onLaunch")), content="function")
}

///|
test "handler wrapper binds instance and payload" {
  register_page({
    path: "pages/bind/index",
    data: jobj([]),
    handlers: [
      (
        "onCustom",
        (ctx, payload) => {
          let echo = match payload.string_at(["msg"]) {
            Some(s) => s
            None => ""
          }
          ctx.set_data(jobj([("echo", jstr(echo))]))
        },
      ),
    ],
    returns: [],
  })
  let cfg = page_config("pages/bind/index")
  // 模拟微信运行时：以 fake page 为 this 调用处理器
  let fake_src =
    #|{ setData(patch) { this.__patch = patch } }
  let evt_src =
    #|{ msg: "hello-moonbit" }
  let fake_page = js_eval(fake_src)
  let evt = js_eval(evt_src)
  js_invoke_with(fake_page, js_get(cfg, "onCustom"), evt)
  let patch = js_get(fake_page, "__patch").to_json()
  match patch {
    Some(Json::Object(m)) =>
      match m.get("echo") {
        Some(Json::String(s)) => inspect(s, content="hello-moonbit")
        _ => fail("echo should be a string")
      }
    _ => fail("patch should be an object")
  }
}
