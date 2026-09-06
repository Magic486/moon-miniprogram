# moon-miniprogram（兔小程序）

> 用 **MoonBit** 写微信小程序：业务逻辑全部是纯 MoonBit——类型安全、可单测、
> 可属性测试；编译产物是一个 CommonJS 模块，页面 JS 只剩一行装配代码。

![version](https://img.shields.io/badge/version-0.3.5-blue)
![tests](https://img.shields.io/badge/tests-33%20unit%20%E2%9C%93%20%7C%2036%20smoke%20%E2%9C%93-green)
![license](https://img.shields.io/badge/license-Apache--2.0-lightgrey)
![moon](https://img.shields.io/badge/MoonBit-js%20backend-orange)

**阅读建议**：快速了解看 [README](#目录)；想动手做小程序看
[📖 使用指南](docs/使用指南.md)（从零到真机，含全 API 参考）。

---

## 目录

- [为什么有它](#为什么有它)
- [特性](#特性)
- [30 秒上手](#30-秒上手)
- [概念速览](#概念速览)
- [性能](#性能)
- [测试](#测试)
- [使用文档](#使用文档)
- [仓库结构](#仓库结构)
- [路线图](#路线图)
- [参与](#参与)

---

## 为什么有它

微信小程序的官方开发方式是 `Page({...})` 回调 + 手写字符串 key。逻辑与微信运行时
深度耦合，带来四个老毛病：

| 原生开发的现状 | moon-miniprogram |
|---|---|
| 逻辑只能在微信工具里手点验证 | 逻辑是纯 MoonBit，`moon test` 一条命令 |
| `this.data.xxx` / `e.detail.value` 全靠拼写 | 全链路类型化，写错编译期就报 |
| `setData` 整包透传，页面越用越卡 | `set_state` 自动 diff，只发变化的路径 |
| 业务困在页面闭包里，无法复用 | 逻辑是独立包，发布到 mooncakes 复用 |

MoonBit 的 JS 后端让这套东西**零运行时依赖**：业务代码 + 框架编译进同一个
`moon-engine.js`，微信侧每个文件一行 `require` 装配即可。这里是 MoonBit
生态里第一个真正能跑起来的微信小程序方案。

## 特性

- **⚡ 状态自动 diff** —— `set_state` 按 React setState 语义合并，diff 引擎自动展开到
  最小 setData 路径补丁；数据没变化时连 `setData` 都不调（实测单次更新传输量缩小
  [最多 ~713 倍](#性能)）
- **🔀 跨页 store** —— 一个 `create_store` + 页面 `bind_store`，任意页面一处更新，
  所有订阅页面自动收到最小补丁（对标 React context / mobx）
- **🧭 声明式路由** —— `register_route` 白名单参数，导航不手拼 url；拼错参数自动
  剥离并 console.warn，绝不 raise
- **🧩 页面 / 组件 / App 完整模型** —— properties 类型名自动翻译成微信构造函数、
  observers、pageLifetimes、带返回值的钩子（onShareAppMessage）、全局数据
- **🧪 可复用无头测试基建** —— `sim/wx-sim.js` 在 node 里模拟微信运行时
  （含路径感知 setData），任何用本框架的项目都能不装微信工具先测起来
- **🔧 一键 CLI + 脚手架** —— `node scripts/new.cjs` 生成项目，`node mmp.cjs
  check/test/build/dev/release` 一条龙

## 30 秒上手

```bash
# 1. 开新项目（会自动从 mooncakes 拉取本框架）
node scripts/new.cjs myapp && cd myapp

# 2. 单测 / 构建并装配到小程序壳
node mmp.cjs test
node mmp.cjs dev        # watch 模式：.mbt 一变就自动重编译

# 3. 微信开发者工具（测试号即可）打开 myapp/miniprogram/，点按钮看界面
```

生成的业务代码长这样（`engine/engine.mbt`，纯 MoonBit）：

```moonbit
let counter_page : @mp.PageDef = {
  path: "pages/index/index",
  data: @mp.jobj([("count", @mp.jnum(0.0))]),
  handlers: [
    (
      "onTap",  // 名字即微信事件/方法名，WXML bind:tap="onTap" 直接命中
      (ctx, _payload) => {
        let n = match ctx.get_data() {
          Some(Json::Object(m)) =>
            match m.get("count") {
              Some(Json::Number(d, ..)) => d + 1.0
              _ => 1.0
            }
          _ => 1.0
        }
        // set_state：自动 diff，实际 setData 只含 count 的变化路径
        ctx.set_state(@mp.jobj([("count", @mp.jnum(n))]))
      },
    ),
  ],
  returns: [],  // 需要向微信返回对象的钩子（onShareAppMessage 等）放这里
}
```

小程序侧，每个文件只有一行：

```javascript
// app.js            require("./engine/moon-engine.js").launch();
// pages/index/index.js  require("../../engine/moon-engine.js").page("pages/index/index");
```

## 概念速览

| 概念 | 说明 | 更多 |
|---|---|---|
| `PageDef` | 一个页面的全部声明：路径 + data + 事件处理器 | [📖 页面与事件](docs/使用指南.md#页面与事件) |
| `set_state` / `set_data` / `replace_state` | 三种更新方式：状态式（自动 diff）／补丁式（直通）／全量替换 | [📖 状态管理](docs/使用指南.md#状态管理) |
| `create_store` + `bind_store` | 跨页共享状态，一处 set 全员同步 | [📖 跨页状态](docs/使用指南.md#跨页状态-store) |
| `ComponentDef` | 自定义组件：属性 schema、observers、pageLifetimes、triggerEvent | [📖 自定义组件](docs/使用指南.md#自定义组件) |
| `register_route` + `navigate_to_route` | 声明式路由，参数白名单 | [📖 路由与导航](docs/使用指南.md#路由与导航) |
| wx API | toast / storage / 网络 / 导航 / 媒体… 全部类型化绑定 | [📖 wx API 参考](docs/使用指南.md#wx-api-参考) |

## 性能

微信官方要求“setData 只传变化路径”。框架让这一点成为默认行为，并且用
**快照测试持续回归**（`runtime/bench_test.mbt`，单位：一次更新的 JSON 字节数）：

| 场景 | `set_state` 补丁 | 全量 setData | 缩减 |
|---|---|---|---|
| 1000 项清单追加 1 项 | **49 B** | 34,959 B | **~713×** |
| 深层对象改一个叶子 | 24 B | 75 B | 3× |
| 数据无变化 | **0 B**（不调用 setData） | 75 B | — |
| 头部删除 1/1000（最坏情况） | 34,895 B | 34,895 B | 1×（如实报告） |
| 追加 100 项 | 4,815 B | 38,438 B | 8× |

## 测试

三层，全部无头优先，任何提交前必须全绿：

```bash
moon test                              # 33 个单测（含 200 轮随机不变式）
powershell scripts/build-example.ps1   # 构建 + 36 项端到端冒烟（node 模拟微信运行时）
```

`scripts/sim/wx-sim.js` 是对外可复用的**微信运行时模拟器**：App/Page/Component/wx/storage
全模拟、setData 路径感知、wx 调用留痕。用它给自己的项目写无头测试，不用装微信开发者工具。

## 使用文档

完整指南在 [📖 docs/使用指南.md](docs/使用指南.md)，覆盖：

1. [从零到真机](docs/使用指南.md#从零到真机)：脚手架 → CLI → 微信开发者工具全流程
2. [页面与事件](docs/使用指南.md#页面与事件) / [状态管理](docs/使用指南.md#状态管理) /
   [跨页 store](docs/使用指南.md#跨页状态-store) / [自定义组件](docs/使用指南.md#自定义组件)
3. [路由与导航](docs/使用指南.md#路由与导航) / [wx API 参考](docs/使用指南.md#wx-api-参考)
4. [无头测试](docs/使用指南.md#无头测试) / [构建与发布](docs/使用指南.md#构建与发布)
5. [常见坑与 FAQ](docs/使用指南.md#常见坑与-faq)

## 仓库结构

```text
runtime/          框架核心：Page/App/Component 模型、diff 引擎、store、router、wx 绑定
engine/           最小示例 fixture（counter + about + tag，冒烟宿主，无业务）
engine-export/    CJS 导出包装（foreign_library）
scripts/          new.cjs 脚手架 · mmp.cjs 一键 CLI · sim/wx-sim.js 模拟器 · smoke.js · minify.cjs
docs/             使用指南 + 参赛说明
moon.mod          包定义（mooncakes 发布入口）
```

## 路线图

**已完成**

- [x] Page/App/Component 模型 + wx 类型绑定 + `set_state` 自动 diff（含随机不变式）
- [x] 带回值钩子、pageLifetimes、全局数据、可复用无头模拟器
- [x] 跨页状态订阅 store（v0.3.1）
- [x] 声明式路由 + 参数白名单（v0.3.2）
- [x] 一键 CLI + 脚手架（v0.3.3）
- [x] 错误边界钩子 + 重复注册警告 + wx API 覆盖补全（v0.3.4）
- [x] 文档体系化（v0.3.5）

**规划中**

- [ ] 分包 / 独立分包支持
- [ ] 类型化 storage key + 路由参数的反序列化助手
- [ ] 平台插件化（对标 Taro：weapp / 支付宝 / 抖音…）
- [ ] 基础组件/UI 库与物料市场

## 参与

```bash
git clone https://github.com/Magic486/moon-miniprogram
cd moon-miniprogram
moon test                                # 33 单测
powershell scripts/build-example.ps1     # 36 冒烟
node scripts/new.cjs demo && cd demo     # 体验脚手架 + mmp
```

- 反馈 / 讨论：[GitHub Issues](https://github.com/Magic486/moon-miniprogram/issues)
- 包：[mooncakes.io `Magic486/moon-miniprogram`](https://mooncakes.io)
- 里程碑：[GitHub Releases](https://github.com/Magic486/moon-miniprogram/releases)

## License

Apache-2.0
