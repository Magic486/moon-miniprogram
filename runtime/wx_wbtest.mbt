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
  show_action_sheet(["a", "b"], on_result=r => picked.val = r)
  match picked.val {
    None => inspect(true, content="true")
    Some(_) => fail("no wx: should cancel")
  }
  // 扫码：无 wx → 回传空串
  let code : Ref[String] = Ref("")
  scan_code(on_result=c => code.val = c)
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

///|
/// returns 钩子族：转发/朋友圈/收藏卡片构造（可复现快照）
test "wx: returns 卡片 helper" {
  debug_inspect(
    timeline_card("朋友圈标题", query="a=1"),
    content=(
      #|Object({ "title": String("朋友圈标题"), "query": String("a=1") })
    ),
  )
  debug_inspect(
    favorite_card("收藏标题"),
    content=(
      #|Object({ "title": String("收藏标题") })
    ),
  )
  debug_inspect(
    share_card("转发", path="pages/x/x", image_url="https://i/1.png"),
    content=(
      #|Object(
      #|  {
      #|    "title": String("转发"),
      #|    "path": String("pages/x/x"),
      #|    "imageUrl": String("https://i/1.png"),
      #|  },
      #|)
    ),
  )
}

///|
/// wx_extra：无 wx 环境下全部安全降级（回调必达 fallback，绝不挂起）
test "wx_extra: 无 wx 环境安全降级" {
  // 异步回调组（Ref 捕获）
  let clip : Ref[String] = Ref("?")
  get_clipboard_data(on_result=v => clip.val = v)
  inspect(clip.val, content="")
  let net : Ref[String] = Ref("?")
  get_network_type(on_result=v => net.val = v)
  inspect(net.val, content="")
  let bat : Ref[Int] = Ref(0)
  get_battery_info(on_result=v => bat.val = v)
  inspect(bat.val, content="-1")
  let bright : Ref[Double] = Ref(0.0)
  get_screen_brightness(on_result=v => bright.val = v)
  inspect(bright.val, content="-1")
  let iwh : Ref[(Int, Int)] = Ref((0, 0))
  get_image_info("https://x/i.png", on_result=(w, h) => iwh.val = (w, h))
  let (w0, h0) = iwh.val
  inspect(w0 + h0, content="0")
  let dl : Ref[String] = Ref("?")
  download_file("https://x/a.bin", on_result=v => dl.val = v)
  inspect(dl.val, content="")
  let code : Ref[String] = Ref("?")
  login(on_result=v => code.val = v)
  inspect(code.val, content="")
  // 位置：失败回调空对象
  let loc : Ref[Json] = Ref(jstr("?"))
  get_location(on_result=j => loc.val = j)
  inspect(
    loc.val is Json::Object(_),
    content=(
      #|false
    ),
  )
  // 保存图片：on_fail 被调用
  let saved : Ref[Bool] = Ref(false)
  save_image_to_album("/tmp/a.png", on_fail=() => saved.val = true)
  inspect(saved.val, content="true")
  // 同步 wx_call 组：直接调用不崩
  vibrate_long()
  keep_screen_on()
  set_screen_brightness(0.5)
  set_nav_bar_color("white", "#000000")
  show_nav_bar_loading()
  hide_nav_bar_loading()
  inspect(true, content="true")
}
