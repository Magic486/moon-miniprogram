# 发票助手（示范应用）

moon-miniprogram 框架的示范微信小程序：输入金额，实时生成规范的人民币大写，一键复制并自动记录历史。

## 运行

1. 仓库根目录执行构建（PowerShell）：

   ```powershell
   powershell scripts/build-example.ps1
   ```

   该脚本会以 release 模式编译引擎并把产物拷贝到本目录 `miniprogram/engine/moon-engine.js`，随后运行无头冒烟测试。

2. 用微信开发者工具打开 `examples/invoice-helper/` 目录（`project.config.json` 已就位，appid 可换成自己的或用测试号）。

## 代码导读

| 文件 | 内容 |
|---|---|
| `miniprogram/app.js` / `pages/*/index.js`、`history.js` | 装配代码，共 3 行 |
| `miniprogram/pages/*/*.wxml`、`*.wxss` | 界面（与传统小程序写法完全一致） |
| 仓库 `engine/engine.mbt` | 全部业务逻辑（页面定义、大写转换、历史去重） |

页面处理器与 WXML 的对应关系：

- `bindinput="onInput"` → MoonBit `("onInput", (ctx, payload) => ...)`
- `data-v="{{item}}"` → `payload.string_at(["currentTarget", "dataset", "v"])`
- `PageCtx::set_data` → `this.setData`
