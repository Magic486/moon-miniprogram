# moon-miniprogram

A MoonBit framework for building WeChat Mini Programs — type-safe runtime with
automatic state diffing, declarative pages/components/routing, and headless
testing infrastructure.

[![version](https://img.shields.io/badge/version-0.4.3-blue)](#)
[![license](https://img.shields.io/badge/license-Apache--2.0-lightgrey)](#)
[![CI](https://github.com/Magic486/moon-miniprogram/actions/workflows/ci.yml/badge.svg)](https://github.com/Magic486/moon-miniprogram/actions)

Documentation: [使用指南](docs/使用指南.md) · [wx API 覆盖对照表](docs/API覆盖对照表.md) · [RFC 0001 — 平台适配](docs/rfc/0001-平台适配设计.md)

---

## Features

- **Type-safe runtime** — business logic is pure MoonBit code; data flows across
  the FFI boundary as typed JSON, and misuses are rejected at compile time.
- **Automatic state diffing** — `set_state` performs partial merge (React
  setState semantics) and emits minimal `setData` path patches; zero calls when
  nothing changed.
- **Shared cross-page state** — `create_store` + `bind_store` subscribe pages
  and components to a single source of truth; one update propagates minimal
  patches to all subscribers.
- **Declarative routing** — `register_route` declares paths with parameter
  allow-lists; navigation never hand-builds URLs, and out-of-schema parameters
  are stripped with a dev warning instead of raising.
- **Full page / component / app model** — typed component properties, observers,
  page lifetimes, value-returning hooks, and app-global data.
- **Headless testing** — `scripts/sim/wx-sim.js` simulates the WeChat runtime
  (path-aware `setData`, wx call records); end-to-end tests run without the
  WeChat DevTools.
- **CLI & scaffolding** — `scripts/new.cjs` generates a project that pulls the
  framework from mooncakes; `mmp.cjs` covers check / test / build / dev / release.

## Installation

```bash
node scripts/new.cjs myapp
cd myapp
```

The scaffold pulls `Magic486/moon-miniprogram` from
[mooncakes.io](https://mooncakes.io) and wires up the CommonJS export.

## Usage

Business code lives in `engine/engine.mbt`; Mini Program files contain a single
line of assembly.

```moonbit
let page : @mp.PageDef = {
  path: "pages/index/index",
  data: @mp.jobj([("count", @mp.jnum(0.0))]),
  handlers: [
    ("onTap", (ctx, _payload) => {
      let n = match ctx.get_data() {
        Some(Json::Object(m)) =>
          match m.get("count") {
            Some(Json::Number(d, ..)) => d + 1.0
            _ => 1.0
          }
        _ => 1.0
      }
      ctx.set_state(@mp.jobj([("count", @mp.jnum(n))]))
    }),
  ],
  returns: [],
}
```

```javascript
// app.js / pages/index/index.js
require("./engine/moon-engine.js").launch();
require("../../engine/moon-engine.js").page("pages/index/index");
```

Build and run:

```bash
node mmp.cjs check     # type check
node mmp.cjs test      # unit tests
node mmp.cjs dev       # watch-mode rebuild (open miniprogram/ in WeChat DevTools)
```

## Performance

Diff output is pinned by snapshot tests (`runtime/bench_test.mbt`); values are
JSON bytes per update.

| Scenario | `set_state` patch | Full `setData` |
|---|---|---|
| Append 1 item to a 1000-item list | 49 B | 34,959 B |
| Change one leaf in a nested object | 24 B | 75 B |
| No change | 0 B (no `setData` call) | 75 B |

## Documentation

- [使用指南](docs/使用指南.md) — from zero to a runnable Mini Program; state,
  components, routing, headless testing, release.
- [wx API 覆盖对照表](docs/API覆盖对照表.md) — WeChat API coverage, domain by domain.
- [RFC 0001](docs/rfc/0001-平台适配设计.md) — platform adapter architecture
  (WeChat is the current target; Alipay / Douyin are designed for).
- API reference per function is available on the
  [mooncakes package page](https://mooncakes.io).

## Repository

```text
runtime/          framework core (models, diff engine, store, router, wx bindings, platform probe)
engine/           minimal example, used as the smoke-test host
engine-export/    CommonJS export wrapper (foreign_library)
scripts/          scaffolding, mmp CLI, wx simulator, smoke tests, minifier
docs/             guide, API coverage table, RFCs
```

## Contributing

```bash
git clone https://github.com/Magic486/moon-miniprogram
moon test                # 37 unit tests
powershell scripts/build-example.ps1   # 38 smoke assertions
```

Bug reports and feature discussions go to
[GitHub Issues](https://github.com/Magic486/moon-miniprogram/issues);
release notes are on the
[Releases page](https://github.com/Magic486/moon-miniprogram/releases).

## License

Apache-2.0
