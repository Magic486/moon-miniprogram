///|
/// 发票助手引擎：注册应用与页面定义。
///
/// 构建产物为 CommonJS 模块（moon-engine.js），小程序侧用法：
///
/// - app.js：`require("./engine/moon-engine.js").launch()`
/// - 页面 js：`require("../../engine/moon-engine.js").page("pages/index/index")`

///|
let registered : Ref[Bool] = Ref(false)

///|
/// 幂等注册：首个入口（launch 或 page）被调用时执行一次
fn ensure_registered() -> Unit {
  if !registered.val {
    @mp.register_app({
      handlers: [("onLaunch", (_ctx, _payload) => ())],
      global_data: @mp.jobj([("version", @mp.jstr("0.1.0"))]),
    })
    @mp.register_page(index_page())
    @mp.register_page(history_page())
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
  }
}

///|
/// 首页快捷示例金额
let samples : Array[String] = [
  "1680.32", "1006.01", "107000.53", "6007.14", "999999999999.99",
]

///|
/// 首页：金额输入 → 人民币大写（实时）→ 复制 / 存历史
fn index_page() -> @mp.PageDef {
  {
    path: "pages/index/index",
    data: @mp.jobj([
      ("input", @mp.jstr("")),
      ("upper", @mp.jstr("")),
      ("valid", @mp.jbool(false)),
      ("hint", @mp.jstr("输入金额，实时生成规范大写")),
      ("samples", @mp.jarr(samples.map(fn(s) { @mp.jstr(s) }))),
    ]),
    handlers: [
      (
        "onInput",
        (ctx, payload) => {
          let raw = match payload.string_at(["detail", "value"]) {
            Some(s) => s
            None => ""
          }
          update_amount(ctx, raw)
        },
      ),
      (
        "onSample",
        (ctx, payload) => {
          match payload.string_at(["currentTarget", "dataset", "v"]) {
            Some(v) => update_amount(ctx, v)
            None => ()
          }
        },
      ),
      (
        "onCopy",
        (ctx, _payload) => {
          match ctx.get_data() {
            Some(Json::Object(m)) =>
              match m.get("upper") {
                Some(Json::String(upper)) =>
                  if upper != "" {
                    match m.get("input") {
                      Some(Json::String(input)) => remember(input, upper)
                      _ => ()
                    }
                    @mp.copy_with_toast(upper, tip="大写已复制")
                  } else {
                    @mp.toast("请先输入有效金额", icon=@mp.Plain)
                  }
                _ => @mp.toast("请先输入有效金额", icon=@mp.Plain)
              }
            _ => @mp.toast("请先输入有效金额", icon=@mp.Plain)
          }
        },
      ),
      (
        "goHistory",
        (_ctx, _payload) => @mp.navigate_to("/pages/history/history"),
      ),
    ],
  }
}

///|
/// 输入变化：校验并实时更新大写结果
fn update_amount(ctx : @mp.PageCtx, raw : String) -> Unit {
  let upper = @yuan.to_rmb_upper(raw) catch { _ => "" }
  let valid = upper != ""
  let hint = if raw == "" {
    "输入金额，实时生成规范大写"
  } else if valid {
    ""
  } else {
    "金额格式不正确（支持 0 ~ 9999 亿，最多两位小数）"
  }
  ctx.set_data(
    @mp.jobj([
      ("input", @mp.jstr(raw)),
      ("upper", @mp.jstr(upper)),
      ("valid", @mp.jbool(valid)),
      ("hint", @mp.jstr(hint)),
    ]),
  )
}

///|
/// 历史页：读取 / 清空 / 点按再复制
fn history_page() -> @mp.PageDef {
  {
    path: "pages/history/history",
    data: @mp.jobj([("items", @mp.jarr([]))]),
    handlers: [
      (
        "onShow",
        (ctx, _payload) => ctx.set_data(@mp.jobj([("items", load_history())])),
      ),
      (
        "onItemTap",
        (_ctx, payload) => {
          match payload.string_at(["currentTarget", "dataset", "upper"]) {
            Some(u) => @mp.copy_with_toast(u, tip="大写已复制")
            None => ()
          }
        },
      ),
      (
        "onClear",
        (ctx, _payload) => {
          @mp.confirm("清空历史", "确定清空全部复制历史吗？", on_result=fn(
            ok,
          ) {
            if ok {
              @mp.remove_storage("rmb_history")
              ctx.set_data(@mp.jobj([("items", @mp.jarr([]))]))
              @mp.toast("已清空")
            }
          })
        },
      ),
    ],
  }
}

///|
/// 读取历史（缓存缺失返回空数组）
fn load_history() -> Json {
  let h = @mp.get_storage("rmb_history")
  if h is Json::Array(_) {
    h
  } else {
    @mp.jarr([])
  }
}

///|
/// 记录一次复制：按大写去重，最新在前，最多保留 20 条
fn remember(input : String, upper : String) -> Unit {
  let entry = @mp.jobj([("input", @mp.jstr(input)), ("upper", @mp.jstr(upper))])
  let items : Array[Json] = match @mp.get_storage("rmb_history") {
    Json::Array(a) => a
    _ => []
  }
  let out : Array[Json] = [entry]
  let mut i = items.length() - 1
  while i >= 0 && out.length() < 20 {
    let it = items[i]
    if item_upper(it) != upper {
      out.push(it)
    }
    i = i - 1
  }
  @mp.set_storage("rmb_history", @mp.jarr(out))
}

///|
/// 读取历史条目的大写字段
fn item_upper(it : Json) -> String {
  match it {
    Json::Object(m) =>
      match m.get("upper") {
        Some(Json::String(s)) => s
        _ => ""
      }
    _ => ""
  }
}
