///|
/// 最小示例引擎（fixture）：counter 页面 + about 页面 + tag 组件。
///
/// 作用：1) 端到端冒烟测试的宿主（验证 launch → page/component → 微信运行时全链路）；
///       2) 与脚手架 new.cjs 生成的模板同构，作为最小可运行范例。
/// 不含任何业务，只演示框架能力：
///   - counter：声明式页面 + set_state（自动最小化 setData）+ 事件进出
///   - about：带返回值钩子 returns（onShareAppMessage + share_card）
///   - tag：自定义组件（properties 属性进入 → trigger_event 事件出去）
///
/// 构建产物为 CommonJS 模块（moon-engine.js），小程序侧用法：
///   - app.js：`require("./engine/moon-engine.js").launch()`
///   - 页面 js：`require("../../engine/moon-engine.js").page("pages/index/index")`

///|
let registered : Ref[Bool] = Ref(false)

///|
/// 幂等注册：首个入口（launch / page / component）被调用时执行一次
fn ensure_registered() -> Unit {
  if !registered.val {
    @mp.register_app({
      handlers: [("onLaunch", (_ctx, _payload) => ())],
      global_data: @mp.jobj([("version", @mp.jstr("0.2.1"))]),
    })
    @mp.register_page(counter_page())
    @mp.register_page(about_page())
    @mp.register_component(tag_def())
    registered.val = true
  }
}

///|
/// 向 JS 侧抛出异常（MoonBit 的 raise 编译为 Result 返回值，
/// 导出函数边界需显式转译为 JS 异常）
extern "js" fn js_throw(msg : String) -> Unit =
  #|(msg) => {
  #|  throw new Error(msg);
  #|}

///|
/// app.js 入口：启动应用（由 engine-export 包装为 CJS 导出）
pub fn launch() -> Unit {
  ensure_registered()
  @mp.launch() catch {
    @mp.MpError::AppNotRegistered => js_throw("moon-miniprogram: App 未注册")
    @mp.MpError::PageNotFound(p) =>
      js_throw("moon-miniprogram: 页面未注册 \{p}")
    @mp.MpError::ComponentNotFound(k) =>
      js_throw("moon-miniprogram: 组件未注册 \{k}")
  }
}

///|
/// 页面入口：构建并调用 Page()（由 engine-export 包装为 CJS 导出）
pub fn page(path : String) -> Unit {
  ensure_registered()
  @mp.page(path) catch {
    @mp.MpError::AppNotRegistered => js_throw("moon-miniprogram: App 未注册")
    @mp.MpError::PageNotFound(p) =>
      js_throw("moon-miniprogram: 页面未注册 \{p}")
    @mp.MpError::ComponentNotFound(k) =>
      js_throw("moon-miniprogram: 组件未注册 \{k}")
  }
}

///|
/// 组件入口：构建并调用 Component()（由 engine-export 包装为 CJS 导出）
pub fn component(key : String) -> Unit {
  ensure_registered()
  @mp.component(key) catch {
    @mp.MpError::AppNotRegistered => js_throw("moon-miniprogram: App 未注册")
    @mp.MpError::PageNotFound(p) =>
      js_throw("moon-miniprogram: 页面未注册 \{p}")
    @mp.MpError::ComponentNotFound(k) =>
      js_throw("moon-miniprogram: 组件未注册 \{k}")
  }
}

///|
/// 共享购物车状态（跨页订阅示例）：counter 页 onBuy 修改，
/// about 页（同源订阅）自动收到最小补丁。
let cart : @mp.Store = @mp.create_store(
  "cart",
  @mp.jobj([
    ("cartCount", @mp.jnum(0.0)),
    ("note", @mp.jstr("共享状态：counter 页 set，about 页同步")),
  ]),
)

///|
/// 计数器页面：演示 set_state 最小化补丁、事件消费与跨页 store 订阅
fn counter_page() -> @mp.PageDef {
  {
    path: "pages/index/index",
    data: @mp.jobj([
      ("count", @mp.jnum(0.0)),
      ("picked", @mp.jstr("")),
      ("tip", @mp.jstr("点 +1：set_state 只发 count 的变化路径")),
    ]),
    handlers: [
      // 订阅共享状态：快照注入 cartCount，之后 store.set 自动同步
      ("onLoad", (ctx, _payload) => ctx.bind_store(cart)),
      // 页面离开时退订，避免悬挂引用
      ("onUnload", (ctx, _payload) => ctx.unbind_store(cart)),
      // 一处 set、全员同步：about 页 cartCount 自动 +1
      (
        "onBuy",
        (ctx, _payload) => {
          let n = match ctx.get_data() {
            Some(Json::Object(m)) =>
              match m.get("cartCount") {
                Some(Json::Number(d, ..)) => d + 1.0
                _ => 1.0
              }
            _ => 1.0
          }
          cart.set(@mp.jobj([("cartCount", @mp.jnum(n))]))
        },
      ),
      // 按钮点击：读当前 count，+1 后仅更新该键
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
          ctx.set_state(@mp.jobj([("count", @mp.jnum(n))]))
        },
      ),
      // 复制当前计数：演示 wx 绑定 + 调用记录
      (
        "onCopy",
        (ctx, _payload) => {
          match ctx.get_data() {
            Some(Json::Object(m)) =>
              match m.get("count") {
                Some(Json::Number(d, ..)) => {
                  @mp.copy_with_toast("count=\{d.to_int()}")
                  @mp.vibrate_short()
                }
                _ => ()
              }
            _ => ()
          }
        },
      ),
      // 消费自定义组件事件：tag 组件 pick → 记入 picked
      (
        "onPick",
        (ctx, payload) => {
          match payload.string_at(["detail", "value"]) {
            Some(v) => ctx.set_state(@mp.jobj([("picked", @mp.jstr(v))]))
            None => ()
          }
        },
      ),
    ],
    returns: [],
  }
}

///|
/// 关于页面：演示带返回值的钩子（onShareAppMessage）与跨页 store 订阅
fn about_page() -> @mp.PageDef {
  {
    path: "pages/about/about",
    data: @mp.jobj([("title", @mp.jstr("moon-miniprogram"))]),
    handlers: [
      // 与 counter 页订阅同一个 store：counter 里 onBuy，这里自动同步
      ("onLoad", (ctx, _payload) => ctx.bind_store(cart)),
      ("onUnload", (ctx, _payload) => ctx.unbind_store(cart)),
    ],
    returns: [
      (
        "onShareAppMessage",
        (_ctx, _payload) => {
          @mp.share_card(
            "moon-miniprogram · 用 MoonBit 写小程序",
            path="pages/index/index",
          )
        },
      ),
    ],
  }
}

///|
/// 自定义组件：标签 chip。属性 text 进入，点击把 text 以 pick 事件送出。
/// 演示 Component 模型的完整闭环（属性翻译 → 方法 this 绑定 → triggerEvent）。
fn tag_def() -> @mp.ComponentDef {
  {
    key: "components/tag/tag",
    properties: @mp.jobj([
      ("text", @mp.jobj([("t", @mp.jstr("String")), ("value", @mp.jstr(""))])),
    ]),
    data: @mp.jobj([]),
    handlers: [
      (
        "onTap",
        (ctx, _payload) => {
          match ctx.get_data() {
            Some(Json::Object(m)) =>
              match m.get("text") {
                Some(Json::String(s)) =>
                  ctx.trigger_event("pick", @mp.jobj([("value", @mp.jstr(s))]))
                _ => ()
              }
            _ => ()
          }
        },
      ),
    ],
    observers: [],
    page_lifetimes: [],
  }
}
