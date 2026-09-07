// mmp — moon-miniprogram 一键开发 CLI（node ≥ 20，零依赖）
// 用法：node mmp.cjs <command>      （在本项目根目录运行）
//   build    构建并拷贝产物到 miniprogram/engine/moon-engine.js
//   release  release 构建 + 拷贝（发布用，可用 minify.cjs 再压缩）
//   test     moon test（业务单测）
//   check    moon check（类型检查）
//   dev      watch：.mbt 变更自动重编译并拷贝（微信开发者工具配合刷新）
// 脚手架 new.cjs 会自动把本文件复制进生成项目。
"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const ENGINE_DIR = "miniprogram/engine";
const DEST = path.join(root, ENGINE_DIR, "moon-engine.js");

function log(msg) {
  console.log(`[mmp] ${msg}`);
}

function failIfNotProject() {
  if (!fs.existsSync(path.join(root, "moon.mod"))) {
    console.error("[mmp] error: not a moon-miniprogram project (no moon.mod in cwd)");
    process.exit(2);
  }
}

function moon(args, soft = false) {
  const r = spawnSync("moon", args, { cwd: root, stdio: soft ? "pipe" : "inherit" });
  if (r.status !== 0) {
    if (soft) return false;
    process.exit(r.status || 1);
  }
  return true;
}

function copyArtifact(releaseMode, soft = false) {
  const rel = releaseMode
    ? "_build/js/release/build/engine-export/engine-export.js"
    : "_build/js/debug/build/engine-export/engine-export.js";
  const src = path.join(root, rel);
  if (!fs.existsSync(src)) {
    const release = "_build/js/release/build/engine-export/engine-export.js";
    // debug 模式回退：引擎首次未 release 构建时产物只在 release 下
    const alt = path.join(root, release);
    if (!fs.existsSync(alt) || releaseMode) {
      const msg = "[mmp] error: engine-export.js not found. Run the same mode build first.";
      if (soft) {
        log("build failed (see output above) — watching for fixes…");
        return false;
      }
      console.error(msg);
      process.exit(1);
    }
    fs.copyFileSync(alt, DEST);
    log(`copied (release fallback) ${path.relative(root, alt)} -> ${path.relative(root, DEST)}`);
    return true;
  }
  fs.mkdirSync(path.dirname(DEST), { recursive: true });
  fs.copyFileSync(src, DEST);
  log(`copied ${path.relative(root, src)} -> ${path.relative(root, DEST)} (${(fs.statSync(DEST).size / 1024).toFixed(1)} KB)`);
  return true;
}

function cmdBuild(release, soft = false) {
  if (!moon(release ? ["build", "--target", "js", "--release"] : ["build", "--target", "js"], soft)) {
    return false;
  }
  return copyArtifact(release, soft);
}

function cmdDev() {
  log("watching source changes (.mbt / moon.pkg / moon.mod, Ctrl+C to stop)…");
  // 编译失败不退出：保留监听，修改后自动恢复（soft 模式吞失败，不 process.exit）
  const run = () => {
    if (cmdBuild(false, true)) {
      log("ready");
    }
  };
  run();
  const ignored = new Set(["_build", ".git", ".mooncakes", "miniprogram", "node_modules"]);
  let timer = null;
  const watcher = fs.watch(root, { recursive: true }, (_evt, name) => {
    if (!name || typeof name !== "string") return;
    const top = name.split(/[\\/]/)[0];
    if (ignored.has(top)) return;
    if (!/\.mbt$/i.test(name) && !/moon\.pkg$/i.test(name) && !/moon\.mod$/i.test(name)) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(run, 250);
  });
  watcher.on("error", (e) => {
    console.error("[mmp] watch error:", e.message);
    process.exit(1);
  });
}

const cmd = process.argv[2];
failIfNotProject();
switch (cmd) {
  case "build":
    cmdBuild(false);
    break;
  case "release":
    cmdBuild(true);
    break;
  case "test":
    moon(["test"]);
    break;
  case "check":
    moon(["check"]);
    break;
  case "dev":
    cmdDev();
    break;
  default:
    console.log(`usage: node mmp.cjs <build|release|test|check|dev>

  build     构建并拷贝产物到 ${ENGINE_DIR}/moon-engine.js
  release   release 构建 + 拷贝（体积报告；如需压缩再跑 scripts/minify.cjs）
  test      moon test（业务单测，无需微信工具）
  check     moon check（类型检查）
  dev       watch .mbt 自动重编译（微信开发者工具打开 miniprogram/ 配合刷新）
`);
    process.exit(cmd ? 1 : 0);
}
