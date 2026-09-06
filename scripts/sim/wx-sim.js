// moon-miniprogram 无头运行时模拟器（可复用）
// 让任意 MoonBit 小程序引擎在 node 里端到端测试，无需微信开发者工具。
//
// 用法：
//   const sim = require("./sim/wx-sim.js").createWxSim();
//   sim.install();                       // 挂载 global.wx / App / Page / Component
//   require("./moon-engine.js").launch();
//   sim.pageCfg.data;                    // 页面初始 data
//   sim.makeInstance(cfg.data);          // 造实例（setData 路径合并 + 事件记录）
//   sim.calls;                           // 所有 wx.* 调用名（可断言）
//   sim.storage;                         // 模拟存储 Map
"use strict";

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

function createWxSim() {
  const sim = {
    calls: [],
    storage: new Map(),
    appCfg: null,
    pageCfg: null,
    componentCfg: null,
    installed: false,
  };

  const wx = {};
  const noopApis = [
    "showToast", "hideToast", "showModal", "setClipboardData",
    "redirectTo", "switchTab", "navigateBack",
    "vibrateShort", "vibrateLong", "showLoading", "hideLoading",
    "stopPullDownRefresh", "setNavigationBarTitle", "pageScrollTo",
    "makePhoneCall", "showNavigationBarLoading", "hideNavigationBarLoading",
    "setNavigationBarColor", "setScreenBrightness", "setKeepScreenOn",
  ];
  for (const name of noopApis) {
    wx[name] = () => sim.calls.push(name);
  }
  wx.navigateTo = (opts) => {
    sim.calls.push("navigateTo");
    sim.navigations.push(opts && opts.url);
  };
  sim.navigations = [];
  wx.chooseImage = (opts) => {
    sim.calls.push("chooseImage");
    if (opts && typeof opts.success === "function") {
      opts.success({ tempFilePaths: [] });
    }
  };
  wx.request = (opts) => {
    sim.calls.push("request");
    if (opts && typeof opts.success === "function") {
      opts.success({ statusCode: 200, data: {}, header: {} });
    }
  };
  wx.setStorageSync = (k, v) => sim.storage.set(k, v);
  wx.getStorageSync = (k) => (sim.storage.has(k) ? sim.storage.get(k) : "");
  wx.removeStorageSync = (k) => sim.storage.delete(k);
  wx.clearStorageSync = () => sim.storage.clear();

  sim.install = () => {
    if (sim.installed) return sim;
    sim.installed = true;
    global.wx = wx;
    global.App = (cfg) => {
      sim.appCfg = cfg;
    };
    global.Page = (cfg) => {
      sim.pageCfg = cfg;
    };
    global.Component = (cfg) => {
      sim.componentCfg = cfg;
    };
    return sim;
  };

  // 构造页面/组件实例：data 深拷贝；setData 记录补丁并按路径合并（微信语义）
  sim.makeInstance = (initial) => {
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
  };

  return sim;
}

module.exports = { createWxSim, setByPath };
