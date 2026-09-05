///|
test "spec examples from PBOC regulation" {
  inspect(to_rmb_upper("0"), content="零圆整")
  inspect(to_rmb_upper("0.02"), content="贰分")
  inspect(to_rmb_upper("0.5"), content="伍角整")
  inspect(to_rmb_upper("0.52"), content="伍角贰分")
  // 零规则（一）：数字中间有 0
  inspect(to_rmb_upper("1409.5"), content="壹仟肆佰零玖圆伍角整")
  // 零规则（二）：连续多个 0 只写一个零
  inspect(to_rmb_upper("6007.14"), content="陆仟零柒圆壹角肆分")
  inspect(to_rmb_upper("1680.32"), content="壹仟陆佰捌拾圆叁角贰分")
  // 零规则（三）：万位/元位是 0 而千位/角位非 0，可省略零
  inspect(to_rmb_upper("107000.53"), content="壹拾万柒仟圆伍角叁分")
  // 角位为零而分位非零
  inspect(
    to_rmb_upper("16409.02"),
    content="壹万陆仟肆佰零玖圆零贰分",
  )
  inspect(to_rmb_upper("325.04"), content="叁佰贰拾伍圆零肆分")
}

///|
test "group zero folding" {
  // 跨组空洞
  inspect(to_rmb_upper("1000001"), content="壹佰万零壹圆整")
  inspect(
    to_rmb_upper("1234567"),
    content="壹佰贰拾叁万肆仟伍佰陆拾柒圆整",
  )
  // 元组千位缺省 → 补零
  inspect(
    to_rmb_upper("1230567"),
    content="壹佰贰拾叁万零伍佰陆拾柒圆整",
  )
  inspect(
    to_rmb_upper("100200300"),
    content="壹亿零贰拾万零叁佰圆整",
  )
  inspect(to_rmb_upper("10000000001"), content="壹佰亿零壹圆整")
  inspect(to_rmb_upper("100000000"), content="壹亿圆整")
  inspect(to_rmb_upper("100015"), content="壹拾万零壹拾伍圆整")
  // 组内正常
  inspect(
    to_rmb_upper("12345678"),
    content="壹仟贰佰叁拾肆万伍仟陆佰柒拾捌圆整",
  )
  inspect(to_rmb_upper("1024"), content="壹仟零贰拾肆圆整")
  inspect(to_rmb_upper("110"), content="壹佰壹拾圆整")
  inspect(to_rmb_upper("1000"), content="壹仟圆整")
}

///|
test "jiao and fen" {
  inspect(to_rmb_upper("1.1"), content="壹圆壹角整")
  inspect(to_rmb_upper("1.23"), content="壹圆贰角叁分")
  inspect(to_rmb_upper("1.03"), content="壹圆零叁分")
  inspect(to_rmb_upper("15.05"), content="壹拾伍圆零伍分")
}

///|
test "boundary" {
  inspect(
    to_rmb_upper("999999999999.99"),
    content="玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖圆玖角玖分",
  )
  inspect(to_rmb_upper("100000000000"), content="壹仟亿圆整")
}

///|
test "input cleaning: commas, currency symbols, spaces" {
  inspect(to_rmb_upper("1,680.32"), content="壹仟陆佰捌拾圆叁角贰分")
  inspect(
    to_rmb_upper("￥1680.32"),
    content="壹仟陆佰捌拾圆叁角贰分",
  )
  inspect(
    to_rmb_upper(" 1680.32 "),
    content="壹仟陆佰捌拾圆叁角贰分",
  )
}

///|
test "invalid amounts raise" {
  try to_rmb_upper("-1") catch {
    RmbError::InvalidAmount(_) => ()
    _ => fail("expected InvalidAmount")
  } noraise {
    _ => fail("expected to raise")
  }
  try to_rmb_upper("1.234") catch {
    RmbError::InvalidAmount(_) => ()
    _ => fail("expected InvalidAmount")
  } noraise {
    _ => fail("expected to raise")
  }
  try to_rmb_upper("abc") catch {
    RmbError::InvalidAmount(_) => ()
    _ => fail("expected InvalidAmount")
  } noraise {
    _ => fail("expected to raise")
  }
  try to_rmb_upper("1.") catch {
    RmbError::InvalidAmount(_) => ()
    _ => fail("expected InvalidAmount")
  } noraise {
    _ => fail("expected to raise")
  }
  try to_rmb_upper("") catch {
    RmbError::InvalidAmount(_) => ()
    _ => fail("expected InvalidAmount")
  } noraise {
    _ => fail("expected to raise")
  }
}

///|
test "out of range raises" {
  try to_rmb_upper("1000000000000") catch {
    RmbError::OutOfRange(_) => ()
    _ => fail("expected OutOfRange")
  } noraise {
    _ => fail("expected to raise")
  }
}

///|
test "programmatic entry" {
  inspect(upper_of(1680L, 32), content="壹仟陆佰捌拾圆叁角贰分")
  inspect(upper_of(0L, 5), content="伍分")
}
