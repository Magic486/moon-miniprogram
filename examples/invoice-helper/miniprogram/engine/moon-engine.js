function _M0DTPB4Json4Null() {}
_M0DTPB4Json4Null.prototype.$tag = 0;
const _M0DTPB4Json4Null__ = new _M0DTPB4Json4Null();
function _M0DTPB4Json4True() {}
_M0DTPB4Json4True.prototype.$tag = 1;
const _M0DTPB4Json4True__ = new _M0DTPB4Json4True();
function _M0DTPB4Json5False() {}
_M0DTPB4Json5False.prototype.$tag = 2;
const _M0DTPB4Json5False__ = new _M0DTPB4Json5False();
function _M0DTPB4Json6Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPB4Json6Number.prototype.$tag = 3;
function _M0DTPB4Json6String(param0) {
  this._0 = param0;
}
_M0DTPB4Json6String.prototype.$tag = 4;
function _M0DTPB4Json5Array(param0) {
  this._0 = param0;
}
_M0DTPB4Json5Array.prototype.$tag = 5;
function _M0DTPB4Json6Object(param0) {
  this._0 = param0;
}
_M0DTPB4Json6Object.prototype.$tag = 6;
const $reinterpret_view = new DataView(new ArrayBuffer(8));
function $i64_reinterpret_f64(a) {
  $reinterpret_view.setBigUint64(0, BigInt.asUintN(64, a), false);
  return $reinterpret_view.getFloat64(0, false);
}
function _M0TPC28internal7strconv9FloatInfo(param0, param1, param2) {
  this.mantissa_bits = param0;
  this.exponent_bits = param1;
  this.bias = param2;
}
function _M0TPB9ArrayViewGUsRP38Magic48618moon_2dminiprogram7runtime7PageDefEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGUsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const _M0FPB12random__seed = () => {
  if (globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] | 0; // Convert to signed 32
  } else {
    return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
  }
};
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
const _M0FPB21int64__to__string__js = (num, radix) => BigInt.asIntN(64, num).toString(radix);
function _M0TPB4IterGUsRPB4JsonEE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB9ArrayViewGkE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPB3MapGsRPB4JsonE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB5EntryGsRPB4JsonE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
const _M0MPB7JSArray3pop = (arr) => arr.pop();
function _M0TPC13ref3RefGbE(param0) {
  this.val = param0;
}
function _M0TPC13ref3RefGORP38Magic48618moon_2dminiprogram7runtime6AppDefE(param0) {
  this.val = param0;
}
function _M0DTPC16result6ResultGuRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount.prototype.$tag = 10;
function _M0DTPC15error5Error60Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eOutOfRange(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error60Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eOutOfRange.prototype.$tag = 9;
function _M0DTPC15error5Error64Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2ePageNotFound(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error64Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2ePageNotFound.prototype.$tag = 8;
function _M0DTPC15error5Error69Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eComponentNotFound(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error69Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eComponentNotFound.prototype.$tag = 7;
function _M0DTPC15error5Error68Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eAppNotRegistered() {}
_M0DTPC15error5Error68Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eAppNotRegistered.prototype.$tag = 6;
const _M0DTPC15error5Error68Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eAppNotRegistered__ = new _M0DTPC15error5Error68Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eAppNotRegistered();
function _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar.prototype.$tag = 5;
function _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof() {}
_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof.prototype.$tag = 4;
const _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__ = new _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof();
function _M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber.prototype.$tag = 3;
function _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape.prototype.$tag = 2;
function _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded() {}
_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded.prototype.$tag = 1;
const _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded__ = new _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded();
function _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0TPC28internal7strconv6Number(param0, param1, param2, param3) {
  this.exponent = param0;
  this.mantissa = param1;
  this.negative = param2;
  this.many_digits = param3;
}
function _M0DTPC16result6ResultGdRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPC15error5ErrorE2Ok.prototype.$tag = 1;
function $i64_clz(a) {
  a = BigInt.asUintN(64, a);
  if (a === 0n) return 64;
  const hi = Number(a >> 32n);
  if (hi !== 0) {
    return Math.clz32(hi);
  }
  return 32 + Math.clz32(Number(a & 0xffffffffn));
}
function _M0TPC28internal7strconv7Decimal(param0, param1, param2, param3, param4) {
  this.digits = param0;
  this.digits_num = param1;
  this.decimal_point = param2;
  this.negative = param3;
  this.truncated = param4;
}
function _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok.prototype.$tag = 1;
function $f64_convert_i64_u(a) {
  return Number(a);
}
function _M0DTPC16option6OptionGdE4None() {}
_M0DTPC16option6OptionGdE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGdE4None__ = new _M0DTPC16option6OptionGdE4None();
function _M0DTPC16option6OptionGdE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGdE4Some.prototype.$tag = 1;
function _M0TPC14json8Position(param0, param1) {
  this.line = param0;
  this.column = param1;
}
function _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0TPC14json12ParseContext(param0, param1, param2) {
  this.offset = param0;
  this.input = param1;
  this.end_offset = param2;
}
function $f64_convert_i64(a) {
  return Number(BigInt.asIntN(64, a));
}
function _M0TPC14json11LexedNumber(param0, param1) {
  this.repr = param0;
  this.value = param1;
}
function _M0TPC14json14JsonNumberScan(param0, param1, param2, param3, param4) {
  this.negative = param0;
  this.is_integer = param1;
  this.mantissa = param2;
  this.exponent = param3;
  this.many_digits = param4;
}
function _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC14json5Token4Null() {}
_M0DTPC14json5Token4Null.prototype.$tag = 0;
const _M0DTPC14json5Token4Null__ = new _M0DTPC14json5Token4Null();
function _M0DTPC14json5Token4True() {}
_M0DTPC14json5Token4True.prototype.$tag = 1;
const _M0DTPC14json5Token4True__ = new _M0DTPC14json5Token4True();
function _M0DTPC14json5Token5False() {}
_M0DTPC14json5Token5False.prototype.$tag = 2;
const _M0DTPC14json5Token5False__ = new _M0DTPC14json5Token5False();
function _M0DTPC14json5Token6Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json5Token6Number.prototype.$tag = 3;
function _M0DTPC14json5Token6String(param0) {
  this._0 = param0;
}
_M0DTPC14json5Token6String.prototype.$tag = 4;
function _M0DTPC14json5Token6LBrace() {}
_M0DTPC14json5Token6LBrace.prototype.$tag = 5;
const _M0DTPC14json5Token6LBrace__ = new _M0DTPC14json5Token6LBrace();
function _M0DTPC14json5Token6RBrace() {}
_M0DTPC14json5Token6RBrace.prototype.$tag = 6;
const _M0DTPC14json5Token6RBrace__ = new _M0DTPC14json5Token6RBrace();
function _M0DTPC14json5Token8LBracket() {}
_M0DTPC14json5Token8LBracket.prototype.$tag = 7;
const _M0DTPC14json5Token8LBracket__ = new _M0DTPC14json5Token8LBracket();
function _M0DTPC14json5Token8RBracket() {}
_M0DTPC14json5Token8RBracket.prototype.$tag = 8;
const _M0DTPC14json5Token8RBracket__ = new _M0DTPC14json5Token8RBracket();
function _M0DTPC14json5Token5Comma() {}
_M0DTPC14json5Token5Comma.prototype.$tag = 9;
const _M0DTPC14json5Token5Comma__ = new _M0DTPC14json5Token5Comma();
function _M0TPB9ArrayViewGUsRPB4JsonEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC14json10WriteFrame5Array(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json10WriteFrame5Array.prototype.$tag = 0;
function _M0DTPC14json10WriteFrame6Object(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json10WriteFrame6Object.prototype.$tag = 1;
const _M0FP38Magic48618moon_2dminiprogram7runtime8wx__call = (api, json) => wx[api](JSON.parse(json));
const _M0FP38Magic48618moon_2dminiprogram7runtime11wx__confirm = (title, content, showCancel, cb) => wx.showModal({
  title, content, showCancel,
  success: (res) => cb(Boolean(res.confirm)),
  fail: () => cb(false),
});
const _M0FP38Magic48618moon_2dminiprogram7runtime22wx__set__storage__sync = (key, json) => wx.setStorageSync(key, JSON.parse(json));
const _M0FP38Magic48618moon_2dminiprogram7runtime22wx__get__storage__sync = (key) => wx.getStorageSync(key);
const _M0FP38Magic48618moon_2dminiprogram7runtime14js__has__value = (v) => v !== undefined && v !== null;
const _M0FP38Magic48618moon_2dminiprogram7runtime13js__stringify = (v) => JSON.stringify(v);
const _M0FP38Magic48618moon_2dminiprogram7runtime16js__data__string = (self_) => {
  try {
    return JSON.stringify(self_.data);
  } catch (err) {
    return "";
  }
};
const _M0FP38Magic48618moon_2dminiprogram7runtime16js__apply__patch = (self_, patch) => {
  self_.setData(JSON.parse(patch));
};
function _M0TP38Magic48618moon_2dminiprogram7runtime7Payload(param0) {
  this.raw = param0;
}
const _M0FP38Magic48618moon_2dminiprogram7runtime14js__to__string = (v) => String(v);
const _M0FP38Magic48618moon_2dminiprogram7runtime7js__get = (v, k) => v[k];
const _M0FP38Magic48618moon_2dminiprogram7runtime10js__typeof = (v) => typeof v;
function _M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4None() {}
_M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4None__ = new _M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4None();
function _M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4Some.prototype.$tag = 1;
function _M0TP38Magic48618moon_2dminiprogram7runtime7PageCtx(param0) {
  this.page = param0;
}
const _M0FP38Magic48618moon_2dminiprogram7runtime13js__set__data = (page, json) => page.setData(JSON.parse(json));
const _M0FP38Magic48618moon_2dminiprogram7runtime18js__trigger__event = (self_, name, detail) => {
  if (self_.triggerEvent) {
    self_.triggerEvent(name, JSON.parse(detail));
  }
};
const _M0FP38Magic48618moon_2dminiprogram7runtime16build__page__cfg = (dataJson, names, handlers, rnames, rfns) => {
  const cfg = { data: JSON.parse(dataJson) };
  for (let i = 0; i < names.length; i++) {
    cfg[names[i]] = function(arg) { handlers[i](this, arg); };
  }
  for (let i = 0; i < rnames.length; i++) {
    cfg[rnames[i]] = function(arg) { return JSON.parse(rfns[i](this, arg)); };
  }
  return cfg;
};
function _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok.prototype.$tag = 1;
const _M0FP38Magic48618moon_2dminiprogram7runtime8js__page = (cfg) => Page(cfg);
function _M0DTPC16result6ResultGuRP38Magic48618moon_2dminiprogram7runtime7MpErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP38Magic48618moon_2dminiprogram7runtime7MpErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok.prototype.$tag = 1;
const _M0FP38Magic48618moon_2dminiprogram7runtime25js__build__component__cfg = (propsJson, dataJson, names, handlers, onames, ofns, pnames, pfns) => {
  const TYPES = {
    String: String,
    Number: Number,
    Boolean: Boolean,
    Object: Object,
    Array: Array,
  };
  const spec = JSON.parse(propsJson);
  const props = {};
  for (const k of Object.keys(spec)) {
    const p = spec[k];
    const def = {};
    if (p.t) {
      def.type = TYPES[p.t] || null;
    }
    if ("value" in p) {
      def.value = JSON.parse(JSON.stringify(p.value));
    }
    if (p.optional) {
      def.optional = true;
    }
    props[k] = def;
  }
  const cfg = { properties: props, data: JSON.parse(dataJson) };
  for (let i = 0; i < names.length; i++) {
    cfg[names[i]] = function(arg) { handlers[i](this, arg); };
  }
  if (onames.length > 0) {
    const obs = {};
    for (let i = 0; i < onames.length; i++) {
      obs[onames[i]] = function(value) { ofns[i](this, value); };
    }
    cfg.observers = obs;
  }
  if (pnames.length > 0) {
    const plt = {};
    for (let i = 0; i < pnames.length; i++) {
      plt[pnames[i]] = function(arg) { pfns[i](this, arg); };
    }
    cfg.pageLifetimes = plt;
  }
  return cfg;
};
const _M0FP38Magic48618moon_2dminiprogram7runtime13js__component = (cfg) => Component(cfg);
function _M0TP38Magic48618moon_2dminiprogram7runtime6AppCtx(param0) {
  this.app = param0;
}
const _M0FP38Magic48618moon_2dminiprogram7runtime15build__app__cfg = (globalDataJson, names, handlers) => {
  const cfg = { globalData: JSON.parse(globalDataJson) };
  for (let i = 0; i < names.length; i++) {
    cfg[names[i]] = function(arg) { handlers[i](this, arg); };
  }
  return cfg;
};
const _M0FP38Magic48618moon_2dminiprogram7runtime7js__app = (cfg) => App(cfg);
function _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRP38Magic48618moon_2dminiprogram4yuan8RmbErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP38Magic48618moon_2dminiprogram4yuan8RmbErrorE2Ok.prototype.$tag = 1;
function _M0TP38Magic48618moon_2dminiprogram7runtime12ComponentDef(param0, param1, param2, param3, param4, param5) {
  this.key = param0;
  this.properties = param1;
  this.data = param2;
  this.handlers = param3;
  this.observers = param4;
  this.page_lifetimes = param5;
}
function _M0TP38Magic48618moon_2dminiprogram7runtime7PageDef(param0, param1, param2, param3) {
  this.path = param0;
  this.data = param1;
  this.handlers = param2;
  this.returns = param3;
}
function _M0TP38Magic48618moon_2dminiprogram7runtime6AppDef(param0, param1) {
  this.handlers = param0;
  this.global_data = param1;
}
const _M0FP38Magic48618moon_2dminiprogram6engine9js__throw = (msg) => {
  throw new Error(msg);
};
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
const _M0FPB4null = _M0DTPB4Json4Null__;
const _M0MPB4Iter4nextN6constrS9183GUsRPB4JsonEE = 0;
const _M0MPB4Iter4nextN6constrS9184GUsRPB4JsonEE = 0;
const _M0MPB4Iter3newN6constrS9191GUsRPB4JsonEE = 0;
const _M0FPC16double14not__a__number = $i64_reinterpret_f64(9221120237041090561n);
const _M0FPC16double8infinity = $i64_reinterpret_f64(9218868437227405312n);
const _M0FPC16double13neg__infinity = $i64_reinterpret_f64(18442240474082181120n);
const _M0FPC28internal7strconv15range__err__str = "value out of range";
const _M0FPC28internal7strconv16syntax__err__str = "invalid syntax";
const _M0FPC28internal7strconv17min__19digit__int = 1000000000000000000n;
const _M0FPC28internal7strconv17parse__scientificN8exp__numS310 = 0n;
const _M0FPC28internal7strconv13parse__numberN11exp__numberS291 = 0n;
const _M0FPC28internal7strconv12double__info = new _M0TPC28internal7strconv9FloatInfo(52, 11, -1023);
const _M0FPC28internal7strconv25min__exponent__fast__path = 18446744073709551594n;
const _M0FPC28internal7strconv25max__exponent__fast__path = 22n;
const _M0FPC28internal7strconv36max__exponent__disguised__fast__path = 37n;
const _M0FPC28internal7strconv25max__mantissa__fast__path = 9007199254740992n;
const _M0FPC28internal7strconv6powtab = [1, 3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36, 39, 43, 46, 49, 53, 56, 59];
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS942 = { _0: 0, _1: "" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS943 = { _0: 1, _1: "5" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS944 = { _0: 1, _1: "25" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS945 = { _0: 1, _1: "125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS946 = { _0: 2, _1: "625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS947 = { _0: 2, _1: "3125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS948 = { _0: 2, _1: "15625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS949 = { _0: 3, _1: "78125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS950 = { _0: 3, _1: "390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS951 = { _0: 3, _1: "1953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS952 = { _0: 4, _1: "9765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS953 = { _0: 4, _1: "48828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS954 = { _0: 4, _1: "244140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS955 = { _0: 4, _1: "1220703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS956 = { _0: 5, _1: "6103515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS957 = { _0: 5, _1: "30517578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS958 = { _0: 5, _1: "152587890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS959 = { _0: 6, _1: "762939453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS960 = { _0: 6, _1: "3814697265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS961 = { _0: 6, _1: "19073486328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS962 = { _0: 7, _1: "95367431640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS963 = { _0: 7, _1: "476837158203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS964 = { _0: 7, _1: "2384185791015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS965 = { _0: 7, _1: "11920928955078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS966 = { _0: 8, _1: "59604644775390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS967 = { _0: 8, _1: "298023223876953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS968 = { _0: 8, _1: "1490116119384765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS969 = { _0: 9, _1: "7450580596923828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS970 = { _0: 9, _1: "37252902984619140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS971 = { _0: 9, _1: "186264514923095703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS972 = { _0: 10, _1: "931322574615478515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS973 = { _0: 10, _1: "4656612873077392578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS974 = { _0: 10, _1: "23283064365386962890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS975 = { _0: 10, _1: "116415321826934814453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS976 = { _0: 11, _1: "582076609134674072265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS977 = { _0: 11, _1: "2910383045673370361328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS978 = { _0: 11, _1: "14551915228366851806640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS979 = { _0: 12, _1: "72759576141834259033203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS980 = { _0: 12, _1: "363797880709171295166015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS981 = { _0: 12, _1: "1818989403545856475830078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS982 = { _0: 13, _1: "9094947017729282379150390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS983 = { _0: 13, _1: "45474735088646411895751953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS984 = { _0: 13, _1: "227373675443232059478759765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS985 = { _0: 13, _1: "1136868377216160297393798828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS986 = { _0: 14, _1: "5684341886080801486968994140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS987 = { _0: 14, _1: "28421709430404007434844970703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS988 = { _0: 14, _1: "142108547152020037174224853515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS989 = { _0: 15, _1: "710542735760100185871124267578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS990 = { _0: 15, _1: "3552713678800500929355621337890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS991 = { _0: 15, _1: "17763568394002504646778106689453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS992 = { _0: 16, _1: "88817841970012523233890533447265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS993 = { _0: 16, _1: "444089209850062616169452667236328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS994 = { _0: 16, _1: "2220446049250313080847263336181640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS995 = { _0: 16, _1: "11102230246251565404236316680908203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS996 = { _0: 17, _1: "55511151231257827021181583404541015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS997 = { _0: 17, _1: "277555756156289135105907917022705078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS998 = { _0: 17, _1: "1387778780781445675529539585113525390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS999 = { _0: 18, _1: "6938893903907228377647697925567626953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1000 = { _0: 18, _1: "34694469519536141888238489627838134765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1001 = { _0: 18, _1: "173472347597680709441192448139190673828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1002 = { _0: 19, _1: "867361737988403547205962240695953369140625" };
const _M0FPC28internal7strconv19left__shift__cheats = [_M0FPC28internal7strconv19left__shift__cheatsN5tupleS942, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS943, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS944, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS945, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS946, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS947, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS948, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS949, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS950, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS951, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS952, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS953, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS954, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS955, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS956, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS957, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS958, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS959, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS960, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS961, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS962, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS963, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS964, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS965, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS966, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS967, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS968, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS969, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS970, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS971, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS972, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS973, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS974, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS975, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS976, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS977, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS978, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS979, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS980, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS981, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS982, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS983, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS984, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS985, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS986, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS987, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS988, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS989, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS990, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS991, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS992, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS993, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS994, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS995, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS996, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS997, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS998, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS999, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1000, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1001, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1002];
const _M0FPC28internal7strconv10int__pow10 = [1n, 10n, 100n, 1000n, 10000n, 100000n, 1000000n, 10000000n, 100000000n, 1000000000n, 10000000000n, 100000000000n, 1000000000000n, 10000000000000n, 100000000000000n, 1000000000000000n];
const _M0FPC28internal7strconv5table = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1e+012, 1e+013, 1e+014, 1e+015, 1e+016, 1e+017, 1e+018, 1e+019, 1e+020, 1e+021, 1e+022, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const _M0FPC28internal7strconv12checked__mulN6constrS1083 = 0n;
const _M0FPC14json17int__pow10__table = [1n, 10n, 100n, 1000n, 10000n, 100000n, 1000000n, 10000000n, 100000000n, 1000000000n, 10000000000n, 100000000000n, 1000000000000n, 10000000000000n, 100000000000000n, 1000000000000000n];
const _M0FPC14json12pow10__table = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1e+012, 1e+013, 1e+014, 1e+015, 1e+016, 1e+017, 1e+018, 1e+019, 1e+020, 1e+021, 1e+022, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const _M0FPC14json12checked__mulN6constrS1776 = 0n;
const _M0FP38Magic48618moon_2dminiprogram4yuan12digit__chars = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
const _M0FP38Magic48618moon_2dminiprogram4yuan12group__units = ["", "万", "亿"];
const _M0FP38Magic48618moon_2dminiprogram6engine7samples = ["1680.32", "1006.01", "107000.53", "6007.14", "999999999999.99"];
const _M0FP38Magic48618moon_2dminiprogram6engine10registered = _M0MPC13ref3Ref3RefGbE(false);
const _M0FPB4seed = _M0FPB12random__seed();
const _bind = [];
const _M0FP38Magic48618moon_2dminiprogram7runtime14page__registry = _M0MPB3Map3MapGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(new _M0TPB9ArrayViewGUsRP38Magic48618moon_2dminiprogram7runtime7PageDefEE(_bind, 0, 0), undefined);
const _M0FP38Magic48618moon_2dminiprogram7runtime13app__registry = _M0MPC13ref3Ref3RefGORP38Magic48618moon_2dminiprogram7runtime6AppDefE(undefined);
const _bind$2 = [];
const _M0FP38Magic48618moon_2dminiprogram7runtime19component__registry = _M0MPB3Map3MapGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(new _M0TPB9ArrayViewGUsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefEE(_bind$2, 0, 0), undefined);
const _M0FPC28internal7strconv17check__underscoreN25_2atransition__table__178S186 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 0, 1, 2, 5];
const _M0FPC28internal7strconv15parse__inf__nanN25_2atransition__table__260S268 = [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 3, 4, 14, 14, 14, 14, 14, 14, 14, 7, 14, 14, 14, 14, 5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6, 14, 14, 14, 0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 8, 14, 14, 14, 14, 14, 1, 14, 14, 9, 14, 14, 14, 14, 14, 14, 14, 14, 10, 14, 14, 14, 14, 14, 14, 11, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 14, 14, 14, 14, 14, 14, 14, 14, 13, 14, 1, 14, 14, 14, 14, 14, 14, 14];
function _M0FPC15abort5abortGsE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGuE(msg) {
  $panic();
}
function _M0FPC15abort5abortGOiE(msg) {
  return $panic();
}
function _M0FPB13consume4__acc(acc, input) {
  const _p = (acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  const _p$2 = 17;
  return Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
}
function _M0MPB13StringBuilder13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGdE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGdE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGlE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGlE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGiE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGiE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 55296) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 56319);
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 56320) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 57343);
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC14byte4Byte7to__hexN14to__hex__digitS3919(i) {
  if (i < 10) {
    const _p = 48;
    const _p$2 = (i + _p | 0) & 255;
    return _p$2;
  } else {
    const _p = 97;
    const _p$2 = (i + _p | 0) & 255;
    const _p$3 = 10;
    const _p$4 = (_p$2 - _p$3 | 0) & 255;
    return _p$4;
  }
}
function _M0MPC14byte4Byte7to__hex(b) {
  const _self = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const _p = 16;
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS3919((b / _p | 0) & 255));
  const _p$2 = 16;
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS3919((b % _p$2 | 0) & 255));
  const _p$3 = _self;
  return _p$3.val;
}
function _M0MPC16string10StringView11sub_2einner(self, start, end) {
  const str_len = self.str.length;
  let abs_end;
  if (end === undefined) {
    abs_end = self.end;
  } else {
    const _Some = end;
    const _end = _Some;
    abs_end = self.start + _end | 0;
  }
  const abs_start = self.start + start | 0;
  if (abs_start >= self.start && (abs_start <= abs_end && abs_end <= self.end)) {
    if (abs_start < str_len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.str.charCodeAt(abs_start))) {
      } else {
        $panic();
      }
    }
    if (abs_end < str_len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.str.charCodeAt(abs_end))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self.str, abs_start, abs_end);
  } else {
    return $panic();
  }
}
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0) : _M0FPC15abort5abortGsE("Invalid index for View");
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0IP016_24default__implPB7Compare6op__ltGkE(x, y) {
  return $compare_int(x, y) < 0;
}
function _M0IP016_24default__implPB7Compare6op__leGkE(x, y) {
  return $compare_int(x, y) <= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGkE(x, y) {
  return $compare_int(x, y) >= 0;
}
function _M0FPB14avalanche__acc(acc) {
  let acc$2 = acc;
  acc$2 = acc$2 ^ (acc$2 >>> 15 | 0);
  acc$2 = Math.imul(acc$2, -2048144777) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 13 | 0);
  acc$2 = Math.imul(acc$2, -1028477379) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 16 | 0);
  return acc$2;
}
function _M0FPB13finalize__acc(acc) {
  return _M0FPB14avalanche__acc(acc);
}
function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    end$2 = _Some;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    if (start < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(start))) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(end$2))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start, end$2);
  } else {
    return $panic();
  }
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String11sub_2einner(value, start, start + len | 0));
}
function _M0IP016_24default__implPB4Show6outputGsE(self, logger) {
  logger.method_table.method_0(logger.self, self);
}
function _M0IP016_24default__implPB4Show6outputGdE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16double6DoublePB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGlE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC15int645Int64PB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGiE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC13int3IntPB4Show10to__string(self));
}
function _M0MPB4Iter4nextGUsRPB4JsonEE(self) {
  const _func = self.f;
  const result = _func();
  const _bind$3 = self.size_hint;
  if (result === undefined) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9184GUsRPB4JsonEE;
  } else {
    if (_bind$3 === undefined) {
    } else {
      const _Some = _bind$3;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9183GUsRPB4JsonEE;
    }
  }
  return result;
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPC15int645Int6418to__string_2einner(self, radix) {
  return _M0FPB21int64__to__string__js(self, radix);
}
function _M0MPB4Iter3newGUsRPB4JsonEE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9191GUsRPB4JsonEE;
  }
  return new _M0TPB4IterGUsRPB4JsonEE(f, size_hint$2);
}
function _M0MPC15array10FixedArray12view_2einnerGkE(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    end$2 = _Some;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    const _bind$3 = self;
    const _bind$4 = end$2 - start | 0;
    return new _M0TPB9ArrayViewGkE(_bind$3, start, start + _bind$4 | 0);
  } else {
    return _M0FPC15abort5abortGsE("View index out of bounds");
  }
}
function _M0MPC16string10StringView11code__units(self) {
  const _p = self.str.length;
  let _tmp;
  if (_p <= 0) {
    _tmp = [];
  } else {
    const _p$2 = 0;
    const _p$3 = $make_array_len_and_init(_p, self.str.charCodeAt(_p$2));
    let _tmp$2 = 1;
    while (true) {
      const _p$4 = _tmp$2;
      if (_p$4 < _p) {
        $bound_check(_p$3, _p$4);
        _p$3[_p$4] = self.str.charCodeAt(_p$4);
        _tmp$2 = _p$4 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _tmp = _p$3;
  }
  return _M0MPC15array10FixedArray12view_2einnerGkE(_tmp, self.start, self.end);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0MPC16string6String24char__length__ge_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          _M0FPC15abort5abortGuE("invalid surrogate pair");
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count >= len;
    }
  }
}
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let _tmp = end_offset;
  let _tmp$2 = 0;
  while (true) {
    const utf16_offset = _tmp;
    const char_count = _tmp$2;
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (_M0MPC16uint166UInt1623is__trailing__surrogate(c)) {
        _tmp = utf16_offset - 2 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      } else {
        _tmp = utf16_offset - 1 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      }
    } else {
      return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
    }
  }
}
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let _tmp = start_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
          _tmp = utf16_offset + 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset + 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
      }
    }
  } else {
    return _M0FPC15abort5abortGOiE("Invalid start index");
  }
}
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0MPC16string6String6repeat(self, n) {
  if (n < 0) {
    return _M0FPC15abort5abortGsE("negative repeat count");
  } else {
    if (n === 0) {
      return "";
    } else {
      if (n === 1) {
        return self;
      } else {
        const len = self.length;
        const total = Math.imul(len, n) | 0;
        if (len === 0 || (total / n | 0) === len) {
          const buf = _M0MPB13StringBuilder21StringBuilder_2einner(total);
          const str = self;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < n) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, str);
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return buf.val;
        } else {
          return _M0FPC15abort5abortGsE("repeat result too large");
        }
      }
    }
  }
}
function _M0MPC15array5Array4pushGRPB4JsonE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC16string10StringView20contains__code__unit(self, code) {
  const _bind$3 = self.end - self.start | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$3) {
      const _p = self.str.charCodeAt(self.start + i | 0);
      if (_p === code) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0MPC16string10StringView9get__char(self, idx) {
  if (idx >= 0 && idx < (self.end - self.start | 0)) {
    const c = self.str.charCodeAt(self.start + idx | 0);
    if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
      if ((idx + 1 | 0) < (self.end - self.start | 0)) {
        const next = self.str.charCodeAt(self.start + (idx + 1 | 0) | 0);
        return _M0MPC16uint166UInt1623is__trailing__surrogate(next) ? _M0FPB32code__point__of__surrogate__pair(c, next) : -1;
      } else {
        return -1;
      }
    } else {
      return _M0MPC16uint166UInt1623is__trailing__surrogate(c) ? -1 : c;
    }
  } else {
    return -1;
  }
}
function _M0IPC13int3IntPB4Show10to__string(self) {
  return _M0MPC13int3Int18to__string_2einner(self, 10);
}
function _M0IPC15int645Int64PB4Show10to__string(self) {
  return _M0MPC15int645Int6418to__string_2einner(self, 10);
}
function _M0MPC15array9ArrayView12view_2einnerGkE(self, start, end) {
  const len = self.end - self.start | 0;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    end$2 = _Some;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    const _bind$3 = self.buf;
    const _bind$4 = self.start + start | 0;
    const _bind$5 = end$2 - start | 0;
    return new _M0TPB9ArrayViewGkE(_bind$3, _bind$4, _bind$4 + _bind$5 | 0);
  } else {
    return _M0FPC15abort5abortGsE("View index out of bounds");
  }
}
function _M0MPC16option6Option3mapGRPC16string10StringViewsE(self, f) {
  if (self === undefined) {
    return undefined;
  } else {
    const _Some = self;
    const _t = _Some;
    return f(_t);
  }
}
function _M0MPC13int3Int20next__power__of__two(self) {
  if (self >= 0) {
    if (self <= 1) {
      return 1;
    }
    if (self > 1073741824) {
      return 1073741824;
    }
    return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
  } else {
    return $panic();
  }
}
function _M0FPB8new__mapGsRPB4JsonE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$3 = capacity$2 - 1 | 0;
  const _bind$4 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$5 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$6 = undefined;
  return new _M0TPB3MapGsRPB4JsonE(_bind$5, 0, capacity$2, _bind$3, _bind$4, _bind$6, -1);
}
function _M0FPB21capacity__for__length(length) {
  let capacity = _M0MPC13int3Int20next__power__of__two(length);
  const _p = capacity;
  if (length > ((Math.imul(_p, 13) | 0) / 16 | 0)) {
    capacity = Math.imul(capacity, 2) | 0;
  }
  return capacity;
}
function _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry) {
  const _bind$3 = self.tail;
  if (_bind$3 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind$3);
    const _p = _tmp[_bind$3];
    let _tmp$2;
    if (_p === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$2 = _p;
      _tmp$2 = _p$2;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  const _tmp = self.entries;
  $bound_check(_tmp, idx);
  _tmp[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map10set__entryGsRPB4JsonE(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind$3 = entry.next;
  if (_bind$3 === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind$3;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind$3 = _tmp$4[idx$2];
    if (_bind$3 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGsRPB4JsonE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$3;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsRPB4JsonE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGsRPB4JsonE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$3;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map4growGsRPB4JsonE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p = self.capacity;
  self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGsRPB4JsonE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRPB4JsonE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$4 = self.tail;
      const _bind$5 = undefined;
      const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$4, _bind$5, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$3;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPB4JsonE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr_entry);
        const _bind$4 = self.tail;
        const _bind$5 = undefined;
        const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$4, _bind$5, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRPB4JsonE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$4 = self.tail;
      const _bind$5 = undefined;
      const entry = new _M0TPB5EntryGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(_bind$4, _bind$5, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$3;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPB4JsonE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr_entry);
        const _bind$4 = self.tail;
        const _bind$5 = undefined;
        const entry = new _M0TPB5EntryGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(_bind$4, _bind$5, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRPB4JsonE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$4 = self.tail;
      const _bind$5 = undefined;
      const entry = new _M0TPB5EntryGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(_bind$4, _bind$5, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$3;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPB4JsonE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr_entry);
        const _bind$4 = self.tail;
        const _bind$5 = undefined;
        const entry = new _M0TPB5EntryGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(_bind$4, _bind$5, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3setGsRPB4JsonE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3MapGsRPB4JsonE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p ? _capacity : _p;
  }
  const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
  const _bind$3 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRPB4JsonE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p ? _capacity : _p;
  }
  const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
  const _bind$3 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p ? _capacity : _p;
  }
  const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
  const _bind$3 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3getGsRPB4JsonE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$3;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$3;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$3;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRPB4JsonE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      return false;
    } else {
      const _Some = _bind$3;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map12contains__kvGsRPB4JsonE(self, key, value) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$3 = _tmp$3[idx];
    if (_bind$3 === undefined) {
      return false;
    } else {
      const _Some = _bind$3;
      const _entry = _Some;
      if (_entry.hash === hash && (_entry.key === key && _M0IPC14json4JsonPB2Eq5equal(_entry.value, value))) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map4iterGsRPB4JsonE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind$3 = curr_entry.val;
        if (_bind$3 === undefined) {
          break _L;
        } else {
          const _Some = _bind$3;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return { _0: _key, _1: _value };
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPB3Map5iter2GsRPB4JsonE(self) {
  return _M0MPB3Map4iterGsRPB4JsonE(self);
}
function _M0IPB3MapPB2Eq5equalGsRPB4JsonE(self, that) {
  if (self.size === that.size) {
    const _it = _M0MPB3Map5iter2GsRPB4JsonE(self);
    while (true) {
      const _bind$3 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
      if (_bind$3 === undefined) {
        return true;
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        const _k = _x._0;
        const _v = _x._1;
        if (_M0MPB3Map12contains__kvGsRPB4JsonE(that, _k, _v)) {
        } else {
          return false;
        }
        continue;
      }
    }
  } else {
    return false;
  }
}
function _M0IPC14json4JsonPB2Eq5equal(a, b) {
  switch (a.$tag) {
    case 0: {
      if (b.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (b.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (b.$tag === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      const _Number = a;
      const _a_num = _Number._0;
      if (b.$tag === 3) {
        const _Number$2 = b;
        const _b_num = _Number$2._0;
        return _a_num === _b_num;
      } else {
        return false;
      }
    }
    case 4: {
      const _String = a;
      const _a_str = _String._0;
      if (b.$tag === 4) {
        const _String$2 = b;
        const _b_str = _String$2._0;
        return _a_str === _b_str;
      } else {
        return false;
      }
    }
    case 5: {
      const _Array = a;
      const _a_arr = _Array._0;
      if (b.$tag === 5) {
        const _Array$2 = b;
        const _b_arr = _Array$2._0;
        return _M0IPC15array5ArrayPB2Eq5equalGRPB4JsonE(_a_arr, _b_arr);
      } else {
        return false;
      }
    }
    default: {
      const _Object = a;
      const _a_obj = _Object._0;
      if (b.$tag === 6) {
        const _Object$2 = b;
        const _b_obj = _Object$2._0;
        return _M0IPB3MapPB2Eq5equalGsRPB4JsonE(_a_obj, _b_obj);
      } else {
        return false;
      }
    }
  }
}
function _M0MPB5Iter24nextGsRPB4JsonE(self) {
  return _M0MPB4Iter4nextGUsRPB4JsonEE(self);
}
function _M0IPC16string6StringPB4Hash4hash(self) {
  let acc = (_M0FPB4seed >>> 0) + (374761393 >>> 0) | 0;
  const _bind$3 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$3) {
      acc = (acc >>> 0) + (4 >>> 0) | 0;
      const v = self.charCodeAt(i);
      acc = _M0FPB13consume4__acc(acc, v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FPB13finalize__acc(acc);
}
function _M0IPC16double6DoublePB4Show10to__string(self) {
  return String(self);
}
function _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self) {
  return _M0MPB7JSArray3pop(self);
}
function _M0MPC15array5Array3popGRPC14json10WriteFrameE(self) {
  if (self.length === 0) {
    return undefined;
  } else {
    const v = _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self);
    return v;
  }
}
function _M0MPC15array5Array2atGRPB4JsonE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array2atGiE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0IPC15array5ArrayPB2Eq5equalGRPB4JsonE(self, other) {
  const self_len = self.length;
  const other_len = other.length;
  if (self_len === other_len) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < self_len) {
        if (_M0IPC14json4JsonPB2Eq5equal(self[i], other[i])) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
}
function _M0MPC13ref3Ref3RefGbE(x) {
  return new _M0TPC13ref3RefGbE(x);
}
function _M0MPC13ref3Ref3RefGORP38Magic48618moon_2dminiprogram7runtime6AppDefE(x) {
  return new _M0TPC13ref3RefGORP38Magic48618moon_2dminiprogram7runtime6AppDefE(x);
}
function _M0FPC28internal7strconv10range__errGuE() {
  return new _M0DTPC16result6ResultGuRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv15range__err__str));
}
function _M0FPC28internal7strconv11syntax__errGdE() {
  return new _M0DTPC16result6ResultGdRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGORPC28internal7strconv6NumberE() {
  return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGuE() {
  return new _M0DTPC16result6ResultGuRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE() {
  return new _M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(self, init, f) {
  let _tmp = self;
  let _tmp$2 = init;
  let _tmp$3 = 0;
  while (true) {
    const str = _tmp;
    const ret = _tmp$2;
    const len = _tmp$3;
    _L: {
      if ((str.end - str.start | 0) >= 1) {
        const _x = str.str.charCodeAt(str.start);
        if (_x >= 48 && _x <= 57) {
          const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          _tmp = _x$2;
          _tmp$2 = f(_x - 48 | 0, ret);
          _tmp$3 = len + 1 | 0;
          continue;
        } else {
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            _tmp = _x$2;
            continue;
          } else {
            break _L;
          }
        }
      } else {
        break _L;
      }
    }
    return { _0: str, _1: ret, _2: len };
  }
}
function _M0FPC28internal7strconv13parse__digits(s, x) {
  return _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(s, x, (digit, acc) => BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + BigInt.asUintN(64, BigInt(digit >>> 0))));
}
function _M0FPC28internal7strconv20try__parse__19digits(s, x) {
  let x$2 = x;
  let len = 0;
  let _tmp = s;
  while (true) {
    const s$2 = _tmp;
    let s$3;
    _L: {
      if ((s$2.end - s$2.start | 0) >= 1) {
        const _x = s$2.str.charCodeAt(s$2.start);
        if (_x >= 48 && _x <= 57) {
          const _x$2 = new _M0TPC16string10StringView(s$2.str, s$2.start + 1 | 0, s$2.end);
          if (BigInt.asUintN(64, x$2) < BigInt.asUintN(64, _M0FPC28internal7strconv17min__19digit__int)) {
            len = len + 1 | 0;
            x$2 = BigInt.asUintN(64, BigInt.asUintN(64, x$2 * 10n) + BigInt.asUintN(64, BigInt((_x - 48 | 0) >>> 0)));
            _tmp = _x$2;
            continue;
          } else {
            s$3 = s$2;
            break _L;
          }
        } else {
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(s$2.str, s$2.start + 1 | 0, s$2.end);
            _tmp = _x$2;
            continue;
          } else {
            s$3 = s$2;
            break _L;
          }
        }
      } else {
        s$3 = s$2;
        break _L;
      }
    }
    return { _0: s$3, _1: x$2, _2: len };
  }
}
function _M0FPC28internal7strconv17parse__scientific(s) {
  let s$2 = s;
  let neg_exp = false;
  let rest;
  let ch;
  _L: {
    _L$2: {
      const _bind$3 = s$2;
      if ((_bind$3.end - _bind$3.start | 0) >= 1) {
        const _x = _bind$3.str.charCodeAt(_bind$3.start);
        switch (_x) {
          case 43: {
            const _x$2 = new _M0TPC16string10StringView(_bind$3.str, _bind$3.start + 1 | 0, _bind$3.end);
            rest = _x$2;
            ch = _x;
            break _L$2;
          }
          case 45: {
            const _x$3 = new _M0TPC16string10StringView(_bind$3.str, _bind$3.start + 1 | 0, _bind$3.end);
            rest = _x$3;
            ch = _x;
            break _L$2;
          }
        }
      }
      break _L;
    }
    neg_exp = ch === 45;
    s$2 = rest;
  }
  _L$2: {
    const _bind$3 = s$2;
    if ((_bind$3.end - _bind$3.start | 0) >= 1) {
      const _x = _bind$3.str.charCodeAt(_bind$3.start);
      if (_x >= 48 && _x <= 57) {
        const _bind$4 = _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(s$2, _M0FPC28internal7strconv17parse__scientificN8exp__numS310, (digit, exp_num) => BigInt.asIntN(64, exp_num) < BigInt.asIntN(64, 65536n) ? BigInt.asUintN(64, BigInt.asUintN(64, 10n * exp_num) + BigInt.asUintN(64, BigInt(digit))) : exp_num);
        const _s = _bind$4._0;
        const _exp_num = _bind$4._1;
        return neg_exp ? { _0: _s, _1: BigInt.asUintN(64, -_exp_num) } : { _0: _s, _1: _exp_num };
      } else {
        break _L$2;
      }
    } else {
      break _L$2;
    }
  }
  return undefined;
}
function _M0FPC28internal7strconv13parse__number(s) {
  let s$2;
  let negative;
  _L: {
    let rest;
    _L$2: {
      if ((s.end - s.start | 0) >= 1) {
        const _x = s.str.charCodeAt(s.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(s.str, s.start + 1 | 0, s.end);
            s$2 = _x$2;
            negative = true;
            break _L;
          }
          case 43: {
            const _x$3 = new _M0TPC16string10StringView(s.str, s.start + 1 | 0, s.end);
            rest = _x$3;
            break _L$2;
          }
          default: {
            rest = s;
            break _L$2;
          }
        }
      } else {
        rest = s;
        break _L$2;
      }
    }
    s$2 = rest;
    negative = false;
    break _L;
  }
  if ((s$2.end - s$2.start | 0) === 0) {
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
  }
  const _bind$3 = _M0FPC28internal7strconv13parse__digits(s$2, 0n);
  const _s = _bind$3._0;
  const _mantissa = _bind$3._1;
  const _consumed = _bind$3._2;
  let mantissa = _mantissa;
  let s$3 = _s;
  let n_digits = _consumed;
  let n_after_dot = 0;
  let exponent = 0n;
  const _bind$4 = s$3;
  if ((_bind$4.end - _bind$4.start | 0) >= 1) {
    const _x = _bind$4.str.charCodeAt(_bind$4.start);
    if (_x === 46) {
      const _x$2 = new _M0TPC16string10StringView(_bind$4.str, _bind$4.start + 1 | 0, _bind$4.end);
      s$3 = _x$2;
      const _bind$5 = _M0FPC28internal7strconv13parse__digits(s$3, mantissa);
      const _new_s = _bind$5._0;
      const _new_mantissa = _bind$5._1;
      const _consumed_digit = _bind$5._2;
      s$3 = _new_s;
      mantissa = _new_mantissa;
      n_after_dot = _consumed_digit;
      exponent = BigInt.asUintN(64, -BigInt.asUintN(64, BigInt(n_after_dot)));
    }
  }
  n_digits = n_digits + n_after_dot | 0;
  if (n_digits === 0) {
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
  }
  let rest;
  _L$2: {
    _L$3: {
      const _bind$5 = s$3;
      if ((_bind$5.end - _bind$5.start | 0) >= 1) {
        const _x = _bind$5.str.charCodeAt(_bind$5.start);
        switch (_x) {
          case 101: {
            const _x$2 = new _M0TPC16string10StringView(_bind$5.str, _bind$5.start + 1 | 0, _bind$5.end);
            rest = _x$2;
            break _L$3;
          }
          case 69: {
            const _x$3 = new _M0TPC16string10StringView(_bind$5.str, _bind$5.start + 1 | 0, _bind$5.end);
            rest = _x$3;
            break _L$3;
          }
        }
      }
      break _L$2;
    }
    const _bind$5 = _M0FPC28internal7strconv17parse__scientific(rest);
    let _bind$6;
    if (_bind$5 === undefined) {
      return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
    } else {
      const _Some = _bind$5;
      _bind$6 = _Some;
    }
    const _new_s = _bind$6._0;
    const _exp_number = _bind$6._1;
    s$3 = _new_s;
    exponent = BigInt.asUintN(64, exponent + _exp_number);
  }
  const _bind$5 = s$3;
  if ((_bind$5.end - _bind$5.start | 0) === 0) {
    if (n_digits <= 19) {
      return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(new _M0TPC28internal7strconv6Number(exponent, mantissa, negative, false));
    }
    n_digits = n_digits - 19 | 0;
    let many_digits = false;
    let _tmp = s;
    while (true) {
      const s$4 = _tmp;
      _L$3: {
        let rest$2;
        let ch;
        _L$4: {
          if ((s$4.end - s$4.start | 0) >= 1) {
            const _x = s$4.str.charCodeAt(s$4.start);
            switch (_x) {
              case 48: {
                const _x$2 = new _M0TPC16string10StringView(s$4.str, s$4.start + 1 | 0, s$4.end);
                rest$2 = _x$2;
                ch = _x;
                break _L$4;
              }
              case 46: {
                const _x$3 = new _M0TPC16string10StringView(s$4.str, s$4.start + 1 | 0, s$4.end);
                rest$2 = _x$3;
                ch = _x;
                break _L$4;
              }
              default: {
                break _L$3;
              }
            }
          } else {
            break _L$3;
          }
        }
        n_digits = n_digits - ((ch - 46 | 0) / 2 | 0) | 0;
        _tmp = rest$2;
        continue;
      }
      break;
    }
    let mantissa$2 = mantissa;
    if (n_digits > 0) {
      many_digits = true;
      mantissa$2 = 0n;
      const _bind$6 = _M0FPC28internal7strconv20try__parse__19digits(s, mantissa$2);
      const _s$2 = _bind$6._0;
      const _new_mantissa = _bind$6._1;
      const _consumed_digit = _bind$6._2;
      mantissa$2 = _new_mantissa;
      let _tmp$2;
      if (BigInt.asUintN(64, mantissa$2) >= BigInt.asUintN(64, _M0FPC28internal7strconv17min__19digit__int)) {
        _tmp$2 = _consumed_digit;
      } else {
        if (_M0MPC16string6String24char__length__ge_2einner(_s$2.str, 1, _s$2.start, _s$2.end)) {
          const _tmp$3 = _s$2.str;
          const _bind$7 = _M0MPC16string6String29offset__of__nth__char_2einner(_s$2.str, 1, _s$2.start, _s$2.end);
          let _tmp$4;
          if (_bind$7 === undefined) {
            _tmp$4 = _s$2.end;
          } else {
            const _Some = _bind$7;
            _tmp$4 = _Some;
          }
          const _x = new _M0TPC16string10StringView(_tmp$3, _tmp$4, _s$2.end);
          const _bind$8 = _M0FPC28internal7strconv20try__parse__19digits(_x, mantissa$2);
          const _new_mantissa$2 = _bind$8._1;
          const _consumed_digit$2 = _bind$8._2;
          mantissa$2 = _new_mantissa$2;
          _tmp$2 = _consumed_digit$2;
        } else {
          return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
        }
      }
      exponent = BigInt.asUintN(64, BigInt(_tmp$2));
      exponent = BigInt.asUintN(64, exponent + _M0FPC28internal7strconv13parse__numberN11exp__numberS291);
    }
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(new _M0TPC28internal7strconv6Number(exponent, mantissa$2, negative, many_digits));
  } else {
    return _M0FPC28internal7strconv11syntax__errGORPC28internal7strconv6NumberE();
  }
}
function _M0FPC28internal7strconv15parse__inf__nan(rest) {
  let pos;
  let rest$2;
  _L: {
    let rest$3;
    _L$2: {
      if ((rest.end - rest.start | 0) >= 1) {
        const _x = rest.str.charCodeAt(rest.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(rest.str, rest.start + 1 | 0, rest.end);
            pos = false;
            rest$2 = _x$2;
            break _L;
          }
          case 43: {
            const _x$3 = new _M0TPC16string10StringView(rest.str, rest.start + 1 | 0, rest.end);
            rest$3 = _x$3;
            break _L$2;
          }
          default: {
            rest$3 = rest;
            break _L$2;
          }
        }
      } else {
        rest$3 = rest;
        break _L$2;
      }
    }
    pos = true;
    rest$2 = rest$3;
    break _L;
  }
  let _cursor_251 = 0;
  const _input_end_253 = rest$2.end - rest$2.start | 0;
  const _start_252 = _cursor_251;
  let _accept_state_254 = -1;
  let _match_end_255 = -1;
  let _state_256 = 2;
  while (true) {
    if (_state_256 !== 14) {
      if (_state_256 < 2) {
        _accept_state_254 = _state_256;
        _match_end_255 = _cursor_251;
      }
      const _tmp = Math.imul(_state_256, 8) | 0;
      let _next_char_259;
      if (_cursor_251 < _input_end_253) {
        const _char_258 = rest$2.str.charCodeAt(rest$2.start + _cursor_251 | 0);
        _cursor_251 = _cursor_251 + 1 | 0;
        _next_char_259 = _char_258;
      } else {
        _next_char_259 = -1;
      }
      const _p = _tmp + (_next_char_259 < 90 ? (_next_char_259 < 73 ? (_next_char_259 < 66 ? (_next_char_259 < 0 ? 0 : _next_char_259 > 64 ? 1 : 7) : _next_char_259 > 69 ? (_next_char_259 < 71 ? 2 : 7) : 7) : _next_char_259 > 73 ? (_next_char_259 < 84 ? (_next_char_259 < 78 ? 7 : _next_char_259 > 78 ? 7 : 4) : _next_char_259 > 84 ? (_next_char_259 < 89 ? 7 : 6) : 5) : 3) : _next_char_259 > 96 ? (_next_char_259 < 110 ? (_next_char_259 < 103 ? (_next_char_259 < 98 ? 1 : _next_char_259 > 101 ? 2 : 7) : _next_char_259 > 104 ? (_next_char_259 < 106 ? 3 : 7) : 7) : _next_char_259 > 110 ? (_next_char_259 < 117 ? (_next_char_259 < 116 ? 7 : 5) : _next_char_259 > 120 ? (_next_char_259 < 122 ? 6 : 7) : 7) : 4) : 7) | 0;
      _state_256 = _M0FPC28internal7strconv15parse__inf__nanN25_2atransition__table__260S268[_p];
      continue;
    } else {
      break;
    }
  }
  const _bind$3 = _accept_state_254;
  switch (_bind$3) {
    case 0: {
      _cursor_251 = _match_end_255;
      return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double14not__a__number);
    }
    case 1: {
      _cursor_251 = _match_end_255;
      return pos ? new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double8infinity) : new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double13neg__infinity);
    }
    default: {
      _cursor_251 = _start_252;
      return _M0FPC28internal7strconv11syntax__errGdE();
    }
  }
}
function _M0FPC28internal7strconv12checked__mul(a, b) {
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 0n) || BigInt.asUintN(64, b) === BigInt.asUintN(64, 0n)) {
    return _M0FPC28internal7strconv12checked__mulN6constrS1083;
  }
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 1n)) {
    return b;
  }
  if (BigInt.asUintN(64, b) === BigInt.asUintN(64, 1n)) {
    return a;
  }
  if ($i64_clz(b) === 0 || $i64_clz(a) === 0) {
    return undefined;
  }
  if (b === 0n) {
    $panic();
  }
  const quotient = BigInt.asUintN(64, BigInt.asUintN(64, 18446744073709551615n) / BigInt.asUintN(64, b));
  if (BigInt.asUintN(64, a) > BigInt.asUintN(64, quotient)) {
    return undefined;
  }
  return BigInt.asUintN(64, a * b);
}
function _M0FPC28internal7strconv17check__underscore(str) {
  if (_M0MPC16string10StringView20contains__code__unit(str, 95)) {
    let rest;
    if ((str.end - str.start | 0) >= 1) {
      const _x = str.str.charCodeAt(str.start);
      switch (_x) {
        case 43: {
          const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          rest = _x$2;
          break;
        }
        case 45: {
          const _x$3 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          rest = _x$3;
          break;
        }
        default: {
          rest = str;
        }
      }
    } else {
      rest = str;
    }
    let rest$2;
    let allow_underscore;
    let hex;
    _L: {
      let _cursor_169 = 0;
      const _input_end_171 = rest.end - rest.start | 0;
      const _start_170 = _cursor_169;
      let _accept_state_172 = -1;
      let _match_end_173 = -1;
      let _state_174 = 3;
      while (true) {
        if (_state_174 !== 5) {
          if (_state_174 < 3) {
            _accept_state_172 = _state_174;
            _match_end_173 = _cursor_169;
          }
          const _tmp = Math.imul(_state_174, 5) | 0;
          let _next_char_177;
          if (_cursor_169 < _input_end_171) {
            const _char_176 = rest.str.charCodeAt(rest.start + _cursor_169 | 0);
            _cursor_169 = _cursor_169 + 1 | 0;
            _next_char_177 = _char_176;
          } else {
            _next_char_177 = -1;
          }
          const _p = _tmp + (_next_char_177 < 88 ? (_next_char_177 < 66 ? (_next_char_177 < 48 ? 4 : _next_char_177 > 48 ? 4 : 0) : _next_char_177 > 66 ? (_next_char_177 < 79 ? 4 : _next_char_177 > 79 ? 4 : 2) : 1) : _next_char_177 > 88 ? (_next_char_177 < 111 ? (_next_char_177 < 98 ? 4 : _next_char_177 > 98 ? 4 : 1) : _next_char_177 > 111 ? (_next_char_177 < 120 ? 4 : _next_char_177 > 120 ? 4 : 3) : 2) : 3) | 0;
          _state_174 = _M0FPC28internal7strconv17check__underscoreN25_2atransition__table__178S186[_p];
          continue;
        } else {
          break;
        }
      }
      const _bind$3 = _accept_state_172;
      switch (_bind$3) {
        case 0: {
          _cursor_169 = _match_end_173;
          const rest$3 = _M0MPC16string10StringView12view_2einner(rest, _match_end_173, _input_end_171);
          rest$2 = rest$3;
          allow_underscore = true;
          hex = false;
          break _L;
        }
        case 1: {
          _cursor_169 = _match_end_173;
          const rest$4 = _M0MPC16string10StringView12view_2einner(rest, _match_end_173, _input_end_171);
          rest$2 = rest$4;
          allow_underscore = true;
          hex = false;
          break _L;
        }
        case 2: {
          _cursor_169 = _match_end_173;
          const rest$5 = _M0MPC16string10StringView12view_2einner(rest, _match_end_173, _input_end_171);
          rest$2 = rest$5;
          allow_underscore = true;
          hex = true;
          break _L;
        }
        default: {
          _cursor_169 = _start_170;
          rest$2 = rest;
          allow_underscore = false;
          hex = false;
          break _L;
        }
      }
    }
    let _tmp = rest$2;
    let _tmp$2 = allow_underscore;
    let _tmp$3 = false;
    while (true) {
      const rest$3 = _tmp;
      const allow_underscore$2 = _tmp$2;
      const follow_underscore = _tmp$3;
      let rest$4;
      _L$2: {
        _L$3: {
          let rest$5;
          _L$4: {
            _L$5: {
              let rest$6;
              _L$6: {
                let rest$7;
                _L$7: {
                  if ((rest$3.end - rest$3.start | 0) === 0) {
                    return true;
                  } else {
                    if ((rest$3.end - rest$3.start | 0) === 1) {
                      const _x = rest$3.str.charCodeAt(rest$3.start);
                      if (_x === 95) {
                        return false;
                      } else {
                        if (_x >= 48 && _x <= 57) {
                          const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                          rest$7 = _x$2;
                          break _L$7;
                        } else {
                          if (_x >= 97 && _x <= 102) {
                            const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                            if (hex) {
                              rest$6 = _x$2;
                              break _L$6;
                            } else {
                              if (_x === 101) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  rest$5 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (follow_underscore === true) {
                                  break _L$3;
                                } else {
                                  rest$4 = _x$2;
                                  break _L$2;
                                }
                              }
                            }
                          } else {
                            if (_x >= 65 && _x <= 70) {
                              const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                              if (hex) {
                                rest$6 = _x$2;
                                break _L$6;
                              } else {
                                if (_x === 69) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    rest$5 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (follow_underscore === true) {
                                    break _L$3;
                                  } else {
                                    rest$4 = _x$2;
                                    break _L$2;
                                  }
                                }
                              }
                            } else {
                              if (_x === 46) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                                  rest$5 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (_x === 43) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                                    rest$5 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (_x === 45) {
                                    if (follow_underscore === true) {
                                      break _L$5;
                                    } else {
                                      const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                                      rest$5 = _x$2;
                                      break _L$4;
                                    }
                                  } else {
                                    if (follow_underscore === true) {
                                      break _L$3;
                                    } else {
                                      const _tmp$4 = rest$3.str;
                                      const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(rest$3.str, 1, rest$3.start, rest$3.end);
                                      let _tmp$5;
                                      if (_bind$3 === undefined) {
                                        _tmp$5 = rest$3.end;
                                      } else {
                                        const _Some = _bind$3;
                                        _tmp$5 = _Some;
                                      }
                                      const _x$2 = new _M0TPC16string10StringView(_tmp$4, _tmp$5, rest$3.end);
                                      rest$4 = _x$2;
                                      break _L$2;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } else {
                      const _x = rest$3.str.charCodeAt(rest$3.start);
                      if (_x === 95) {
                        if (allow_underscore$2 === false) {
                          return false;
                        } else {
                          const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                          _tmp = _x$2;
                          _tmp$2 = false;
                          _tmp$3 = true;
                          continue;
                        }
                      } else {
                        if (_x >= 48 && _x <= 57) {
                          const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                          rest$7 = _x$2;
                          break _L$7;
                        } else {
                          if (_x >= 97 && _x <= 102) {
                            const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                            if (hex) {
                              rest$6 = _x$2;
                              break _L$6;
                            } else {
                              if (_x === 101) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  rest$5 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (follow_underscore === true) {
                                  break _L$3;
                                } else {
                                  rest$4 = _x$2;
                                  break _L$2;
                                }
                              }
                            }
                          } else {
                            if (_x >= 65 && _x <= 70) {
                              const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                              if (hex) {
                                rest$6 = _x$2;
                                break _L$6;
                              } else {
                                if (_x === 69) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    rest$5 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (follow_underscore === true) {
                                    break _L$3;
                                  } else {
                                    rest$4 = _x$2;
                                    break _L$2;
                                  }
                                }
                              }
                            } else {
                              if (_x === 46) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                                  rest$5 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (_x === 43) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                                    rest$5 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (_x === 45) {
                                    if (follow_underscore === true) {
                                      break _L$5;
                                    } else {
                                      const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                                      rest$5 = _x$2;
                                      break _L$4;
                                    }
                                  } else {
                                    if (follow_underscore === true) {
                                      break _L$3;
                                    } else {
                                      const _tmp$4 = rest$3.str;
                                      const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(rest$3.str, 1, rest$3.start, rest$3.end);
                                      let _tmp$5;
                                      if (_bind$3 === undefined) {
                                        _tmp$5 = rest$3.end;
                                      } else {
                                        const _Some = _bind$3;
                                        _tmp$5 = _Some;
                                      }
                                      const _x$2 = new _M0TPC16string10StringView(_tmp$4, _tmp$5, rest$3.end);
                                      rest$4 = _x$2;
                                      break _L$2;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                _tmp = rest$7;
                _tmp$2 = true;
                _tmp$3 = false;
                continue;
              }
              _tmp = rest$6;
              _tmp$2 = true;
              _tmp$3 = false;
              continue;
            }
            return false;
          }
          _tmp = rest$5;
          _tmp$2 = false;
          _tmp$3 = false;
          continue;
        }
        return false;
      }
      _tmp = rest$4;
      _tmp$2 = false;
      _tmp$3 = false;
      continue;
    }
  } else {
    return true;
  }
}
function _M0MPC28internal7strconv7Decimal9new__priv() {
  return new _M0TPC28internal7strconv7Decimal($makebytes(800, 0), 0, 0, false, false);
}
function _M0MPC28internal7strconv7Decimal4trim(self) {
  while (true) {
    let _tmp;
    if (self.digits_num > 0) {
      const _tmp$2 = self.digits;
      const _tmp$3 = self.digits_num - 1 | 0;
      $bound_check(_tmp$2, _tmp$3);
      const _p = _tmp$2[_tmp$3];
      const _p$2 = 0;
      _tmp = _p === _p$2;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      self.digits_num = self.digits_num - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (self.digits_num === 0) {
    self.decimal_point = 0;
    return;
  } else {
    return;
  }
}
function _M0FPC28internal7strconv26parse__decimal__from__view(str) {
  const d = _M0MPC28internal7strconv7Decimal9new__priv();
  let has_dp = false;
  let has_digits = false;
  let rest;
  _L: {
    _L$2: {
      if ((str.end - str.start | 0) >= 1) {
        const _x = str.str.charCodeAt(str.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            d.negative = true;
            rest = _x$2;
            break;
          }
          case 43: {
            rest = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            break;
          }
          default: {
            break _L$2;
          }
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    rest = str;
  }
  let rest$2;
  let _tmp = rest;
  while (true) {
    const rest$3 = _tmp;
    let rest$4;
    _L$2: {
      _L$3: {
        if ((rest$3.end - rest$3.start | 0) >= 1) {
          const _x = rest$3.str.charCodeAt(rest$3.start);
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
            _tmp = _x$2;
            continue;
          } else {
            if (_x === 46) {
              const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
              if (!has_dp) {
                has_dp = true;
                d.decimal_point = d.digits_num;
                _tmp = _x$2;
                continue;
              } else {
                const _bind$3 = _M0FPC28internal7strconv11syntax__errGuE();
                if (_bind$3.$tag === 1) {
                  const _ok = _bind$3;
                  _ok._0;
                } else {
                  return _bind$3;
                }
              }
            } else {
              if (_x >= 48 && _x <= 57) {
                const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                has_digits = true;
                if (_x === 48 && d.digits_num === 0) {
                  d.decimal_point = d.decimal_point - 1 | 0;
                  _tmp = _x$2;
                  continue;
                }
                if (d.digits_num < d.digits.length) {
                  const _tmp$2 = d.digits;
                  const _tmp$3 = d.digits_num;
                  $bound_check(_tmp$2, _tmp$3);
                  _tmp$2[_tmp$3] = (_x - 48 | 0) & 255;
                  d.digits_num = d.digits_num + 1 | 0;
                } else {
                  if (_x !== 48) {
                    d.truncated = true;
                  }
                }
                _tmp = _x$2;
                continue;
              } else {
                rest$4 = rest$3;
                break _L$3;
              }
            }
          }
        } else {
          rest$4 = rest$3;
          break _L$3;
        }
        break _L$2;
      }
      rest$2 = rest$4;
      break;
    }
    continue;
  }
  if (has_digits) {
    if (!has_dp) {
      d.decimal_point = d.digits_num;
    }
    let rest$3;
    let rest$4;
    _L$2: {
      _L$3: {
        if ((rest$2.end - rest$2.start | 0) >= 1) {
          const _x = rest$2.str.charCodeAt(rest$2.start);
          switch (_x) {
            case 101: {
              const _x$2 = new _M0TPC16string10StringView(rest$2.str, rest$2.start + 1 | 0, rest$2.end);
              rest$4 = _x$2;
              break _L$3;
            }
            case 69: {
              const _x$3 = new _M0TPC16string10StringView(rest$2.str, rest$2.start + 1 | 0, rest$2.end);
              rest$4 = _x$3;
              break _L$3;
            }
            default: {
              rest$3 = rest$2;
            }
          }
        } else {
          rest$3 = rest$2;
        }
        break _L$2;
      }
      let exp_sign = 1;
      let rest$5;
      if ((rest$4.end - rest$4.start | 0) >= 1) {
        const _x = rest$4.str.charCodeAt(rest$4.start);
        switch (_x) {
          case 43: {
            rest$5 = new _M0TPC16string10StringView(rest$4.str, rest$4.start + 1 | 0, rest$4.end);
            break;
          }
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(rest$4.str, rest$4.start + 1 | 0, rest$4.end);
            exp_sign = -1;
            rest$5 = _x$2;
            break;
          }
          default: {
            rest$5 = rest$4;
          }
        }
      } else {
        rest$5 = rest$4;
      }
      _L$4: {
        _L$5: {
          if ((rest$5.end - rest$5.start | 0) >= 1) {
            const _x = rest$5.str.charCodeAt(rest$5.start);
            if (_x >= 48 && _x <= 57) {
              const exp_limit = exp_sign > 0 ? (d.decimal_point < 311 ? 311 - d.decimal_point | 0 : 0) : d.decimal_point > -331 ? d.decimal_point + 331 | 0 : 0;
              let exp = 0;
              let rest$6;
              let _tmp$2 = rest$5;
              while (true) {
                const rest$7 = _tmp$2;
                let rest$8;
                _L$6: {
                  if ((rest$7.end - rest$7.start | 0) >= 1) {
                    const _x$2 = rest$7.str.charCodeAt(rest$7.start);
                    if (_x$2 === 95) {
                      const _x$3 = new _M0TPC16string10StringView(rest$7.str, rest$7.start + 1 | 0, rest$7.end);
                      _tmp$2 = _x$3;
                      continue;
                    } else {
                      if (_x$2 >= 48 && _x$2 <= 57) {
                        const _x$3 = new _M0TPC16string10StringView(rest$7.str, rest$7.start + 1 | 0, rest$7.end);
                        if (exp < exp_limit) {
                          exp = (Math.imul(exp, 10) | 0) + (_x$2 - 48 | 0) | 0;
                          if (exp > exp_limit) {
                            exp = exp_limit;
                          }
                        }
                        _tmp$2 = _x$3;
                        continue;
                      } else {
                        rest$8 = rest$7;
                        break _L$6;
                      }
                    }
                  } else {
                    rest$8 = rest$7;
                    break _L$6;
                  }
                }
                rest$6 = rest$8;
                break;
              }
              d.decimal_point = d.decimal_point + (Math.imul(exp_sign, exp) | 0) | 0;
              rest$3 = rest$6;
            } else {
              break _L$5;
            }
          } else {
            break _L$5;
          }
          break _L$4;
        }
        const _bind$3 = _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE();
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          rest$3 = _ok._0;
        } else {
          return _bind$3;
        }
      }
    }
    if ((rest$3.end - rest$3.start | 0) === 0) {
      _M0MPC28internal7strconv7Decimal4trim(d);
      return new _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok(d);
    } else {
      return _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE();
  }
}
function _M0FPC28internal7strconv20parse__decimal__priv(str) {
  return _M0FPC28internal7strconv26parse__decimal__from__view(str);
}
function _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, negative) {
  const biased_exp = exponent - _M0FPC28internal7strconv12double__info.bias | 0;
  let bits = BigInt.asUintN(64, mantissa & BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)) - 1n));
  const exp_bits = BigInt.asUintN(64, BigInt(biased_exp & ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)));
  bits = BigInt.asUintN(64, bits | BigInt.asUintN(64, exp_bits << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)));
  if (negative) {
    bits = BigInt.asUintN(64, bits | BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)) << BigInt(_M0FPC28internal7strconv12double__info.exponent_bits & 63)));
  }
  return bits;
}
function _M0MPC28internal7strconv7Decimal17should__round__up(self, d) {
  if (d < 0 || d >= self.digits_num) {
    return false;
  }
  let _tmp;
  const _tmp$2 = self.digits;
  $bound_check(_tmp$2, d);
  if (_tmp$2[d] === 5) {
    _tmp = (d + 1 | 0) === self.digits_num;
  } else {
    _tmp = false;
  }
  if (_tmp) {
    if (self.truncated) {
      return true;
    }
    let _tmp$3;
    if (d > 0) {
      const _tmp$4 = self.digits;
      const _tmp$5 = d - 1 | 0;
      $bound_check(_tmp$4, _tmp$5);
      _tmp$3 = (_tmp$4[_tmp$5] % 2 | 0) !== 0;
    } else {
      _tmp$3 = false;
    }
    return _tmp$3;
  }
  const _tmp$3 = self.digits;
  $bound_check(_tmp$3, d);
  return _tmp$3[d] >= 5;
}
function _M0MPC28internal7strconv7Decimal16rounded__integer(self) {
  if (self.decimal_point > 20) {
    return 18446744073709551615n;
  }
  let _tmp = 0n;
  let _tmp$2 = 0;
  while (true) {
    const n = _tmp;
    const i = _tmp$2;
    if (i < self.decimal_point && i < self.digits_num) {
      const _tmp$3 = BigInt.asUintN(64, n * 10n);
      const _tmp$4 = self.digits;
      $bound_check(_tmp$4, i);
      const _p = _tmp$4[i];
      _tmp = BigInt.asUintN(64, _tmp$3 + BigInt.asUintN(64, BigInt(_p)));
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      let n$2;
      let _tmp$3 = n;
      let _tmp$4 = i;
      while (true) {
        const n$3 = _tmp$3;
        const i$2 = _tmp$4;
        if (i$2 < self.decimal_point) {
          _tmp$3 = BigInt.asUintN(64, n$3 * 10n);
          _tmp$4 = i$2 + 1 | 0;
          continue;
        } else {
          n$2 = n$3;
          break;
        }
      }
      return _M0MPC28internal7strconv7Decimal17should__round__up(self, self.decimal_point) ? BigInt.asUintN(64, n$2 + 1n) : n$2;
    }
  }
}
function _M0MPC28internal7strconv7Decimal11new__digits(self, s) {
  $bound_check(_M0FPC28internal7strconv19left__shift__cheats, s);
  const new_digits = _M0FPC28internal7strconv19left__shift__cheats[s]._0;
  $bound_check(_M0FPC28internal7strconv19left__shift__cheats, s);
  const cheat_num = _M0FPC28internal7strconv19left__shift__cheats[s]._1;
  const _bind$3 = cheat_num.length;
  let less;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$3) {
      const code_unit = cheat_num.charCodeAt(i);
      if (i >= self.digits_num) {
        less = true;
        break;
      }
      const d = code_unit - 48 | 0;
      const _tmp$2 = self.digits;
      $bound_check(_tmp$2, i);
      if (_tmp$2[i] !== d) {
        const _tmp$3 = self.digits;
        $bound_check(_tmp$3, i);
        less = _tmp$3[i] < d;
        break;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      less = false;
      break;
    }
  }
  return less ? new_digits - 1 | 0 : new_digits;
}
function _M0MPC28internal7strconv7Decimal11left__shift(self, s) {
  const new_digits = _M0MPC28internal7strconv7Decimal11new__digits(self, s);
  let read_index = self.digits_num;
  let write_index = self.digits_num + new_digits | 0;
  let acc = 0n;
  read_index = read_index - 1 | 0;
  while (true) {
    if (read_index >= 0) {
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      $bound_check(_tmp, _tmp$2);
      const _p = _tmp[_tmp$2];
      const d = BigInt.asUintN(64, BigInt(_p));
      acc = BigInt.asUintN(64, acc + BigInt.asUintN(64, d << BigInt(s & 63)));
      if (10n === 0n) {
        $panic();
      }
      const quo = BigInt.asUintN(64, BigInt.asIntN(64, acc) / BigInt.asIntN(64, 10n));
      const rem = Number(BigInt.asIntN(32, BigInt.asUintN(64, acc - BigInt.asUintN(64, quo * 10n)))) | 0;
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp$3 = self.digits;
        const _tmp$4 = write_index;
        $bound_check(_tmp$3, _tmp$4);
        _tmp$3[_tmp$4] = rem & 255;
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      read_index = read_index - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (BigInt.asIntN(64, acc) > BigInt.asIntN(64, 0n)) {
      if (10n === 0n) {
        $panic();
      }
      const quo = BigInt.asUintN(64, BigInt.asIntN(64, acc) / BigInt.asIntN(64, 10n));
      const rem = Number(BigInt.asIntN(32, BigInt.asUintN(64, acc - BigInt.asUintN(64, 10n * quo)))) | 0;
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        $bound_check(_tmp, _tmp$2);
        _tmp[_tmp$2] = rem & 255;
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      continue;
    } else {
      break;
    }
  }
  self.digits_num = self.digits_num + new_digits | 0;
  if (self.digits_num > self.digits.length) {
    self.digits_num = self.digits.length;
  }
  self.decimal_point = self.decimal_point + new_digits | 0;
  _M0MPC28internal7strconv7Decimal4trim(self);
}
function _M0MPC28internal7strconv7Decimal12right__shift(self, s) {
  let read_index = 0;
  let write_index = 0;
  let acc = 0n;
  while (true) {
    if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63))) === BigInt.asUintN(64, 0n)) {
      if (read_index >= self.digits_num) {
        while (true) {
          if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63))) === BigInt.asUintN(64, 0n)) {
            acc = BigInt.asUintN(64, acc * 10n);
            read_index = read_index + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        break;
      }
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      $bound_check(_tmp, _tmp$2);
      const d = _tmp[_tmp$2];
      acc = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + BigInt.asUintN(64, BigInt(d)));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.decimal_point = self.decimal_point - (read_index - 1 | 0) | 0;
  const mask = BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(s & 63)) - 1n);
  while (true) {
    if (read_index < self.digits_num) {
      const out = BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63));
      const _tmp = self.digits;
      const _tmp$2 = write_index;
      $bound_check(_tmp, _tmp$2);
      _tmp[_tmp$2] = (Number(BigInt.asIntN(32, out)) | 0) & 255;
      write_index = write_index + 1 | 0;
      acc = BigInt.asUintN(64, acc & mask);
      const _tmp$3 = self.digits;
      const _tmp$4 = read_index;
      $bound_check(_tmp$3, _tmp$4);
      const d = _tmp$3[_tmp$4];
      acc = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + BigInt.asUintN(64, BigInt(d)));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (BigInt.asUintN(64, acc) > BigInt.asUintN(64, 0n)) {
      const out = BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63));
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        $bound_check(_tmp, _tmp$2);
        _tmp[_tmp$2] = (Number(BigInt.asIntN(32, out)) | 0) & 255;
        write_index = write_index + 1 | 0;
      } else {
        if (BigInt.asUintN(64, out) > BigInt.asUintN(64, 0n)) {
          self.truncated = true;
        }
      }
      acc = BigInt.asUintN(64, acc & mask);
      acc = BigInt.asUintN(64, acc * 10n);
      continue;
    } else {
      break;
    }
  }
  self.digits_num = write_index;
  _M0MPC28internal7strconv7Decimal4trim(self);
}
function _M0MPC28internal7strconv7Decimal11shift__priv(self, s) {
  if (self.digits_num === 0) {
    return undefined;
  }
  let s$2 = s;
  if (s$2 > 0) {
    while (true) {
      if (s$2 > 59) {
        _M0MPC28internal7strconv7Decimal11left__shift(self, 59);
        s$2 = s$2 - 59 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC28internal7strconv7Decimal11left__shift(self, s$2);
  }
  if (s$2 < 0) {
    while (true) {
      if (s$2 < -59) {
        _M0MPC28internal7strconv7Decimal12right__shift(self, 59);
        s$2 = s$2 + 59 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC28internal7strconv7Decimal12right__shift(self, -s$2 | 0);
    return;
  } else {
    return;
  }
}
function _M0MPC28internal7strconv7Decimal16to__double__priv(self) {
  let exponent = 0;
  let mantissa = 0n;
  if (self.digits_num === 0 || self.decimal_point < -330) {
    mantissa = 0n;
    exponent = _M0FPC28internal7strconv12double__info.bias;
    const bits = _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, self.negative);
    return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok($i64_reinterpret_f64(bits));
  }
  if (self.decimal_point > 310) {
    const _bind$3 = _M0FPC28internal7strconv10range__errGuE();
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _ok._0;
    } else {
      return _bind$3;
    }
  }
  while (true) {
    if (self.decimal_point > 0) {
      let n = 0;
      if (self.decimal_point >= _M0FPC28internal7strconv6powtab.length) {
        n = 60;
      } else {
        const _p = self.decimal_point;
        $bound_check(_M0FPC28internal7strconv6powtab, _p);
        n = _M0FPC28internal7strconv6powtab[_p];
      }
      _M0MPC28internal7strconv7Decimal11shift__priv(self, -n | 0);
      exponent = exponent + n | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    let _tmp;
    if (self.decimal_point < 0) {
      _tmp = true;
    } else {
      let _tmp$2;
      if (self.decimal_point === 0) {
        const _tmp$3 = self.digits;
        $bound_check(_tmp$3, 0);
        _tmp$2 = _tmp$3[0] < 5;
      } else {
        _tmp$2 = false;
      }
      _tmp = _tmp$2;
    }
    if (_tmp) {
      let n = 0;
      if ((-self.decimal_point | 0) >= _M0FPC28internal7strconv6powtab.length) {
        n = 60;
      } else {
        const _p = -self.decimal_point | 0;
        $bound_check(_M0FPC28internal7strconv6powtab, _p);
        n = _M0FPC28internal7strconv6powtab[_p];
      }
      _M0MPC28internal7strconv7Decimal11shift__priv(self, n);
      exponent = exponent - n | 0;
      continue;
    } else {
      break;
    }
  }
  exponent = exponent - 1 | 0;
  if (exponent < (_M0FPC28internal7strconv12double__info.bias + 1 | 0)) {
    const n = (_M0FPC28internal7strconv12double__info.bias + 1 | 0) - exponent | 0;
    _M0MPC28internal7strconv7Decimal11shift__priv(self, -n | 0);
    exponent = exponent + n | 0;
  }
  if ((exponent - _M0FPC28internal7strconv12double__info.bias | 0) >= ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)) {
    const _bind$3 = _M0FPC28internal7strconv10range__errGuE();
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _ok._0;
    } else {
      return _bind$3;
    }
  }
  _M0MPC28internal7strconv7Decimal11shift__priv(self, _M0FPC28internal7strconv12double__info.mantissa_bits + 1 | 0);
  mantissa = _M0MPC28internal7strconv7Decimal16rounded__integer(self);
  if (BigInt.asUintN(64, mantissa) === BigInt.asUintN(64, BigInt.asUintN(64, 2n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)))) {
    mantissa = BigInt.asUintN(64, BigInt.asIntN(64, mantissa) >> BigInt(1 & 63));
    exponent = exponent + 1 | 0;
    if ((exponent - _M0FPC28internal7strconv12double__info.bias | 0) >= ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)) {
      const _bind$3 = _M0FPC28internal7strconv10range__errGuE();
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _ok._0;
      } else {
        return _bind$3;
      }
    }
  }
  if (BigInt.asUintN(64, BigInt.asUintN(64, mantissa & BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)))) === BigInt.asUintN(64, 0n)) {
    exponent = _M0FPC28internal7strconv12double__info.bias;
  }
  const bits = _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, self.negative);
  return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok($i64_reinterpret_f64(bits));
}
function _M0FPC28internal7strconv17pow10__fast__path(exponent) {
  const _p = exponent & 31;
  $bound_check(_M0FPC28internal7strconv5table, _p);
  return _M0FPC28internal7strconv5table[_p];
}
function _M0MPC28internal7strconv6Number14is__fast__path(self) {
  return BigInt.asIntN(64, _M0FPC28internal7strconv25min__exponent__fast__path) <= BigInt.asIntN(64, self.exponent) && (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, _M0FPC28internal7strconv36max__exponent__disguised__fast__path) && (BigInt.asUintN(64, self.mantissa) <= BigInt.asUintN(64, _M0FPC28internal7strconv25max__mantissa__fast__path) && !self.many_digits));
}
function _M0MPC28internal7strconv6Number15try__fast__path(self) {
  if (_M0MPC28internal7strconv6Number14is__fast__path(self)) {
    let value;
    if (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, _M0FPC28internal7strconv25max__exponent__fast__path)) {
      const value$2 = $f64_convert_i64_u(BigInt.asUintN(64, self.mantissa));
      value = BigInt.asIntN(64, self.exponent) < BigInt.asIntN(64, 0n) ? value$2 / _M0FPC28internal7strconv17pow10__fast__path(-(Number(BigInt.asIntN(32, self.exponent)) | 0) | 0) : value$2 * _M0FPC28internal7strconv17pow10__fast__path(Number(BigInt.asIntN(32, self.exponent)) | 0);
    } else {
      const shift = BigInt.asUintN(64, self.exponent - _M0FPC28internal7strconv25max__exponent__fast__path);
      const _tmp = self.mantissa;
      const _p = Number(BigInt.asIntN(32, shift)) | 0;
      $bound_check(_M0FPC28internal7strconv10int__pow10, _p);
      const _bind$3 = _M0FPC28internal7strconv12checked__mul(_tmp, _M0FPC28internal7strconv10int__pow10[_p]);
      let mantissa;
      if (_bind$3 === undefined) {
        return _M0DTPC16option6OptionGdE4None__;
      } else {
        const _Some = _bind$3;
        mantissa = _Some;
      }
      if (BigInt.asUintN(64, mantissa) > BigInt.asUintN(64, _M0FPC28internal7strconv25max__mantissa__fast__path)) {
        return _M0DTPC16option6OptionGdE4None__;
      }
      value = $f64_convert_i64_u(BigInt.asUintN(64, mantissa)) * _M0FPC28internal7strconv17pow10__fast__path(Number(BigInt.asIntN(32, _M0FPC28internal7strconv25max__exponent__fast__path)) | 0);
    }
    if (self.negative) {
      value = -value;
    }
    return new _M0DTPC16option6OptionGdE4Some(value);
  } else {
    return _M0DTPC16option6OptionGdE4None__;
  }
}
function _M0FPC28internal7strconv13parse__double(str) {
  if ((str.end - str.start | 0) > 0) {
    if (_M0FPC28internal7strconv17check__underscore(str)) {
      const _bind$3 = _M0FPC28internal7strconv13parse__number(str);
      let _bind$4;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _bind$4 = _ok._0;
      } else {
        return _bind$3;
      }
      if (_bind$4 === undefined) {
        return _M0FPC28internal7strconv15parse__inf__nan(str);
      } else {
        const _Some = _bind$4;
        const _num = _Some;
        const _bind$5 = _M0MPC28internal7strconv6Number15try__fast__path(_num);
        if (_bind$5.$tag === 1) {
          const _Some$2 = _bind$5;
          const _value = _Some$2._0;
          return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_value);
        } else {
          const _bind$6 = _M0FPC28internal7strconv20parse__decimal__priv(str);
          let _tmp;
          if (_bind$6.$tag === 1) {
            const _ok = _bind$6;
            _tmp = _ok._0;
          } else {
            return _bind$6;
          }
          return _M0MPC28internal7strconv7Decimal16to__double__priv(_tmp);
        }
      }
    } else {
      return _M0FPC28internal7strconv11syntax__errGdE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGdE();
  }
}
function _M0FPC14json20offset__to__position(input, offset) {
  const _bind$3 = _M0MPC15array9ArrayView12view_2einnerGkE(_M0MPC16string10StringView11code__units(input), 0, offset);
  const _bind$4 = _bind$3.end - _bind$3.start | 0;
  let _tmp = 0;
  let _tmp$2 = 1;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp;
    const line = _tmp$2;
    const column = _tmp$3;
    if (_ < _bind$4) {
      const code_unit = _bind$3.buf[_bind$3.start + _ | 0];
      const _p = 10;
      if (code_unit === _p) {
        _tmp = _ + 1 | 0;
        _tmp$2 = line + 1 | 0;
        _tmp$3 = 0;
        continue;
      } else {
        _tmp = _ + 1 | 0;
        _tmp$3 = column + 1 | 0;
        continue;
      }
    } else {
      return new _M0TPC14json8Position(line, column);
    }
  }
}
function _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  const _p = _M0MPC16string10StringView9get__char(ctx.input, offset);
  const _p$2 = 65533;
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(new _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(_M0FPC14json20offset__to__position(ctx.input, offset), _p === -1 ? _p$2 : _p));
}
function _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  const _p = _M0MPC16string10StringView9get__char(ctx.input, offset);
  const _p$2 = 65533;
  return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(new _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(_M0FPC14json20offset__to__position(ctx.input, offset), _p === -1 ? _p$2 : _p));
}
function _M0MPC14json12ParseContext21invalid__char_2einnerGiE(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  const _p = _M0MPC16string10StringView9get__char(ctx.input, offset);
  const _p$2 = 65533;
  return new _M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err(new _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(_M0FPC14json20offset__to__position(ctx.input, offset), _p === -1 ? _p$2 : _p));
}
function _M0MPC14json12ParseContext21lex__skip__whitespace(ctx) {
  const end = ctx.end_offset;
  let _tmp;
  let _tmp$2 = ctx.offset;
  _L: while (true) {
    const offset = _tmp$2;
    if (offset >= end) {
      _tmp = offset;
      break;
    }
    _L$2: {
      const _bind$3 = ctx.input;
      const _bind$4 = _bind$3.str.charCodeAt(_bind$3.start + offset | 0);
      switch (_bind$4) {
        case 32: {
          break _L$2;
        }
        case 9: {
          break _L$2;
        }
        case 13: {
          break _L$2;
        }
        case 10: {
          break _L$2;
        }
        default: {
          _tmp = offset;
          break _L;
        }
      }
    }
    _tmp$2 = offset + 1 | 0;
    continue;
  }
  ctx.offset = _tmp;
}
function _M0MPC14json12ParseContext4make(input) {
  return new _M0TPC14json12ParseContext(0, input, input.end - input.start | 0);
}
function _M0MPC14json12ParseContext19expect__ascii__char(ctx, c) {
  if (ctx.offset < ctx.end_offset) {
    const _bind$3 = ctx.input;
    const c1 = _bind$3.str.charCodeAt(_bind$3.start + ctx.offset | 0);
    ctx.offset = ctx.offset + 1 | 0;
    return c !== c1 ? _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1) : new _M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok(undefined);
  } else {
    return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  }
}
function _M0FPC14json12checked__mul(a, b) {
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 0n) || BigInt.asUintN(64, b) === BigInt.asUintN(64, 0n)) {
    return _M0FPC14json12checked__mulN6constrS1776;
  }
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 1n)) {
    return b;
  }
  if (BigInt.asUintN(64, b) === BigInt.asUintN(64, 1n)) {
    return a;
  }
  if ($i64_clz(b) === 0 || $i64_clz(a) === 0) {
    return undefined;
  }
  if (b === 0n) {
    $panic();
  }
  const quotient = BigInt.asUintN(64, BigInt.asUintN(64, 18446744073709551615n) / BigInt.asUintN(64, b));
  return BigInt.asUintN(64, a) > BigInt.asUintN(64, quotient) ? undefined : BigInt.asUintN(64, a * b);
}
function _M0FPC14json23json__pow10__fast__path(exponent) {
  const _p = exponent & 31;
  $bound_check(_M0FPC14json12pow10__table, _p);
  return _M0FPC14json12pow10__table[_p];
}
function _M0MPC14json14JsonNumberScan17try__fast__double(self) {
  if (BigInt.asUintN(64, self.mantissa) === BigInt.asUintN(64, 0n)) {
    return self.negative ? -0 : 0;
  }
  if (self.many_digits || (BigInt.asIntN(64, self.exponent) < BigInt.asIntN(64, 18446744073709551594n) || (BigInt.asIntN(64, self.exponent) > BigInt.asIntN(64, 37n) || BigInt.asUintN(64, self.mantissa) > BigInt.asUintN(64, 9007199254740992n)))) {
    return _M0FPC16double14not__a__number;
  }
  let value;
  if (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, 22n)) {
    const value$2 = $f64_convert_i64_u(BigInt.asUintN(64, self.mantissa));
    value = BigInt.asIntN(64, self.exponent) < BigInt.asIntN(64, 0n) ? value$2 / _M0FPC14json23json__pow10__fast__path(-(Number(BigInt.asIntN(32, self.exponent)) | 0) | 0) : value$2 * _M0FPC14json23json__pow10__fast__path(Number(BigInt.asIntN(32, self.exponent)) | 0);
  } else {
    const shift = BigInt.asUintN(64, self.exponent - 22n);
    const _tmp = self.mantissa;
    const _p = Number(BigInt.asIntN(32, shift)) | 0;
    $bound_check(_M0FPC14json17int__pow10__table, _p);
    const _bind$3 = _M0FPC14json12checked__mul(_tmp, _M0FPC14json17int__pow10__table[_p]);
    let mantissa;
    if (_bind$3 === undefined) {
      return _M0FPC16double14not__a__number;
    } else {
      const _Some = _bind$3;
      mantissa = _Some;
    }
    if (BigInt.asUintN(64, mantissa) > BigInt.asUintN(64, 9007199254740992n)) {
      return _M0FPC16double14not__a__number;
    }
    value = $f64_convert_i64_u(BigInt.asUintN(64, mantissa)) * _M0FPC14json23json__pow10__fast__path(22);
  }
  return self.negative ? -value : value;
}
function _M0MPC14json12ParseContext17lex__integer__end(ctx, start, end) {
  const _bind$3 = ctx.input;
  const _p = _bind$3.str.charCodeAt(_bind$3.start + start | 0);
  const _p$2 = 45;
  const negative = _p === _p$2;
  const number_start = negative ? start + 1 | 0 : start;
  let _tmp = number_start;
  let _tmp$2 = 0n;
  while (true) {
    const i = _tmp;
    const acc = _tmp$2;
    if (i >= end) {
      const value = negative ? BigInt.asUintN(64, -acc) : acc;
      const _bind$4 = $f64_convert_i64(BigInt.asIntN(64, value));
      const _bind$5 = undefined;
      return new _M0TPC14json11LexedNumber(_bind$5, _bind$4);
    }
    const _bind$4 = ctx.input;
    const digit = BigInt.asUintN(64, BigInt(_bind$4.str.charCodeAt(_bind$4.start + i | 0) - 48 | 0));
    if (10n === 0n) {
      $panic();
    }
    if (BigInt.asIntN(64, acc) > BigInt.asIntN(64, BigInt.asUintN(64, BigInt.asIntN(64, BigInt.asUintN(64, 9007199254740991n - digit)) / BigInt.asIntN(64, 10n)))) {
      const s = _M0MPC16string10StringView12view_2einner(ctx.input, start, end);
      let _tmp$3;
      if (negative) {
        const _bind$5 = s;
        _tmp$3 = new _M0TPC14json11LexedNumber(_bind$5, _M0FPC16double13neg__infinity);
      } else {
        const _bind$5 = s;
        _tmp$3 = new _M0TPC14json11LexedNumber(_bind$5, _M0FPC16double8infinity);
      }
      return _tmp$3;
    }
    _tmp = i + 1 | 0;
    _tmp$2 = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + digit);
    continue;
  }
}
function _M0MPC14json12ParseContext18scan__json__number(ctx, start, end) {
  const _bind$3 = ctx.input;
  const _p = _bind$3.str.charCodeAt(_bind$3.start + start | 0);
  const _p$2 = 45;
  const negative = _p === _p$2;
  let has_decimal = false;
  let has_exponent = false;
  let exponent_negative = false;
  let exponent_part = 0n;
  let fractional_digits = 0;
  let mantissa = 0n;
  let significant_digits = 0;
  let seen_nonzero = false;
  let _tmp = negative ? start + 1 | 0 : start;
  while (true) {
    const i = _tmp;
    if (i < end) {
      _L: {
        _L$2: {
          const _bind$4 = ctx.input;
          const _bind$5 = _bind$4.str.charCodeAt(_bind$4.start + i | 0);
          if (_bind$5 >= 48 && _bind$5 <= 57) {
            const digit = _bind$5 - 48 | 0;
            if (has_exponent) {
              if (BigInt.asIntN(64, exponent_part) < BigInt.asIntN(64, 100000n)) {
                const next_exponent = BigInt.asUintN(64, BigInt.asUintN(64, exponent_part * 10n) + BigInt.asUintN(64, BigInt(digit)));
                exponent_part = BigInt.asIntN(64, next_exponent) > BigInt.asIntN(64, 100000n) ? 100000n : next_exponent;
              }
            } else {
              if (has_decimal) {
                fractional_digits = fractional_digits + 1 | 0;
              }
              if (digit !== 0 || seen_nonzero) {
                seen_nonzero = true;
                significant_digits = significant_digits + 1 | 0;
                if (significant_digits <= 19) {
                  mantissa = BigInt.asUintN(64, BigInt.asUintN(64, mantissa * 10n) + BigInt.asUintN(64, BigInt(digit >>> 0)));
                }
              }
            }
          } else {
            if (_bind$5 === 46) {
              has_decimal = true;
            } else {
              if (_bind$5 === 101) {
                break _L$2;
              } else {
                if (_bind$5 === 69) {
                  break _L$2;
                }
              }
            }
          }
          break _L;
        }
        has_exponent = true;
        if ((i + 1 | 0) < end) {
          const _bind$4 = ctx.input;
          const next = _bind$4.str.charCodeAt(_bind$4.start + (i + 1 | 0) | 0);
          const _p$3 = 45;
          if (next === _p$3) {
            exponent_negative = true;
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const exponent_part$2 = exponent_negative ? BigInt.asUintN(64, -exponent_part) : exponent_part;
  return new _M0TPC14json14JsonNumberScan(negative, !has_decimal && !has_exponent, mantissa, BigInt.asUintN(64, exponent_part$2 - BigInt.asUintN(64, BigInt(fractional_digits))), significant_digits > 19);
}
function _M0MPC14json12ParseContext16lex__number__end(ctx, start, end) {
  const scan = _M0MPC14json12ParseContext18scan__json__number(ctx, start, end);
  if (scan.is_integer) {
    if (!scan.many_digits && (BigInt.asUintN(64, scan.exponent) === BigInt.asUintN(64, 0n) && BigInt.asUintN(64, scan.mantissa) <= BigInt.asUintN(64, 9007199254740991n))) {
      const v = scan.mantissa;
      const signed = scan.negative ? BigInt.asUintN(64, -v) : v;
      const _bind$3 = $f64_convert_i64(BigInt.asIntN(64, signed));
      const _bind$4 = undefined;
      return new _M0TPC14json11LexedNumber(_bind$4, _bind$3);
    }
    return _M0MPC14json12ParseContext17lex__integer__end(ctx, start, end);
  }
  const fast = _M0MPC14json14JsonNumberScan17try__fast__double(scan);
  if (!(fast !== fast)) {
    const _bind$3 = undefined;
    return new _M0TPC14json11LexedNumber(_bind$3, fast);
  }
  const s = _M0MPC16string10StringView12view_2einner(ctx.input, start, end);
  let _try_err;
  _L: {
    const _bind$3 = _M0FPC28internal7strconv13parse__double(s);
    let d;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      d = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = undefined;
    return new _M0TPC14json11LexedNumber(_bind$4, d);
  }
  if (scan.negative) {
    const _bind$3 = s;
    return new _M0TPC14json11LexedNumber(_bind$3, _M0FPC16double13neg__infinity);
  } else {
    const _bind$3 = s;
    return new _M0TPC14json11LexedNumber(_bind$3, _M0FPC16double8infinity);
  }
}
function _M0MPC14json12ParseContext10read__char(ctx) {
  if (ctx.offset < ctx.end_offset) {
    const _bind$3 = ctx.input;
    const c1 = _bind$3.str.charCodeAt(_bind$3.start + ctx.offset | 0);
    ctx.offset = ctx.offset + 1 | 0;
    if (c1 >= 55296 && c1 <= 56319) {
      if (ctx.offset < ctx.end_offset) {
        const _bind$4 = ctx.input;
        const c2 = _bind$4.str.charCodeAt(_bind$4.start + ctx.offset | 0);
        if (c2 >= 56320 && c2 <= 57343) {
          ctx.offset = ctx.offset + 1 | 0;
          const c3 = ((c1 << 10) + c2 | 0) - 56613888 | 0;
          return c3;
        }
      }
    }
    return c1;
  } else {
    return -1;
  }
}
function _M0MPC14json12ParseContext31lex__decimal__exponent__integer(ctx, start) {
  while (true) {
    const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$3 === -1) {
      return _M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset);
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      if (_x >= 48 && _x <= 57) {
        continue;
      } else {
        ctx.offset = ctx.offset - 1 | 0;
        return _M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset);
      }
    }
  }
}
function _M0MPC14json12ParseContext28lex__decimal__exponent__sign(ctx, start) {
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    if (_x >= 48 && _x <= 57) {
      return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext31lex__decimal__exponent__integer(ctx, start));
    } else {
      ctx.offset = ctx.offset - 1 | 0;
      return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
    }
  }
}
function _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start) {
  _L: {
    const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$3 === -1) {
      return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      if (_x === 43) {
        break _L;
      } else {
        if (_x === 45) {
          break _L;
        } else {
          if (_x >= 48 && _x <= 57) {
            return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext31lex__decimal__exponent__integer(ctx, start));
          } else {
            ctx.offset = ctx.offset - 1 | 0;
            return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
          }
        }
      }
    }
  }
  const _bind$3 = _M0MPC14json12ParseContext28lex__decimal__exponent__sign(ctx, start);
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0MPC14json12ParseContext22lex__decimal__fraction(ctx, start) {
  while (true) {
    _L: {
      const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
      if (_bind$3 === -1) {
        return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        if (_x === 101) {
          break _L;
        } else {
          if (_x === 69) {
            break _L;
          } else {
            if (_x >= 48 && _x <= 57) {
              continue;
            } else {
              ctx.offset = ctx.offset - 1 | 0;
              return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
            }
          }
        }
      }
    }
    const _bind$3 = _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      return _bind$3;
    }
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
  }
}
function _M0MPC14json12ParseContext19lex__decimal__point(ctx, start) {
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    return _x >= 48 && _x <= 57 ? _M0MPC14json12ParseContext22lex__decimal__fraction(ctx, start) : _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
  }
}
function _M0MPC14json12ParseContext21lex__decimal__integer(ctx, start) {
  while (true) {
    _L: {
      const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
      if (_bind$3 === -1) {
        return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        if (_x === 46) {
          const _bind$4 = _M0MPC14json12ParseContext19lex__decimal__point(ctx, start);
          let _tmp;
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp = _ok._0;
          } else {
            return _bind$4;
          }
          return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
        } else {
          if (_x === 101) {
            break _L;
          } else {
            if (_x === 69) {
              break _L;
            } else {
              if (_x >= 48 && _x <= 57) {
                continue;
              } else {
                ctx.offset = ctx.offset - 1 | 0;
                return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
              }
            }
          }
        }
      }
    }
    const _bind$3 = _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      return _bind$3;
    }
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
  }
}
function _M0MPC14json12ParseContext16lex__hex__digits(ctx, n) {
  let _tmp;
  let _tmp$2 = 0;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$2;
    const r = _tmp$3;
    if (_ < n) {
      const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
      let d;
      if (_bind$3 === -1) {
        return new _M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        if (_x >= 48 && _x <= 57) {
          d = _x - 48 | 0;
        } else {
          if (_x >= 65 && _x <= 70) {
            d = (_x - 65 | 0) + 10 | 0;
          } else {
            if (_x >= 97 && _x <= 102) {
              d = (_x - 97 | 0) + 10 | 0;
            } else {
              const _bind$4 = _M0MPC14json12ParseContext21invalid__char_2einnerGiE(ctx, -1);
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                d = _ok._0;
              } else {
                return _bind$4;
              }
            }
          }
        }
      }
      _tmp$2 = _ + 1 | 0;
      _tmp$3 = r << 4 | d;
      continue;
    } else {
      _tmp = r;
      break;
    }
  }
  return new _M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0MPC14json12ParseContext17lex__string__slowN5flushS317(_env, end) {
  const start = _env._2;
  const ctx = _env._1;
  const buf = _env._0;
  if (start.val > 0 && end > start.val) {
    _M0IPB13StringBuilderPB6Logger11write__view(buf, _M0MPC16string10StringView11sub_2einner(ctx.input, start.val, end));
    return;
  } else {
    return;
  }
}
function _M0MPC14json12ParseContext17lex__string__slow(ctx) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const start = new _M0TPB8MutLocalGiE(ctx.offset);
  const _env = { _0: buf, _1: ctx, _2: start };
  _L: while (true) {
    const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$3 === -1) {
      return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      switch (_x) {
        case 34: {
          _M0MPC14json12ParseContext17lex__string__slowN5flushS317(_env, ctx.offset - 1 | 0);
          break _L;
        }
        case 92: {
          _M0MPC14json12ParseContext17lex__string__slowN5flushS317(_env, ctx.offset - 1 | 0);
          const _bind$4 = _M0MPC14json12ParseContext10read__char(ctx);
          if (_bind$4 === -1) {
            return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
          } else {
            const _Some$2 = _bind$4;
            const _x$2 = _Some$2;
            switch (_x$2) {
              case 98: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 8);
                break;
              }
              case 102: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 12);
                break;
              }
              case 110: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 10);
                break;
              }
              case 114: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 13);
                break;
              }
              case 116: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 9);
                break;
              }
              case 34: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
                break;
              }
              case 92: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 92);
                break;
              }
              case 47: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 47);
                break;
              }
              case 117: {
                const _bind$5 = _M0MPC14json12ParseContext16lex__hex__digits(ctx, 4);
                let c;
                if (_bind$5.$tag === 1) {
                  const _ok = _bind$5;
                  c = _ok._0;
                } else {
                  return _bind$5;
                }
                _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
                break;
              }
              default: {
                const _bind$6 = _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1);
                if (_bind$6.$tag === 1) {
                  const _ok = _bind$6;
                  _ok._0;
                } else {
                  return _bind$6;
                }
              }
            }
          }
          start.val = ctx.offset;
          break;
        }
        default: {
          if (_x < 32) {
            const _bind$5 = _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1);
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _ok._0;
            } else {
              return _bind$5;
            }
          } else {
            continue _L;
          }
        }
      }
    }
    continue;
  }
  return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(buf.val);
}
function _M0MPC14json12ParseContext11lex__string(ctx) {
  const string_start = ctx.offset;
  let _tmp = string_start;
  while (true) {
    const i = _tmp;
    if (i < ctx.end_offset) {
      const _bind$3 = ctx.input;
      const c = _bind$3.str.charCodeAt(_bind$3.start + i | 0);
      const _p = 34;
      if (c === _p) {
        ctx.offset = i + 1 | 0;
        return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(_M0MPC16string10StringView9to__owned(_M0MPC16string10StringView12view_2einner(ctx.input, string_start, i)));
      } else {
        const _p$2 = 92;
        if (c === _p$2) {
          const _bind$4 = _M0MPC14json12ParseContext17lex__string__slow(ctx);
          let _tmp$2;
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp$2 = _ok._0;
          } else {
            return _bind$4;
          }
          return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(_tmp$2);
        } else {
          if (_M0IP016_24default__implPB7Compare6op__ltGkE(c, 32)) {
            ctx.offset = i + 1 | 0;
            const _bind$4 = _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1);
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _ok._0;
            } else {
              return _bind$4;
            }
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
}
function _M0MPC14json12ParseContext9lex__zero(ctx, start) {
  _L: {
    const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$3 === -1) {
      return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      if (_x === 46) {
        return _M0MPC14json12ParseContext19lex__decimal__point(ctx, start);
      } else {
        if (_x === 101) {
          break _L;
        } else {
          if (_x === 69) {
            break _L;
          } else {
            if (_x >= 48 && _x <= 57) {
              ctx.offset = ctx.offset - 1 | 0;
              return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
            } else {
              ctx.offset = ctx.offset - 1 | 0;
              return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
            }
          }
        }
      }
    }
  }
  return _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start);
}
function _M0MPC14json12ParseContext10lex__value(ctx, allow_rbracket) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    if (_x === 123) {
      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token6LBrace__);
    } else {
      if (_x === 91) {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token8LBracket__);
      } else {
        if (_x === 93) {
          if (allow_rbracket) {
            return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token8RBracket__);
          } else {
            return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
          }
        } else {
          if (_x === 110) {
            const _bind$4 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 117);
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _ok._0;
            } else {
              return _bind$4;
            }
            const _bind$5 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 108);
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _ok._0;
            } else {
              return _bind$5;
            }
            const _bind$6 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 108);
            if (_bind$6.$tag === 1) {
              const _ok = _bind$6;
              _ok._0;
            } else {
              return _bind$6;
            }
            return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token4Null__);
          } else {
            if (_x === 116) {
              const _bind$4 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 114);
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _ok._0;
              } else {
                return _bind$4;
              }
              const _bind$5 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 117);
              if (_bind$5.$tag === 1) {
                const _ok = _bind$5;
                _ok._0;
              } else {
                return _bind$5;
              }
              const _bind$6 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 101);
              if (_bind$6.$tag === 1) {
                const _ok = _bind$6;
                _ok._0;
              } else {
                return _bind$6;
              }
              return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token4True__);
            } else {
              if (_x === 102) {
                const _bind$4 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 97);
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _ok._0;
                } else {
                  return _bind$4;
                }
                const _bind$5 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 108);
                if (_bind$5.$tag === 1) {
                  const _ok = _bind$5;
                  _ok._0;
                } else {
                  return _bind$5;
                }
                const _bind$6 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 115);
                if (_bind$6.$tag === 1) {
                  const _ok = _bind$6;
                  _ok._0;
                } else {
                  return _bind$6;
                }
                const _bind$7 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 101);
                if (_bind$7.$tag === 1) {
                  const _ok = _bind$7;
                  _ok._0;
                } else {
                  return _bind$7;
                }
                return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token5False__);
              } else {
                if (_x === 45) {
                  const _bind$4 = _M0MPC14json12ParseContext10read__char(ctx);
                  if (_bind$4 === -1) {
                    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
                  } else {
                    const _Some$2 = _bind$4;
                    const _x$2 = _Some$2;
                    if (_x$2 === 48) {
                      const _bind$5 = _M0MPC14json12ParseContext9lex__zero(ctx, ctx.offset - 2 | 0);
                      let _bind$6;
                      if (_bind$5.$tag === 1) {
                        const _ok = _bind$5;
                        _bind$6 = _ok._0;
                      } else {
                        return _bind$5;
                      }
                      const _n = _bind$6.value;
                      const _repr = _bind$6.repr;
                      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                    } else {
                      if (_x$2 >= 49 && _x$2 <= 57) {
                        const _bind$5 = _M0MPC14json12ParseContext21lex__decimal__integer(ctx, ctx.offset - 2 | 0);
                        let _bind$6;
                        if (_bind$5.$tag === 1) {
                          const _ok = _bind$5;
                          _bind$6 = _ok._0;
                        } else {
                          return _bind$5;
                        }
                        const _n = _bind$6.value;
                        const _repr = _bind$6.repr;
                        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                      } else {
                        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
                      }
                    }
                  }
                } else {
                  if (_x === 48) {
                    const _bind$4 = _M0MPC14json12ParseContext9lex__zero(ctx, ctx.offset - 1 | 0);
                    let _bind$5;
                    if (_bind$4.$tag === 1) {
                      const _ok = _bind$4;
                      _bind$5 = _ok._0;
                    } else {
                      return _bind$4;
                    }
                    const _n = _bind$5.value;
                    const _repr = _bind$5.repr;
                    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                  } else {
                    if (_x >= 49 && _x <= 57) {
                      const _bind$4 = _M0MPC14json12ParseContext21lex__decimal__integer(ctx, ctx.offset - 1 | 0);
                      let _bind$5;
                      if (_bind$4.$tag === 1) {
                        const _ok = _bind$4;
                        _bind$5 = _ok._0;
                      } else {
                        return _bind$4;
                      }
                      const _n = _bind$5.value;
                      const _repr = _bind$5.repr;
                      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                    } else {
                      if (_x === 34) {
                        const _bind$4 = _M0MPC14json12ParseContext11lex__string(ctx);
                        let s;
                        if (_bind$4.$tag === 1) {
                          const _ok = _bind$4;
                          s = _ok._0;
                        } else {
                          return _bind$4;
                        }
                        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6String(s));
                      } else {
                        const _p = _x;
                        const shift = -(_p <= 65535 ? 1 : 2) | 0;
                        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, shift);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function _M0MPC14json12ParseContext24lex__after__array__value(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    switch (_x) {
      case 93: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token8RBracket__);
      }
      case 44: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token5Comma__);
      }
      default: {
        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
      }
    }
  }
}
function _M0MPC14json12ParseContext25lex__after__object__value(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    switch (_x) {
      case 125: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token6RBrace__);
      }
      case 44: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token5Comma__);
      }
      default: {
        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
      }
    }
  }
}
function _M0MPC14json12ParseContext26lex__after__property__name(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    if (_x === 58) {
      return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok(undefined);
    } else {
      return _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1);
    }
  }
}
function _M0MPC14json12ParseContext19lex__property__name(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    switch (_x) {
      case 125: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token6RBrace__);
      }
      case 34: {
        const _bind$4 = _M0MPC14json12ParseContext11lex__string(ctx);
        let s;
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          s = _ok._0;
        } else {
          return _bind$4;
        }
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6String(s));
      }
      default: {
        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
      }
    }
  }
}
function _M0MPC14json12ParseContext20lex__property__name2(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$3 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$3;
    const _x = _Some;
    if (_x === 34) {
      const _bind$4 = _M0MPC14json12ParseContext11lex__string(ctx);
      let s;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        s = _ok._0;
      } else {
        return _bind$4;
      }
      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6String(s));
    } else {
      return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
    }
  }
}
function _M0MPC14json12ParseContext12parse__value(ctx, remaining_available_depth) {
  const _bind$3 = _M0MPC14json12ParseContext10lex__value(ctx, false);
  let tok;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    tok = _ok._0;
  } else {
    return _bind$3;
  }
  return _M0MPC14json12ParseContext13parse__value2(ctx, tok, remaining_available_depth);
}
function _M0MPC14json12ParseContext13parse__value2(ctx, tok, remaining_available_depth) {
  _L: {
    switch (tok.$tag) {
      case 0: {
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0FPB4null);
      }
      case 1: {
        const _p = true;
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_p ? _M0DTPB4Json4True__ : _M0DTPB4Json5False__);
      }
      case 2: {
        const _p$2 = false;
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_p$2 ? _M0DTPB4Json4True__ : _M0DTPB4Json5False__);
      }
      case 3: {
        const _Number = tok;
        const _n = _Number._0;
        const _repr = _Number._1;
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(new _M0DTPB4Json6Number(_n, _repr));
      }
      case 4: {
        const _String = tok;
        const _s = _String._0;
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(new _M0DTPB4Json6String(_s));
      }
      case 5: {
        return _M0MPC14json12ParseContext13parse__object(ctx, remaining_available_depth);
      }
      case 7: {
        return _M0MPC14json12ParseContext12parse__array(ctx, remaining_available_depth);
      }
      case 8: {
        break _L;
      }
      case 6: {
        break _L;
      }
      default: {
        break _L;
      }
    }
  }
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0FPC15abort5abortGsE("unreachable"));
}
function _M0MPC14json12ParseContext12parse__array(ctx, remaining_available_depth) {
  if (remaining_available_depth <= 0) {
    return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded__);
  }
  const child_remaining_available_depth = remaining_available_depth - 1 | 0;
  const vec = [];
  let _tmp;
  const _bind$3 = _M0MPC14json12ParseContext10lex__value(ctx, true);
  let _tmp$2;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp$2 = _ok._0;
  } else {
    return _bind$3;
  }
  let _tmp$3 = _tmp$2;
  _L: while (true) {
    const x = _tmp$3;
    if (x.$tag === 8) {
      _tmp = new _M0DTPB4Json5Array(vec);
      break;
    } else {
      const _bind$4 = _M0MPC14json12ParseContext13parse__value2(ctx, x, child_remaining_available_depth);
      let _tmp$4;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp$4 = _ok._0;
      } else {
        return _bind$4;
      }
      _M0MPC15array5Array4pushGRPB4JsonE(vec, _tmp$4);
      const _bind$5 = _M0MPC14json12ParseContext24lex__after__array__value(ctx);
      let tok2;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        tok2 = _ok._0;
      } else {
        return _bind$5;
      }
      switch (tok2.$tag) {
        case 9: {
          const _bind$6 = _M0MPC14json12ParseContext10lex__value(ctx, false);
          if (_bind$6.$tag === 1) {
            const _ok = _bind$6;
            _tmp$3 = _ok._0;
          } else {
            return _bind$6;
          }
          continue _L;
        }
        case 8: {
          _tmp = new _M0DTPB4Json5Array(vec);
          break _L;
        }
        default: {
          _M0FPC15abort5abortGuE("unreachable");
        }
      }
    }
    continue;
  }
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0MPC14json12ParseContext13parse__object(ctx, remaining_available_depth) {
  if (remaining_available_depth <= 0) {
    return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded__);
  }
  const child_remaining_available_depth = remaining_available_depth - 1 | 0;
  const _bind$3 = [];
  const map = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 0), undefined);
  let _tmp;
  const _bind$4 = _M0MPC14json12ParseContext19lex__property__name(ctx);
  let _tmp$2;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _tmp$2 = _ok._0;
  } else {
    return _bind$4;
  }
  let _tmp$3 = _tmp$2;
  _L: while (true) {
    const x = _tmp$3;
    switch (x.$tag) {
      case 6: {
        _tmp = new _M0DTPB4Json6Object(map);
        break _L;
      }
      case 4: {
        const _String = x;
        const _name = _String._0;
        const _bind$5 = _M0MPC14json12ParseContext26lex__after__property__name(ctx);
        if (_bind$5.$tag === 1) {
          const _ok = _bind$5;
          _ok._0;
        } else {
          return _bind$5;
        }
        const _bind$6 = _M0MPC14json12ParseContext12parse__value(ctx, child_remaining_available_depth);
        let _tmp$4;
        if (_bind$6.$tag === 1) {
          const _ok = _bind$6;
          _tmp$4 = _ok._0;
        } else {
          return _bind$6;
        }
        _M0MPB3Map3setGsRPB4JsonE(map, _name, _tmp$4);
        const _bind$7 = _M0MPC14json12ParseContext25lex__after__object__value(ctx);
        let _bind$8;
        if (_bind$7.$tag === 1) {
          const _ok = _bind$7;
          _bind$8 = _ok._0;
        } else {
          return _bind$7;
        }
        switch (_bind$8.$tag) {
          case 9: {
            const _bind$9 = _M0MPC14json12ParseContext20lex__property__name2(ctx);
            if (_bind$9.$tag === 1) {
              const _ok = _bind$9;
              _tmp$3 = _ok._0;
            } else {
              return _bind$9;
            }
            continue _L;
          }
          case 6: {
            _tmp = new _M0DTPB4Json6Object(map);
            break _L;
          }
          default: {
            _M0FPC15abort5abortGuE("unreachable");
          }
        }
        break;
      }
      default: {
        _M0FPC15abort5abortGuE("unreachable");
      }
    }
    continue;
  }
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0FPC14json13parse_2einner(input, max_nesting_depth) {
  const ctx = _M0MPC14json12ParseContext4make(input);
  const _bind$3 = _M0MPC14json12ParseContext12parse__value(ctx, max_nesting_depth);
  let val;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    val = _ok._0;
  } else {
    return _bind$3;
  }
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  return ctx.offset >= ctx.end_offset ? new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(val) : _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
}
function _M0FPC14json6escape(str, escape_slash) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(str.length);
  const _bind$3 = str.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = str.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = str.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$4;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$4;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      switch (_decoded_char) {
        case 34: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\"");
          break;
        }
        case 92: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\\");
          break;
        }
        case 47: {
          if (escape_slash) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\/");
          } else {
            _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char);
          }
          break;
        }
        case 10: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\n");
          break;
        }
        case 13: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\r");
          break;
        }
        case 8: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\b");
          break;
        }
        case 9: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\t");
          break;
        }
        default: {
          const code = _decoded_char;
          if (code === 12) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\f");
          } else {
            if (code < 32) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\u00");
              _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC14byte4Byte7to__hex(code & 255));
            } else {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char);
            }
          }
        }
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function _M0FPC14json11indent__str(level, indent) {
  if (indent === 0) {
    return "";
  } else {
    const spaces = Math.imul(indent, level) | 0;
    switch (spaces) {
      case 0: {
        return "\n";
      }
      case 1: {
        return "\n ";
      }
      case 2: {
        return "\n  ";
      }
      case 3: {
        return "\n   ";
      }
      case 4: {
        return "\n    ";
      }
      case 5: {
        return "\n     ";
      }
      case 6: {
        return "\n      ";
      }
      case 7: {
        return "\n       ";
      }
      case 8: {
        return "\n        ";
      }
      default: {
        return `\n${_M0MPC16string6String6repeat(" ", spaces)}`;
      }
    }
  }
}
function _M0MPC14json4Json17stringify_2einner(self, escape_slash, indent, replacer) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const stack = [];
  let depth = 0;
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      if (stack.length === 0) {
        break;
      } else {
        const _x = stack[stack.length - 1 | 0];
        if (_x.$tag === 0) {
          const _Array = _x;
          const _arr = _Array._0;
          const _i = _Array._1;
          if (_i < _arr.length) {
            const element = _M0MPC15array5Array2atGRPB4JsonE(_arr, _i);
            _Array._1 = _i + 1 | 0;
            if (_i > 0) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
              _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json11indent__str(depth, indent));
            }
            _tmp = element;
            continue;
          } else {
            depth = depth - 1 | 0;
            _M0MPC15array5Array3popGRPC14json10WriteFrameE(stack);
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json11indent__str(depth, indent));
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 93);
            _tmp = undefined;
            continue;
          }
        } else {
          const _Object = _x;
          const _iterator = _Object._0;
          const _first = _Object._1;
          const _bind$3 = _M0MPB4Iter4nextGUsRPB4JsonEE(_iterator);
          if (_bind$3 === undefined) {
            depth = depth - 1 | 0;
            _M0MPC15array5Array3popGRPC14json10WriteFrameE(stack);
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json11indent__str(depth, indent));
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 125);
            _tmp = undefined;
            continue;
          } else {
            const _Some = _bind$3;
            const _x$2 = _Some;
            const _k = _x$2._0;
            const _v = _x$2._1;
            let v2 = _v;
            if (replacer === undefined) {
            } else {
              const _Some$2 = replacer;
              const _replacer = _Some$2;
              const _func = _replacer.f;
              const _bind$4 = _func(_k, _v);
              if (_bind$4 === undefined) {
                _tmp = undefined;
                continue;
              } else {
                const _Some$3 = _bind$4;
                const _v$2 = _Some$3;
                v2 = _v$2;
              }
            }
            if (!_first) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
              _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json11indent__str(depth, indent));
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json6escape(_k, escape_slash));
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 58);
            if (indent > 0) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 32);
            }
            _Object._1 = false;
            _tmp = v2;
            continue;
          }
        }
      }
    } else {
      const _Some = x;
      const _value = _Some;
      switch (_value.$tag) {
        case 6: {
          const _Object = _value;
          const _members = _Object._0;
          if (_members.size === 0) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "{}");
          } else {
            depth = depth + 1 | 0;
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 123);
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json11indent__str(depth, indent));
            _M0MPC15array5Array4pushGRPB4JsonE(stack, new _M0DTPC14json10WriteFrame6Object(_M0MPB3Map4iterGsRPB4JsonE(_members), true));
          }
          break;
        }
        case 5: {
          const _Array = _value;
          const _arr = _Array._0;
          if (_arr.length === 0) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "[]");
          } else {
            depth = depth + 1 | 0;
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 91);
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json11indent__str(depth, indent));
            _M0MPC15array5Array4pushGRPB4JsonE(stack, new _M0DTPC14json10WriteFrame5Array(_arr, 0));
          }
          break;
        }
        case 4: {
          const _String = _value;
          const _s = _String._0;
          _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
          _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FPC14json6escape(_s, escape_slash));
          _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
          break;
        }
        case 3: {
          const _Number = _value;
          const _n = _Number._0;
          const _repr = _Number._1;
          if (_repr === undefined) {
            _M0MPB13StringBuilder13write__objectGdE(buf, _n);
          } else {
            const _Some$2 = _repr;
            const _r = _Some$2;
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _r);
          }
          break;
        }
        case 1: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "true");
          break;
        }
        case 2: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "false");
          break;
        }
        default: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "null");
        }
      }
      _tmp = undefined;
      continue;
    }
  }
  return buf.val;
}
function _M0MP38Magic48618moon_2dminiprogram7runtime9ToastIcon7to__str(self) {
  switch (self) {
    case 0: {
      return "success";
    }
    case 1: {
      return "error";
    }
    case 2: {
      return "loading";
    }
    default: {
      return "none";
    }
  }
}
function _M0FP38Magic48618moon_2dminiprogram7runtime5jbool(b) {
  return b ? _M0DTPB4Json4True__ : _M0DTPB4Json5False__;
}
function _M0FP38Magic48618moon_2dminiprogram7runtime4jnum(d) {
  const _p = undefined;
  return new _M0DTPB4Json6Number(d, _p);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime4jobj(fields) {
  const _bind$3 = [];
  const m = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 0), undefined);
  const _bind$4 = fields.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$4) {
      const pair = fields[_];
      _M0MPB3Map3setGsRPB4JsonE(m, pair._0, pair._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB4Json6Object(m);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(s) {
  return new _M0DTPB4Json6String(s);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime13toast_2einner(title, icon, mask, duration) {
  _M0FP38Magic48618moon_2dminiprogram7runtime8wx__call("showToast", _M0MPC14json4Json17stringify_2einner(_M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "title", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(title) }, { _0: "icon", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(_M0MP38Magic48618moon_2dminiprogram7runtime9ToastIcon7to__str(icon)) }, { _0: "mask", _1: _M0FP38Magic48618moon_2dminiprogram7runtime5jbool(mask) }, { _0: "duration", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jnum(duration + 0) }]), false, 0, undefined));
}
function _M0FP38Magic48618moon_2dminiprogram7runtime5toast(title, icon$46$opt, mask$46$opt, duration$46$opt) {
  let icon;
  if (icon$46$opt === undefined) {
    icon = 0;
  } else {
    const _Some = icon$46$opt;
    icon = _Some;
  }
  const mask = mask$46$opt === -1 ? false : mask$46$opt;
  let duration;
  if (duration$46$opt === undefined) {
    duration = 1500;
  } else {
    const _Some = duration$46$opt;
    duration = _Some;
  }
  _M0FP38Magic48618moon_2dminiprogram7runtime13toast_2einner(title, icon, mask, duration);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime15confirm_2einner(title, content, show_cancel, on_result) {
  _M0FP38Magic48618moon_2dminiprogram7runtime11wx__confirm(title, content, show_cancel, on_result);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime14set__clipboard(data) {
  _M0FP38Magic48618moon_2dminiprogram7runtime8wx__call("setClipboardData", _M0MPC14json4Json17stringify_2einner(_M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "data", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(data) }]), false, 0, undefined));
}
function _M0FP38Magic48618moon_2dminiprogram7runtime25copy__with__toast_2einner(data, tip) {
  _M0FP38Magic48618moon_2dminiprogram7runtime14set__clipboard(data);
  _M0FP38Magic48618moon_2dminiprogram7runtime13toast_2einner(tip, 0, false, 1500);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime12set__storage(key, value) {
  _M0FP38Magic48618moon_2dminiprogram7runtime22wx__set__storage__sync(key, _M0MPC14json4Json17stringify_2einner(value, false, 0, undefined));
}
function _M0MP38Magic48618moon_2dminiprogram7runtime5JsVal8to__json(self) {
  if (_M0FP38Magic48618moon_2dminiprogram7runtime14js__has__value(self)) {
    let _try_err;
    _L: {
      const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime13js__stringify(self);
      const _bind$4 = _M0FPC14json13parse_2einner(new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length), 1024);
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        return _ok._0;
      } else {
        const _err = _bind$4;
        _try_err = _err._0;
        break _L;
      }
    }
    return undefined;
  } else {
    return undefined;
  }
}
function _M0FP38Magic48618moon_2dminiprogram7runtime12get__storage(key) {
  const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime5JsVal8to__json(_M0FP38Magic48618moon_2dminiprogram7runtime22wx__get__storage__sync(key));
  if (_bind$3 === undefined) {
    return _M0DTPB4Json4Null__;
  } else {
    const _Some = _bind$3;
    return _Some;
  }
}
function _M0FP38Magic48618moon_2dminiprogram7runtime15remove__storage(key) {
  _M0FP38Magic48618moon_2dminiprogram7runtime8wx__call("removeStorageSync", _M0MPC14json4Json17stringify_2einner(_M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "key", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(key) }]), false, 0, undefined));
}
function _M0FP38Magic48618moon_2dminiprogram7runtime12navigate__to(url) {
  _M0FP38Magic48618moon_2dminiprogram7runtime8wx__call("navigateTo", _M0MPC14json4Json17stringify_2einner(_M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "url", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(url) }]), false, 0, undefined));
}
function _M0FP38Magic48618moon_2dminiprogram7runtime13emit__replace(path, value, acc) {
  if (path === "") {
    if (value.$tag === 6) {
      const _Object = value;
      const _nm = _Object._0;
      const _it = _M0MPB3Map5iter2GsRPB4JsonE(_nm);
      while (true) {
        const _bind$3 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
        if (_bind$3 === undefined) {
          return;
        } else {
          const _Some = _bind$3;
          const _x = _Some;
          const _k = _x._0;
          const _v = _x._1;
          _M0MPC15array5Array4pushGRPB4JsonE(acc, { _0: _k, _1: _v });
          continue;
        }
      }
    } else {
      _M0MPC15array5Array4pushGRPB4JsonE(acc, { _0: path, _1: value });
      return;
    }
  } else {
    _M0MPC15array5Array4pushGRPB4JsonE(acc, { _0: path, _1: value });
    return;
  }
}
function _M0FP38Magic48618moon_2dminiprogram7runtime10diff__node(path, old, new_, acc) {
  if (old === undefined) {
  } else {
    const _Some = old;
    const _o = _Some;
    if (_M0IPC14json4JsonPB2Eq5equal(_o, new_)) {
      return undefined;
    }
  }
  _L: {
    if (old === undefined) {
      break _L;
    } else {
      const _Some = old;
      const _x = _Some;
      switch (_x.$tag) {
        case 6: {
          const _Object = _x;
          const _om = _Object._0;
          if (new_.$tag === 6) {
            const _Object$2 = new_;
            const _nm = _Object$2._0;
            let removed = false;
            const _it = _M0MPB3Map5iter2GsRPB4JsonE(_om);
            while (true) {
              const _bind$3 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
              if (_bind$3 === undefined) {
                break;
              } else {
                const _Some$2 = _bind$3;
                const _x$2 = _Some$2;
                const _k = _x$2._0;
                if (!_M0MPB3Map8containsGsRPB4JsonE(_nm, _k)) {
                  removed = true;
                  break;
                }
                continue;
              }
            }
            if (removed) {
              _M0FP38Magic48618moon_2dminiprogram7runtime13emit__replace(path, new_, acc);
              return undefined;
            }
            const _it$2 = _M0MPB3Map5iter2GsRPB4JsonE(_nm);
            while (true) {
              const _bind$3 = _M0MPB5Iter24nextGsRPB4JsonE(_it$2);
              if (_bind$3 === undefined) {
                return;
              } else {
                const _Some$2 = _bind$3;
                const _x$2 = _Some$2;
                const _k = _x$2._0;
                const _nv = _x$2._1;
                let child;
                if (path === "") {
                  child = _k;
                } else {
                  const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(1);
                  _M0MPB13StringBuilder13write__objectGsE(_string_builder, path);
                  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ".");
                  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _k);
                  child = _string_builder.val;
                }
                const _bind$4 = _M0MPB3Map3getGsRPB4JsonE(_om, _k);
                if (_bind$4 === undefined) {
                  _M0MPC15array5Array4pushGRPB4JsonE(acc, { _0: child, _1: _nv });
                } else {
                  const _Some$3 = _bind$4;
                  const _ov = _Some$3;
                  _M0FP38Magic48618moon_2dminiprogram7runtime10diff__node(child, _ov, _nv, acc);
                }
                continue;
              }
            }
          } else {
            break _L;
          }
        }
        case 5: {
          const _Array = _x;
          const _oa = _Array._0;
          if (new_.$tag === 5) {
            const _Array$2 = new_;
            const _na = _Array$2._0;
            if (_na.length >= _oa.length) {
              const _bind$3 = _na.length;
              let _tmp = 0;
              while (true) {
                const i = _tmp;
                if (i < _bind$3) {
                  const nv = _na[i];
                  const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(2);
                  _M0MPB13StringBuilder13write__objectGsE(_string_builder, path);
                  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "[");
                  _M0MPB13StringBuilder13write__objectGiE(_string_builder, i);
                  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "]");
                  const child = _string_builder.val;
                  if (i < _oa.length) {
                    _M0FP38Magic48618moon_2dminiprogram7runtime10diff__node(child, _M0MPC15array5Array2atGRPB4JsonE(_oa, i), nv, acc);
                  } else {
                    _M0MPC15array5Array4pushGRPB4JsonE(acc, { _0: child, _1: nv });
                  }
                  _tmp = i + 1 | 0;
                  continue;
                } else {
                  return;
                }
              }
            } else {
              _M0FP38Magic48618moon_2dminiprogram7runtime13emit__replace(path, new_, acc);
              return;
            }
          } else {
            break _L;
          }
        }
        default: {
          break _L;
        }
      }
    }
  }
  _M0FP38Magic48618moon_2dminiprogram7runtime13emit__replace(path, new_, acc);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime13diff__partial(old, new_) {
  const acc = [];
  _L: {
    _L$2: {
      if (old.$tag === 6) {
        const _Object = old;
        const _om = _Object._0;
        if (new_.$tag === 6) {
          const _Object$2 = new_;
          const _nm = _Object$2._0;
          const _it = _M0MPB3Map5iter2GsRPB4JsonE(_nm);
          while (true) {
            const _bind$3 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
            if (_bind$3 === undefined) {
              break;
            } else {
              const _Some = _bind$3;
              const _x = _Some;
              const _k = _x._0;
              const _nv = _x._1;
              const _bind$4 = _M0MPB3Map3getGsRPB4JsonE(_om, _k);
              if (_bind$4 === undefined) {
                _M0MPC15array5Array4pushGRPB4JsonE(acc, { _0: _k, _1: _nv });
              } else {
                const _Some$2 = _bind$4;
                const _ov = _Some$2;
                _M0FP38Magic48618moon_2dminiprogram7runtime10diff__node(_k, _ov, _nv, acc);
              }
              continue;
            }
          }
        } else {
          break _L$2;
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    _M0FP38Magic48618moon_2dminiprogram7runtime13emit__replace("", new_, acc);
  }
  return acc;
}
function _M0FP38Magic48618moon_2dminiprogram7runtime19diff__from__scratch(new_) {
  const acc = [];
  _M0FP38Magic48618moon_2dminiprogram7runtime10diff__node("", undefined, new_, acc);
  return acc;
}
function _M0FP38Magic48618moon_2dminiprogram7runtime15patch__to__json(patch) {
  const _bind$3 = [];
  const m = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 0), undefined);
  const _bind$4 = patch.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$4) {
      const pair = patch[_];
      _M0MPB3Map3setGsRPB4JsonE(m, pair._0, pair._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB4Json6Object(m);
}
function _M0MP38Magic48618moon_2dminiprogram7runtime7Payload3new(raw) {
  return new _M0TP38Magic48618moon_2dminiprogram7runtime7Payload(raw);
}
function _M0MP38Magic48618moon_2dminiprogram7runtime5JsVal2at(self, path) {
  let v = self;
  const _bind$3 = path.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const k = path[_];
      v = _M0FP38Magic48618moon_2dminiprogram7runtime7js__get(v, k);
      const _bind$4 = _M0FP38Magic48618moon_2dminiprogram7runtime10js__typeof(v);
      if (_bind$4 === "undefined") {
        return _M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4None__;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16option6OptionGRP38Magic48618moon_2dminiprogram7runtime5JsValE4Some(v);
}
function _M0MP38Magic48618moon_2dminiprogram7runtime5JsVal10string__at(self, path) {
  _L: {
    const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime5JsVal2at(self, path);
    if (_bind$3.$tag === 1) {
      const _Some = _bind$3;
      const _v = _Some._0;
      if (_M0FP38Magic48618moon_2dminiprogram7runtime14js__has__value(_v)) {
        return _M0FP38Magic48618moon_2dminiprogram7runtime14js__to__string(_v);
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  return undefined;
}
function _M0MP38Magic48618moon_2dminiprogram7runtime7Payload10string__at(self, path) {
  return _M0MP38Magic48618moon_2dminiprogram7runtime5JsVal10string__at(self.raw, path);
}
function _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx3new(page) {
  return new _M0TP38Magic48618moon_2dminiprogram7runtime7PageCtx(page);
}
function _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx9set__data(self, data) {
  _M0FP38Magic48618moon_2dminiprogram7runtime13js__set__data(self.page, _M0MPC14json4Json17stringify_2einner(data, false, 0, undefined));
}
function _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx10set__state(self, new_state) {
  let old;
  let _try_err;
  _L: {
    _L$2: {
      const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime16js__data__string(self.page);
      const _bind$4 = _M0FPC14json13parse_2einner(new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length), 1024);
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        old = _ok._0;
      } else {
        const _err = _bind$4;
        _try_err = _err._0;
        break _L$2;
      }
      break _L;
    }
    old = undefined;
  }
  let patch;
  if (old === undefined) {
    patch = _M0FP38Magic48618moon_2dminiprogram7runtime19diff__from__scratch(new_state);
  } else {
    const _Some = old;
    const _o = _Some;
    patch = _M0FP38Magic48618moon_2dminiprogram7runtime13diff__partial(_o, new_state);
  }
  if (patch.length > 0) {
    _M0FP38Magic48618moon_2dminiprogram7runtime16js__apply__patch(self.page, _M0MPC14json4Json17stringify_2einner(_M0FP38Magic48618moon_2dminiprogram7runtime15patch__to__json(patch), false, 0, undefined));
    return;
  } else {
    return;
  }
}
function _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx9get__data(self) {
  return _M0MP38Magic48618moon_2dminiprogram7runtime5JsVal8to__json(_M0FP38Magic48618moon_2dminiprogram7runtime7js__get(self.page, "data"));
}
function _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx14trigger__event(self, name, detail) {
  _M0FP38Magic48618moon_2dminiprogram7runtime18js__trigger__event(self.page, name, _M0MPC14json4Json17stringify_2einner(detail, false, 0, undefined));
}
function _M0FP38Magic48618moon_2dminiprogram7runtime14register__page(def) {
  _M0MPB3Map3setGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(_M0FP38Magic48618moon_2dminiprogram7runtime14page__registry, def.path, def);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime12page__config(path) {
  const _bind$3 = _M0MPB3Map3getGsRP38Magic48618moon_2dminiprogram7runtime7PageDefE(_M0FP38Magic48618moon_2dminiprogram7runtime14page__registry, path);
  if (_bind$3 === undefined) {
    return new _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE3Err(new _M0DTPC15error5Error64Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2ePageNotFound(path));
  } else {
    const _Some = _bind$3;
    const _def = _Some;
    const names = $make_array_len_and_init(_def.handlers.length, "");
    const fns = $make_array_len_and_init(_def.handlers.length, (_discard_, _discard_$2) => {
    });
    const _bind$4 = _def.handlers;
    const _bind$5 = _bind$4.length;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind$5) {
        const kv = _bind$4[i];
        const _name = kv._0;
        const _h = kv._1;
        $bound_check(names, i);
        names[i] = _name;
        $bound_check(fns, i);
        fns[i] = (page, arg) => {
          _h(_M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx3new(page), _M0MP38Magic48618moon_2dminiprogram7runtime7Payload3new(arg));
        };
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const rnames = $make_array_len_and_init(_def.returns.length, "");
    const rfns = $make_array_len_and_init(_def.returns.length, (_discard_, _discard_$2) => "null");
    const _bind$6 = _def.returns;
    const _bind$7 = _bind$6.length;
    let _tmp$2 = 0;
    while (true) {
      const i = _tmp$2;
      if (i < _bind$7) {
        const kv = _bind$6[i];
        const _name = kv._0;
        const _h = kv._1;
        $bound_check(rnames, i);
        rnames[i] = _name;
        $bound_check(rfns, i);
        rfns[i] = (page, arg) => _M0MPC14json4Json17stringify_2einner(_h(_M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx3new(page), _M0MP38Magic48618moon_2dminiprogram7runtime7Payload3new(arg)), false, 0, undefined);
        _tmp$2 = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(_M0FP38Magic48618moon_2dminiprogram7runtime16build__page__cfg(_M0MPC14json4Json17stringify_2einner(_def.data, false, 0, undefined), names, fns, rnames, rfns));
  }
}
function _M0FP38Magic48618moon_2dminiprogram7runtime4page(path) {
  const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime12page__config(path);
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  return new _M0DTPC16result6ResultGuRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(_M0FP38Magic48618moon_2dminiprogram7runtime8js__page(_tmp));
}
function _M0FP38Magic48618moon_2dminiprogram7runtime4jarr(items) {
  return new _M0DTPB4Json5Array(items);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime19register__component(def) {
  _M0MPB3Map3setGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(_M0FP38Magic48618moon_2dminiprogram7runtime19component__registry, def.key, def);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime17component__config(key) {
  const _bind$3 = _M0MPB3Map3getGsRP38Magic48618moon_2dminiprogram7runtime12ComponentDefE(_M0FP38Magic48618moon_2dminiprogram7runtime19component__registry, key);
  if (_bind$3 === undefined) {
    return new _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE3Err(new _M0DTPC15error5Error69Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eComponentNotFound(key));
  } else {
    const _Some = _bind$3;
    const _def = _Some;
    const names = $make_array_len_and_init(_def.handlers.length, "");
    const fns = $make_array_len_and_init(_def.handlers.length, (_discard_, _discard_$2) => {
    });
    const _bind$4 = _def.handlers;
    const _bind$5 = _bind$4.length;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind$5) {
        const kv = _bind$4[i];
        const _name = kv._0;
        const _h = kv._1;
        $bound_check(names, i);
        names[i] = _name;
        $bound_check(fns, i);
        fns[i] = (page, arg) => {
          _h(_M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx3new(page), _M0MP38Magic48618moon_2dminiprogram7runtime7Payload3new(arg));
        };
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const onames = $make_array_len_and_init(_def.observers.length, "");
    const ofns = $make_array_len_and_init(_def.observers.length, (_discard_, _discard_$2) => {
    });
    const _bind$6 = _def.observers;
    const _bind$7 = _bind$6.length;
    let _tmp$2 = 0;
    while (true) {
      const i = _tmp$2;
      if (i < _bind$7) {
        const kv = _bind$6[i];
        const _name = kv._0;
        const _h = kv._1;
        $bound_check(onames, i);
        onames[i] = _name;
        $bound_check(ofns, i);
        ofns[i] = (page, arg) => {
          _h(_M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx3new(page), _M0MP38Magic48618moon_2dminiprogram7runtime7Payload3new(arg));
        };
        _tmp$2 = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const pnames = $make_array_len_and_init(_def.page_lifetimes.length, "");
    const pfns = $make_array_len_and_init(_def.page_lifetimes.length, (_discard_, _discard_$2) => {
    });
    const _bind$8 = _def.page_lifetimes;
    const _bind$9 = _bind$8.length;
    let _tmp$3 = 0;
    while (true) {
      const i = _tmp$3;
      if (i < _bind$9) {
        const kv = _bind$8[i];
        const _name = kv._0;
        const _h = kv._1;
        $bound_check(pnames, i);
        pnames[i] = _name;
        $bound_check(pfns, i);
        pfns[i] = (page, arg) => {
          _h(_M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx3new(page), _M0MP38Magic48618moon_2dminiprogram7runtime7Payload3new(arg));
        };
        _tmp$3 = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(_M0FP38Magic48618moon_2dminiprogram7runtime25js__build__component__cfg(_M0MPC14json4Json17stringify_2einner(_def.properties, false, 0, undefined), _M0MPC14json4Json17stringify_2einner(_def.data, false, 0, undefined), names, fns, onames, ofns, pnames, pfns));
  }
}
function _M0FP38Magic48618moon_2dminiprogram7runtime9component(key) {
  const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime17component__config(key);
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  return new _M0DTPC16result6ResultGuRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(_M0FP38Magic48618moon_2dminiprogram7runtime13js__component(_tmp));
}
function _M0MP38Magic48618moon_2dminiprogram7runtime6AppCtx3new(app) {
  return new _M0TP38Magic48618moon_2dminiprogram7runtime6AppCtx(app);
}
function _M0FP38Magic48618moon_2dminiprogram7runtime13register__app(def) {
  _M0FP38Magic48618moon_2dminiprogram7runtime13app__registry.val = def;
}
function _M0FP38Magic48618moon_2dminiprogram7runtime11app__config() {
  const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime13app__registry.val;
  if (_bind$3 === undefined) {
    return new _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE3Err(_M0DTPC15error5Error68Magic486_2fmoon_2dminiprogram_2fruntime_2eMpError_2eAppNotRegistered__);
  } else {
    const _Some = _bind$3;
    const _def = _Some;
    const names = $make_array_len_and_init(_def.handlers.length, "");
    const fns = $make_array_len_and_init(_def.handlers.length, (_discard_, _discard_$2) => {
    });
    const _bind$4 = _def.handlers;
    const _bind$5 = _bind$4.length;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind$5) {
        const kv = _bind$4[i];
        const _name = kv._0;
        const _h = kv._1;
        $bound_check(names, i);
        names[i] = _name;
        $bound_check(fns, i);
        fns[i] = (app, arg) => {
          _h(_M0MP38Magic48618moon_2dminiprogram7runtime6AppCtx3new(app), _M0MP38Magic48618moon_2dminiprogram7runtime7Payload3new(arg));
        };
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGRP38Magic48618moon_2dminiprogram7runtime5JsValRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(_M0FP38Magic48618moon_2dminiprogram7runtime15build__app__cfg(_M0MPC14json4Json17stringify_2einner(_def.global_data, false, 0, undefined), names, fns));
  }
}
function _M0FP38Magic48618moon_2dminiprogram7runtime6launch() {
  const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime11app__config();
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  return new _M0DTPC16result6ResultGuRP38Magic48618moon_2dminiprogram7runtime7MpErrorE2Ok(_M0FP38Magic48618moon_2dminiprogram7runtime7js__app(_tmp));
}
function _M0FP38Magic48618moon_2dminiprogram4yuan9digit__cn(d) {
  return _M0MPC15array5Array2atGRPB4JsonE(_M0FP38Magic48618moon_2dminiprogram4yuan12digit__chars, d);
}
function _M0FP38Magic48618moon_2dminiprogram4yuan13group__to__cn(n) {
  const ds = [(n / 1000 | 0) % 10 | 0, (n / 100 | 0) % 10 | 0, (n / 10 | 0) % 10 | 0, n % 10 | 0];
  const units = ["仟", "佰", "拾", ""];
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  let last = -1;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i <= 3) {
      _L: {
        const d = _M0MPC15array5Array2atGiE(ds, i);
        if (d === 0) {
          break _L;
        }
        if (last >= 0 && i > (last + 1 | 0)) {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "零");
        }
        _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FP38Magic48618moon_2dminiprogram4yuan9digit__cn(d));
        _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC15array5Array2atGRPB4JsonE(units, i));
        last = i;
        break _L;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function _M0FP38Magic48618moon_2dminiprogram4yuan11upper__body(yuan, jiao, fen) {
  if (BigInt.asUintN(64, yuan) === BigInt.asUintN(64, 0n) && (jiao === 0 && fen === 0)) {
    return "零圆整";
  }
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  if (100000000n === 0n) {
    $panic();
  }
  if (10000n === 0n) {
    $panic();
  }
  const _tmp = Number(BigInt.asIntN(32, BigInt.asUintN(64, BigInt.asIntN(64, BigInt.asUintN(64, BigInt.asIntN(64, yuan) / BigInt.asIntN(64, 100000000n))) % BigInt.asIntN(64, 10000n)))) | 0;
  if (10000n === 0n) {
    $panic();
  }
  if (10000n === 0n) {
    $panic();
  }
  const _tmp$2 = Number(BigInt.asIntN(32, BigInt.asUintN(64, BigInt.asIntN(64, BigInt.asUintN(64, BigInt.asIntN(64, yuan) / BigInt.asIntN(64, 10000n))) % BigInt.asIntN(64, 10000n)))) | 0;
  if (10000n === 0n) {
    $panic();
  }
  const groups = [_tmp, _tmp$2, Number(BigInt.asIntN(32, BigInt.asUintN(64, BigInt.asIntN(64, yuan) % BigInt.asIntN(64, 10000n)))) | 0];
  let emitted = false;
  const _bind$3 = groups.length;
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < _bind$3) {
      const v = groups[i];
      _L: {
        if (v === 0) {
          break _L;
        }
        if (emitted && v < 1000) {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "零");
        }
        _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FP38Magic48618moon_2dminiprogram4yuan13group__to__cn(v));
        _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC15array5Array2atGRPB4JsonE(_M0FP38Magic48618moon_2dminiprogram4yuan12group__units, 2 - i | 0));
        emitted = true;
        break _L;
      }
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (BigInt.asIntN(64, yuan) > BigInt.asIntN(64, 0n)) {
    _M0IPB13StringBuilderPB6Logger13write__string(buf, "圆");
  }
  if (jiao > 0) {
    _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FP38Magic48618moon_2dminiprogram4yuan9digit__cn(jiao));
    _M0IPB13StringBuilderPB6Logger13write__string(buf, "角");
    if (fen > 0) {
      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FP38Magic48618moon_2dminiprogram4yuan9digit__cn(fen));
      _M0IPB13StringBuilderPB6Logger13write__string(buf, "分");
    } else {
      _M0IPB13StringBuilderPB6Logger13write__string(buf, "整");
    }
  } else {
    if (fen > 0) {
      if (BigInt.asIntN(64, yuan) > BigInt.asIntN(64, 0n)) {
        _M0IPB13StringBuilderPB6Logger13write__string(buf, "零");
      }
      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FP38Magic48618moon_2dminiprogram4yuan9digit__cn(fen));
      _M0IPB13StringBuilderPB6Logger13write__string(buf, "分");
    } else {
      _M0IPB13StringBuilderPB6Logger13write__string(buf, "整");
    }
  }
  return buf.val;
}
function _M0FP38Magic48618moon_2dminiprogram4yuan12clean__input(input) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const _bind$3 = input.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = input.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = input.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$4;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$4;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      switch (_decoded_char) {
        case 32: {
          break;
        }
        case 9: {
          break;
        }
        case 13: {
          break;
        }
        case 10: {
          break;
        }
        case 44: {
          break;
        }
        case 65292: {
          break;
        }
        case 65509: {
          break;
        }
        case 165: {
          break;
        }
        default: {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char);
        }
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function _M0FP38Magic48618moon_2dminiprogram4yuan13parse__amount(input) {
  const s = _M0FP38Magic48618moon_2dminiprogram4yuan12clean__input(input);
  if (s.length > 0) {
    let seen_dot = false;
    let decimals = 0;
    let yuan = 0n;
    let fen = 0;
    let has_digit = false;
    const _bind$3 = s.length;
    let _tmp = 0;
    while (true) {
      const _string_index = _tmp;
      if (_string_index < _bind$3) {
        let _decoded_next_string_index;
        let _decoded_char;
        _L: {
          const _bind$4 = s.charCodeAt(_string_index);
          if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
            const _bind$5 = s.charCodeAt(_string_index + 1 | 0);
            if (_bind$5 >= 56320 && _bind$5 <= 57343) {
              const _tmp$2 = _string_index + 2 | 0;
              const _p = (((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            } else {
              const _tmp$2 = _string_index + 1 | 0;
              const _p = _bind$4;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            }
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$4;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        }
        if (_decoded_char >= 48 && _decoded_char <= 57) {
          const d = _decoded_char - 48 | 0;
          has_digit = true;
          if (seen_dot) {
            if (decimals >= 2) {
              return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(input));
            }
            fen = (Math.imul(fen, 10) | 0) + d | 0;
            decimals = decimals + 1 | 0;
          } else {
            yuan = BigInt.asUintN(64, BigInt.asUintN(64, yuan * 10n) + BigInt.asUintN(64, BigInt(d)));
            if (BigInt.asIntN(64, yuan) > BigInt.asIntN(64, 999999999999n)) {
              return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error60Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eOutOfRange(input));
            }
          }
        } else {
          if (_decoded_char === 46) {
            if (seen_dot) {
              return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(input));
            }
            seen_dot = true;
          } else {
            return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(input));
          }
        }
        _tmp = _decoded_next_string_index;
        continue;
      } else {
        break;
      }
    }
    if (has_digit) {
      if (seen_dot && decimals === 0) {
        return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(input));
      }
      while (true) {
        if (decimals < 2) {
          fen = Math.imul(fen, 10) | 0;
          decimals = decimals + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE2Ok({ _0: yuan, _1: fen });
    } else {
      return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(input));
    }
  } else {
    return new _M0DTPC16result6ResultGUliERP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(input));
  }
}
function _M0FP38Magic48618moon_2dminiprogram4yuan9upper__of(yuan, fen) {
  if (fen >= 0 && fen <= 99) {
    if (BigInt.asIntN(64, yuan) >= BigInt.asIntN(64, 0n) && BigInt.asIntN(64, yuan) <= BigInt.asIntN(64, 999999999999n)) {
      return new _M0DTPC16result6ResultGsRP38Magic48618moon_2dminiprogram4yuan8RmbErrorE2Ok(_M0FP38Magic48618moon_2dminiprogram4yuan11upper__body(yuan, fen / 10 | 0, fen % 10 | 0));
    } else {
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(5);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "yuan=");
      _M0MPB13StringBuilder13write__objectGlE(_string_builder, yuan);
      return new _M0DTPC16result6ResultGsRP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error60Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eOutOfRange(_string_builder.val));
    }
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(4);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "fen=");
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, fen);
    return new _M0DTPC16result6ResultGsRP38Magic48618moon_2dminiprogram4yuan8RmbErrorE3Err(new _M0DTPC15error5Error63Magic486_2fmoon_2dminiprogram_2fyuan_2eRmbError_2eInvalidAmount(_string_builder.val));
  }
}
function _M0FP38Magic48618moon_2dminiprogram4yuan14to__rmb__upper(input) {
  const _bind$3 = _M0FP38Magic48618moon_2dminiprogram4yuan13parse__amount(input);
  let _bind$4;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _bind$4 = _ok._0;
  } else {
    return _bind$3;
  }
  const _yuan = _bind$4._0;
  const _fen = _bind$4._1;
  return _M0FP38Magic48618moon_2dminiprogram4yuan9upper__of(_yuan, _fen);
}
function _M0FP38Magic48618moon_2dminiprogram6engine12amount__chip() {
  return new _M0TP38Magic48618moon_2dminiprogram7runtime12ComponentDef("components/amount-chip/amount-chip", _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "text", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "t", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr("String") }, { _0: "value", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr("") }]) }]), _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([]), [{ _0: "onTap", _1: (ctx, _payload) => {
    const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx9get__data(ctx);
    if (_bind$3 === undefined) {
      return;
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      if (_x.$tag === 6) {
        const _Object = _x;
        const _m = _Object._0;
        const _bind$4 = _M0MPB3Map3getGsRPB4JsonE(_m, "text");
        if (_bind$4 === undefined) {
          return;
        } else {
          const _Some$2 = _bind$4;
          const _x$2 = _Some$2;
          if (_x$2.$tag === 4) {
            const _String = _x$2;
            const _s = _String._0;
            _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx14trigger__event(ctx, "pick", _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "value", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(_s) }]));
            return;
          } else {
            return;
          }
        }
      } else {
        return;
      }
    }
  } }], [], []);
}
function _M0FP38Magic48618moon_2dminiprogram6engine13load__history() {
  const h = _M0FP38Magic48618moon_2dminiprogram7runtime12get__storage("rmb_history");
  if (h.$tag === 5) {
    return h;
  } else {
    return _M0FP38Magic48618moon_2dminiprogram7runtime4jarr([]);
  }
}
function _M0FP38Magic48618moon_2dminiprogram6engine13history__page() {
  return new _M0TP38Magic48618moon_2dminiprogram7runtime7PageDef("pages/history/history", _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "items", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jarr([]) }]), [{ _0: "onShow", _1: (ctx, _payload) => {
    _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx9set__data(ctx, _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "items", _1: _M0FP38Magic48618moon_2dminiprogram6engine13load__history() }]));
  } }, { _0: "onItemTap", _1: (_ctx, payload) => {
    const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime7Payload10string__at(payload, ["currentTarget", "dataset", "upper"]);
    if (_bind$3 === undefined) {
      return;
    } else {
      const _Some = _bind$3;
      const _u = _Some;
      _M0FP38Magic48618moon_2dminiprogram7runtime25copy__with__toast_2einner(_u, "大写已复制");
      return;
    }
  } }, { _0: "onClear", _1: (ctx, _payload) => {
    _M0FP38Magic48618moon_2dminiprogram7runtime15confirm_2einner("清空历史", "确定清空全部复制历史吗？", true, (ok) => {
      if (ok) {
        _M0FP38Magic48618moon_2dminiprogram7runtime15remove__storage("rmb_history");
        _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx9set__data(ctx, _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "items", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jarr([]) }]));
        _M0FP38Magic48618moon_2dminiprogram7runtime5toast("已清空", undefined, -1, undefined);
        return;
      } else {
        return;
      }
    });
  } }], []);
}
function _M0FP38Magic48618moon_2dminiprogram6engine11item__upper(it) {
  if (it.$tag === 6) {
    const _Object = it;
    const _m = _Object._0;
    const _bind$3 = _M0MPB3Map3getGsRPB4JsonE(_m, "upper");
    if (_bind$3 === undefined) {
      return "";
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      if (_x.$tag === 4) {
        const _String = _x;
        return _String._0;
      } else {
        return "";
      }
    }
  } else {
    return "";
  }
}
function _M0FP38Magic48618moon_2dminiprogram6engine8remember(input, upper) {
  const entry = _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "input", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(input) }, { _0: "upper", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(upper) }]);
  const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime12get__storage("rmb_history");
  let items;
  if (_bind$3.$tag === 5) {
    const _Array = _bind$3;
    items = _Array._0;
  } else {
    items = [];
  }
  const out = [entry];
  let i = items.length - 1 | 0;
  while (true) {
    if (i >= 0 && out.length < 20) {
      const it = _M0MPC15array5Array2atGRPB4JsonE(items, i);
      const _p = _M0FP38Magic48618moon_2dminiprogram6engine11item__upper(it);
      if (!(_p === upper)) {
        _M0MPC15array5Array4pushGRPB4JsonE(out, it);
      }
      i = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0FP38Magic48618moon_2dminiprogram7runtime12set__storage("rmb_history", _M0FP38Magic48618moon_2dminiprogram7runtime4jarr(out));
}
function _M0FP38Magic48618moon_2dminiprogram6engine14update__amount(ctx, raw) {
  let upper;
  let _try_err;
  _L: {
    _L$2: {
      const _bind$3 = _M0FP38Magic48618moon_2dminiprogram4yuan14to__rmb__upper(raw);
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        upper = _ok._0;
      } else {
        const _err = _bind$3;
        _try_err = _err._0;
        break _L$2;
      }
      break _L;
    }
    upper = "";
  }
  const _p = "";
  const valid = !(upper === _p);
  const hint = raw === "" ? "输入金额，实时生成规范大写" : valid ? "" : "金额格式不正确（支持 0 ~ 9999 亿，最多两位小数）";
  _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx10set__state(ctx, _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "input", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(raw) }, { _0: "upper", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(upper) }, { _0: "valid", _1: _M0FP38Magic48618moon_2dminiprogram7runtime5jbool(valid) }, { _0: "hint", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(hint) }]));
}
function _M0FP38Magic48618moon_2dminiprogram6engine11index__page() {
  const _tmp = { _0: "input", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr("") };
  const _tmp$2 = { _0: "upper", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr("") };
  const _tmp$3 = { _0: "valid", _1: _M0FP38Magic48618moon_2dminiprogram7runtime5jbool(false) };
  const _tmp$4 = { _0: "hint", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr("输入金额，实时生成规范大写") };
  const _p = new Array(_M0FP38Magic48618moon_2dminiprogram6engine7samples.length);
  const _p$2 = _M0FP38Magic48618moon_2dminiprogram6engine7samples.length;
  let _tmp$5 = 0;
  while (true) {
    const _p$3 = _tmp$5;
    if (_p$3 < _p$2) {
      const _p$4 = _M0FP38Magic48618moon_2dminiprogram6engine7samples[_p$3];
      _p[_p$3] = _M0FP38Magic48618moon_2dminiprogram7runtime4jstr(_p$4);
      _tmp$5 = _p$3 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP38Magic48618moon_2dminiprogram7runtime7PageDef("pages/index/index", _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([_tmp, _tmp$2, _tmp$3, _tmp$4, { _0: "samples", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jarr(_p) }]), [{ _0: "onInput", _1: (ctx, payload) => {
    const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime7Payload10string__at(payload, ["detail", "value"]);
    let raw;
    if (_bind$3 === undefined) {
      raw = "";
    } else {
      const _Some = _bind$3;
      raw = _Some;
    }
    _M0FP38Magic48618moon_2dminiprogram6engine14update__amount(ctx, raw);
  } }, { _0: "onSample", _1: (ctx, payload) => {
    const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime7Payload10string__at(payload, ["currentTarget", "dataset", "v"]);
    if (_bind$3 === undefined) {
      return;
    } else {
      const _Some = _bind$3;
      const _v = _Some;
      _M0FP38Magic48618moon_2dminiprogram6engine14update__amount(ctx, _v);
      return;
    }
  } }, { _0: "onCopy", _1: (ctx, _payload) => {
    _L: {
      const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime7PageCtx9get__data(ctx);
      if (_bind$3 === undefined) {
        break _L;
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        if (_x.$tag === 6) {
          const _Object = _x;
          const _m = _Object._0;
          _L$2: {
            const _bind$4 = _M0MPB3Map3getGsRPB4JsonE(_m, "upper");
            if (_bind$4 === undefined) {
              break _L$2;
            } else {
              const _Some$2 = _bind$4;
              const _x$2 = _Some$2;
              if (_x$2.$tag === 4) {
                const _String = _x$2;
                const _upper = _String._0;
                const _p$3 = "";
                if (!(_upper === _p$3)) {
                  const _bind$5 = _M0MPB3Map3getGsRPB4JsonE(_m, "input");
                  if (_bind$5 === undefined) {
                  } else {
                    const _Some$3 = _bind$5;
                    const _x$3 = _Some$3;
                    if (_x$3.$tag === 4) {
                      const _String$2 = _x$3;
                      const _input = _String$2._0;
                      _M0FP38Magic48618moon_2dminiprogram6engine8remember(_input, _upper);
                    }
                  }
                  _M0FP38Magic48618moon_2dminiprogram7runtime25copy__with__toast_2einner(_upper, "大写已复制");
                  return;
                } else {
                  _M0FP38Magic48618moon_2dminiprogram7runtime13toast_2einner("请先输入有效金额", 3, false, 1500);
                  return;
                }
              } else {
                break _L$2;
              }
            }
          }
          _M0FP38Magic48618moon_2dminiprogram7runtime13toast_2einner("请先输入有效金额", 3, false, 1500);
          return;
        } else {
          break _L;
        }
      }
    }
    _M0FP38Magic48618moon_2dminiprogram7runtime13toast_2einner("请先输入有效金额", 3, false, 1500);
  } }, { _0: "goHistory", _1: (_ctx, _payload) => {
    _M0FP38Magic48618moon_2dminiprogram7runtime12navigate__to("/pages/history/history");
  } }, { _0: "onPick", _1: (ctx, payload) => {
    const _bind$3 = _M0MP38Magic48618moon_2dminiprogram7runtime7Payload10string__at(payload, ["detail", "value"]);
    if (_bind$3 === undefined) {
      return;
    } else {
      const _Some = _bind$3;
      const _v = _Some;
      _M0FP38Magic48618moon_2dminiprogram6engine14update__amount(ctx, _v);
      return;
    }
  } }], []);
}
function _M0FP38Magic48618moon_2dminiprogram6engine18ensure__registered() {
  if (!_M0FP38Magic48618moon_2dminiprogram6engine10registered.val) {
    _M0FP38Magic48618moon_2dminiprogram7runtime13register__app(new _M0TP38Magic48618moon_2dminiprogram7runtime6AppDef([{ _0: "onLaunch", _1: (_ctx, _payload) => {
    } }], _M0FP38Magic48618moon_2dminiprogram7runtime4jobj([{ _0: "version", _1: _M0FP38Magic48618moon_2dminiprogram7runtime4jstr("0.1.0") }])));
    _M0FP38Magic48618moon_2dminiprogram7runtime14register__page(_M0FP38Magic48618moon_2dminiprogram6engine11index__page());
    _M0FP38Magic48618moon_2dminiprogram7runtime14register__page(_M0FP38Magic48618moon_2dminiprogram6engine13history__page());
    _M0FP38Magic48618moon_2dminiprogram7runtime19register__component(_M0FP38Magic48618moon_2dminiprogram6engine12amount__chip());
    _M0FP38Magic48618moon_2dminiprogram6engine10registered.val = true;
    return;
  } else {
    return;
  }
}
function _M0FP38Magic48618moon_2dminiprogram6engine6launch() {
  _M0FP38Magic48618moon_2dminiprogram6engine18ensure__registered();
  let _try_err;
  _L: {
    const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime6launch();
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _ok._0;
      return;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
  }
  switch (_try_err.$tag) {
    case 6: {
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw("moon-miniprogram: App 未注册");
      return;
    }
    case 8: {
      const _PageNotFound = _try_err;
      const _p = _PageNotFound._0;
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "moon-miniprogram: 页面未注册 ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _p);
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw(_string_builder.val);
      return;
    }
    default: {
      const _ComponentNotFound = _try_err;
      const _k = _ComponentNotFound._0;
      const _string_builder$2 = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder$2, "moon-miniprogram: 组件未注册 ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder$2, _k);
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw(_string_builder$2.val);
      return;
    }
  }
}
function _M0FP38Magic48618moon_2dminiprogram6engine4page(path) {
  _M0FP38Magic48618moon_2dminiprogram6engine18ensure__registered();
  let _try_err;
  _L: {
    const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime4page(path);
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _ok._0;
      return;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
  }
  switch (_try_err.$tag) {
    case 6: {
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw("moon-miniprogram: App 未注册");
      return;
    }
    case 8: {
      const _PageNotFound = _try_err;
      const _p = _PageNotFound._0;
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "moon-miniprogram: 页面未注册 ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _p);
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw(_string_builder.val);
      return;
    }
    default: {
      const _ComponentNotFound = _try_err;
      const _k = _ComponentNotFound._0;
      const _string_builder$2 = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder$2, "moon-miniprogram: 组件未注册 ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder$2, _k);
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw(_string_builder$2.val);
      return;
    }
  }
}
function _M0FP38Magic48618moon_2dminiprogram6engine9component(key) {
  _M0FP38Magic48618moon_2dminiprogram6engine18ensure__registered();
  let _try_err;
  _L: {
    const _bind$3 = _M0FP38Magic48618moon_2dminiprogram7runtime9component(key);
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _ok._0;
      return;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
  }
  switch (_try_err.$tag) {
    case 6: {
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw("moon-miniprogram: App 未注册");
      return;
    }
    case 8: {
      const _PageNotFound = _try_err;
      const _p = _PageNotFound._0;
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "moon-miniprogram: 页面未注册 ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _p);
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw(_string_builder.val);
      return;
    }
    default: {
      const _ComponentNotFound = _try_err;
      const _k = _ComponentNotFound._0;
      const _string_builder$2 = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder$2, "moon-miniprogram: 组件未注册 ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder$2, _k);
      _M0FP38Magic48618moon_2dminiprogram6engine9js__throw(_string_builder$2.val);
      return;
    }
  }
}
function _M0FP38Magic48618moon_2dminiprogram15engine_2dexport6launch() {
  _M0FP38Magic48618moon_2dminiprogram6engine6launch();
}
function _M0FP38Magic48618moon_2dminiprogram15engine_2dexport4page(path) {
  _M0FP38Magic48618moon_2dminiprogram6engine4page(path);
}
function _M0FP38Magic48618moon_2dminiprogram15engine_2dexport9component(key) {
  _M0FP38Magic48618moon_2dminiprogram6engine9component(key);
}
exports.launch = _M0FP38Magic48618moon_2dminiprogram15engine_2dexport6launch;
exports.page = _M0FP38Magic48618moon_2dminiprogram15engine_2dexport4page;
exports.component = _M0FP38Magic48618moon_2dminiprogram15engine_2dexport9component;
