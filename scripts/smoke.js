// 无头冒烟测试：用 sim/wx-sim.js 模拟微信小程序运行时，端到端验证引擎。
// 用法：node scripts/smoke.js <path/to/moon-engine.js>
"use strict";

const path = process.argv[2];
if (!path) {
  console.error("usage: node scripts/smoke.js <moon-engine.js>");
  process.exit(2);
}

const { createWxSim } = require("./sim/wx-sim.js");

let failures = 0;
function check(label, actual, expected) {
  const ok = actual === expected;
  if (!ok) failures += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${label}` +
      (ok ? "" : `\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`),
  );
}

// ---- 模拟微信运行时（sim/wx-sim.js，可复用）----
const sim = createWxSim();
sim.install();

// ---- 装配（与 app.js / 页面 js 等价）----
const engine = require(path);

engine.launch();
check("App() received config", Boolean(sim.appCfg && sim.appCfg.onLaunch !== undefined), true);
check("globalData.version", sim.appCfg.globalData.version, "0.1.0");

engine.page("pages/index/index");
const idx = sim.pageCfg;
check("index initial hint", idx.data.hint, "输入金额，实时生成规范大写");
check("index samples", idx.data.samples.length, 5);
check("index has handlers", typeof idx.onInput === "function" && typeof idx.onCopy === "function", true);

const inst = sim.makeInstance(idx.data);
idx.onInput.call(inst, { detail: { value: "1680.32" } });
check("1680.32 -> upper", inst.data.upper, "壹仟陆佰捌拾圆叁角贰分");
check("1680.32 -> valid", inst.data.valid, true);
check("set_state emits minimal patch (4 keys)", Object.keys(inst.__patches[0]).length, 4);

idx.onInput.call(inst, { detail: { value: "abc" } });
check("abc -> upper empty", inst.data.upper, "");
check("abc -> valid false", inst.data.valid, false);
check("abc -> hint", inst.data.hint.includes("格式不正确"), true);

idx.onInput.call(inst, { detail: { value: "6007.14" } });
check("6007.14 -> upper", inst.data.upper, "陆仟零柒圆壹角肆分");

// set_state 增量性：samples 未提及 → 不出现在补丁中
check("no-op keys absent from patch", "samples" in inst.__patches[inst.__patches.length - 1], false);

idx.onInput.call(inst, { detail: { value: "999999999999.99" } });
check("boundary -> upper", inst.data.upper, "玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖圆玖角玖分");

// 复制 → 写入历史（伴随 toast + 震动等 wx 调用记录）
idx.onInput.call(inst, { detail: { value: "1680.32" } });
idx.onCopy.call(inst);
check("copy triggers clipboard api", sim.calls.includes("setClipboardData"), true);
idx.onCopy.call(inst); // 重复复制不产生重复记录
let hist = global.wx.getStorageSync("rmb_history");
check("history size after dup copy", hist.length, 1);

// 复制第二条，历史最新在前
idx.onInput.call(inst, { detail: { value: "0.02" } });
idx.onCopy.call(inst);
hist = global.wx.getStorageSync("rmb_history");
check("history newest first", hist[0].upper, "贰分");
check("history keeps old", hist[1].upper, "壹仟陆佰捌拾圆叁角贰分");

// 历史页
engine.page("pages/history/history");
const hp = sim.pageCfg;
const hInst = sim.makeInstance(hp.data);
hp.onShow.call(hInst);
check("history page items", hInst.data.items.length, 2);

hp.onItemTap.call(hInst, { currentTarget: { dataset: { upper: "贰分" } } });

// ---- 自定义组件流：注册 → Component() 配置 → 属性翻译 → 事件出去 ----
engine.component("components/amount-chip/amount-chip");
const cc = sim.componentCfg;
check("component properties type translated", cc.properties.text.type, String);
check("component properties default", cc.properties.text.value, "");
const cInst = sim.makeInstance(cc.data);
cInst.data.text = "1680.32";
cc.onTap.call(cInst);
check("component emits pick event", cInst.__events[0].name, "pick");
check("event detail carries value", cInst.__events[0].detail.value, "1680.32");

// 页面消费组件事件：onPick 填入输入并转换
idx.onPick.call(inst, { detail: { value: "1006.01" } });
check("onPick fills input via event", inst.data.upper, "壹仟零陆圆零壹分");

// 未知页面/组件路径应抛错
let threw = false;
try {
  engine.page("pages/none/none");
} catch (e) {
  threw = true;
}
check("unknown page path throws", threw, true);
threw = false;
try {
  engine.component("components/none/none");
} catch (e) {
  threw = true;
}
check("unknown component path throws", threw, true);

console.log(failures === 0 ? "\nALL SMOKE TESTS PASSED" : `\n${failures} SMOKE TEST(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
