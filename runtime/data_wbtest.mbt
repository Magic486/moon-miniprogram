///|
/// ③ 数据助手：query 反序列化 / set_field / storage 字符串
test "data: query 参数反序列化" {
  let src =
    #|{ page: "3", step: "2.5", ok: "true", no: "false", name: "月兔" }
  let p = Payload::new(js_eval(src))
  match p.query_number("page") {
    Some(d) => inspect(d, content="3")
    None => fail("page should parse")
  }
  match p.query_number("step") {
    Some(d) => inspect(d, content="2.5")
    None => fail("step should parse")
  }
  inspect(p.query_number("missing") is None, content="true")
  inspect(p.query_number("name") is None, content="true") // 非数字
  match p.query_string("name") {
    Some(s) => inspect(s, content="月兔")
    None => fail("name should exist")
  }
  match p.query_bool("ok") {
    Some(b) => inspect(b, content="true")
    None => fail("ok should be true")
  }
  match p.query_bool("no") {
    Some(b) => inspect(b, content="false")
    None => fail("no should be false")
  }
  inspect(p.query_bool("missing") is None, content="true")
  inspect(p.query_bool("name") is None, content="true")
}

///|
test "data: set_field 受控输入粘合" {
  let page = js_fake_page("f")
  PageCtx::new(page).set_field("name", "月兔")
  match fake_data(page) {
    Json::Object(m) =>
      match m.get("name") {
        Some(Json::String(s)) => inspect(s, content="月兔")
        _ => fail("name should be set")
      }
    _ => fail("data missing")
  }
  // seed 未受影响
  match fake_data(page) {
    Json::Object(m) =>
      match m.get("seed") {
        Some(Json::String(s)) => inspect(s, content="f")
        _ => fail("seed should persist")
      }
    _ => fail("data missing")
  }
}

///|
test "data: get_storage_string 无 wx 环境回空串" {
  inspect(get_storage_string("no_such_key"), content="")
}
