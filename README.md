# moon-miniprogram · 兔小程序

**用 MoonBit 编写微信小程序**——把小程序的业务逻辑从"不可测试的 JS 回调泥球"升级为纯函数式的、可无头测试的 MoonBit 代码，一行胶水代码装配回微信运行时。

> 面向 MoonBit 9 月黑客松 · 赛道一（新项目方向）
> 核心库（runtime + yuan）已发布 [mooncakes.io](https://mooncakes.io)：`Magic486/moon-miniprogram`

---

## 为什么

微信小程序的业务逻辑写在 `Page({...})` 的回调里，天然三大痛点：

| 痛点 | 现状 | moon-miniprogram |
|---|---|---|
| **不可单测** | 逻辑与微信全局对象耦合，必须开开发者工具手点 | 逻辑是纯 MoonBit，`moon test` 即验证 |
| **无类型安全** | `this.data` 字符串键、`e.detail.value` 全靠拼写记忆 | `PageCtx::set_data(Json)`、`Payload::string_at(["detail","value"])` 全链路类型化 |
| **不可复用** | 业务函数困在页面闭包里 | 逻辑是独立库（如本项目的 `yuan` 人民币大写库），可发布 mooncakes 复用 |

MoonBit 的 JS 后端让这件事零运行时依赖：**编译产物就是一个 CommonJS 模块**（约 200 KB，含框架与业务），小程序页面文件只剩一行装配代码。

## 30 秒上手

### 1. 定义页面（纯 MoonBit，可单测）

```moonbit
// pages.mbt
fn index_page() -> @mp.PageDef {
  {
    path: "pages/index/index",
    data: @mp.jobj([("count", @mp.jnum(0.0))]),
    handlers: [
      ("onLoad", (ctx, _payload) => {
        ctx.set_data(@mp.jobj([("ready", @mp.jbool(true))]))
      }),
      ("onTap", (ctx, _payload) => {
        let n = match ctx.get_data() {
          Some(Json::Object(m)) =>
            match m.get("count") {
              Some(Json::Number(d, ..)) => d + 1.0
              _ => 1.0
            }
          _ => 1.0
        }
        ctx.set_data(@mp.jobj([("count", @mp.jnum(n))]))
      }),
    ],
  }
}
```

### 2. 导出引擎（CommonJS，微信直接 require）

```moonbit
// engine.mbt — pkgtype(kind: "foreign_library") + cjs 导出
#export_name("launch")
pub fn launch() -> Unit {
  @mp.register_app({ handlers: [], global_data: @mp.jobj([]) })
  @mp.register_page(index_page())
  @mp.launch()
}

#export_name("page")
pub fn page(path : String) -> Unit {
  @mp.page(path)
}
```

```bash
moon build --target js --release   # 产出 _build/js/release/build/engine/engine.js
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

WXML 照常写：`bindtap="onTap"` 直接命中 MoonBit 里注册的同名处理器，`this.setData` 被桥接为 `PageCtx::set_data`。

## 架构

```text
┌───────────────────────── 微信小程序运行时 ─────────────────────────┐
│  app.js / pages/*.js      WXML / WXSS          wx.* 全局 API        │
│      │ 一行装配                │ 不变                ▲             │
│      ▼                        │                     │             │
│  ┌──────────────────────────────────────────────────────┐         │
│  │        moon-engine.js（moon build --target js）        │         │
│  │  ┌────────────────────┐  ┌─────────────────────────┐  │         │
│  │  │  你的业务包          │  │  runtime（本框架）        │  │         │
│  │  │  PageDef 定义       │  │  Page/App 注册表 →       │  │         │
│  │  │  纯逻辑库（可单测）  │  │  build_page_cfg（CJS）   │  │         │
│  │  └────────────────────┘  └─────────────────────────┘  │         │
│  │           JSON 是桥接通用语：                            │         │
│  │           进 = JSON.stringify → @json.parse             │         │
│  │           出 = Json::stringify → JSON.parse             │         │
│  └──────────────────────────────────────────────────────┘         │
└────────────────────────────────────────────────────────────────────┘
```

**关键设计**

- **this 绑定**：JS 侧用 `function(arg) { handler(this, arg) }`（非箭头函数）包装每个处理器，微信页面实例以第一参数进入 MoonBit，`setData` 桥随取随用。
- **JSON 边界**：所有跨语言数据走 JSON 序列化往返，天然规避 ABI 细节（实测 MoonBit 元组跨 FFI 是 `{_0,_1}` 对象而非数组——平行数组传递规避了这一内部表示）。
- **错误转译**：MoonBit 的 `raise` 在 JS 后端编译为 Result 返回值而非异常，导出边界用 `extern "js" throw` 显式转译。

## 测试策略（三层，全部无头优先）

| 层 | 命令 | 覆盖 |
|---|---|---|
| 单元 | `moon test` | 14 个快照/断言测试：yuan 规范用例 9、runtime 桥 5 |
| 冒烟 | `node scripts/smoke.js` | node 模拟微信运行时（App/Page/wx/storage），**端到端 17 项断言** |
| 验收 | 微信开发者工具 | UI 与真机交互 |

```bash
moon test                        # 14/14 绿
powershell scripts/build-example.ps1   # 构建 + 17/17 冒烟绿
```

## 示范应用：发票助手

`examples/invoice-helper/`——微信开发者工具直接打开即可运行（appid 可用测试号）。

- 输入金额实时生成规范大写（央行《正确填写票据和结算凭证的基本规定》）
- 一键复制 + toast 反馈（`@mp.copy_with_toast`）
- 复制历史自动去重、最新在前（`@mp.get_storage/set_storage`）
- `yuan` 库单独可复用：`to_rmb_upper("107000.53")` → `壹拾万柒仟圆伍角叁分`

业务逻辑全部位于 `engine/engine.mbt`，两个页面 JS 文件合计 **2 行代码**。

## runtime API 一览

| 类别 | API |
|---|---|
| 应用 | `register_app` / `launch` / `register_page` / `page` / `page_config` |
| 页面 | `PageCtx::set_data(Json)` / `PageCtx::get_data` / `Payload::string_at` / `Payload::number_at` / `Payload::json` |
| JSON | `jstr` / `jbool` / `jnum` / `jint` / `jobj` / `jarr` |
| 交互 | `toast` / `hide_toast` / `confirm` / `vibrate_short` |
| 剪贴板 | `set_clipboard` / `copy_with_toast` |
| 缓存 | `get_storage` / `set_storage` / `remove_storage` / `clear_storage` |
| 导航 | `navigate_to` / `redirect_to` / `switch_tab` / `navigate_back` |
| 网络 | `request(url~, http_method~, data~, on_response, on_fail)` |

## 本仓库结构

```text
moon-miniprogram/
├── runtime/          # 框架核心（桥接、Page/App 模型、wx 绑定、JSON 工具）
├── yuan/             # 人民币大写金额库（纯逻辑，独立可复用）
├── engine/           # 示范应用业务（可单测）
├── engine-export/    # CJS 导出包装（foreign_library）
├── examples/invoice-helper/   # 微信开发者工具打开的示范项目
├── scripts/          # build-example.ps1 + smoke.js（无头冒烟）
└── moon.mod
```

## 路线图

- [ ] `Component()` 模型（自定义组件）
- [ ] data 自动 diff（`set_state` → 最小化 `setData` 路径）
- [ ] 分包加载 / 独立分包支持
- [ ] 脚手架 CLI（`moon run cmd/new myapp`）
- [ ] 多端适配层：支付宝小程序 / 抖音小程序（API 面相近，桥接层可复用）

## 参与

```bash
git clone https://github.com/Magic486/moon-miniprogram
cd moon-miniprogram
moon test
powershell scripts/build-example.ps1
# 微信开发者工具打开 examples/invoice-helper/
```

License: Apache-2.0
