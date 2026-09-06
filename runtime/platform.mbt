///|
/// 运行平台（跨端适配层的起点，详见 docs/rfc/0001-平台适配设计.md）。
///
/// 现阶段绑定以微信小程序为默认实现（extern 全部走 `wx.*`），
/// 但通过 detect_platform 让框架代码具备"感知平台"的能力，
/// 为支付宝/抖音等平台实现预留接口。
pub(all) enum MiniPlatform {
  /// 微信小程序
  Wechat
  /// 支付宝小程序
  Alipay
  /// 抖音小程序
  Douyin
  /// 其它（如测试环境 / H5 调试）
  Other
} derive(Eq, Debug)

///|
/// 探测当前运行平台：按微信(my)→支付宝(tt)→抖音 的全局对象约定判断。
/// 无任何小程序全局（node 单测 / 浏览器）返回 Other。
pub fn detect_platform() -> MiniPlatform {
  match js_platform_name() {
    "wechat" => Wechat
    "alipay" => Alipay
    "douyin" => Douyin
    _ => Other
  }
}

///|
extern "js" fn js_platform_name() -> String =
  #|() => {
  #|  if (typeof wx !== "undefined") { return "wechat"; }
  #|  if (typeof my !== "undefined") { return "alipay"; }
  #|  if (typeof tt !== "undefined") { return "douyin"; }
  #|  return "other";
  #|}
