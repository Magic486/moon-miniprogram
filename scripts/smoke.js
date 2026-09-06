// 无头冒烟测试：用 sim/wx-sim.js 模拟微信运行时，端到端验证 engine fixture。
// 覆盖：装配链路、set_state 最小补丁、组件属性/事件、returns 钩子、wx 调用、错误路径。
// 用法：node scripts/smoke.js <path/to/moon-engine.js>
"use strict";

const path = require("path");
const enginePath = path.resolve(process.argv[2]);
if (!process.argv[2] || !require("fs").existsSync(enginePath)) {
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
const engine = require(enginePath);

// ---- App 装配 ----
engine.launch();
check("App() received config", Boolean(sim.appCfg && typeof sim.appCfg.onLaunch === "function"), true);
check("globalData.version", sim.appCfg.globalData.version, "0.3.4");
check("App onError global hook bound", typeof sim.appCfg.onError === "function", true);

// ---- counter 页面 ----
engine.page("pages/index/index");
const idx = sim.pageCfg;
check("counter initial count", idx.data.count, 0);
check("counter handlers bound", typeof idx.onTap === "function" && typeof idx.onCopy === "function" && typeof idx.onPick === "function", true);

const inst = sim.makeInstance(idx.data);

// 点一次 +1：补丁应只含 count（最小化），data 更新
idx.onTap.call(inst);
check("count after tap", inst.data.count, 1);
check("minimal patch (only count)", Object.keys(inst.__patches[0]).length === 1 && "count" in inst.__patches[0], true);

// 再点一次：补丁里不该出现未提及的键（tip/picked 没变化）
idx.onTap.call(inst);
const p2 = inst.__patches[inst.__patches.length - 1];
check("no-op keys absent from patch", !("tip" in p2) && !("picked" in p2), true);
check("count after two taps", inst.data.count, 2);

// 复制当前计数 → 走 wx 绑定链：clipboard + toast + vibrate
idx.onCopy.call(inst);
check("onCopy -> setClipboardData", sim.calls.includes("setClipboardData"), true);
check("onCopy -> showToast", sim.calls.includes("showToast"), true);
check("onCopy -> vibrateShort", sim.calls.includes("vibrateShort"), true);
check("storage not touched by copy", sim.storage.size, 0);

// ---- tag 自定义组件：属性翻译 → 事件出去 ----
engine.component("components/tag/tag");
const cc = sim.componentCfg;
check("component properties type translated", cc.properties.text.type, String);
check("component properties default", cc.properties.text.value, "");
const cInst = sim.makeInstance(cc.data);
cInst.data.text = "hello-moonbit";
cc.onTap.call(cInst);
check("component emits pick event", cInst.__events[0].name, "pick");
check("event detail carries text", cInst.__events[0].detail.value, "hello-moonbit");

// 页面消费组件事件：onPick 把 detail.value 写入 picked
idx.onPick.call(inst, { detail: { value: "hello-moonbit" } });
check("onPick consumes event", inst.data.picked, "hello-moonbit");
check("onPick patch minimal", Object.keys(inst.__patches[inst.__patches.length - 1]).length === 1, true);

// ---- 跨页 store 订阅：一处 set，全部订阅页面自动最小同步 ----
const instA = sim.makeInstance(idx.data);
idx.onLoad.call(instA); // counter 订阅 cart：快照注入 cartCount
check("store bind syncs snapshot to A", instA.data.cartCount, 0);
engine.page("pages/about/about");
const ab = sim.pageCfg;
const instB = sim.makeInstance(ab.data);
ab.onLoad.call(instB); // about 订阅同一 cart
check("store bind syncs snapshot to B", instB.data.cartCount, 0);

idx.onBuy.call(instA); // A 里一处 set
check("A view updated by own set", instA.data.cartCount, 1);
check("B auto-synced cross-page", instB.data.cartCount, 1);
const bp = instB.__patches[instB.__patches.length - 1];
check("B receives minimal patch (cartCount only)", Object.keys(bp).length === 1 && bp.cartCount === 1, true);
check("B seed keys untouched", "title" in instB.data && !("title" in bp), true);

ab.onUnload.call(instB); // B 退订
idx.onBuy.call(instA);
check("unbound B not updated", instB.data.cartCount, 1);
check("A keeps updating after B unbound", instA.data.cartCount, 2);

// ---- 声明式路由：白名单参数 → 安全 URL 导航 ----
idx.onGoAbout.call(instA); // from 保留、t 剥离
check(
  "route navigate keeps allowed param",
  sim.navigations[sim.navigations.length - 1],
  "pages/about/about?from=counter",
);
check("navigateTo invoked", sim.calls.includes("navigateTo"), true);
ab.onGoHome.call(instB); // 无参导航
check(
  "route navigate bare path",
  sim.navigations[sim.navigations.length - 1],
  "pages/index/index",
);
idx.onGoAbout.call(instA); // 再导航一次，确认 URL 稳定
check(
  "route url stable across calls",
  sim.navigations[sim.navigations.length - 1],
  "pages/about/about?from=counter",
);

// ---- about 页面：returns（onShareAppMessage 返回对象给微信）----
check("about onShareAppMessage bound", typeof ab.onShareAppMessage === "function", true);
const share = ab.onShareAppMessage.call(sim.makeInstance(ab.data), {});
check("share title", share.title, "moon-miniprogram · 用 MoonBit 写小程序");
check("share path", share.path, "pages/index/index");
// 多 returns 钩子：朋友圈与收藏卡片同样经 JSON 返回
const tl = ab.onShareTimeline.call(sim.makeInstance(ab.data));
check("timeline hook returns title", tl.title, "moon-miniprogram");
const fav = ab.onAddToFavorites.call(sim.makeInstance(ab.data));
check("favorite hook returns title", fav.title, "moon-miniprogram");

// ---- 错误路径：未注册的 page/component 应抛错 ----
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
