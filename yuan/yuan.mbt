///|
/// 人民币大写金额转换错误
pub(all) suberror RmbError {
  /// 金额格式非法，payload 为原始输入
  InvalidAmount(String)
  /// 金额超出支持范围（本库支持 0 ~ 999999999999.99，即 9999 亿以内）
  OutOfRange(String)
} derive(Eq, Debug)

///|
/// 大写数字字符表（下标 0-9）
let digit_chars : Array[String] = [
  "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖",
]

///|
/// 数字 0-9 转大写汉字
fn digit_cn(d : Int) -> String {
  digit_chars[d]
}

///|
/// 组单位：组下标 0 = 元组、1 = 万组、2 = 亿组
let group_units : Array[String] = ["", "万", "亿"]

///|
/// 元部分上限：9999 亿（12 位整数）
const MAX_YUAN : Int64 = 999999999999L

///|
/// 单组（0..=9999）转大写：千佰拾 + 零规则（组内空洞补零）
fn group_to_cn(n : Int) -> String {
  let ds : Array[Int] = [n / 1000 % 10, n / 100 % 10, n / 10 % 10, n % 10]
  let units : Array[String] = ["仟", "佰", "拾", ""]
  let buf = StringBuilder()
  let mut last = -1 // 组内上一个非零位下标
  for i in 0..<=3 {
    let d = ds[i]
    if d == 0 {
      continue
    }
    if last >= 0 && i > last + 1 {
      buf.write_string("零") // 组内零空洞：1024 → 壹仟零贰拾肆
    }
    buf.write_string(digit_cn(d))
    buf.write_string(units[i])
    last = i
  }
  buf.to_string()
}

///|
/// 元/角/分 转大写主体（不含校验）
fn upper_body(yuan : Int64, jiao : Int, fen : Int) -> String {
  if yuan == 0L && jiao == 0 && fen == 0 {
    return "零圆整"
  }
  let buf = StringBuilder()
  // 三组：亿、万、元
  let groups : Array[Int] = [
    (yuan / 100000000L % 10000L).to_int(),
    (yuan / 10000L % 10000L).to_int(),
    (yuan % 10000L).to_int(),
  ]
  let mut emitted = false
  for i, v in groups {
    if v == 0 {
      continue
    }
    if emitted && v < 1000 {
      buf.write_string("零") // 低组有高位缺省：1000001 → 壹佰万零壹圆
    }
    buf.write_string(group_to_cn(v))
    buf.write_string(group_units[2 - i])
    emitted = true
  }
  if yuan > 0L {
    buf.write_string("圆")
  }
  if jiao > 0 {
    buf.write_string(digit_cn(jiao))
    buf.write_string("角")
    if fen > 0 {
      buf.write_string(digit_cn(fen))
      buf.write_string("分")
    } else {
      buf.write_string("整") // 到角为止写整
    }
  } else if fen > 0 {
    if yuan > 0L {
      buf.write_string("零") // 角位为零：1.03 → 壹圆零叁分
    }
    buf.write_string(digit_cn(fen))
    buf.write_string("分")
  } else {
    buf.write_string("整")
  }
  buf.to_string()
}

///|
/// 清洗输入：剔除空白、逗号、人民币符号，返回纯金额串
fn clean_input(input : String) -> String {
  let buf = StringBuilder()
  for c in input {
    match c {
      ' ' | '\t' | '\r' | '\n' | ',' | '，' | '￥' | '¥' => ()
      _ => buf.write_char(c)
    }
  }
  buf.to_string()
}

///|
/// 解析金额字符串为 (元, 分)，严格校验格式与范围
fn parse_amount(input : String) -> (Int64, Int) raise RmbError {
  let s = clean_input(input)
  guard s.length() > 0 else { raise RmbError::InvalidAmount(input) }
  let mut seen_dot = false
  let mut decimals = 0
  let mut yuan : Int64 = 0L
  let mut fen = 0
  let mut has_digit = false
  for c in s {
    if c is ('0'..='9') {
      let d = c.to_int() - '0'.to_int()
      has_digit = true
      if seen_dot {
        if decimals >= 2 {
          raise RmbError::InvalidAmount(input)
        }
        fen = fen * 10 + d
        decimals += 1
      } else {
        yuan = yuan * 10L + d.to_int64()
        if yuan > MAX_YUAN {
          raise RmbError::OutOfRange(input)
        }
      }
    } else if c is '.' {
      if seen_dot {
        raise RmbError::InvalidAmount(input)
      }
      seen_dot = true
    } else {
      raise RmbError::InvalidAmount(input)
    }
  }
  guard has_digit else { raise RmbError::InvalidAmount(input) }
  if seen_dot && decimals == 0 {
    raise RmbError::InvalidAmount(input) // "1." 非法
  }
  // 补齐分位：0.5 → 50 分
  while decimals < 2 {
    fen = fen * 10
    decimals += 1
  }
  (yuan, fen)
}

///|
/// 把 (元, 分) 转为人民币大写金额字符串。
///
/// 依据《正确填写票据和结算凭证的基本规定》（银发〔1997〕393 号）：
///
/// - 数字用 零壹贰叁肆伍陆柒捌玖，单位用 拾佰仟万亿圆角分
/// - 金额到"元"或"角"为止写"整"，有"分"时不写
/// - 数字中间的零按汉语习惯折叠（1409.50 → 壹仟肆佰零玖圆伍角整）
/// - 万位/元位为零而千位/角位非零时，可省略"零"（107000.53 → 壹拾万柒仟圆伍角叁分）
///
/// # Example
///
/// ```mbt check
/// test {
///   inspect(
///     @yuan.to_rmb_upper("1680.32"),
///     content="壹仟陆佰捌拾圆叁角贰分",
///   )
/// }
/// ```
///
/// # Throws
///
/// - `RmbError::InvalidAmount`：格式非法（含负数、多于两位小数等）
/// - `RmbError::OutOfRange`：超过 9999 亿
pub fn to_rmb_upper(input : String) -> String raise RmbError {
  let (yuan, fen) = parse_amount(input)
  upper_of(yuan, fen)
}

///|
/// 程序化入口：直接给出元与分（fen 取 0-99）。
pub fn upper_of(yuan : Int64, fen : Int) -> String raise RmbError {
  guard fen >= 0 && fen <= 99 else {
    raise RmbError::InvalidAmount("fen=\{fen}")
  }
  guard yuan >= 0L && yuan <= MAX_YUAN else {
    raise RmbError::OutOfRange("yuan=\{yuan}")
  }
  upper_body(yuan, fen / 10, fen % 10)
}
