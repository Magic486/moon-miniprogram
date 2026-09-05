
///|
/// wx API 组：无 wx 环境（node 单测）安全降级，不 raise 不崩
test "wx: 高频 API 在无 wx 环境安全降级" {
  // 同步信息：无 wx → 空对象
  match system_info() {
    Json::Object(_) => inspect(true, content="true")
    _ => fail("system_info should return object")
  }
  // 操作菜单：无 wx → 回调 None（Ref 捕获，回调体内不 raise）
  let picked : Ref[Int?] = Ref(None)
  show_action_sheet(["a", "b"], on_result=(r) => { picked.val = r })
  match picked.val {
    None => inspect(true, content="true")
    Some(_) => fail("no wx: should cancel")
  }
  // 扫码：无 wx → 回传空串
  let code : Ref[String] = Ref("")
  scan_code(on_result=(c) => { code.val = c })
  inspect(code.val, content="")
  // 走 wx_call guard 的静默调用
  preview_image(["https://x/1.png"])
  open_location(31.2, 121.5, name="月城")
  inspect(true, content="true")
}

///|
/// 重复注册 dev 警告不抛错（幂等语义由调用方 ensure 保证）
test "wx: 重复注册覆盖不 raise" {
  register_page({
    path: "pages/dup/dup",
    data: jobj([]),
    handlers: [],
    returns: [],
  })
  register_page({
    path: "pages/dup/dup",
    data: jobj([("n", jnum(1.0))]),
    handlers: [],
    returns: [],
  })
  register_component({
    key: "components/dup/dup",
    properties: jobj([]),
    data: jobj([]),
    handlers: [],
    observers: [],
    page_lifetimes: [],
  })
  register_component({
    key: "components/dup/dup",
    properties: jobj([]),
    data: jobj([]),
    handlers: [],
    observers: [],
    page_lifetimes: [],
  })
  // 覆盖不抛错且页面可被正常配置（raise 则测试失败）
  let cfg = page_config("pages/dup/dup")
  inspect(js_member_typeof(cfg, "data"), content="object")
}
