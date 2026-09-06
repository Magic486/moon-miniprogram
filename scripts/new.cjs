#!/usr/bin/env node
// moon-miniprogram 脚手架：生成一个新的 MoonBit 微信小程序项目骨架。
// 用法：node scripts/new.mjs <app-name> [--dir <parent-dir>]
"use strict";

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const name = args[0];
if (!name || !/^[a-zA-Z][\w-]*$/.test(name)) {
  console.error("usage: node scripts/new.mjs <app-name> [--dir <parent-dir>]");
  process.exit(2);
}
const dirIdx = args.indexOf("--dir");
const parent = dirIdx >= 0 ? args[dirIdx + 1] : process.cwd();
const root = path.join(parent, name);
if (fs.existsSync(root)) {
  console.error(`directory already exists: ${root}`);
  process.exit(1);
}

const FW = "Magic486/moon-miniprogram";
const files = new Map();

files.set(
  "moon.mod",
  `name = "myapp/${name}"

version = "0.1.0"

readme = "README.mbt.md"

repository = ""

license = "Apache-2.0"

keywords = [ "miniprogram", "wechat" ]

import {
  "${FW}@0.4.0"
}

preferred_target = "js"

description = "${name} — 用 MoonBit 编写的微信小程序"
`,
);

files.set(
  "engine/moon.pkg",
  `import {
  "moonbitlang/core/json",
  "${FW}/runtime" @mp,
}
`,
);

files.set(
  "engine/engine.mbt",
  `///|
/// ${name} 业务逻辑：页面定义全部在此（可 moon test 单测）

///|
/// 纯函数业务逻辑：计数 +1（独立可测，不依赖微信运行时）
fn bump(n : Double) -> Double {
  n + 1.0
}

///|
test "bump: 点击计数 +1" {
  inspect(bump(41.0), content="42")
}

///|
let counter_page : @mp.PageDef = {
  path: "pages/index/index",
  data: @mp.jobj([
    ("count", @mp.jnum(0.0)),
    ("tip", @mp.jstr("每次点击 +1，状态经 set_state 自动最小化 setData")),
  ]),
  handlers: [
    (
      "onTap",
      (ctx, _payload) => {
        let n = match ctx.get_data() {
          Some(Json::Object(m)) =>
            match m.get("count") {
              Some(Json::Number(d, ..)) => bump(d)
              _ => bump(0.0)
            }
          _ => bump(0.0)
        }
        // 自动 diff：实际 setData 只包含变化的路径
        ctx.set_state(@mp.jobj([("count", @mp.jnum(n))]))
      },
    ),
  ],
  returns: [],
}

///|
/// 幂等注册
let registered : Ref[Bool] = Ref(false)

///|
fn ensure_registered() -> Unit {
  if !registered.val {
    @mp.register_app({
      handlers: [("onLaunch", (_ctx, _payload) => ())],
      global_data: @mp.jobj([("version", @mp.jstr("0.1.0"))]),
    })
    @mp.register_page(counter_page)
    registered.val = true
  }
}

///|
extern "js" fn js_throw(msg : String) -> Unit =
  #|(msg) => {
  #|  throw new Error(msg);
  #|}

///|
pub fn launch() -> Unit {
  ensure_registered()
  @mp.launch() catch {
    _ => js_throw("engine: launch failed")
  }
}

///|
pub fn page(path : String) -> Unit {
  ensure_registered()
  @mp.page(path) catch {
    _ => js_throw("engine: page not found \\{path}")
  }
}
`,
);

files.set(
  "engine-export/moon.pkg",
  `pkgtype(kind: "foreign_library")

import {
  "myapp/${name}/engine" @engine,
}

options(
  "link": {
    "js": {
      "format": "cjs",
      "exports": ["launch", "page"],
    },
  },
)
`,
);

files.set(
  "engine-export/export.mbt",
  `///|
pub fn launch() -> Unit {
  @engine.launch()
}

///|
pub fn page(path : String) -> Unit {
  @engine.page(path)
}
`,
);

files.set(
  "miniprogram/app.js",
  `require("./engine/moon-engine.js").launch();
`,
);

files.set(
  "miniprogram/app.json",
  JSON.stringify(
    {
      pages: ["pages/index/index"],
      window: {
        navigationBarBackgroundColor: "#1f6f43",
        navigationBarTextStyle: "white",
        navigationBarTitleText: name,
        backgroundColor: "#f7f8fa",
      },
      style: "v2",
      sitemapLocation: "sitemap.json",
    },
    null,
    2,
  ) + "\n",
);

files.set(
  "miniprogram/app.wxss",
  `page {
  background: #f7f8fa;
  font-size: 28rpx;
  color: #222;
}
`,
);

files.set("miniprogram/sitemap.json", '{ "rules": [{ "action": "allow", "page": "*" }] }\n');

files.set(
  "miniprogram/project.config.json",
  JSON.stringify(
    {
      appid: "touristappid",
      compileType: "miniprogram",
      miniprogramRoot: "miniprogram/",
      projectname: name,
      setting: { es6: false, postcss: false, minified: false },
    },
    null,
    2,
  ) + "\n",
);

files.set(
  "miniprogram/pages/index/index.js",
  `require("../../engine/moon-engine.js").page("pages/index/index");
`,
);

files.set(
  "miniprogram/pages/index/index.wxml",
  `<view class="page">
  <view class="card">
    <view class="count">{{count}}</view>
    <view class="tip">{{tip}}</view>
    <button bind:tap="onTap">点我 +1</button>
  </view>
</view>
`,
);

files.set(
  "miniprogram/pages/index/index.wxss",
  `.page { padding: 40rpx; }
.card { background: #fff; border-radius: 16rpx; padding: 60rpx 40rpx; text-align: center; }
.count { font-size: 96rpx; font-weight: 700; color: #1f6f43; }
.tip { color: #999; font-size: 24rpx; margin: 24rpx 0 40rpx; }
`,
);

files.set(
  "README.mbt.md",
  `# ${name}

由 [moon-miniprogram](https://github.com/Magic486/moon-miniprogram) 脚手架生成的 MoonBit 微信小程序。

## 开发（一键 CLI mmp.cjs）

\`\`\`bash
node mmp.cjs check     # 类型检查
node mmp.cjs test      # 业务逻辑单测（无需微信工具）
node mmp.cjs build     # 构建并拷贝产物到 miniprogram/engine/
node mmp.cjs dev       # watch：.mbt 变更自动重编译（微信开发者工具配合刷新）
node mmp.cjs release   # release 构建 + 拷贝（发布用）
\`\`\`

业务逻辑全部在 \`engine/engine.mbt\`，页面 JS 只有一行装配代码。
微信开发者工具（测试号即可）打开 \`miniprogram/\` 即可运行。
`,
);

for (const [rel, content] of files) {
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
}
fs.mkdirSync(path.join(root, "miniprogram", "engine"), { recursive: true });
// 一键 CLI（同目录的 mmp.cjs）复制进生成项目
fs.copyFileSync(path.join(__dirname, "mmp.cjs"), path.join(root, "mmp.cjs"));

console.log(`created ${name}/`);
console.log("next steps:");
console.log(`  cd ${name}`);
console.log("  node mmp.cjs test     # 业务单测（无需微信工具）");
console.log("  node mmp.cjs build    # 构建并拷贝产物到 miniprogram/engine/");
console.log("  node mmp.cjs dev      # watch：.mbt 变更自动重编译");
console.log("  # 微信开发者工具打开 miniprogram/");
