# moon-miniprogram · 兔小程序

**用 MoonBit 编写微信小程序**：把业务逻辑写成纯 MoonBit——类型安全、可单测、可属性测试——
一行胶水代码装配回微信运行时。

> 面向 MoonBit 9 月黑客松 · 赛道一 · 完善 MoonBit 生态方向
> 已发布 [mooncakes.io](https://mooncakes.io)：`Magic486/moon-miniprogram@0.3.0`

## 解决的问题

| 微信小程序原生开发现状 | moon-miniprogram |
|---|---|
| 逻辑与 `Page({...})` 回调深度耦合，只能开工具手点 | 逻辑是纯 MoonBit，`moon test` 即验证 |
| 字符串键、拼写靠记忆，运行时才炸 | 全链路类型化：`Json` 访问器 + 编译期拦截 |
| `setData` 整包透传，列表页越用越卡 | `set_state` 自动 diff，**只发变化的叶子路径** |
| 业务困在页面闭包，无法复用 | 逻辑独立成库，mooncakes 发布复用 |

MoonBit 的 JS 后端让这零运行时依赖：编译产物就是单个 CommonJS 模块，
页面/组件文件只剩一行装配代码。

## 30 秒上手

```moonbit
// engine/engine.mbt —— 页面定义（纯 MoonBit）
let counter_page : @mp.PageDef = {
  path: "pages/index/index",
  data: @mp.jobj([("count", @mp.jnum(0.0))]),
  handlers: [(
    "onTap",
    (ctx, _payload) => {
      let n = match ctx.get_data() {
        Some(Json::Object(m)) =>
          match m.get("count") {
            Some(Json::Number(d, ..)) => d + 1.0
            _ => 1.0
          }
        _ => 1.0
      }
      // 自动 diff：实际 setData 只含 count 的路径补丁
      ctx.set_state(@mp.jobj([("count", @mp.jnum(n))]))
    },
  )],
  returns: [],  // 带返回值的钩子（onShareAppMessage 等）放这里
}
```

```javascript
// app.js / pages/index/index.js —— 各一行装配
require("./engine/moon-engine.js").launch();
require("../../engine/moon-engine.js").page("pages/index/index");
```

```bash
moon build --target js --release          # 产出 engine-export.js
node scripts/minify.cjs <engine-export.js> # 233 KB → 134 KB（terser）
```

**开新项目**：`node scripts/new.cjs myapp` —— 生成完整骨架（业务包 + 导出层 +
小程序壳 + 示例测试），生成的项目直接从 mooncakes 拉取本框架编译。

## 核心能力

### 状态管理：`set_state` 自动 diff + 跨页 store

微信官方要求 "setData 只传变化路径"，手写极易出错。框架让它成为默认行为：
部分合并（React setState 语义）、根键合并 + 叶子路径展开 + 数组下标级最小补丁、
**数据无变化时零 setData**。

**跨页状态订阅（对标 React context / mobx）**——多页面共享同一数据源：

```moonbit nocheck
let cart = @mp.create_store("cart", @mp.jobj([("cartCount", @mp.jnum(0.0))]))

// 任意页面 onLoad 订阅：快照立即同步进页面 data
("onLoad", (ctx, _) => ctx.bind_store(cart))
("onUnload", (ctx, _) => ctx.unbind_store(cart))

// 任一页面处理器里一处更新 → 所有订阅页面自动收到最小补丁
("onBuy", (ctx, _) => { cart.set(@mp.jobj([("cartCount", @mp.jnum(1.0))])) })
```

`store.set` 对每个订阅页面走同一 diff 引擎：只推变化的键（无变化的页面零 setData），
页面/组件均可订阅，同名键以 store 为准。

**实测传输量**（快照测试 `runtime/bench_test.mbt` 持续回归，单位 = setData JSON 字节）：

| 场景 | `set_state` 补丁 | 全量 setData | 缩减 |
|---|---|---|---|
| 1000 项清单追加 1 项 | **49 B** | 34,959 B | **~713×** |
| 深层对象改一个叶子 | 24 B | 75 B | 3× |
| 数据无变化 | **0 B**（不调用 setData） | 75 B | — |
| 头部删除 1/1000（最坏） | 34,895 B | 34,895 B | 1×（如实报告） |
| 追加 100 项 | 4,815 B | 38,438 B | 8× |

### 页面 / 组件模型

- `PageDef`：data + handlers + returns（onShareAppMessage 类需要向微信返回对象的钩子）
- `AppDef`：onLaunch + globalData（`get_global_data` / `set_global_data`）
- `ComponentDef`：properties（JSON 规范描述，`"t":"String"` 由 JS 桥翻译为构造函数）、
  observers、pageLifetimes、`trigger_event` 出事件
- 注册入口：`register_page` / `register_component` / `register_app`，幂等且可单测

### wx API 类型绑定（~30 个，持续补全）

toast / loading / confirm / clipboard（copy_with_toast）/ storage /
navigation / pageScrollTo / stopPullDownRefresh / setNavTitle / chooseImage /
makePhoneCall / request（statusCode + header 齐备）/ vibrate / share_card…

## 架构

```text
┌───────────── 微信小程序运行时 ─────────────┐
│  app.js · pages/*.js（一行装配）   WXML     │
│       ▼                                    │
│  moon-engine.js（moon build 产物）           │
│   ┌──────────────┐   ┌──────────────────┐  │
│   │ 你的业务包    │   │ runtime（本框架）   │  │
│   │ PageDef 定义 │   │ 注册表 → cfg 构建   │  │
│   │ 纯逻辑（单测）│   │ diff 引擎          │  │
│   └──────────────┘   └──────────────────┘  │
│        JSON 是桥接通用语（事件进 / 补丁出）    │
└────────────────────────────────────────────┘
```

关键决策：
- **this 绑定**：JS 侧 `function(arg){ handler(this, arg) }`（非箭头）包处理器
- **元组跨 FFI** 是 `{_0,_1}` 对象 → 平行 FixedArray 传列表
- **`raise` 编译为 Result** → 导出边界用 `extern "js" throw` 显式转译
- **properties 属性翻译器**：类型名字符串在 JS 桥内映射为构造函数

## 测试（框架的立身之本）

| 层 | 命令 | 覆盖 |
|---|---|---|
| 单元 | `moon test` | **31 个测试**：diff 黄金用例 12 + 200 轮随机不变式 + 桥接 11 + store 订阅 3 + 路由 4 |
| 冒烟 | `node scripts/smoke.js` | **35 项断言**，端到端跑通 App/页面/组件/跨页 store/声明式路由链路 |
| 验收 | 微信开发者工具 | 用脚手架项目做真机验证 |

**`scripts/sim/wx-sim.js`** —— 可复用无头模拟器：给任何 MoonBit 小程序项目
写端到端测试（App/Page/Component/wx/storage 模拟、**路径感知 setData**、wx 调用记录），
一行 `createWxSim().install()` 接入。这是其它小程序框架不标配的测试基建。

## 仓库结构

```text
runtime/          # 框架核心：Page/App/Component 模型、diff 引擎、wx 绑定
engine/           # 最小示例 fixture（counter + about + tag，冒烟宿主）
engine-export/    # CJS 导出包装（foreign_library）
scripts/          # new.cjs 脚手架 · wx-sim.js 模拟器 · smoke.js · minify.cjs
docs/参赛说明.md  # 参赛材料草稿
```

### 声明式路由（不手拼 url）

```moonbit nocheck
@mp.register_route({ path: "pages/about/about", params: ["from"] })

// 页面 handler 里导航：合法参数保留、拼写错的参数自动剥离 + dev 警告
("onGo", (_ctx, _) => @mp.navigate_to_route(
  "pages/about/about",
  params={ "from": "index", "fromm": "拼错了" },  // fromm 被剥离并 warn
))
// 还有 redirect_to_route / switch_tab_route
```

接收端在 onLoad 用 `payload.string_at(["from"])` 读参数。
路由未注册 / 参数越界都只 `console.warn` + 安全降级，**绝不 raise**——页面 handler 调用零风险。

## 路线图

- [x] Page/App/Component 模型 + wx 绑定 + `set_state` 自动 diff
- [x] 带回值钩子、pageLifetimes、全局数据
- [x] 可复用无头模拟器 + 脚手架 + 基准快照
- [x] **跨页状态订阅**（对标 React context：一处 set，订阅页面自动最小同步）
- [x] **声明式路由**（RouteDef 白名单参数 + 类型安全导航 + dev 警告安全降级）
- [ ] **CLI 一键化**（dev 自动 build+watch、test、build release）
- [ ] 错误边界与 dev 警告、API 覆盖到常用 60+

## 参与

```bash
git clone https://github.com/Magic486/moon-miniprogram
cd moon-miniprogram
moon test && powershell scripts/build-example.ps1   # 四绿
node scripts/new.cjs myapp && cd myapp && moon test # 体验脚手架
```

License: Apache-2.0
