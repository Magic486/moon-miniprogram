///|
/// wx.showToast 图标
pub(all) enum ToastIcon {
  Success
  Error
  Loading
  /// 无图标（纯文字）
  Plain
} derive(Eq, Debug)

///|
fn ToastIcon::to_str(self : ToastIcon) -> String {
  match self {
    Success => "success"
    Error => "error"
    Loading => "loading"
    Plain => "none"
  }
}

///|
/// 显示轻提示
pub fn toast(
  title : String,
  icon? : ToastIcon = Success,
  mask? : Bool = false,
  duration? : Int = 1500,
) -> Unit {
  wx_call(
    "showToast",
    jobj([
      ("title", jstr(title)),
      ("icon", jstr(icon.to_str())),
      ("mask", jbool(mask)),
      ("duration", jnum(duration.to_double())),
    ]).stringify(),
  )
}

///|
/// 隐藏轻提示
pub fn hide_toast() -> Unit {
  wx_call("hideToast", "{}")
}

///|
/// 模态确认框：用户点击确定时回调 true，取消/蒙层关闭回调 false
pub fn confirm(
  title : String,
  content : String,
  show_cancel? : Bool = true,
  on_result~ : (Bool) -> Unit,
) -> Unit {
  wx_confirm(title, content, show_cancel, on_result)
}

///|
extern "js" fn wx_confirm(
  title : String,
  content : String,
  show_cancel : Bool,
  cb : (Bool) -> Unit,
) -> Unit =
  #|(title, content, showCancel, cb) => wx.showModal({
  #|  title, content, showCancel,
  #|  success: (res) => cb(Boolean(res.confirm)),
  #|  fail: () => cb(false),
  #|})

///|
/// 写入剪贴板
pub fn set_clipboard(data : String) -> Unit {
  wx_call("setClipboardData", jobj([("data", jstr(data))]).stringify())
}

///|
/// 轻提示 + 剪贴板一步到位（复制成功提示）
pub fn copy_with_toast(data : String, tip? : String = "已复制") -> Unit {
  set_clipboard(data)
  toast(tip, icon=Success)
}

///|
/// 同步写本地缓存
pub fn set_storage(key : String, value : Json) -> Unit {
  wx_set_storage_sync(key, value.stringify())
}

///|
extern "js" fn wx_set_storage_sync(key : String, json : String) -> Unit =
  #|(key, json) => wx.setStorageSync(key, JSON.parse(json))

///|
/// 同步读本地缓存（缺失返回 Json::Null）
pub fn get_storage(key : String) -> Json {
  match wx_get_storage_sync(key).to_json() {
    Some(j) => j
    None => Json::null()
  }
}

///|
extern "js" fn wx_get_storage_sync(key : String) -> JsVal =
  #|(key) => wx.getStorageSync(key)

///|
/// 移除本地缓存
pub fn remove_storage(key : String) -> Unit {
  wx_call("removeStorageSync", jobj([("key", jstr(key))]).stringify())
}

///|
/// 清空本地缓存
pub fn clear_storage() -> Unit {
  wx_call("clearStorageSync", "{}")
}

///|
/// 页面导航：保留当前页面跳转
pub fn navigate_to(url : String) -> Unit {
  wx_call("navigateTo", jobj([("url", jstr(url))]).stringify())
}

///|
/// 页面导航：关闭当前页面跳转
pub fn redirect_to(url : String) -> Unit {
  wx_call("redirectTo", jobj([("url", jstr(url))]).stringify())
}

///|
/// 页面导航：跳转到 tab 页
pub fn switch_tab(url : String) -> Unit {
  wx_call("switchTab", jobj([("url", jstr(url))]).stringify())
}

///|
/// 页面导航：返回
pub fn navigate_back(delta? : Int = 1) -> Unit {
  wx_call(
    "navigateBack",
    jobj([("delta", jnum(delta.to_double()))]).stringify(),
  )
}

///|
/// HTTP 请求方法
pub(all) enum HttpMethod {
  Get
  Post
  Put
  Delete
  Head
  Options
} derive(Eq, Debug)

///|
fn HttpMethod::to_str(self : HttpMethod) -> String {
  match self {
    Get => "GET"
    Post => "POST"
    Put => "PUT"
    Delete => "DELETE"
    Head => "HEAD"
    Options => "OPTIONS"
  }
}

///|
/// 发起网络请求。响应体尽量解析为 Json，解析失败时为 Json::String(原文)。
/// data 为请求体/查询参数（GET 时会拼到 url 上，与 wx.request 行为一致）。
/// on_response 参数：statusCode、响应体、响应头。
pub fn request(
  url : String,
  http_method? : HttpMethod = Get,
  data? : Json = Json::null(),
  on_response : (Int, Json, Json) -> Unit,
  on_fail : (String) -> Unit,
) -> Unit {
  wx_request(
    url,
    http_method.to_str(),
    if data is Json::Null {
      ""
    } else {
      data.stringify()
    },
    fn(status, text, header) {
      let body : Json = @json.parse(text) catch { _ => jstr(text) }
      let hdr : Json = @json.parse(header) catch { _ => jobj([]) }
      on_response(status, body, hdr)
    },
    on_fail,
  )
}

///|
extern "js" fn wx_request(
  url : String,
  http_method : String,
  data_json : String,
  on_resp : (Int, String, String) -> Unit,
  on_err : (String) -> Unit,
) -> Unit =
  #|(url, method, dataJson, onResp, onErr) => wx.request({
  #|  url, method,
  #|  data: dataJson === "" ? undefined : JSON.parse(dataJson),
  #|  success: (res) => onResp(
  #|    res.statusCode | 0,
  #|    JSON.stringify(res.data),
  #|    JSON.stringify(res.header || {}),
  #|  ),
  #|  fail: (e) => onErr(String(e && e.errMsg)),
  #|})

///|
/// 通用 wx 调用：方法名 + JSON 参数串。
/// 无 wx 环境（node 单测 / 模拟器未安装时）静默跳过，保证调用安全。
extern "js" fn wx_call(api : String, json : String) -> Unit =
  #|(api, json) => {
  #|  if (typeof wx !== "undefined" && wx[api]) {
  #|    wx[api](JSON.parse(json));
  #|  }
  #|}

///|
/// 触发短震动反馈
pub fn vibrate_short() -> Unit {
  wx_call("vibrateShort", "{}")
}

///|
/// 显示加载中提示（手动配对 hide_loading）
pub fn show_loading(title : String, mask? : Bool = false) -> Unit {
  wx_call(
    "showLoading",
    jobj([("title", jstr(title)), ("mask", jbool(mask))]).stringify(),
  )
}

///|
/// 隐藏加载中提示
pub fn hide_loading() -> Unit {
  wx_call("hideLoading", "{}")
}

///|
/// 停止下拉刷新（在 onPullDownRefresh 处理器末尾调用）
pub fn stop_pull_down_refresh() -> Unit {
  wx_call("stopPullDownRefresh", "{}")
}

///|
/// 动态设置当前页面导航栏标题
pub fn set_nav_title(title : String) -> Unit {
  wx_call("setNavigationBarTitle", jobj([("title", jstr(title))]).stringify())
}

///|
/// 滚动页面到目标位置（纵向像素；duration=0 为瞬时）
pub fn page_scroll_to(scroll_top : Int, duration? : Int = 300) -> Unit {
  wx_call(
    "pageScrollTo",
    jobj([
      ("scrollTop", jnum(scroll_top.to_double())),
      ("duration", jnum(duration.to_double())),
    ]).stringify(),
  )
}

///|
/// 拨打电话
pub fn make_phone_call(number : String) -> Unit {
  wx_call("makePhoneCall", jobj([("phoneNumber", jstr(number))]).stringify())
}

///|
/// 从相册/相机选择图片，返回本地临时路径列表。
/// count 为最大可选数（上限 9）；取消或失败时 paths 为空数组。
pub fn choose_image(
  count? : Int = 9,
  on_result~ : (Array[String]) -> Unit,
) -> Unit {
  wx_choose_image(count, on_result)
}

///|
extern "js" fn wx_choose_image(
  count : Int,
  cb : (Array[String]) -> Unit,
) -> Unit =
  #|(count, cb) => wx.chooseImage({
  #|  count: count | 9,
  #|  success: (res) => cb((res.tempFilePaths || []).map(String)),
  #|  fail: () => cb([]),
  #|})

///|
/// 构造 onShareAppMessage 返回的转发卡片内容
/// （用于 PageDef.returns：("onShareAppMessage", (_, _) => share_card(...))）
pub fn share_card(
  title : String,
  path? : String = "",
  image_url? : String = "",
) -> Json {
  let fields : Array[(String, Json)] = [("title", jstr(title))]
  if path != "" {
    fields.push(("path", jstr(path)))
  }
  if image_url != "" {
    fields.push(("imageUrl", jstr(image_url)))
  }
  jobj(fields)
}

///|
/// 操作菜单（ActionSheet）：用户点某项回调索引，点取消回调 None
pub fn show_action_sheet(
  items : Array[String],
  on_result~ : (Int?) -> Unit,
  title? : String = "",
) -> Unit {
  wx_action_sheet(title, items, on_result)
}

///|
extern "js" fn wx_action_sheet(
  title : String,
  items : Array[String],
  cb : (Int?) -> Unit,
) -> Unit =
  #|(title, items, cb) => {
  #|  if (typeof wx === "undefined" || !wx.showActionSheet) { return; }
  #|  wx.showActionSheet({
  #|    itemList: items,
  #|    title: title === "" ? undefined : title,
  #|    success: (res) => cb(res.tapIndex | 0),
  #|    fail: () => cb(null),
  #|  });
  #|}

///|
/// 系统信息快照（getSystemInfoSync 的结果对象）
pub fn system_info() -> Json {
  match wx_system_info().to_json() {
    Some(j) => j
    None => Json::empty_object()
  }
}

///|
extern "js" fn wx_system_info() -> JsVal =
  #|() => {
  #|  if (typeof wx === "undefined" || !wx.getSystemInfoSync) { return {}; }
  #|  return wx.getSystemInfoSync();
  #|}

///|
/// 预览图片：urls 为图片地址列表，current 为当前显示（默认首张）
pub fn preview_image(urls : Array[String], current? : String = "") -> Unit {
  let cur = if current == "" {
    urls[0]
  } else {
    current
  }
  wx_call(
    "previewImage",
    jobj([("urls", jarr(urls.map(fn(u) { jstr(u) }))), ("current", jstr(cur))])
      .stringify(),
  )
}

///|
/// 扫码：成功回调解码内容，取消/失败回调空字符串
pub fn scan_code(on_result~ : (String) -> Unit) -> Unit {
  wx_scan_code(on_result)
}

///|
extern "js" fn wx_scan_code(cb : (String) -> Unit) -> Unit =
  #|(cb) => {
  #|  if (typeof wx === "undefined" || !wx.scanCode) { cb(""); return; }
  #|  wx.scanCode({
  #|    success: (res) => cb(String(res.result || "")),
  #|    fail: () => cb(""),
  #|  });
  #|}

///|
/// 打开位置：在地图应用中展示坐标点
pub fn open_location(
  latitude : Double,
  longitude : Double,
  name? : String = "",
  address? : String = "",
) -> Unit {
  let fields : Array[(String, Json)] = [
    ("latitude", jnum(latitude)),
    ("longitude", jnum(longitude)),
  ]
  if name != "" {
    fields.push(("name", jstr(name)))
  }
  if address != "" {
    fields.push(("address", jstr(address)))
  }
  wx_call("openLocation", jobj(fields).stringify())
}
