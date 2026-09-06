///|
/// 数据助手：query 参数反序列化、存储字符串读取、受控输入粘合。
///
/// 面向 onLoad 的页面参数与 input 双向同步两个高频场景。
/// 底层复用 string_at / number_at（JS Number() 语义，query 字符串可直接解析）。

///|
/// 取页面参数中的字符串（如 "?name=兔" → "兔"；缺失回 None）
pub fn Payload::query_string(self : Payload, key : String) -> String? {
  self.string_at([key])
}

///|
/// 取页面参数中的数字（如 "?page=3" → 3.0；缺失/非数字回 None）
pub fn Payload::query_number(self : Payload, key : String) -> Double? {
  self.number_at([key])
}

///|
/// 取页面参数中的布尔（"true"/"1" → true；"false"/"0" → false；其它 → None）
pub fn Payload::query_bool(self : Payload, key : String) -> Bool? {
  match self.string_at([key]) {
    None => None
    Some(v) =>
      match v {
        "true" | "1" => Some(true)
        "false" | "0" => Some(false)
        _ => None
      }
  }
}

///|
/// 受控输入粘合：把输入框值写入 data 的指定字段（一次最小 set_state）。
/// 配合 WXML `<input value="{{name}}" bindinput="onNameInput" />`：
/// `("onNameInput", (ctx, p) => ctx.set_field("name", p.string_at(["detail","value"]).unwrap_or("")))`
pub fn PageCtx::set_field(
  self : PageCtx,
  field : String,
  value : String,
) -> Unit {
  self.set_state(jobj([(field, jstr(value))]))
}

///|
/// 读取存储中的字符串（缺失 / 类型不符 / 无 wx 环境回 ""）
pub fn get_storage_string(key : String) -> String {
  match get_storage(key) {
    Json::String(s) => s
    _ => ""
  }
}
