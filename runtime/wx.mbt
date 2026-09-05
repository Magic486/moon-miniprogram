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
pub fn request(
  url : String,
  http_method? : HttpMethod = Get,
  data? : Json = Json::null(),
  on_response : (Int, Json) -> Unit,
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
    fn(status, text) {
      let body : Json = @json.parse(text) catch { _ => jstr(text) }
      on_response(status, body)
    },
    on_fail,
  )
}

///|
extern "js" fn wx_request(
  url : String,
  http_method : String,
  data_json : String,
  on_resp : (Int, String) -> Unit,
  on_err : (String) -> Unit,
) -> Unit =
  #|(url, method, dataJson, onResp, onErr) => wx.request({
  #|  url, method,
  #|  data: dataJson === "" ? undefined : JSON.parse(dataJson),
  #|  success: (res) => onResp(res.statusCode | 0, JSON.stringify(res.data)),
  #|  fail: (e) => onErr(String(e && e.errMsg)),
  #|})

///|
/// 通用 wx 调用：方法名 + JSON 参数串
extern "js" fn wx_call(api : String, json : String) -> Unit =
  #|(api, json) => wx[api](JSON.parse(json))

///|
/// 触发短震动反馈
pub fn vibrate_short() -> Unit {
  wx_call("vibrateShort", "{}")
}
