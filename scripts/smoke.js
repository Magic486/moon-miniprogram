// 无头冒烟测试：用 node 模拟微信小程序运行时，端到端验证引擎。
// 用法：node scripts/smoke.js <path/to/moon-engine.js>
"use strict";

const path = process.argv[2];
if (!path) {
  console.error("usage: node scripts/smoke.js <moon-engine.js>");
  process.exit(2);
}

let failures = 0;
function check(label, actual, expected) {
  const ok = actual === expected;
  if (!ok) failures += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${label}` +
      (ok ? "" : `\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`),
  );
}

// ---- 模拟微信运行时 ----
const storage = new Map();
global.wx = {
  setStorageSync: (k, v) => storage.set(k, v),
  getStorageSync: (k) => (storage.has(k) ? storage.get(k) : ""),
  removeStorageSync: (k) => storage.delete(k),
  clearStorageSync: () => storage.clear(),
  showToast: () => {},
  hideToast: () => {},
  showModal: () => {},
  setClipboardData: () => {},
  navigateTo: () => {},
  vibrateShort: () => {},
};

let appCfg = null;
let pageCfgs = {};
let componentCfgs = {};
global.App = (cfg) => {
  appCfg = cfg;
};
global.Page = (cfg) => {
  pageCfgs.current = cfg;
};
global.Component = (cfg) => {
  componentCfgs.current = cfg;
};

// setData 支持路径键（"a.b"、"list[2]"），与微信语义一致
function setByPath(obj, pathKey, value) {
  const tokens = [];
  const re = /([^[.\]]+)|\[(\d+)\]/g;
  let base = pathKey.split("[")[0];
  if (base === "") base = pathKey;
  let m;
  while ((m = re.exec(pathKey)) !== null) {
    tokens.push(m[1] !== undefined ? m[1] : Number(m[2]));
  }
  let cur = obj;
  for (let i = 0; i < tokens.length - 1; i++) {
    const k = tokens[i];
    const next = tokens[i + 1];
    if (cur[k] === undefined || cur[k] === null || typeof cur[k] !== "object") {
      cur[k] = typeof next === "number" ? [] : {};
    }
    cur = cur[k];
  }
  cur[tokens[tokens.length - 1]] = value;
}

// 构造页面/组件实例：data 深拷贝；setData 记录补丁并按路径合并
function makeInstance(initial) {
  const inst = { data: JSON.parse(JSON.stringify(initial)) };
  inst.__patches = [];
  inst.setData = (patch) => {
    inst.__patches.push(patch);
    for (const k of Object.keys(patch)) {
      if (k.includes("[") || k.includes(".")) {
        setByPath(inst.data, k, patch[k]);
      } else {
        inst.data[k] = patch[k];
      }
    }
  };
  inst.triggerEvent = (name, detail) => {
    inst.__events = inst.__events || [];
    inst.__events.push({ name, detail });
  };
  return inst;
}

// ---- 装配（与 app.js / 页面 js 等价）----
const engine = require(path);

engine.launch();
check("App() received config", Boolean(appCfg && appCfg.onLaunch !== undefined), true);
check("globalData.version", appCfg.globalData.version, "0.1.0");

engine.page("pages/index/index");
const idx = pageCfgs.current;
check("index initial hint", idx.data.hint, "输入金额，实时生成规范大写");
check("index samples", idx.data.samples.length, 5);
check("index has handlers", typeof idx.onInput === "function" && typeof idx.onCopy === "function", true);

const inst = makeInstance(idx.data);
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

// 复制 → 写入历史
idx.onInput.call(inst, { detail: { value: "1680.32" } });
idx.onCopy.call(inst);
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
const hp = pageCfgs.current;
const hInst = makeInstance(hp.data);
hp.onShow.call(hInst);
check("history page items", hInst.data.items.length, 2);

hp.onItemTap.call(hInst, { currentTarget: { dataset: { upper: "贰分" } } });

// ---- 自定义组件流：注册 → Component() 配置 → 属性翻译 → 事件出去 ----
engine.component("components/amount-chip/amount-chip");
const cc = componentCfgs.current;
check("component properties type translated", cc.properties.text.type, String);
check("component properties default", cc.properties.text.value, "");
const cInst = makeInstance(cc.data);
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
