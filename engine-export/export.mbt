///|
/// CJS 导出层：微信小程序侧 require 的入口。
/// 业务与注册逻辑在 engine 包（可单测），本包只做导出包装。
/// 注：不用 #export_name（moon test 不识别），导出名由
/// moon.pkg 的 link.js.exports 按函数名给出。
pub fn launch() -> Unit {
  @engine.launch()
}

///|
pub fn page(path : String) -> Unit {
  @engine.page(path)
}
