///|
/// 平台探测：node 无小程序全局 → Other（微信/支付宝/抖音由各自全局判断）
test "platform: 无全局探测为 Other" {
  debug_inspect(detect_platform(), content="Other")
}

///|
test "platform: 枚举语义与相等" {
  let p = Wechat
  let q = Wechat
  assert_eq(p, q)
  assert_false(p == Alipay)
  assert_false(Douyin == Other)
}
