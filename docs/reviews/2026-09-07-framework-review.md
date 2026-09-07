# moon-miniprogram 框架评审与改进计划

评审日期：2026-09-07。基线：本地 `1a7bc78`，模块版本 0.5.0。本次为代码、工具链、测试及开发者体验评审，不代表微信真机认证，也不代表获奖预测。

## 总体判断

项目已经有可工作的 MoonBit 小程序运行时雏形：页面注册、JS 导出、状态 diff、跨页 store、路由、脚手架和 CI 都有实际实现。不是空壳，但距离可推荐给其他人使用的生产框架仍有明显差距。

最重要的问题不是缺少更多 wx 包装函数，而是：已有功能存在原生契约错误；自建测试与实现共享错误假设；业务层仍依赖 Json 和字符串，MoonBit 的类型优势没有充分交付给用户；发布与开发工具的闭环不完整。

建议定位为：**保留原生 WXML/WXSS 和组件生态，提供强类型业务状态、可靠异步任务、可测试状态更新的 MoonBit 微信小程序框架。** 先服务 MoonBit 开发者和愿意渐进接入 MoonBit 的团队。不要把初期目标设为覆盖 Taro、uni-app 的全部跨端能力。

## 已检查的证据

| 检查 | 结果与边界 |
|---|---|
| `moon check` | 通过，2 个警告：未使用的 AppCtx 字段和 js_parse |
| `moon test` | 原有 43 个测试全部通过 |
| `moon build --target js --release` | 通过 |
| `node scripts/smoke.js _build/js/release/build/engine-export/engine-export.js` | 38 条冒烟断言通过 |
| `moon fmt --check` | 通过，不修改源文件 |
| 独立契约探针 | 8 个测试均失败，见附带源码和输出；失败正是待修复问题 |
| 脚手架生成 | 已生成 `_build/auditprobe`，核对依赖与配置路径，未执行其远端依赖安装 |
| 本地历史 | 23 个提交，按 2026-04-29 起算仍为 23 个；没有逐条裁定有效工作量 |
| 开源基础 | 根目录有 LICENSE，moon.mod 声明 Apache-2.0，命名空间非 username 占位符，有 GitHub remote |
| 代码规模 | runtime/engine/engine-export 的非测试 .mbt 约 2,136 个非空物理行；测试文件约 919 行。包括注释和嵌入 JS，不等于有效 MoonBit 代码量 |
| 环境 | moon 0.1.20260713、moonc v0.10.4；环境版本与项目缺陷分开处理 |

Windows PowerShell 的执行策略阻止直接运行 build-example.ps1；已分别执行其构建与 Node 冒烟命令完成等价验证，没有更改系统策略。没有执行真机测试、远端 CI 查询、包发布或上传操作。

## 必须先修的正确性问题

P0 表示在继续宣传完整支持或推荐用户采用前必须修复；P1 表示可靠日常开发必须补齐。这里的优先级是项目工程排序。

| 优先级 | 问题与证据 | 用户影响 | 修复验收 |
|---|---|---|---|
| P0 | `runtime/component.mbt:188` 把自定义方法放在 cfg 顶层；探针得到 `cfg.methods.onTap` 为 undefined | 组件模板事件无法按原生 methods 契约找到处理器；冒烟却直接调用 cc.onTap，掩盖错误 | 区分 methods 与 lifetimes；用独立组件宿主从模板触发点击并收到事件 |
| P0 | `runtime/wx_extra.mbt:197` 把 JS 普通对象传给 `(Json) -> Unit`，未做 MoonBit Json 转换 | 定位返回值不能正常按 Json::Object 匹配；失败分支也错误 | 成功、取消、拒绝、API 不存在都经过正确 FFI 转换；现有 wx_wbtest.mbt:123 的 false 期望必须改正 |
| P0 | `runtime/page.mbt:93` 承诺 replace_state 删除根键，但 `state.mbt:118` 只展开新对象键 | `{keep:1,obsolete:2}` 替换为 `{keep:1}` 后 obsolete 仍保留 | 明确数据根模型：固定 schema 重置，或把业务状态放在可整体替换的子对象；不能把 undefined 当删除方案 |
| P0 | `scripts/new.cjs` 把 project.config.json 放在 miniprogram 内，又设 miniprogramRoot=miniprogram/ | 按文档导入时，目标 app.json 解析为不存在的 miniprogram/miniprogram/app.json | 配置位于项目根并指向 miniprogram/，或留在子目录并指向 ./；在开发者工具实测导入 |
| P1 | `runtime/wx.mbt:112` 给 removeStorageSync 传 `{key:...}`，探针证实不是字符串 | 指定缓存不能正确移除 | 传原生字符串 key；测试写入→删除→读取，而非只记录调用次数 |
| P1 | `runtime/router.mbt:75` 把整数 Double 转 Int；4294967296 实测变成 2147483647 | 订单号、时间戳等路由参数失真 | 保留数值的正确序列化；ID 推荐字符串；覆盖 Int 边界和大整数 |
| P1 | `runtime/router.mbt:103` 参数名未 URL 编码；a&b 实测原样输出 | URL 被拆成不同参数 | 参数名和值分别编码，验证特殊字符和中文 |
| P1 | `runtime/component.mbt:193` 观察器只传第一个参数 | 监听 a,b 时第二个值永久丢失 | 设计独立 ObserverPayload/参数列表；探针期望列表只是建议的桥接形式，不限定最终 API |
| P1 | `runtime/wx_extra.mbt:72` 使用 `Number(res.value) || -1` | 合法亮度 0 被当成失败 -1 | 区分缺失、非法值与零；成功零值回归测试 |

上述 8 个运行时问题由 [探针源码](2026-09-07-probes.mbt.txt) 与 [输出](2026-09-07-probe-results.txt) 记录。脚手架路径问题另由生成结果核验。组件与缓存契约以微信团队的 [组件类型定义](https://raw.githubusercontent.com/wechat-miniprogram/api-typings/master/types/wx/lib.wx.component.d.ts) 和 [API 类型定义](https://raw.githubusercontent.com/wechat-miniprogram/api-typings/master/types/wx/lib.wx.api.d.ts) 交叉核对；微信文档页本次直接访问失败，因此采用官方仓库作为依据。

## 进一步的源码发现

以下是源码可见的问题或设计缺口，尚未全部做独立运行复现，应逐项补回归测试。

1. **dev 遇到一次编译失败就退出。** `scripts/mmp.cjs:33` 调用 process.exit，外层 try/catch 无法让实际进程继续监听。watch 只检查 .mbt，忽略 moon.mod/moon.pkg 修改。需要构建失败后继续监听、保存修正后恢复，并验证配置变更触发。
2. **脚手架版本落后。** new.cjs:41 固定 @0.4.0，与 0.5.0 模块及交接文档不一致。CI 的 scaffold-e2e 也因此不能证明本次源码能被新项目使用。拆成“当前源码消费者测试”与“已发布包安装测试”。
3. **异常路径不能保证清理。** page.mbt:240、component.mbt:102 先执行用户销毁回调再退订；JS 异常会跳过清理。应在 FFI 边界使用 finally 保证退订，再把错误按统一策略报告。
4. **Store 没有释放入口。** all_stores 永久持有所有创建过的 store，卸载时遍历全局目录；动态创建 store 的应用会持续保留对象。需要 dispose 或作用域管理；明确共享键冲突、重入更新与订阅过程中失败的行为。
5. **异步契约不一致。** wx_extra 多用空串、空对象或 -1 表示失败；request/confirm 等直接引用 wx，未共享相同缺失环境处理。用户取消、授权拒绝、网络错误、API 不存在无法统一区分。
6. **网络能力不足以支撑常见登录业务。** request 未暴露请求 headers、timeout、任务取消；只有响应 headers。无法通过现有接口正常设置 Authorization。建议 RequestTask、结构化错误、请求配置与解码器优先于增加零散设备 API。
7. **原生组件扩展不足。** ComponentDef 尚未提供 options、externalClasses、behaviors、relations 等；trigger_event 不提供事件传播选项。应围绕真实原生 UI 库接入挑选必要能力。
8. **导航栏颜色文档错误。** set_nav_bar_color 注释和测试传 white；原生 frontColor 只接受 #ffffff 或 #000000。建议用枚举映射，避免继续散布裸字符串。
9. **空值路径访问不安全。** JsVal::at 只检测 undefined，遇到中间层 null 后还会继续 v[k]。缺失、null、数组越界、不可序列化对象应有明确契约。
10. **特殊状态键未定义。** diff 直接拼接点号和方括号，带这些字符的对象键会被解释为路径。需限制键集合、校验输入，或回退到可安全替换的父对象；根层非对象目前还会产生空路径补丁。
11. **工具分发不完整。** 根目录没有 npm CLI 包，README 安装命令默认读者已有 scripts/new.cjs；生成项目没有完整组件导出脚手架。minify.cjs 固定 npx.cmd，存在平台限制，terser 版本也未锁定。
12. **声明与产物会漂移。** AGENTS.md 仍写 37 个单测；参赛说明有旧版本、旧路线图和未经验证的独有能力宣称。生成接口文件也应通过 moon info 的差异检查维护，不把交接快照当成验收事实。

## 为什么现在还不足以吸引开发者

### 强类型应该覆盖业务模型

PageDef.data、Store 数据仍是 Json；事件名、属性类型、路由参数名仍是 String。连计数器都需要匹配 Json::Object 和 Json::Number。编译器能检查函数签名，却不能阻止把 count 拼错或把数值写成字符串。

建议增加泛型 Page/Store 和明确的 State、Action、事件解码接口；保留低层 Json 兼容层。用户用 MoonBit struct/enum 表达业务状态和动作，序列化只发生在视图边界。不要直接复制一套 React Hooks API：先评估纯 update(state, action) 模型能否更自然地利用 MoonBit 的模式匹配、泛型和测试。

验收：计数器、表单和带参数详情页不需要手工拼 JSON；错误字段类型、错误路由参数类型有编译失败用例；文档示例参与检查。

### 模板、配置与代码要形成闭环

仍使用原生 WXML/WXSS 是合理取舍，但现在 handlers、WXML bind、PageDef.path、app.json 与 JS 装配重复维护。需要页面/组件生成器，以及能定位文件行号的 WXML 事件和配置校验。避免为了单文件组件语法，在比赛前另起一个完整模板编译器。

验收：故意把 onTap 写错、遗漏 usingComponents 或 pages 注册，构建明确失败；新增页面无需手工修改多个登记位置。

### 状态更新要兼顾计算成本和传输成本

现有 set_state 每次 JSON.stringify 整页 data，再在 MoonBit 解析和 diff；store 同步还有额外序列化往返。即使补丁小，也不能据此断定端到端更快。当前没有批处理、flush/next_tick、选择性订阅或性能观测入口。

建议先测量，再做批处理和 selector；在 patch 条目多、路径开销更大时比较整子树替换成本，避免把“叶子级补丁”宣称为全局最小补丁。

README 的 49 B 实际使用 String.length 统计：同一含中文补丁实测 UTF-8 为 57 bytes、JS 字符串长度为 49。它既不是准确 UTF-8 字节数，也不是链路总成本。新的基准应记录 UTF-8 大小、更新次数、序列化/diff CPU 时间、渲染完成耗时、内存及产物大小；公开输入、设备、版本、重复次数和结果分布。

### 测试需要独立于实现的契约

自建模拟器可保留为快速层，但不能作为唯一正确性依据。当前组件测试绕过 methods、定位测试固定错误结果，已经证明单靠“全部通过”不够。

建议三层：MoonBit 纯逻辑与不变式测试；微信契约与组件渲染测试；开发者工具/真机关键流程。随机 diff 测试要包含根键删除、特殊键、数组缩短与重排，并验证 apply(old, patch) 等于目标，不能只检查补丁自身形状。增加请求失败、延迟回调、页面销毁后回调、观察器多参、组件重复挂载和卸载异常。

## 值得借鉴的开源项目

| 项目 | 借鉴的具体能力 | 本项目的落点 |
|---|---|---|
| [Mpx 数据响应](https://mpxjs.cn/guide/basic/reactive.html)、[全局 API](https://mpxjs.cn/api/global-api.html) | 响应式状态、批量更新、nextTick | 把状态更新体验与渲染完成语义做完整；这些能力不宜再宣称为本项目独有 |
| [Mpx 全局配置](https://mpxjs.cn/api/app-config.html) | setData 次数和数据量观测 | 提供可关闭的性能统计，让优化能测量 |
| [Taro 分包依赖提取](https://nervjs.github.io/taro-docs/docs/3.x/mini-split-chunks-plugin/) | 构建期分析公共依赖与分包归属 | 中期建设多入口和包体积报告，避免全部业务都进入一个启动模块 |
| [wechat-miniprogram/api-typings](https://github.com/wechat-miniprogram/api-typings) | 官方接口契约与类型信息 | 做 API 签名映射和契约测试；中期考虑生成基础绑定，复杂任务接口手写 |
| [miniprogram-simulate](https://github.com/wechat-miniprogram/miniprogram-simulate) | 有组件树与渲染环境的组件测试 | 补充真实模板事件/属性更新测试；仍不能代替真机 |
| [glass-easel](https://github.com/wechat-miniprogram/glass-easel) | 微信团队的组件框架实现 | 用于研究组件语义和测试宿主可行性，不建议比赛前重写组件引擎 |
| [TDesign MiniProgram](https://github.com/Tencent/tdesign-miniprogram) | 成熟原生 UI 组件库 | 先验证两三个常用组件的属性、事件和样式互操作，不急着造自己的全套 UI 库 |

这些是设计参考，不是已完成的适配。若后续复制实现、生成定义或引入素材，应逐个记录来源、固定版本、许可证和修改范围。

## 建议执行顺序与完成标准

以下是工程建议，不是比赛官方评分权重。按仓库材料，本项目目标是 9 月黑客松。官方当前页面列出的本期验收及报名截止为 9 月 24 日，强调 MoonBit 为主、公开历史、可运行示例、必要测试、本期实质工作和 AI 生成内容可解释；季度优秀项目另行评定。[官方赛事页面](https://moonbitlang.github.io/Hackathon2026/)

| 阶段 | 建议时间窗口 | 可检查交付物 |
|---|---|---|
| A：可信基础 | 9/7–9/10 | 修复本报告 P0/P1；8 个探针转为正式回归测试；脚手架正确导入；dev 编译失败可恢复；CI 覆盖当前源码消费者 |
| B：MoonBit 使用价值 | 9/11–9/15 | 一套强类型 State/Action 开发路径；带 headers/timeout/取消的请求；生命周期清理；模板事件和配置校验的最小版本 |
| C：可采用性 | 9/16–9/19 | 脚手架直接创建可运行项目；原生 UI 互操作示例；Windows/Linux 验证；独立组件测试；补齐错误处理、迁移和版本兼容说明 |
| D：参赛证据 | 9/20–9/23 | 一个聚焦的双页示范应用；真机验证记录；可复现基准；一页项目说明；短演示视频与真实试用反馈 |

日期是建议的工作窗口，应随修复结果调整。若进度紧，优先缩减新功能，保留 A 阶段全部交付和完整演示闭环。多平台适配、完整模板编译器、全量 UI 库、支付/云开发大全放到后续，不作为本期完成的前提。

示范应用建议使用聚焦的双页清单：列表筛选与编辑、详情表单、跨页状态、缓存恢复、请求失败重试。它的作用是证明框架自然支持真实流程；状态内核稳定之后再实现视觉细节。

发布候选的验收标准：外部开发者按 README 能独立跑通；无额外 FFI 就能完成示例业务；关键失败可诊断；真机覆盖组件点击、路由往返、网络失败和卸载；所有性能结论可复现。争取 2–3 位真实开发者试用并记录卡点，比增加接口数量更能证明生态价值。

## 评审边界与复现

本次保留框架源码不变，只新增评审材料。探针以 .mbt.txt 保存，不加入默认测试集合；结果记录的是修复前行为。复制到 runtime/audit_review_wbtest.mbt 后运行 `moon test runtime/audit_review_wbtest.mbt` 即可复现，结束后移除这份临时副本。不要通过 `moon test --update` 接受这些错误结果。

未核验事项：真机和开发者工具行为、远端默认分支与 CI 状态、mooncakes 当前版本的可安装性、其他 MoonBit 包的完整生态重叠情况、实际外部用户采用。不能从本地 CONTEXT.md 的发布记录推断这些事项已经验证。工具链升级应先在隔离环境验证兼容性，不把低于 1.0 的版本号直接当成项目缺陷。

获奖无法保证；这份计划的目标是把项目从“有功能清单的原型”推进到“有明确边界、可靠证据和实际采用理由的生态工具”。
