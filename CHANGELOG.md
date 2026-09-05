# Changelog

本项目的所有重要变更记录于此。版本遵循语义化版本。

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
