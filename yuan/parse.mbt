///|
/// 大写汉字 → 数字（下标即数值），其余字符返回 None
fn digit_from_cn(ch : Char) -> Int? {
  match ch {
    '零' => Some(0)
    '壹' => Some(1)
    '贰' => Some(2)
    '叁' => Some(3)
    '肆' => Some(4)
    '伍' => Some(5)
    '陆' => Some(6)
    '柒' => Some(7)
    '捌' => Some(8)
    '玖' => Some(9)
    _ => None
  }
}

///|
/// 组内单位 → 倍数
fn unit_from_cn(ch : Char) -> Int64? {
  match ch {
    '拾' => Some(10L)
    '佰' => Some(100L)
    '仟' => Some(1000L)
    _ => None
  }
}

///|
/// 解析状态
priv struct UpperParser {
  /// 元部分累计（已结算的亿/万组）
  mut total : Int64
  /// 当前组内累计（未结算到 total）
  mut section : Int64
  /// 最近读到的数字（等待单位结算）
  mut cur : Int
  /// 角（0-9）
  mut jiao : Int
  /// 分（0-9）
  mut fen : Int
  /// 是否已出现 圆/元
  mut yuan_done : Bool
  /// 上一个单位是否为 万（用于识别"万亿"复合单位）
  mut last_was_wan : Bool
}

///|
/// 解析大写金额为 (元, 分)。
///
/// 与 `to_rmb_upper` 互逆（对规范输出成立）：
/// `from_rmb_upper(to_rmb_upper("107000.53")) == (107000L, 53)`。
///
/// 兼容写法：圆/元等价；整/正等价；可带"人民币"前缀；零可省略或冗余
/// （壹圆叁分 与 壹圆零叁分 等价）。出现未知字符即报错。
///
/// # Example
/// ```mbt check
/// test {
///   let (y, f) = @yuan.from_rmb_upper("壹拾万柒仟圆伍角叁分")
///   inspect(y, content="107000")
///   inspect(f, content="53")
/// }
/// ```
pub fn from_rmb_upper(input : String) -> (Int64, Int) raise RmbError {
  let p : UpperParser = {
    total: 0L,
    section: 0L,
    cur: 0,
    jiao: -1,
    fen: -1,
    yuan_done: false,
    last_was_wan: false,
  }
  let body = if input is [.. "人民币", .. rest] { rest } else { input }
  for ch in body {
    if ch is (' ' | '\t' | '\n' | '\r') {
      continue
    }
    match digit_from_cn(ch) {
      Some(d) => {
        p.cur = d
        p.last_was_wan = false
        continue
      }
      None => ()
    }
    match unit_from_cn(ch) {
      Some(u) => {
        // 拾 开头省略壹：拾圆 = 壹拾圆
        let lead : Int64 = if p.cur == 0 { 1L } else { p.cur.to_int64() }
        p.section += lead * u
        p.cur = 0
        p.last_was_wan = false
        continue
      }
      None => ()
    }
    match ch {
      '万' => {
        p.total = p.total + (p.section + p.cur.to_int64()) * 10000L
        p.section = 0L
        p.cur = 0
        p.last_was_wan = true
      }
      '亿' => {
        // "万亿"复合单位：必然超出 9999 亿上限
        if p.last_was_wan && p.section == 0L && p.cur == 0 {
          raise RmbError::OutOfRange(input)
        }
        p.total = p.total + (p.section + p.cur.to_int64()) * 100000000L
        p.section = 0L
        p.cur = 0
        p.last_was_wan = false
      }
      '圆' | '元' => {
        p.total = p.total + p.section + p.cur.to_int64()
        p.section = 0L
        p.cur = 0
        p.yuan_done = true
        p.last_was_wan = false
      }
      '角' => {
        p.jiao = p.cur
        p.cur = 0
        p.last_was_wan = false
      }
      '分' => {
        p.fen = p.cur
        p.cur = 0
        p.last_was_wan = false
      }
      '整' | '正' => ()
      '零' => {
        p.cur = 0
        p.last_was_wan = false
      }
      _ => raise RmbError::InvalidAmount(input)
    }
  }
  // 无 圆/元 结尾：把余量记作元（宽松处理 "壹仟" 这类裸整数）
  if !p.yuan_done {
    p.total = p.total + p.section + p.cur.to_int64()
    p.section = 0L
    p.cur = 0
  } else if p.section != 0L || p.cur != 0 {
    // 圆 后又出现数字/组（如 "壹圆贰拾"）：视为非法结构
    raise RmbError::InvalidAmount(input)
  }
  if p.total > MAX_YUAN {
    raise RmbError::OutOfRange(input)
  }
  let jiao = if p.jiao < 0 { 0 } else { p.jiao }
  let fen = if p.fen < 0 { 0 } else { p.fen }
  (p.total, jiao * 10 + fen)
}
