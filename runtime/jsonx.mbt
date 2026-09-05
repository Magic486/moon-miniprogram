///|
/// JSON 值快捷构造（供用户页面代码构造 data 与 wx 参数）
pub fn jstr(s : String) -> Json {
  Json::string(s)
}

///|
pub fn jbool(b : Bool) -> Json {
  Json::boolean(b)
}

///|
pub fn jnum(d : Double) -> Json {
  Json::number(d)
}

///|
pub fn jint(i : Int) -> Json {
  Json::number(i.to_double())
}

///|
/// 从键值对列表构造 JSON 对象
pub fn jobj(fields : Array[(String, Json)]) -> Json {
  let m : Map[String, Json] = Map([])
  for pair in fields {
    m[pair.0] = pair.1
  }
  Json::object(m)
}

///|
/// 构造 JSON 数组
pub fn jarr(items : Array[Json]) -> Json {
  Json::array(items)
}
