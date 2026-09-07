///|
/// 独立契约回归测试（源自 docs/reviews/2026-09-07-probes.mbt.txt，
/// 修复后转正）。验证：storage 参数形态、亮度零值、路由大整数与参数名编码、
/// 观察器多参、replace_state 子容器删除与根键语义。
/// 不依赖自建实现假设：用真实 wx mock 与原生 cfg 结构断言。

///|
/// 临时替换 globalThis.wx 执行 f（结束后还原）
extern "js" fn audit_with_wx(mock : JsVal, f : () -> Unit) -> Unit =
  #|(mock, f) => {
  #|  const old = globalThis.wx;
  #|  try { globalThis.wx = mock; f(); }
  #|  finally { if (old === undefined) delete globalThis.wx; else globalThis.wx = old; }
  #|}

///|
/// 以两个实参调用 JS 函数（模拟微信 observer 的多参回调）
extern "js" fn audit_invoke_two(f : JsVal, instance : JsVal) -> Unit =
  #|(f, instance) => f.call(instance, 1, 2)

///|
test "audit: remove_storage 传原始字符串 key" {
  let wx = js_eval(
    "({ removed: null, removeStorageSync(k) { this.removed = k } })",
  )
  audit_with_wx(wx, () => remove_storage("token"))
  match js_get(wx, "removed").to_json() {
    Some(Json::String(s)) => inspect(s, content="token")
    _ => fail("removeStorageSync should receive string key")
  }
}

///|
test "audit: 屏幕亮度 0 是合法值不被误判失败" {
  let value = Ref(-99.0)
  audit_with_wx(
    js_eval("({ getScreenBrightness(o) { o.success({ value: 0 }) } })"),
    () => get_screen_brightness(on_result=v => value.val = v),
  )
  inspect(value.val, content="0")
}

///|
test "audit: 路由保留大整数（超出 Int 不溢出失真）" {
  inspect(
    route_url("/detail", [("id", jnum(4_294_967_296.0))]),
    content="/detail?id=4294967296",
  )
  inspect(
    route_url("/detail", [("id", jnum(2_147_483_647.0))]),
    content="/detail?id=2147483647",
  )
}

///|
test "audit: 路由参数名做 URL 编码" {
  inspect(route_url("/detail", [("a&b", jstr("x"))]), content="/detail?a%26b=x")
  inspect(route_url("/detail", [("k", jstr("v&v"))]), content="/detail?k=v%26v")
}

///|
test "audit: 观察器多字段收到全部实参（不丢第二个值）" {
  let got : Ref[Json?] = Ref(None)
  register_component({
    key: "components/audit-obs/audit-obs",
    properties: jobj([]),
    data: jobj([]),
    handlers: [],
    observers: [("a,b", (_ctx, p) => got.val = p.json())],
    page_lifetimes: [],
  })
  let cfg = component_config("components/audit-obs/audit-obs")
  let obs = js_get(cfg, "observers")
  audit_invoke_two(js_get(obs, "a,b"), js_eval("({})"))
  match got.val {
    Some(Json::Array(a)) => inspect(a.length(), content="2")
    _ => fail("observer should receive arguments array")
  }
  // 便捷访问器：新值 = 首个实参
  let got2 : Ref[Json?] = Ref(None)
  register_component({
    key: "components/audit-obs2/audit-obs2",
    properties: jobj([]),
    data: jobj([]),
    handlers: [],
    observers: [("n", (_ctx, p) => got2.val = p.observer_value())],
    page_lifetimes: [],
  })
  let cfg2 = component_config("components/audit-obs2/audit-obs2")
  let obs2 = js_get(cfg2, "observers")
  audit_invoke_two(js_get(obs2, "n"), js_eval("({})"))
  match got2.val {
    Some(Json::Number(d, ..)) => inspect(d, content="1")
    _ => fail("observer_value should be first argument")
  }
}

///|
test "audit: replace_state 删除子容器内字段（父级替换语义）" {
  let p = js_eval(
    "({ data: { s: { keep: 1, obsolete: 2 }, top: 0 }, setData(p) { Object.assign(this.data, p) } })",
  )
  PageCtx::new(p).replace_state({ "s": { "keep": 1 }, "top": 0 })
  match js_get(p, "data").to_json() {
    Some(Json::Object(m)) =>
      match m.get("s") {
        Some(Json::Object(sm)) => {
          inspect(sm.contains("obsolete"), content="false")
          match sm.get("keep") {
            Some(Json::Number(d, ..)) => inspect(d, content="1")
            _ => fail("keep should remain")
          }
        }
        _ => fail("s should be object")
      }
    _ => fail("data missing")
  }
}

///|
test "audit: replace_state 缺根键发警告且不 raise（文档化根键语义）" {
  let p = js_eval(
    "({ data: { keep: 1, obsolete: 2 }, setData(p) { Object.assign(this.data, p) } })",
  )
  // 根键 obsolete 无法删除 → dev 警告 + 键保留（数据根模型要求状态收敛进子容器）
  PageCtx::new(p).replace_state({ "keep": 1 })
  match js_get(p, "data").to_json() {
    Some(Json::Object(m)) =>
      match m.get("keep") {
        Some(Json::Number(d, ..)) => inspect(d, content="1")
        _ => fail("keep should be set")
      }
    _ => fail("data missing")
  }
}

///|
/// 微信原生契约：自定义方法必须位于 cfg.methods（组件模板事件绑定查找
/// methods）；生命周期钩子放配置顶层。
test "audit: 组件方法按原生契约进入 cfg.methods" {
  register_component({
    key: "components/audit-m/audit-m",
    properties: jobj([]),
    data: jobj([]),
    handlers: [
      ("onTap", (_ctx, _payload) => ()),
      ("attached", (_ctx, _payload) => ()),
      ("onPick", (_ctx, _payload) => ()),
    ],
    observers: [],
    page_lifetimes: [],
  })
  let cfg = component_config("components/audit-m/audit-m")
  inspect(js_member_typeof(js_get(cfg, "methods"), "onTap"), content="function")
  inspect(
    js_member_typeof(js_get(cfg, "methods"), "onPick"),
    content="function",
  )
  // 生命周期不进 methods，在顶层
  inspect(
    js_member_typeof(js_get(cfg, "methods"), "attached"),
    content="undefined",
  )
  inspect(js_member_typeof(cfg, "attached"), content="function")
  // 未显式写 detached 时框架注入顶层兜底
  inspect(js_member_typeof(cfg, "detached"), content="function")
}

///|
/// 位置回调经基础类型 FFI（非 Json）：成功 (lat,lng)、失败必达
test "audit: get_location 成功/失败都经正确 FFI 传递" {
  let got : Ref[(Double, Double)?] = Ref(None)
  audit_with_wx(
    js_eval(
      "({ getLocation(o) { o.success({ latitude: 31.23, longitude: 121.47 }) } })",
    ),
    () => get_location(on_result=(lat, lng) => got.val = Some((lat, lng))),
  )
  match got.val {
    Some((lat, lng)) => {
      inspect(lat, content="31.23")
      inspect(lng, content="121.47")
    }
    None => fail("success callback should fire")
  }
  let failed : Ref[Bool] = Ref(false)
  audit_with_wx(js_eval("({})"), () => {
    get_location(on_result=(_lat, _lng) => (), on_fail=() => failed.val = true)
  })
  inspect(failed.val, content="true")
}
