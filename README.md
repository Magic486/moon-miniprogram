# moon-miniprogram

A MoonBit framework for building WeChat Mini Programs — type-safe runtime with
automatic state diffing, declarative pages/components/routing, and headless
testing infrastructure.

[![version](https://img.shields.io/badge/version-0.5.3-blue)](#)
[![tests](https://img.shields.io/badge/tests-54%20unit%20%E2%9C%93%20%7C%2040%20smoke%20%E2%9C%93-green)](#)
[![license](https://img.shields.io/badge/license-Apache--2.0-lightgrey)](#)
[![CI](https://github.com/Magic486/moon-miniprogram/actions/workflows/ci.yml/badge.svg)](https://github.com/Magic486/moon-miniprogram/actions)

Documentation: [Guide](docs/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.md) · [Acceptance](docs/%E9%AA%8C%E6%94%B6%E6%8C%87%E5%8D%97.md) · [References and compliance](docs/%E5%8F%82%E8%80%83%E4%B8%8E%E5%90%88%E8%A7%84%E8%AF%B4%E6%98%8E.md) · [wx API coverage](docs/API%E8%A6%86%E7%9B%96%E5%AF%B9%E7%85%A7%E8%A1%A8.md) · [RFC 0001 - Platform adapters](docs/rfc/0001-%E5%B9%B3%E5%8F%B0%E9%80%82%E9%85%8D%E8%AE%BE%E8%AE%A1.md)

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

To inspect this repository directly, run `node scripts/mmp.cjs release`, then
import the repository root in WeChat DevTools. The included two-page showcase
uses `touristappid`, so an evaluator can open it without editing project files.

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
serialized JSON character counts per update.

| Scenario | `set_state` patch | Full `setData` |
|---|---|---|
| Append 1 item to a 1000-item list | 49 chars | 34,959 chars |
| Change one leaf in a nested object | 24 chars | 75 chars |
| No change | 0 chars (no `setData` call) | 75 chars |

## Documentation

- [Guide](docs/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.md) — from zero to a
  runnable Mini Program; state, components, routing, headless testing, release.
- [Acceptance guide](docs/%E9%AA%8C%E6%94%B6%E6%8C%87%E5%8D%97.md) — reproducible
  automated checks and a short WeChat DevTools review path.
- [References and compliance](docs/%E5%8F%82%E8%80%83%E4%B8%8E%E5%90%88%E8%A7%84%E8%AF%B4%E6%98%8E.md) — originality,
  upstream references, licenses, and reuse boundaries.
- [wx API coverage table](docs/API%E8%A6%86%E7%9B%96%E5%AF%B9%E7%85%A7%E8%A1%A8.md) —
  WeChat API coverage, domain by domain.
- [RFC 0001](docs/rfc/0001-%E5%B9%B3%E5%8F%B0%E9%80%82%E9%85%8D%E8%AE%BE%E8%AE%A1.md) —
  platform adapter architecture
  (WeChat is the current target; Alipay / Douyin are designed for).
- API reference per function is available on the
  [mooncakes package page](https://mooncakes.io).

## Repository

```text
runtime/          framework core (models, diff engine, store, router, wx bindings, platform probe)
engine/           minimal example, used as the smoke-test host
engine-export/    CommonJS export wrapper (foreign_library)
miniprogram/      importable two-page WeChat DevTools showcase
scripts/          scaffolding, mmp CLI, wx simulator, smoke tests, minifier
docs/             guide, API coverage table, RFCs
```

## Contributing

```bash
git clone https://github.com/Magic486/moon-miniprogram
moon test                # 54 unit tests
powershell scripts/build-example.ps1   # build showcase + 40 smoke assertions
```

Bug reports and feature discussions go to
[GitHub Issues](https://github.com/Magic486/moon-miniprogram/issues);
release notes are on the
[Releases page](https://github.com/Magic486/moon-miniprogram/releases).

## License

Apache-2.0
