///|
/// 自定义组件定义。
///
/// 与 PageDef 同构：key 对应 usingComponents 里的路径；properties 用
/// JSON 描述（`"t"` 为类型名字符串，由 JS 桥转换为微信的构造函数，
/// 因为 `type: String` 是 JS 函数无法走 JSON 通道）：
///
/// ```text
/// { "text": { "t": "String", "value": "" },
///   "count": { "t": "Number", "value": 0 },
///   "options": { "t": "Array", "value": [] } }
/// ```
///
/// methods 与生命周期（attached/ready/detached/moved）都写在 handlers，
/// 名字即微信组件选项名。observers 的键支持微信的字段路径/通配语法。
pub(all) struct ComponentDef {
  /// 组件标识，须与 usingComponents 注册路径一致，如 "components/tag/tag"
  key : String
  /// 属性定义（上述 JSON 规范）
  properties : Json
  /// 组件初始 data
  data : Json
  /// 方法与生命周期
  handlers : Array[(String, PageHandler)]
  /// 数据观察器：字段变化时触发（键为 "field" / "a.b" / "a, b"）
  observers : Array[(String, PageHandler)]
  /// 组件所在页面的生命周期（"show" / "hide" / "resize"）
  page_lifetimes : Array[(String, PageHandler)]
}

///|
let component_registry : Map[String, ComponentDef] = Map([])

///|
/// 注册组件定义（在 app 入口或引擎初始化时执行一次）。
///
/// dev-time 一致性校验（console.warn，不 raise）：
/// - key 格式：建议以 "components/" 开头（与 usingComponents 路径一致）
/// - handlers 内部重名、observers 与 handlers 交叉重名
pub fn register_component(def : ComponentDef) -> Unit {
  if component_registry.contains(def.key) {
    js_dev_warn(
      "register_component: 组件 \"\{def.key}\" 重复注册，旧定义被覆盖（幂等注册请收敛到 ensure_registered）",
    )
  }
  if def.key == "" {
    js_dev_warn(
      "register_component: 组件 key 为空，请检查 ComponentDef.key",
    )
  } else if !def.key.has_prefix("components/") {
    js_dev_warn(
      "register_component: \"\{def.key}\" 不以 components/ 开头——请确认与 usingComponents 注册路径一致",
    )
  }
  let seen : Map[String, Unit] = Map([])
  for kv in def.handlers {
    let (name, _) = kv
    if seen.contains(name) {
      js_dev_warn(
        "register_component(\{def.key}): handlers 存在重名方法 \"\{name}\"",
      )
    }
    seen[name] = ()
  }
  for kv in def.observers {
    let (name, _) = kv
    if seen.contains(name) {
      js_dev_warn(
        "register_component(\{def.key}): \"\{name}\" 同时出现在 handlers 与 observers，将相互覆盖",
      )
    }
  }
  component_registry[def.key] = def
}

///|
/// 供 JS 侧调用：按 key 构建 Component() 配置对象。
///
/// 生命周期兜底：组件销毁（detached）时自动执行 unbind_all，
/// 清除该组件在所有 store 上的订阅（防悬挂引用）。用户自定义 detached
/// 会被包装（先用户后清理），未定义则框架追加。
pub fn component_config(key : String) -> JsVal raise MpError {
  guard component_registry.get(key) is Some(def) else {
    raise MpError::ComponentNotFound(key)
  }
  let extra = if def.handlers.any(fn(kv) { kv.0 == "detached" }) {
    0
  } else {
    1
  }
  let total = def.handlers.length() + extra
  let names : FixedArray[String] = FixedArray::make(total, "")
  let fns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(total, (_, _) => {
    ()
  })
  for i, kv in def.handlers {
    let (name, h) = kv
    names[i] = name
    if name == "detached" {
      fns[i] = fn(page, arg) {
        h(PageCtx::new(page), Payload::new(arg))
        unbind_all(PageCtx::new(page))
      }
    } else {
      fns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
    }
  }
  if extra == 1 {
    let last = def.handlers.length()
    names[last] = "detached"
    fns[last] = fn(page, _arg) { unbind_all(PageCtx::new(page)) }
  }
  let onames : FixedArray[String] = FixedArray::make(def.observers.length(), "")
  let ofns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    def.observers.length(),
    (_, _) => (),
  )
  for i, kv in def.observers {
    let (name, h) = kv
    onames[i] = name
    ofns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
  }
  let pnames : FixedArray[String] = FixedArray::make(
    def.page_lifetimes.length(),
    "",
  )
  let pfns : FixedArray[(JsVal, JsVal) -> Unit] = FixedArray::make(
    def.page_lifetimes.length(),
    (_, _) => (),
  )
  for i, kv in def.page_lifetimes {
    let (name, h) = kv
    pnames[i] = name
    pfns[i] = fn(page, arg) { h(PageCtx::new(page), Payload::new(arg)) }
  }
  js_build_component_cfg(
    def.properties.stringify(),
    def.data.stringify(),
    names,
    fns,
    onames,
    ofns,
    pnames,
    pfns,
  )
}

///|
/// 构建 Component() 配置：properties 规范转微信格式（"t" 字符串 →
/// 构造函数）；方法与 observers 绑定 this；pageLifetimes 组装嵌套对象。
/// 平行数组传列表。
extern "js" fn js_build_component_cfg(
  props_json : String,
  data_json : String,
  names : FixedArray[String],
  handlers : FixedArray[(JsVal, JsVal) -> Unit],
  observer_names : FixedArray[String],
  observer_fns : FixedArray[(JsVal, JsVal) -> Unit],
  plifetime_names : FixedArray[String],
  plifetime_fns : FixedArray[(JsVal, JsVal) -> Unit],
) -> JsVal =
  #|(propsJson, dataJson, names, handlers, onames, ofns, pnames, pfns) => {
  #|  const TYPES = {
  #|    String: String,
  #|    Number: Number,
  #|    Boolean: Boolean,
  #|    Object: Object,
  #|    Array: Array,
  #|  };
  #|  const spec = JSON.parse(propsJson);
  #|  const props = {};
  #|  for (const k of Object.keys(spec)) {
  #|    const p = spec[k];
  #|    const def = {};
  #|    if (p.t) {
  #|      def.type = TYPES[p.t] || null;
  #|    }
  #|    if ("value" in p) {
  #|      def.value = JSON.parse(JSON.stringify(p.value));
  #|    }
  #|    if (p.optional) {
  #|      def.optional = true;
  #|    }
  #|    props[k] = def;
  #|  }
  #|  const cfg = { properties: props, data: JSON.parse(dataJson) };
  #|  for (let i = 0; i < names.length; i++) {
  #|    cfg[names[i]] = function(arg) { handlers[i](this, arg); };
  #|  }
  #|  if (onames.length > 0) {
  #|    const obs = {};
  #|    for (let i = 0; i < onames.length; i++) {
  #|      obs[onames[i]] = function(value) { ofns[i](this, value); };
  #|    }
  #|    cfg.observers = obs;
  #|  }
  #|  if (pnames.length > 0) {
  #|    const plt = {};
  #|    for (let i = 0; i < pnames.length; i++) {
  #|      plt[pnames[i]] = function(arg) { pfns[i](this, arg); };
  #|    }
  #|    cfg.pageLifetimes = plt;
  #|  }
  #|  return cfg;
  #|}

///|
/// 调用微信全局 Component()（须在组件自己的 JS 文件中调用）
extern "js" fn js_component(cfg : JsVal) -> Unit =
  #|(cfg) => Component(cfg)

///|
/// 供 JS 侧调用：组件文件只需一行
/// `Component(require("../../engine/moon-engine.js").component("components/tag/tag"))`
pub fn component(key : String) -> Unit raise MpError {
  js_component(component_config(key))
}
