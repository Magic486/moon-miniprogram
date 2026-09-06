///|
/// wx API 扩展绑定：设备 / 界面 / 媒体 / 文件 / 位置 / 开放接口。
///
/// 统一约定：
/// - 同步取值走 `wx_call` / 直接 extern，无 wx 环境返回安全默认
/// - 异步结果一律回调；回调在**无 wx / API 缺失 / 失败**时也保证被调用
///   （回退默认值），因此调用方永远不需要处理"没回调"的情况
/// - 需要用户授权的接口（位置、相册、登录）在小程序侧由用户手势触发，
///   框架层负责桥接与降级

// ---------- 设备 ----------

///|
/// 读取剪贴板文本（无内容/失败回传 ""）
pub fn get_clipboard_data(on_result~ : (String) -> Unit) -> Unit {
  wx_get_clipboard(on_result)
}

///|
extern "js" fn wx_get_clipboard(cb : (String) -> Unit) -> Unit =
  #|(cb) => {
  #|  if (typeof wx === "undefined" || !wx.getClipboardData) { cb(""); return; }
  #|  wx.getClipboardData({
  #|    success: (res) => cb(String(res.data || "")),
  #|    fail: () => cb(""),
  #|  });
  #|}

///|
/// 当前网络类型：wifi / 4g / 3g / 2g / none / unknown…（失败回传 ""）
pub fn get_network_type(on_result~ : (String) -> Unit) -> Unit {
  wx_network_type(on_result)
}

///|
extern "js" fn wx_network_type(cb : (String) -> Unit) -> Unit =
  #|(cb) => {
  #|  if (typeof wx === "undefined" || !wx.getNetworkType) { cb(""); return; }
  #|  wx.getNetworkType({
  #|    success: (res) => cb(String(res.networkType || "")),
  #|    fail: () => cb(""),
  #|  });
  #|}

///|
/// 电量百分比 0-100（失败/无 wx 回传 -1）
pub fn get_battery_info(on_result~ : (Int) -> Unit) -> Unit {
  wx_battery(on_result)
}

///|
extern "js" fn wx_battery(cb : (Int) -> Unit) -> Unit =
  #|(cb) => {
  #|  if (typeof wx === "undefined" || !wx.getBatteryInfo) { cb(-1); return; }
  #|  wx.getBatteryInfo({
  #|    success: (res) => cb(res.level | 0),
  #|    fail: () => cb(-1),
  #|  });
  #|}

///|
/// 当前屏幕亮度 0-1（失败/无 wx 回传 -1.0）
pub fn get_screen_brightness(on_result~ : (Double) -> Unit) -> Unit {
  wx_screen_brightness(on_result)
}

///|
extern "js" fn wx_screen_brightness(cb : (Double) -> Unit) -> Unit =
  #|(cb) => {
  #|  if (typeof wx === "undefined" || !wx.getScreenBrightness) { cb(-1.0); return; }
  #|  wx.getScreenBrightness({
  #|    success: (res) => cb(Number(res.value) || -1.0),
  #|    fail: () => cb(-1.0),
  #|  });
  #|}

///|
/// 设置屏幕亮度 value ∈ [0, 1]
pub fn set_screen_brightness(value : Double) -> Unit {
  wx_call("setScreenBrightness", jobj([("value", jnum(value))]).stringify())
}

///|
/// 保持屏幕常亮
pub fn keep_screen_on() -> Unit {
  wx_call("setKeepScreenOn", jobj([("keepScreenOn", jbool(true))]).stringify())
}

///|
/// 长震动反馈
pub fn vibrate_long() -> Unit {
  wx_call("vibrateLong", "{}")
}

// ---------- 界面 ----------

///|
/// 导航栏加载态（与 hide_nav_bar_loading 配对）
pub fn show_nav_bar_loading() -> Unit {
  wx_call("showNavigationBarLoading", "{}")
}

///|
/// 关闭导航栏加载态
pub fn hide_nav_bar_loading() -> Unit {
  wx_call("hideNavigationBarLoading", "{}")
}

///|
/// 导航栏颜色。foreground: "black" | "white"
pub fn set_nav_bar_color(foreground : String, background : String) -> Unit {
  wx_call(
    "setNavigationBarColor",
    jobj([
      ("frontColor", jstr(foreground)),
      ("backgroundColor", jstr(background)),
    ]).stringify(),
  )
}

// ---------- 媒体 ----------

///|
/// 图片信息（宽高，失败回传 (0, 0)）
pub fn get_image_info(src : String, on_result~ : (Int, Int) -> Unit) -> Unit {
  wx_image_info(src, on_result)
}

///|
extern "js" fn wx_image_info(src : String, cb : (Int, Int) -> Unit) -> Unit =
  #|(src, cb) => {
  #|  if (typeof wx === "undefined" || !wx.getImageInfo) { cb(0, 0); return; }
  #|  wx.getImageInfo({
  #|    src,
  #|    success: (res) => cb(res.width | 0, res.height | 0),
  #|    fail: () => cb(0, 0),
  #|  });
  #|}

///|
/// 保存图片到相册（需用户授权；on_ok/on_fail 至少其一被调用）
pub fn save_image_to_album(
  file_path : String,
  on_ok? : () -> Unit = fn() { () },
  on_fail? : () -> Unit = fn() { () },
) -> Unit {
  wx_save_image(file_path, on_ok, on_fail)
}

///|
extern "js" fn wx_save_image(
  file_path : String,
  ok : () -> Unit,
  fail : () -> Unit,
) -> Unit =
  #|(filePath, ok, fail) => {
  #|  if (typeof wx === "undefined" || !wx.saveImageToPhotosAlbum) { fail(); return; }
  #|  wx.saveImageToPhotosAlbum({
  #|    filePath,
  #|    success: () => ok(),
  #|    fail: () => fail(),
  #|  });
  #|}

// ---------- 文件 ----------

///|
/// 下载文件到本地临时路径（成功回传 tempFilePath，失败回传 ""）
pub fn download_file(url : String, on_result~ : (String) -> Unit) -> Unit {
  wx_download(url, on_result)
}

///|
extern "js" fn wx_download(url : String, cb : (String) -> Unit) -> Unit =
  #|(url, cb) => {
  #|  if (typeof wx === "undefined" || !wx.downloadFile) { cb(""); return; }
  #|  const task = wx.downloadFile({
  #|    url,
  #|    success: (res) => cb(res.statusCode === 200 ? String(res.tempFilePath || "") : ""),
  #|    fail: () => cb(""),
  #|  });
  #|  if (task && task.onProgressUpdate) {
  #|    task.onProgressUpdate(() => {});
  #|  }
  #|}

// ---------- 位置 ----------

///|
/// 获取当前位置（需用户授权）。成功回调含 latitude/longitude 的对象；
/// 取消或失败回调空对象。授权被拒时引导用户到设置页的职责在业务层。
pub fn get_location(on_result~ : (Json) -> Unit) -> Unit {
  wx_location(on_result)
}

///|
extern "js" fn wx_location(cb : (Json) -> Unit) -> Unit =
  #|(cb) => {
  #|  if (typeof wx === "undefined" || !wx.getLocation) { cb({}); return; }
  #|  wx.getLocation({
  #|    type: "gcj02",
  #|    success: (res) => cb({
  #|      latitude: Number(res.latitude),
  #|      longitude: Number(res.longitude),
  #|    }),
  #|    fail: () => cb({}),
  #|  });
  #|}

// ---------- 开放接口 ----------

///|
/// 微信登录：回调临时登录凭证 code（用于换取 openid/session_key；
/// 失败/无 wx 回传 ""）
pub fn login(on_result~ : (String) -> Unit) -> Unit {
  wx_login(on_result)
}

///|
extern "js" fn wx_login(cb : (String) -> Unit) -> Unit =
  #|(cb) => {
  #|  if (typeof wx === "undefined" || !wx.login) { cb(""); return; }
  #|  wx.login({
  #|    success: (res) => cb(String(res.code || "")),
  #|    fail: () => cb(""),
  #|  });
  #|}
