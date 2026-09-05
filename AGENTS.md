# AGENTS.md — agent 协作规范

本仓库由 MoonBit 编写，供人类与 AI agent 协作维护。改代码前先读这里。

## 工具链

- `moon`（版本见 `moon --version`）；JS 为首选目标：`moon.mod` 中 `preferred_target = "js"`
- Node.js ≥ 20（冒烟测试用）

## 常用命令

```bash
moon check                            # 类型检查（0 error 才算过）
moon test                             # 全部单测（14 个，js 目标）
moon fmt                              # 提交前必须跑
moon info                             # 确认 .mbti 变更是有意的
powershell scripts/build-example.ps1  # 构建 + 无头冒烟 17 断言
```

## 包边界

| 包 | 职责 | 规则 |
|---|---|---|
| `runtime/` | 框架核心：桥接、Page/App 模型、wx 绑定 | 不含业务；extern "js" 只许出现在这里与 engine |
| `yuan/` | 人民币大写金额，纯逻辑 | 禁止平台依赖，保持多后端可编译 |
| `engine/` | 示范应用业务 | 可单测；不直接 `#export_name` |
| `engine-export/` | CJS 导出包装 | 只做转发，禁止逻辑 |

## 已踩过的坑（务必遵守）

1. **`pub struct` 外部不可构造**：需要外部构造的（PageDef/AppDef）必须 `pub(all)`。
2. **MoonBit 无三元运算符**：用 `if/else` 或 `match`，不要写 `? :`。
3. **`raise` 在 JS 后端 = 返回 Result 而非抛异常**：导出给 JS 的函数必须 catch 后经 `js_throw` 转译。
4. **元组跨 FFI 是 `{_0,_1}` 对象**：跨 FFI 传列表一律用平行 `FixedArray`。
5. **多行字符串 `#|` 只能出现在 let 绑定 / FFI / 括号内**。
6. **`#export_name` 与 `moon test` 不兼容**：导出名交给 moon.pkg 的 `link.js.exports`。
7. **const 必须大写**（`MAX_YUAN`），小写用 `let`。
8. **Map 索引 `m[k]` 直接返回 V（可能 panic）**，安全取值用 `m.get(k)`。
9. **Json 构造器**：`Json::Number(Double, repr~)` 带标签参数，模式匹配要写 `Json::Number(d, ..)`；构造优先用 `Json::number/string/boolean` 与 `jstr/jnum/jobj`。
10. **extern "js" 仅 js 后端可用**：runtime 全包按 js 目标走（preferred_target 已设 js）。

## 验收口径

任何改动在提交前必须四绿：`moon check`、`moon test`、`moon fmt`（无 diff）、冒烟 `ALL SMOKE TESTS PASSED`。
