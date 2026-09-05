///|
test "from_rmb_upper: 央行规范样例往返" {
  let cases : Array[(String, Int64, Int)] = [
    ("壹拾万柒仟圆伍角叁分", 107000L, 53),
    ("壹仟陆佰捌拾圆叁角贰分", 1680L, 32),
    ("陆仟零柒圆壹角肆分", 6007L, 14),
    ("壹仟零陆圆零壹分", 1006L, 1),
    (
      "玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖圆玖角玖分",
      999999999999L, 99,
    ),
    ("伍角整", 0L, 50),
    ("贰分", 0L, 2),
    ("零圆整", 0L, 0),
    ("壹圆整", 1L, 0),
    ("拾圆", 10L, 0),
    ("壹拾伍圆", 15L, 0),
    ("壹万零壹圆", 10001L, 0),
    ("拾万零伍佰圆", 100500L, 0),
    ("壹佰贰拾叁万肆仟伍佰陆拾柒圆捌角玖分", 1234567L, 89),
  ]
  for case in cases {
    let (upper, yuan, fen) = case
    let (y, f) = from_rmb_upper(upper)
    inspect(y == yuan && f == fen, content="true")
  }
}

///|
test "from_rmb_upper: 容错变体" {
  // 圆/元 等价
  let (a, _) = from_rmb_upper("壹元整")
  inspect(a, content="1")
  // 人民币 前缀
  let (b, _) = from_rmb_upper("人民币壹拾圆整")
  inspect(b, content="10")
  // 空/空白
  let (c, c2) = from_rmb_upper("")
  inspect(c == 0L && c2 == 0, content="true")
  let (d, _) = from_rmb_upper("  壹圆  ")
  inspect(d, content="1")
  // 零 省略与冗余等价
  let (e, e2) = from_rmb_upper("壹圆叁分")
  inspect(e == 1L && e2 == 3, content="true")
  let (f, f2) = from_rmb_upper("壹圆零叁分")
  inspect(f == 1L && f2 == 3, content="true")
  // 裸整数（无 圆 结尾）宽松处理
  let (g, _) = from_rmb_upper("壹仟")
  inspect(g, content="1000")
}

///|
test "from_rmb_upper: 非法输入报错" {
  try from_rmb_upper("ABC") catch {
    RmbError::InvalidAmount(_) => inspect(true, content="true")
    _ => fail("expected InvalidAmount")
  } noraise {
    _ => fail("expected to raise")
  }
  try from_rmb_upper("负壹圆") catch {
    RmbError::InvalidAmount(_) => inspect(true, content="true")
    _ => fail("expected InvalidAmount")
  } noraise {
    _ => fail("expected to raise")
  }
}

///|
test "from_rmb_upper: 超范围报错" {
  // 万亿级超上限（> 999999999999）
  try from_rmb_upper("壹万亿圆整") catch {
    RmbError::OutOfRange(_) => inspect(true, content="true")
    _ => fail("expected OutOfRange")
  } noraise {
    _ => fail("expected to raise")
  }
}

///|
test "roundtrip: 规范输出可无损逆转（含边界）" {
  let yuan_cases : Array[(Int64, Int)] = [
    (0L, 0),
    (0L, 5),
    (0L, 99),
    (1L, 0),
    (10L, 50),
    (105L, 7),
    (1006L, 1),
    (1680L, 32),
    (6007L, 14),
    (107000L, 53),
    (1234567L, 89),
    (100000001L, 1),
    (10002000L, 30),
    (999999999999L, 99),
  ]
  for case in yuan_cases {
    let (yuan, fen) = case
    let upper = upper_of(yuan, fen)
    let (y, f) = from_rmb_upper(upper)
    inspect(y == yuan && f == fen, content="true")
  }
}
