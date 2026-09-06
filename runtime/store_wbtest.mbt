///|
/// 构造带 setData 记录的 fake 页面实例（支持简单顶层键）
/// 与 sim 的 makeInstance 语义一致，供 store 订阅在无头环境测试
extern "js" fn js_fake_page(seed : String) -> JsVal =
  #|(seed) => (function () {
  #|  const inst = { data: { seed } };
  #|  inst.__patches = [];
  #|  inst.setData = (p) => {
  #|    inst.__patches.push(JSON.parse(JSON.stringify(p)));
  #|    for (const k of Object.keys(p)) {
  #|      if (!k.includes(".") && !k.includes("[")) {
  #|        inst.data[k] = p[k];
  #|      }
  #|    }
  #|  };
  #|  return inst;
  #|})()

///|
/// fake 页面的 data（seed + store 键）
fn fake_data(v : JsVal) -> Json {
  match js_get(v, "data").to_json() {
    Some(j) => j
    None => Json::empty_object()
  }
}

///|
/// fake 页面收到的补丁条数
fn fake_patch_count(v : JsVal) -> Int {
  match js_get(v, "__patches").to_json() {
    Some(Json::Array(a)) => a.length()
    _ => 0
  }
}

///|
/// 跨页 store：一处 set，全部订阅页面同步（最小补丁）
test "store: bind 同步快照 + set 全量推送 + unbind 停止" {
  let s = create_store("cart", jobj([("count", jnum(0.0))]))
  inspect(s.label(), content="cart")
  let a = js_fake_page("a")
  let b = js_fake_page("b")
  // onLoad：两页面都订阅
  PageCtx::new(a).bind_store(s)
  PageCtx::new(b).bind_store(s)
  inspect(s.subscriber_count(), content="2")
  // bind 立即同步快照：count 进入两页面 data
  match fake_data(a) {
    Json::Object(m) =>
      match m.get("count") {
        Some(Json::Number(d, ..)) => inspect(d, content="0")
        _ => fail("a should have count")
      }
    _ => fail("a data should be object")
  }
  // 某页面 set：两个订阅页都收到，且只有 count 键（最小化）
  s.set(jobj([("count", jnum(2.0))]))
  inspect(fake_patch_count(a), content="2")
  inspect(fake_patch_count(b), content="2")
  match (fake_data(a), fake_data(b)) {
    (Json::Object(ma), Json::Object(mb)) => {
      match (ma.get("count"), mb.get("count")) {
        (Some(Json::Number(da, ..)), Some(Json::Number(db, ..))) => {
          inspect(da, content="2")
          inspect(db, content="2")
        }
        (_, _) => fail("count missing")
      }
      // 未提及键（各页 seed）不受打扰
      match ma.get("seed") {
        Some(Json::String(sx)) => inspect(sx, content="a")
        _ => fail("a seed should persist")
      }
    }
    (_, _) => fail("data objects")
  }
  // unbind a 后 set：只有 b 收到
  PageCtx::new(a).unbind_store(s)
  inspect(s.subscriber_count(), content="1")
  let a_patches_before = fake_patch_count(a)
  let b_patches_before = fake_patch_count(b)
  s.set(jobj([("count", jnum(3.0))]))
  inspect(fake_patch_count(a), content="\{a_patches_before}") // a 不再收到
  inspect(fake_patch_count(b), content="\{b_patches_before + 1}")
  match s.snapshot() {
    Json::Object(m) =>
      match m.get("count") {
        Some(Json::Number(d, ..)) => inspect(d, content="3")
        _ => fail("snapshot count")
      }
    _ => fail("snapshot object")
  }
}

///|
/// 幂等：重复 bind 同页面不产生重复订阅
test "store: bind 幂等" {
  let s = create_store("dup", jobj([("n", jnum(0.0))]))
  let a = js_fake_page("a")
  PageCtx::new(a).bind_store(s)
  PageCtx::new(a).bind_store(s)
  inspect(s.subscriber_count(), content="1")
}

///|
/// 顶层键覆盖合并：页面初始同名键在 bind 后被 store 快照覆盖
test "store: store 键覆盖页面同名键" {
  let s = create_store("ow", jobj([("theme", jstr("dark"))]))
  let a = js_fake_page("x")
  // fake 页面自带 theme（先注入再订阅）
  js_set_seed_field(a, "theme", "light")
  PageCtx::new(a).bind_store(s)
  match fake_data(a) {
    Json::Object(m) =>
      match m.get("theme") {
        Some(Json::String(t)) => inspect(t, content="dark")
        _ => fail("theme should sync from store")
      }
    _ => fail("data object")
  }
}

///|
extern "js" fn js_set_seed_field(v : JsVal, key : String, val : String) -> Unit =
  #|(v, key, val) => { v.data[key] = val; }

///|
/// ① 生命周期自动清理：未自定义 onUnload 时框架注入兜底，
/// 页面卸载自动退订所有 store
test "store: 页面卸载自动清理（框架注入 onUnload）" {
  let s = create_store("auto", jobj([("n", jnum(0.0))]))
  register_page({
    path: "pages/auto-a/auto-a",
    data: jobj([]),
    handlers: [],
    returns: [],
  })
  let cfg = page_config("pages/auto-a/auto-a")
  // 页面没写 onUnload → 框架注入的 onUnload 存在
  inspect(js_member_typeof(cfg, "onUnload"), content="function")
  let a = js_fake_page("a")
  PageCtx::new(a).bind_store(s)
  inspect(s.subscriber_count(), content="1")
  // 微信卸载时调用 cfg.onUnload(this) → 自动退订
  js_invoke_with(a, js_get(cfg, "onUnload"), js_eval("{}"))
  inspect(s.subscriber_count(), content="0")
}

///|
/// ① 用户自定义 onUnload 被包装：先执行用户逻辑，再自动清理
test "store: 用户 onUnload 仍被自动清理（包装）" {
  let s = create_store("wrap", jobj([("n", jnum(0.0))]))
  register_page({
    path: "pages/auto-b/auto-b",
    data: jobj([]),
    handlers: [
      (
        "onUnload",
        (ctx, _p) => ctx.set_data(jobj([("userUnload", jbool(true))])),
      ),
    ],
    returns: [],
  })
  let cfg = page_config("pages/auto-b/auto-b")
  let b = js_fake_page("b")
  PageCtx::new(b).bind_store(s)
  inspect(s.subscriber_count(), content="1")
  js_invoke_with(b, js_get(cfg, "onUnload"), js_eval("{}"))
  // 用户逻辑执行了（fake data 有 userUnload）
  match js_get(b, "data").to_json() {
    Some(Json::Object(m)) =>
      match m.get("userUnload") {
        Some(Json::True) => inspect(true, content="true")
        _ => fail("user onUnload should run")
      }
    _ => fail("data missing")
  }
  // 且订阅被自动清理
  inspect(s.subscriber_count(), content="0")
}

///|
/// ① 组件 detached 同理：未自定义时注入，卸载自动退订
test "store: 组件销毁自动清理（注入 detached）" {
  let s = create_store("cmp", jobj([("n", jnum(0.0))]))
  register_component({
    key: "components/auto-x/auto-x",
    properties: jobj([]),
    data: jobj([]),
    handlers: [],
    observers: [],
    page_lifetimes: [],
  })
  let cfg = component_config("components/auto-x/auto-x")
  inspect(js_member_typeof(cfg, "detached"), content="function")
  let c = js_fake_page("c")
  PageCtx::new(c).bind_store(s)
  inspect(s.subscriber_count(), content="1")
  js_invoke_with(c, js_get(cfg, "detached"), js_eval("{}"))
  inspect(s.subscriber_count(), content="0")
}
