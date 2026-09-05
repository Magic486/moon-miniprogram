///|
/// 任意 JavaScript 值：小程序运行时对象（页面实例、事件、wx 全局等）
#external
pub type JsVal

///|
/// 读取对象属性（缺失时返回 JS undefined）
extern "js" fn js_get(v : JsVal, key : String) -> JsVal =
  #|(v, k) => v[k]

///|
/// JS typeof 字符串
extern "js" fn js_typeof(v : JsVal) -> String =
  #|(v) => typeof v

///|
/// String(v) 转换
extern "js" fn js_to_string(v : JsVal) -> String =
  #|(v) => String(v)

///|
/// JSON.stringify
extern "js" fn js_stringify(v : JsVal) -> String =
  #|(v) => JSON.stringify(v)

///|
/// JSON.parse
extern "js" fn js_parse(s : String) -> JsVal =
  #|(s) => JSON.parse(s)

///|
/// 判断值是否可用（非 undefined / null）
extern "js" fn js_has_value(v : JsVal) -> Bool =
  #|(v) => v !== undefined && v !== null

///|
/// JS Number(v) 转换
extern "js" fn js_to_number(v : JsVal) -> Double =
  #|(v) => Number(v)

///|
/// 判断是否 NaN
extern "js" fn js_is_nan(d : Double) -> Bool =
  #|(d) => Number.isNaN(d)

///|
/// 按属性路径取子值，任何一级缺失返回 None
pub fn JsVal::at(self : JsVal, path : Array[String]) -> JsVal? {
  let mut v = self
  for k in path {
    v = js_get(v, k)
    if js_typeof(v) is "undefined" {
      return None
    }
  }
  Some(v)
}

///|
/// 按属性路径取字符串值（经 String() 转换）
pub fn JsVal::string_at(self : JsVal, path : Array[String]) -> String? {
  match self.at(path) {
    Some(v) if js_has_value(v) => Some(js_to_string(v))
    _ => None
  }
}

///|
/// 按属性路径取数值
pub fn JsVal::number_at(self : JsVal, path : Array[String]) -> Double? {
  match self.at(path) {
    Some(v) if js_has_value(v) => {
      let d = js_to_number(v)
      if js_is_nan(d) {
        None
      } else {
        Some(d)
      }
    }
    _ => None
  }
}

///|
/// 任意 JS 值 → MoonBit Json（经 JSON 序列化往返；不可序列化部分会被丢弃）
pub fn JsVal::to_json(self : JsVal) -> Json? {
  if js_has_value(self) {
    (Some(@json.parse(js_stringify(self))) : Json?) catch {
      _ => None
    }
  } else {
    None
  }
}
