///|
/// 声明式路由：url 构造纯函数 + 注册表 + 白名单剥离
test "router: route_url 编码与排序" {
  inspect(route_url("pages/about/about", []), content="pages/about/about")
  inspect(
    route_url("pages/detail/detail", [("id", jnum(42.0)), ("tag", jstr("a b"))]),
    content="pages/detail/detail?id=42&tag=a%20b",
  )
  inspect(
    route_url("pages/s/s", [("kw", jstr("月兔")), ("ok", jbool(true))]),
    content="pages/s/s?kw=%E6%9C%88%E5%85%94&ok=true",
  )
  inspect(
    route_url("pages/s/s", [("f", jnum(2.5)), ("n", Json::null())]),
    content="pages/s/s?f=2.5&n=null",
  )
}

///|
test "router: 注册表与白名单查询" {
  register_route({ path: "pages/detail/detail", params: ["id", "from"] })
  register_route({ path: "pages/bare/bare", params: [] })
  inspect(route_registered("pages/detail/detail"), content="true")
  inspect(route_registered("pages/none/none"), content="false")
  inspect(route_count(), content="2")
  match route_allowed_params("pages/detail/detail") {
    Some(a) => inspect(a.join(","), content="id,from")
    None => fail("should have params")
  }
  inspect(route_allowed_params("pages/none/none") is None, content="true")
}

///|
test "router: pick_allowed 剥离白名单外键" {
  register_route({ path: "pages/detail/detail", params: ["id"] })
  // 合法键保留、多余键剥离并标记
  let (pairs, stripped) = pick_allowed(
    "pages/detail/detail",
    ["id"],
    jobj([("id", jnum(1.0)), ("evil", jstr("x"))]),
  )
  inspect(stripped, content="true")
  inspect(pairs.length(), content="1")
  // 全部合法不剥离
  let (pairs2, stripped2) = pick_allowed(
    "pages/detail/detail",
    ["id"],
    jobj([("id", jnum(1.0))]),
  )
  inspect(stripped2, content="false")
  inspect(pairs2.length(), content="1")
  // 空对象 OK
  let (pairs3, stripped3) = pick_allowed(
    "pages/detail/detail",
    ["id"],
    jobj([]),
  )
  inspect(stripped3, content="false")
  inspect(pairs3.length(), content="0")
}

///|
test "router: navigate 安全降级不 raise（无 wx 环境静默）" {
  // 未注册路由：dev 警告 + 返回，绝不 raise
  navigate_to_route("pages/none/none", params={ "a": jstr("1") })
  // 注册后正常导航（node 环境无 wx → wx_call guard 静默跳过）
  register_route({ path: "pages/detail/detail", params: ["id"] })
  navigate_to_route("pages/detail/detail", params={ "id": jnum(7.0) })
  navigate_to_route("pages/detail/detail", params={
    "id": jnum(7.0),
    "x": jstr("y"),
  })
  redirect_to_route("pages/detail/detail")
  switch_tab_route("pages/detail/detail")
  switch_tab_route("pages/none/none")
  inspect(true, content="true")
}
