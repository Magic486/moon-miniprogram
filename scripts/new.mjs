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
  "${FW}@0.2.0"
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
              Some(Json::Number(d, ..)) => d + 1.0
              _ => 1.0
            }
          _ => 1.0
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

## 开发

\`\`\`bash
moon test                 # 业务逻辑单测
moon build --target js --release
cp _build/js/release/build/engine-export/engine-export.js miniprogram/engine/moon-engine.js
# 微信开发者工具打开 miniprogram/
\`\`\`

业务逻辑全部在 \`engine/engine.mbt\`，页面 JS 只有一行装配代码。
`,
);

for (const [rel, content] of files) {
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
}
fs.mkdirSync(path.join(root, "miniprogram", "engine"), { recursive: true });

console.log(`created ${name}/`);
console.log("next steps:");
console.log(`  cd ${name}`);
console.log("  moon test");
console.log("  moon build --target js --release");
console.log("  # 复制产物后用微信开发者工具打开 miniprogram/");
