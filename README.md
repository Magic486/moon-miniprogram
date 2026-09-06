# moon-miniprogram

**用 MoonBit 开发微信小程序**：业务逻辑全部是纯 MoonBit 代码——类型安全、可单测、
可属性测试；构建产物为单个 CommonJS 模块，页面与组件文件仅剩一行装配代码。

![version](https://img.shields.io/badge/version-0.4.2-blue)
![tests](https://img.shields.io/badge/tests-37%20unit%20%E2%9C%93%20%7C%2038%20smoke%20%E2%9C%93-green)
![license](https://img.shields.io/badge/license-Apache--2.0-lightgrey)
![moon](https://img.shields.io/badge/MoonBit-js%20backend-orange)
[![CI](https://github.com/Magic486/moon-miniprogram/actions/workflows/ci.yml/badge.svg)](https://github.com/Magic486/moon-miniprogram/actions)

[mooncakes.io 包](https://mooncakes.io) ｜ [使用指南](docs/使用指南.md) ｜ [API 覆盖对照表](docs/API覆盖对照表.md) ｜ [跨端设计 RFC](docs/rfc/0001-平台适配设计.md)

---

## 目录

- [为什么需要它](#为什么需要它)
- [特性](#特性)
- [快速开始](#快速开始)
- [概念速览](#概念速览)
- [性能](#性能)
- [测试](#测试)
- [文档](#文档)
- [仓库结构](#仓库结构)
- [参与](#参与)

---

## 为什么需要它

微信小程序的原生开发方式把业务逻辑写进 `Page({...})` 回调，与运行时深度耦合，
存在四个长期问题：

| 原生开发的现状 | moon-miniprogram |
|---|---|
| 逻辑只能在微信开发者工具里手动验证 | 业务是纯 MoonBit，`moon test` 单命令验证 |
| `this.data.xxx` / `e.detail.value` 依赖字符串 key | 全链路类型化，错误在编译期暴露 |
| `setData` 整包透传，列表页越大越卡 | `set_state` 自动 diff，只发送变化的路径 |
| 业务逻辑困在页面闭包，无法复用 | 逻辑是独立包，可发布到 mooncakes 复用 |

MoonBit 的 JS 后端使整个方案**零运行时依赖**：业务代码与框架编译进同一个
`moon-engine.js`，微信侧每个文件仅需一行 `require` 装配。

## 特性

- **状态自动 diff** — `set_state` 采用 React setState 语义做部分合并，由 diff
  引擎展开为最小 setData 路径补丁；数据未变化时完全不调用 setData。实测单次
  更新传输量最多缩小约 713 倍（见[性能](#性能)）
- **跨页共享状态** — `create_store` + 页面 `bind_store`，一处更新、所有订阅页面
  自动收到最小补丁
- **声明式路由** — `register_route` 声明路径与参数白名单；导航不手拼 URL，
  越界参数自动剥离并提示，绝不抛异常
- **完整页面 / 组件 / App 模型** — 组件属性类型自动翻译、observers、
  pageLifetimes、带返回值钩子（onShareAppMessage / onShareTimeline /
  onAddToFavorites）、全局数据
- **无头测试基建** — 内置微信运行时模拟器（路径感知 setData + wx 调用留痕），
  不使用微信开发者工具即可端到端测试
- **CLI 与脚手架** — `scripts/new.cjs` 生成项目；`mmp.cjs` 提供
  check / test / build / dev（watch）/ release 一条龙

## 快速开始

```bash
# 1. 创建新项目（自动从 mooncakes 拉取框架）
node scripts/new.cjs myapp
cd myapp

# 2. 业务单测（无需微信工具）
node mmp.cjs test

# 3. 构建并装配到小程序壳；或进入 watch 模式
node mmp.cjs build
node mmp.cjs dev

# 4. 微信开发者工具（测试号）打开 myapp/miniprogram/
```

业务代码示例（`engine/engine.mbt`）：

```moonbit
let counter_page : @mp.PageDef = {
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
      // set_state 自动 diff：实际 setData 仅含 count 的变化路径
      ctx.set_state(@mp.jobj([("count", @mp.jnum(n))]))
    }),
  ],
  returns: [],  // 带返回值的钩子（onShareAppMessage 等）
}
```

```javascript
// app.js / pages/index/index.js
require("./engine/moon-engine.js").launch();
require("../../engine/moon-engine.js").page("pages/index/index");
```

## 概念速览

| 概念 | 说明 | 文档 |
|---|---|---|
| `PageDef` | 页面的全部声明：路径、data、事件处理器 | [页面与事件](docs/使用指南.md#页面与事件) |
| `set_state` / `set_data` / `replace_state` | 状态式（自动 diff）／补丁式／全量替换 | [状态管理](docs/使用指南.md#状态管理) |
| `create_store` + `bind_store` | 跨页共享状态，一处 set 全员同步 | [跨页 store](docs/使用指南.md#跨页状态-store) |
| `ComponentDef` | 组件属性 schema、observers、pageLifetimes、triggerEvent | [自定义组件](docs/使用指南.md#自定义组件) |
| `register_route` + `navigate_to_route` | 声明式路由与参数白名单 | [路由与导航](docs/使用指南.md#路由与导航) |
| wx 能力 | 数据/交互/设备/媒体/文件/位置/网络等约 55 个绑定 | [wx API 参考](docs/使用指南.md#wx-api-参考) |

## 性能

微信官方要求「setData 只传变化路径」，本框架将之设为默认行为，并用
**快照测试持续回归**（`runtime/bench_test.mbt`；数值 = 一次更新的 JSON 字节数）：

| 场景 | `set_state` 补丁 | 全量 setData | 缩减 |
|---|---|---|---|
| 1000 项清单追加 1 项 | **49 B** | 34,959 B | **约 713×** |
| 深层对象修改一个叶子 | 24 B | 75 B | 3× |
| 数据无变化 | **0 B**（不调用 setData） | 75 B | — |
| 头部删除 1/1000（最坏情况） | 34,895 B | 34,895 B | 1×（如实报告） |
| 追加 100 项 | 4,815 B | 38,438 B | 8× |

## 测试

三层验证，均可在无微信工具的环境运行，任何提交前必须全部通过：

```bash
moon test                              # 37 个单测（含 200 轮随机不变式）
powershell scripts/build-example.ps1   # 构建 + 38 项端到端冒烟
```

`scripts/sim/wx-sim.js` 是通用的微信运行时模拟器（App / Page / Component / wx /
storage 全模拟，setData 路径感知，wx 调用留痕），可复用到任意基于本框架的项目。

## 文档

- [📖 使用指南](docs/使用指南.md) — 从零到真机、状态管理、组件、路由、
  无头测试、构建发布与 FAQ
- [📊 wx API 覆盖对照表](docs/API覆盖对照表.md) — 微信官方 API ↔ 本框架逐域对照
- [📐 跨端设计 RFC 0001](docs/rfc/0001-平台适配设计.md) — 平台适配层架构与路线
- 逐函数 docstring 见 mooncakes 包页

## 仓库结构

```text
runtime/          框架核心：Page/App/Component 模型、diff 引擎、store、router、
                  wx 绑定与扩展绑定、平台探测
engine/           最小示例（counter + about + tag；兼作冒烟宿主，不含业务）
engine-export/    CJS 导出包装（foreign_library）
scripts/          new.cjs 脚手架 · mmp.cjs CLI · sim/wx-sim.js 模拟器 · smoke.js · minify.cjs
docs/             使用指南 · API 覆盖对照表 · rfc/
moon.mod          包定义（mooncakes 发布入口）
```

## 参与

```bash
git clone https://github.com/Magic486/moon-miniprogram
cd moon-miniprogram
moon test                                # 37 单测
powershell scripts/build-example.ps1     # 38 冒烟
node scripts/new.cjs demo && cd demo     # 体验脚手架 + CLI
```

- 问题与讨论：[GitHub Issues](https://github.com/Magic486/moon-miniprogram/issues)
- 版本历史：[GitHub Releases](https://github.com/Magic486/moon-miniprogram/releases)
- 包：[mooncakes.io `Magic486/moon-miniprogram`](https://mooncakes.io)

## License

Apache-2.0
