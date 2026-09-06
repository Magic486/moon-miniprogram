///|
/// 跨页状态源（对标 React context / mobx 的单源真理）。
///
/// 多页面共享同一数据源：任意页面 `store.set(...)` 一次，
/// 所有 `ctx.bind_store(store)` 过的页面/组件自动收到**最小化 setData 补丁**
/// （复用 diff 引擎：只推变化的叶子路径，无变化的页面零调用）。
///
/// 用法：
/// ```moonbit nocheck
/// let cart = @mp.create_store("cart", @mp.jobj([
///   ("count", @mp.jnum(0.0)),
///   ("items", @mp.jarr([])),
/// ]))
///
/// // 任意页面 onLoad：
/// //   (ctx, _) => ctx.bind_store(cart)
/// // 页面 onUnload：ctx.unbind_store(cart)
///
/// // 任意页面处理器里：
/// cart.set(@mp.jobj([("count", @mp.jnum(1.0))]))
/// // → 所有绑定页面的 cart.count 自动同步为 1，其余键零打扰
/// ```
///
/// 约定：页面 data 不与 store 键同名（store 键在绑定页面中由 store 拥有）。
pub struct Store {
  priv id : Int
  priv label : String
  priv data : Ref[Json]
  priv subs : Ref[Array[(Int, JsVal)]]
}

///|
let store_seq : Ref[Int] = Ref(0)

///|
/// 全部已创建 store 的目录：供生命周期清理（unbind_all）扫描。
/// Store 值共享同一 subs/data Ref，登记值副本即可。
let all_stores : Ref[Array[Store]] = Ref([])

///|
/// 创建跨页状态源。label 仅供调试/文档
pub fn create_store(label : String, initial : Json) -> Store {
  let id = store_seq.val
  store_seq.val = id + 1
  let s = { id, label, data: Ref(initial), subs: Ref([]) }
  all_stores.val.push(s)
  s
}

///|
/// 把 ctx 从**所有** store 的订阅中移除。
/// 由框架在页面 onUnload / 组件 detached 时自动调用（build_cfg 注入兜底），
/// 即使开发者忘记显式 unbind_store 也不会悬挂引用或收到幽灵更新。
pub fn unbind_all(ctx : PageCtx) -> Unit {
  for s in all_stores.val {
    let subs = s.subs.val
    let keep : Array[(Int, JsVal)] = []
    for pair in subs {
      let (sid, jsval) = pair
      if sid != s.id || !js_unsafe_eq(jsval, ctx.page) {
        keep.push((sid, jsval))
      }
    }
    if keep.length() != subs.length() {
      s.subs.val = keep
    }
  }
}

///|
/// 顶层键合并：patch 的键覆盖 base 的键，其余保持。
/// base/patch 非对象时返回 patch（尽力而为）。
fn json_root_merge(base : Json, patch : Json) -> Json {
  match (base, patch) {
    (Json::Object(b), Json::Object(p)) => {
      let m : Map[String, Json] = Map([])
      for k, v in b {
        m[k] = v
      }
      for k, v in p {
        m[k] = v
      }
      Json::object(m)
    }
    (_, p) => p
  }
}

///|
/// 当前全量快照（只读；不要用于 setData 全量，用订阅/视图）
pub fn Store::snapshot(self : Store) -> Json {
  self.data.val
}

///|
/// 已订阅页面数（调试/测试用）
pub fn Store::subscriber_count(self : Store) -> Int {
  self.subs.val.length()
}

///|
/// store 名称（调试用）
pub fn Store::label(self : Store) -> String {
  self.label
}

///|
/// 页面数据同步为"当前 data + store 顶层键覆盖"的最小补丁。
/// store 键在页面 data 中不存在时会新增，已有且相同则零 setData。
fn PageCtx::sync_view(self : PageCtx, store_data : Json) -> Unit {
  let cur : Json = @json.parse(js_data_string(self.page)) catch {
    _ => Json::empty_object()
  }
  self.set_state(json_root_merge(cur, store_data))
}

///|
/// 让页面/组件订阅此 store（建议在 onLoad/attached 调用）：
/// 立即把 store 快照同步进页面 data，之后 store.set 自动推送到本页面。
pub fn PageCtx::bind_store(self : PageCtx, store : Store) -> Unit {
  self.sync_view(store.data.val)
  let subs = store.subs.val
  let mut found = false
  for pair in subs {
    let (sid, jsval) = pair
    if sid == store.id && js_unsafe_eq(jsval, self.page) {
      found = true
      break
    }
  }
  if !found {
    subs.push((store.id, self.page))
  }
}

///|
extern "js" fn js_unsafe_eq(a : JsVal, b : JsVal) -> Bool =
  #|(a, b) => a === b

///|
/// 取消订阅（建议在 onUnload/detached 调用，避免悬挂引用）
pub fn PageCtx::unbind_store(self : PageCtx, store : Store) -> Unit {
  let subs = store.subs.val
  let keep : Array[(Int, JsVal)] = []
  for pair in subs {
    let (sid, jsval) = pair
    if sid != store.id || !js_unsafe_eq(jsval, self.page) {
      keep.push((sid, jsval))
    }
  }
  store.subs.val = keep
}

///|
/// 一处更新、全员同步：patch 为顶层键补丁（根键覆盖语义），
/// 更新 store 快照并对所有订阅页面推送最小化 setData 补丁。
pub fn Store::set(self : Store, patch : Json) -> Unit {
  let merged = json_root_merge(self.data.val, patch)
  self.data.val = merged
  // 遍历时收集待通知页面（避免遍历中改 subs）
  let targets : Array[JsVal] = []
  for pair in self.subs.val {
    let (sid, jsval) = pair
    if sid == self.id {
      targets.push(jsval)
    }
  }
  for jsval in targets {
    PageCtx::new(jsval).sync_view(merged)
  }
}
