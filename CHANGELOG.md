# Changelog

本项目的所有重要变更记录于此。版本遵循语义化版本。

## [0.3.2] - 2026-09-06

### Added（声明式路由）
- **`register_route` / RouteDef**：集中声明页面路径 + query 参数白名单。
- **`navigate_to_route` / `redirect_to_route` / `switch_tab_route`**：不再手拼 url；
  合法参数保留并正确 URI 编码，白名单外的键**自动剥离 + console.warn**，
  未注册路由同样警告降级——**绝不 raise**，页面 handler 内调用零风险。
- **`route_url`** 纯函数（编码/去 .0/布尔文本，可单测）；
  `route_registered` / `route_allowed_params` / `route_count` 调试助手。
- wx_call 加无 wx 环境 guard（node 单测安全）；sim 的 navigateTo 记录导航 URL。
- fixture：counter→about 带参导航（from 保留、t 剥离演示）、about→index 无参导航。
- 单测 +4（url 编码/注册表/白名单剥离/安全降级）；冒烟 +4（35 断言）。

### Changed
- `runtime/router.mbt` 新增；单测 31。

## [0.3.1] - 2026-09-06

### Added（对标 React context 的跨页状态层）
- **`create_store` / `Store::set` / `Store::snapshot`**：跨页单一状态源
  （顶层键合并更新）。
- **`PageCtx::bind_store` / `unbind_store`**：页面/组件订阅；bind 即同步快照，
  `store.set` 一处更新 → 所有订阅页面自动收到**最小化 setData 补丁**
  （复用 diff 引擎，无变化页面零调用）；bind 幂等，unbind 防悬挂引用。
- fixture 更新：counter 页与 about 页共享 cart store（onBuy 一处 set → 两页同步），
  冒烟增加跨页同步/最小补丁/退订停止等 8 项断言。
- 单测 +3（store 订阅语义/幂等/键覆盖）；`Store::subscriber_count`/`label` 调试助手。

### Changed
- `runtime/store.mbt` 新增；冒烟 31 断言、单测 27。

## [0.3.0] - 2026-09-06

### Removed（聚焦重构）
- **移除 `yuan/`（人民币大写库）**：与"小程序框架"叙事无关，属拼盘。
  专项能力应从业务需要里长出来，而不是预先堆砌。
- **移除 `examples/invoice-helper/`（发票助手示范应用）**：demo 稀释焦点。
  可运行宿主改由脚手架 `scripts/new.cjs` 生成。

### Changed
- `engine/` 收敛为**最小能力 fixture**（counter 页面 + about 页面 + tag 组件），
  只演示框架能力、不含业务，兼作端到端冒烟宿主。
- 冒烟断言改为针对 fixture（23 项）；模拟器抽入 `scripts/sim/wx-sim.js`。
- `moon.mod` 移除 quickcheck 依赖；`engine/moon.pkg` 移除 yuan 引用。
- README / 参赛说明重写为框架聚焦版，路线图增加对标 React 的迭代项。

## [0.2.1] - 2026-09-06

### Added
- **补丁传输量基准**：`runtime/bench_test.mbt` 快照持续回归——1000 项清单追加 1 项
  补丁 49B vs 全量 34,959B（~713×），无变化零 setData；README 增加实测数字表。
- **wx API 补绑**：`show_loading` / `hide_loading` / `stop_pull_down_refresh` /
  `set_nav_title` / `page_scroll_to` / `make_phone_call` / `choose_image`。
- **转发卡片 helper**：`share_card(title~, path~, image_url~)` 构造
  onShareAppMessage 返回值。
- **组件 pageLifetimes**：`ComponentDef.page_lifetimes`（组件所在页面 show/hide/resize，
  空时不生成键）。
- **request 补全**：on_response 第三参数暴露响应头。
- **随机不变式测试**：200 轮 LCG 可复现的 diff_partial 根键不变式
  （键在补丁中 ⇔ 值变化且补丁值恒等于新值；自反为空）。
- **可复用模拟器**：`scripts/sim/wx-sim.js`——给任意 MoonBit 小程序引擎写
  无头测试（App/Page/Component/wx/storage 模拟、路径感知 setData、wx 调用记录）。

### Changed
- `PageDef`/`ComponentDef` 构造无需改动（新增字段有默认构造路径）。

## [0.2.0] - 2026-09-06

### Added
- **diff 状态引擎**（`runtime/state.mbt`）：`diff_partial` / `diff_to_paths` 纯函数，
  根键合并 + 叶子路径展开 + 数组下标级最小补丁；无变化时零 setData。
  12 组黄金用例 + 补丁传输量基准快照（1000 项列表追加 1 项：49B vs 34,959B）。
- **PageCtx::set_state / replace_state**：状态式更新入口（部分合并 / 全量替换）。
- **Component 模型**（`runtime/component.mbt`）：`register_component` / `component`，
  properties JSON 规范（`"t"` 类型名由 JS 桥翻译为构造函数）、observers、`trigger_event`。
- **PageDef.returns**：带返回值生命周期钩子（onShareAppMessage / onShareTimeline 类）。
- **全局数据**：`get_global_data` / `set_global_data`。
- **yuan 反向解析**：`from_rmb_upper`（大写 → (元, 分)），容错圆/元、整/正、
  人民币前缀、零省略，万亿复合单位超限拦截。
- **属性测试**：moonbitlang/quickcheck 双属性——大写↔数值随机往返不变式、解析输出闭合性。
- **脚手架**：`scripts/new.cjs <name>` 生成完整项目骨架（生成的项目直接从
  mooncakes 拉取本框架编译）。
- **示范组件**：amount-chip（属性进入 → 事件出去 → 页面消费的最小闭环）。
- **冒烟扩展**：路径感知 setData 模拟、组件事件流、错误路径（25 断言）。

### Changed
- `PageDef` 增加 `returns` 字段（构造处需补 `returns: []`）。
- CI 覆盖 check / test / build / smoke 四绿。

## [0.1.0] - 2026-09-05

### Added
- runtime 核心：Page/App 模型、`PageCtx`（set_data/get_data）、Payload 类型化访问器、
  JSON 构造助手（jstr/jbool/jnum/jint/jobj/jarr）。
- wx API 类型绑定：toast/confirm/clipboard/storage/navigation/request/vibrate。
- yuan 人民币大写金额库（央行规范，9 规范用例）。
- engine + engine-export：示范应用"发票助手"CJS 导出层。
- 无头冒烟测试（node 模拟微信运行时，17 断言）。
- GitHub Actions CI。
