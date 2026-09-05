# moon-miniprogram · 兔小程序

**用 MoonBit 编写微信小程序**——把小程序的业务逻辑从"不可测试的 JS 回调泥球"升级为纯函数式的、可无头测试的 MoonBit 代码，一行胶水代码装配回微信运行时。

> 面向 MoonBit 9 月黑客松 · 赛道一（新项目方向）
> 核心库已发布 [mooncakes.io](https://mooncakes.io)：`Magic486/moon-miniprogram@0.2.0`

---

## 为什么

微信小程序的业务逻辑写在 `Page({...})` 的回调里，天然三大痛点：

| 痛点 | 现状 | moon-miniprogram |
|---|---|---|
| **不可单测** | 逻辑与微信全局对象耦合，必须开开发者工具手点 | 逻辑是纯 MoonBit，`moon test` 即验证 |
| **无类型安全** | `this.data` 字符串键、`e.detail.value` 全靠拼写记忆 | `set_state(Json)`、`payload.string_at(["detail","value"])` 全链路类型化 |
| **无性能抓手** | `setData` 全量透传，列表页越用越卡 | `set_state` 自动 diff，只发变化叶子路径（官方推荐做法的自动化） |
| **不可复用** | 业务函数困在页面闭包里 | 逻辑是独立库（如 `yuan` 人民币大写库），mooncakes 发布复用 |

MoonBit 的 JS 后端让这件事零运行时依赖：**编译产物就是一个 CommonJS 模块**（约 230 KB，含框架与业务），小程序页面文件只剩一行装配代码。

## 30 秒上手

### 1. 定义页面（纯 MoonBit，可单测）

```moonbit
// pages.mbt
fn index_page() -> @mp.PageDef {
  {
    path: "pages/index/index",
    data: @mp.jobj([("count", @mp.jnum(0.0))]),
    handlers: [
      ("onTap", (ctx, _payload) => {
        let n = match ctx.get_data() {
          Some(Json::Object(m)) =>
            match m.get("count") {
              Some(Json::Number(d, ..)) => d + 1.0
              _ => 1.0
            }
          _ => 1.0
        }
        // 状态式更新：自动 diff 出最小路径补丁（如 {"count": 3}）
        ctx.set_state(@mp.jobj([("count", @mp.jnum(n))]))
      }),
    ],
    returns: [],  // 需要向微信返回值的钩子（onShareAppMessage 等）放这里
  }
}
```

### 2. 导出引擎（CommonJS，微信直接 require）

```moonbit
// engine-export/moon.pkg 设 pkgtype(kind: "foreign_library") + link.js.exports
pub fn launch() -> Unit { @engine.launch() }
pub fn page(path : String) -> Unit { @engine.page(path) }
```

```bash
moon build --target js --release   # 产出 _build/js/release/build/engine-export/engine-export.js
```

### 3. 小程序侧：每文件一行装配

```javascript
// app.js
require("./engine/moon-engine.js").launch();
```

```javascript
// pages/index/index.js — 业务逻辑 0 行
require("../../engine/moon-engine.js").page("pages/index/index");
```

WXML 照常写：`bindtap="onTap"` 直接命中 MoonBit 里注册的同名处理器，`this.setData` 被桥接为 `PageCtx` 方法。

### 0 秒开新项目（脚手架）

```bash
node scripts/new.cjs myshop    # 生成完整骨架：engine + 导出层 + miniprogram 壳
```

## 框架能力

### 状态管理：`set_state` 自动 diff（性能核心）

微信官方文档要求 "setData 只传变化路径" 以降低传输与渲染开销，但手写路径补丁极易出错。本框架把它变成默认行为：

```moonbit
// data: { "list": [..5 项], "total": 0 }
ctx.set_state({ "list": [..原列表, 新项], "total": 42 })
// 框架自动调用 setData({ "list[5]": 新项, "total": 42 })
```

- `set_state`：部分合并（React setState 语义），根键合并 + 叶子路径展开，无变化时不调用 setData
- `replace_state`：全量替换，支持键删除（以父级覆盖实现）
- `set_data`：补丁式透传（等价 this.setData）
- 镜像永远是 `this.data`（微信运行时维护），框架不另存状态——**diff 引擎是纯函数 `diff_to_paths`/`diff_partial`，12 组黄金测试覆盖**

**实测传输量**（快照测试 `runtime/bench_test.mbt` 持续回归，数字为 setData JSON 字节数）：

| 场景 | set_state 补丁 | 全量 setData | 缩减 |
|---|---|---|---|
| 1000 项清单追加 1 项 | **49 B** | 34,959 B | **~713×** |
| 深层对象改一个叶子 | 24 B | 75 B | 3× |
| 数据无变化 | **0 B**（不调用 setData） | 75 B | — |
| 1000 项头部删除 1 项 | 34,895 B | 34,895 B | 1×（最坏情况，如实报告） |
| 追加 100 项 | 4,815 B | 38,438 B | 8× |

### 自定义组件模型

```moonbit
@mp.register_component({
  key: "components/amount-chip/amount-chip",
  properties: @mp.jobj([("text", @mp.jobj([("t", @mp.jstr("String")), ("value", @mp.jstr(""))]))]),
  data: @mp.jobj([]),
  handlers: [("onTap", (ctx, _payload) => {
    let text = /* 从 ctx.get_data() 取属性 */;
    ctx.trigger_event("pick", @mp.jobj([("value", @mp.jstr(text))]))
  })],
  observers: [],
})
```

```javascript
// components/amount-chip/amount-chip.js — 同样一行装配
Component(require("../../engine/moon-engine.js").component("components/amount-chip/amount-chip"));
```

properties 用 JSON 规范描述（`"t": "String"` 由 JS 桥翻译为构造函数，规避 JSON 通道无法传函数的问题）；支持 observers（含微信字段路径语法）与 `triggerEvent`。

### 带返回值的生命周期钩子

`onShareAppMessage` 等钩子需要向微信返回对象——`PageDef.returns` 补全这一环，返回值经 JSON 序列化原样交回运行时。

### wx API 类型绑定

| 类别 | API |
|---|---|
| 应用 | `register_app` / `launch` / `get_global_data` / `set_global_data` |
| 页面 | `register_page` / `page` / `page_config` |
| 组件 | `register_component` / `component` / `component_config` |
| 状态 | `set_state` / `replace_state` / `set_data` / `get_data` / `trigger_event` |
| JSON | `jstr` / `jbool` / `jnum` / `jint` / `jobj` / `jarr` |
| 交互 | `toast` / `hide_toast` / `confirm` / `vibrate_short` |
| 剪贴板 | `set_clipboard` / `copy_with_toast` |
| 缓存 | `get_storage` / `set_storage` / `remove_storage` / `clear_storage` |
| 导航 | `navigate_to` / `redirect_to` / `switch_tab` / `navigate_back` |
| 网络 | `request(url~, http_method~, data~, on_response, on_fail)` |

## 架构

```text
┌───────────────────────── 微信小程序运行时 ─────────────────────────┐
│  app.js / pages/*.js / components/*    WXML / WXSS      wx.* API   │
│      │ 一行装配（launch/page/component）                            │
│      ▼                                                             │
│  ┌──────────────────────────────────────────────────────┐         │
│  │        moon-engine.js（moon build --target js）        │         │
│  │  ┌────────────────────┐  ┌─────────────────────────┐  │         │
│  │  │  你的业务包          │  │  runtime（本框架）        │  │         │
│  │  │  PageDef 组件定义    │  │  注册表 → build_cfg      │  │         │
│  │  │  纯逻辑库（可单测）  │  │  diff 引擎（最小 setData）│  │         │
│  │  └────────────────────┘  └─────────────────────────┘  │         │
│  │           JSON 是桥接通用语：                            │         │
│  │           进 = JSON.stringify → @json.parse             │         │
│  │           出 = Json::stringify → JSON.parse             │         │
│  └──────────────────────────────────────────────────────┘         │
└────────────────────────────────────────────────────────────────────┘
```

**关键设计**

- **this 绑定**：JS 侧用 `function(arg) { handler(this, arg) }`（非箭头函数）包装处理器，页面/组件实例以第一参数进入 MoonBit。
- **JSON 边界**：跨语言数据走 JSON 序列化往返（MoonBit 元组跨 FFI 是 `{_0,_1}` 对象——平行数组传递规避了这一内部表示）。
- **错误转译**：MoonBit 的 `raise` 在 JS 后端编译为 Result 返回值而非异常，导出边界用 `extern "js" throw` 显式转译。
- **属性翻译器**：组件 properties 的 `"t": "String"` 字符串在 JS 桥内映射为构造函数，类型信息不丢。

## 测试策略（三层，全部无头优先）

| 层 | 命令 | 覆盖 |
|---|---|---|
| 单元 | `moon test` | **41 个测试**：diff 引擎 12 组黄金用例 + 200 轮随机不变式（LCG 可复现）、runtime 桥 11、yuan 规范用例 15 |
| 属性 | `moonbitlang/quickcheck` | 大写↔数值随机往返不变式 + 解析输出闭合性 |
| 冒烟 | `node scripts/smoke.js` | node 模拟微信运行时（`scripts/sim/wx-sim.js`，**可复用**：App/Page/Component/wx/storage + 路径感知 setData + 调用记录），**端到端 25 项断言** |
| 验收 | 微信开发者工具 | UI 与真机交互 |

> `sim/wx-sim.js` 是框架自带的测试基建：给月球上任何 MoonBit 小程序项目写无头测试，
> `createWxSim()` 一行接入，`sim.calls` 记录全部 wx 调用供断言。

```bash
moon test                              # 37/37 绿（含 2 个属性测试）
powershell scripts/build-example.ps1   # 构建 + 25/25 冒烟绿
```

## 示范应用：发票助手

`examples/invoice-helper/`——微信开发者工具直接打开即可运行（appid 可用测试号）。

- 输入金额实时生成规范大写（央行《正确填写票据和结算凭证的基本规定》）
- 示例金额用自定义组件 `amount-chip` 呈现（属性进入 → 事件出去 → 页面消费的完整闭环）
- 一键复制 + toast 反馈（`@mp.copy_with_toast`）
- 复制历史自动去重、最新在前（storage）
- `yuan` 库独立可复用：`to_rmb_upper("107000.53")` → `壹拾万柒仟圆伍角叁分`，`from_rmb_upper` 反向解析

页面 JS 文件合计 **3 行代码**（两个页面 + 一个组件），业务逻辑全部位于 `engine/engine.mbt`。

## 本仓库结构

```text
moon-miniprogram/
├── runtime/          # 框架核心（桥接、Page/App/Component 模型、diff 引擎、wx 绑定）
├── yuan/             # 人民币大写金额库（双向转换，纯逻辑，独立可复用）
├── engine/           # 示范应用业务（可单测）
├── engine-export/    # CJS 导出包装（foreign_library）
├── examples/invoice-helper/   # 微信开发者工具打开的示范项目
├── docs/参赛说明.md  # 参赛材料草稿
├── scripts/          # build-example.ps1 + smoke.js（无头冒烟）+ new.cjs（脚手架）
└── moon.mod
```

## 路线图

- [x] Page/App 模型与 wx 类型绑定
- [x] `set_state` 自动 diff（最小化 setData）
- [x] `Component()` 模型（properties/observers/triggerEvent）
- [x] 带返回值钩子（onShareAppMessage 类）
- [x] 脚手架 CLI（`node scripts/new.mjs`）
- [ ] 分包加载 / 独立分包支持
- [ ] data 变更订阅（跨页通信）
- [ ] 多端适配层：支付宝小程序 / 抖音小程序

## 参与

```bash
git clone https://github.com/Magic486/moon-miniprogram
cd moon-miniprogram
moon test
powershell scripts/build-example.ps1
node scripts/new.cjs myapp && cd myapp && moon test   # 体验脚手架
# 微信开发者工具打开 examples/invoice-helper/
```

License: Apache-2.0
