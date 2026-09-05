///|
/// 以指定 this 调用 JS 函数（模拟微信运行时调用处理器）
extern "js" fn js_invoke_with(self_ : JsVal, f : JsVal, arg : JsVal) -> Unit =
  #|(self_, f, arg) => f.call(self_, arg)

///|
/// 求值 JS 对象字面量（JSON.parse 无法表达函数成员）
extern "js" fn js_eval(src : String) -> JsVal =
  #|(src) => new Function("return (" + src + ")")()

///|
/// 对象成员的 typeof（缺键或对象为 undefined 时返回 "undefined"）
extern "js" fn js_member_typeof(v : JsVal, key : String) -> String =
  #|(v, key) => (v && v[key] !== undefined ? typeof v[key] : "undefined")

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

///|
test "component pageLifetimes 组装进配置" {
  let key = "components/test-pl/test-pl"
  register_component({
    key,
    properties: jobj([]),
    data: jobj([]),
    handlers: [],
    observers: [("text", (_ctx, _payload) => ())],
    page_lifetimes: [
      ("show", (_ctx, _payload) => ()),
      ("hide", (_ctx, _payload) => ()),
    ],
  })
  let cfg = component_config(key)
  // pageLifetimes 的值是 JS 函数，不能用 JSON 化检查，用 typeof 断言
  let plt = js_get(cfg, "pageLifetimes")
  inspect(js_member_typeof(plt, "show"), content="function")
  inspect(js_member_typeof(plt, "hide"), content="function")
  // observers 仍在
  inspect(
    js_get(cfg, "observers").to_json() is Some(Json::Object(_)),
    content="true",
  )
  // 空 page_lifetimes 时不生成 pageLifetimes 键（保持配置干净）
  register_component({
    key: "components/test-nopl/test-nopl",
    properties: jobj([]),
    data: jobj([]),
    handlers: [],
    observers: [],
    page_lifetimes: [],
  })
  let cfg2 = component_config("components/test-nopl/test-nopl")
  inspect(
    js_member_typeof(js_get(cfg2, "pageLifetimes"), "show"),
    content="undefined",
  )
}

///|
test "share_card: 转发卡片构造" {
  debug_inspect(
    share_card("发票助手", path="pages/index/index"),
    content=(
      #|Object({ "title": String("发票助手"), "path": String("pages/index/index") })
    ),
  )
  debug_inspect(
    share_card("极简"),
    content=(
      #|Object({ "title": String("极简") })
    ),
  )
  debug_inspect(
    share_card("全", path="pages/a/a", image_url="https://x/y.png"),
    content=(
      #|Object(
      #|  {
      #|    "title": String("全"),
      #|    "path": String("pages/a/a"),
      #|    "imageUrl": String("https://x/y.png"),
      #|  },
      #|)
    ),
  )
}

///|
/// 简单 LCG 随机数（固定 seed，可复现）
struct Lcg {
  mut state : UInt
}

///|
fn Lcg::next(self : Lcg) -> UInt {
  self.state = self.state * 1_103_515_245U + 12_345U
  self.state >> 16
}

///|
/// 随机生成一个小 Json 树：每根键叶子为数字/字符串/小对象
fn rand_json(lcg : Lcg, salt : UInt) -> Json {
  let leaf = fn(i : UInt, s : UInt) -> Json {
    match lcg.next() % 3U {
      0U => jnum(((i + s) % 97U).reinterpret_as_int().to_double())
      1U => jstr("v\{i}-\{s}")
      _ =>
        jobj([
          ("a", jnum(((i + s) % 13U).reinterpret_as_int().to_double())),
          ("b", jstr("leaf\{i}\{s}")),
        ])
    }
  }
  jobj([("k0", leaf(0U, salt)), ("k1", leaf(1U, salt + 7U))])
}

///|
/// P2 不变式：对随机 old/new，diff_partial（根键补丁数组）满足
/// (1) 键在补丁中 ⇔ 值变化，且补丁值恒等于新值（setData 根键替换收敛）；
/// (2) 自反 diff_partial(x, x) 为空。200 轮固定 seed 可复现。
test "random: diff_partial 根键不变式（LCG 可复现）" {
  let lcg : Lcg = { state: 42U }
  for _ in 0..<200 {
    let salt = lcg.next() % 1000U
    let old = rand_json(lcg, salt)
    let new_ = rand_json(lcg, salt)
    let patch = diff_partial(old, new_)
    match (old, new_) {
      (Json::Object(om), Json::Object(nm)) => {
        for k, nv in nm {
          let changed = match om.get(k) {
            Some(ov) => !Json::equal(ov, nv)
            None => true
          }
          let mut found : Json? = None
          for pair in patch {
            let (pk, pv) = pair
            if pk == k {
              found = Some(pv)
            }
          }
          match found {
            Some(pv) => {
              assert_true(changed)
              assert_true(Json::equal(pv, nv))
            }
            None => assert_true(!changed)
          }
        }
        for pair in patch {
          let (pk, _) = pair
          assert_true(nm.contains(pk))
        }
      }
      (_, _) => fail("scenario trees should be objects")
    }
    assert_true(diff_partial(new_, new_).length() == 0)
  }
}
