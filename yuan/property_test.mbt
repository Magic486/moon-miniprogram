///|
/// 属性测试（quickcheck）：任意金额 x，from_rmb_upper(upper_of(x)) == x。
///
/// 从随机 Int 种子确定性导出 (yuan, fen)：
/// yuan = |seed| mod 10^12（覆盖全值域），fen = |seed| mod 100。
test "PBT: 大写↔数值往返不变式" {
  @quickcheck.quick_check_fn(fn(seed : Int) -> Bool {
    let a = seed.to_int64()
    let mag = if a < 0L { -a } else { a }
    let yuan = mag % 1000000000000L
    let fen = (mag % 100L).to_int()
    try {
      let upper = upper_of(yuan, fen)
      match from_rmb_upper(upper) {
        (y, f) => y == yuan && f == fen
      }
    } catch {
      _ => false
    }
  })
}

///|
/// 属性测试：解析结果再转大写必须回到原串（输出闭合性）
test "PBT: 解析幂等闭合" {
  @quickcheck.quick_check_fn(fn(seed : Int) -> Bool {
    let a = seed.to_int64()
    let mag = if a < 0L { -a } else { a }
    let yuan = mag % 1000000000000L
    let fen = (mag % 100L).to_int()
    try {
      let upper1 = upper_of(yuan, fen)
      let (y2, f2) = from_rmb_upper(upper1)
      upper_of(y2, f2) == upper1
    } catch {
      _ => false
    }
  })
}
