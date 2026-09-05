#!/usr/bin/env node
// 发布体积优化：terser 压缩 moon-engine.js（233KB → ~134KB）。
// 用法：node scripts/minify.cjs <engine.js> [output.min.js]
// 依赖：npx（Node.js 自带），首次运行自动下载 terser。
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const input = process.argv[2];
if (!input || !fs.existsSync(input)) {
  console.error("usage: node scripts/minify.cjs <engine.js> [output.min.js]");
  process.exit(2);
}
const output = process.argv[3] || input.replace(/\.js$/, ".min.js");

execFileSync("npx.cmd", ["--yes", "terser", input, "--compress", "--mangle", "--output", output], {
  stdio: "inherit",
  // Node 24 起 Windows 上 spawnSync .cmd 必须显式放行 shell
  shell: true,
});

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const a = fs.statSync(input).size;
const b = fs.statSync(output).size;
console.log(`minified: ${kb(a)} -> ${kb(b)} (${((b * 100) / a).toFixed(1)}%)`);
console.log(`output: ${path.resolve(output)}`);
