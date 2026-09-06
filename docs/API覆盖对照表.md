# wx API 覆盖对照表

> 状态图例：✅ 已绑定（本框架 pub 函数）｜🔜 已规划（高频候选）｜— 不做/低价值
> 代码出处：`runtime/wx.mbt`、`runtime/wx_extra.mbt`、`runtime/router.mbt`、
> `runtime/platform.mbt`（函数名以 moon info 生成的 mbti 为准）

## 数据与存储

| 微信能力 | 本框架 | 备注 |
|---|---|---|
| 同步读写缓存 setStorageSync/getStorageSync/removeStorageSync/clearStorageSync | ✅ `set_storage` `get_storage` `remove_storage` `clear_storage` | Json 直通 |
| 异步缓存（setStorage…） | — | 同步版已覆盖绝大多数场景 |

## 界面 · 交互与导航栏

| 微信能力 | 本框架 | 备注 |
|---|---|---|
| showToast/hideToast | ✅ `toast(title, icon~, mask~, duration~)` `hide_toast` | 4 种 icon |
| showLoading/hideLoading | ✅ `show_loading` `hide_loading` | |
| showModal | ✅ `confirm(title, content, show_cancel~, on_result~)` | 回调 Bool |
| showActionSheet | ✅ `show_action_sheet(items, on_result~)` | 回调 `Int?` |
| vibrateShort/vibrateLong | ✅ `vibrate_short` `vibrate_long` | |
| 导航栏标题 setNavigationBarTitle | ✅ `set_nav_title` | |
| 导航栏配色 setNavigationBarColor | ✅ `set_nav_bar_color(fg, bg)` | |
| 导航栏 loading ×2 | ✅ `show_nav_bar_loading` `hide_nav_bar_loading` | |
| 下拉刷新 stopPullDownRefresh | ✅ `stop_pull_down_refresh` | |
| 页面滚动 pageScrollTo | ✅ `page_scroll_to(top, duration~)` | |
| 保持常亮 setKeepScreenOn | ✅ `keep_screen_on` | |
| 屏幕亮度读写 | ✅ `get_screen_brightness` `set_screen_brightness` | 回调/0-1 |

## 导航与路由

| 微信能力 | 本框架 | 备注 |
|---|---|---|
| navigateTo/redirectTo/switchTab/navigateBack | ✅ 裸 API `navigate_to` `redirect_to` `switch_tab` `navigate_back` | |
| 声明式路由 | ✅ `register_route` + `navigate_to_route` `redirect_to_route` `switch_tab_route` | 参数白名单 |
| 返回首页/多级 | 🔜 reLaunch | 常用场景少 |

## 剪贴板

| 微信能力 | 本框架 | 备注 |
|---|---|---|
| setClipboardData | ✅ `set_clipboard` `copy_with_toast` | 后者带提示 |
| getClipboardData | ✅ `get_clipboard_data(on_result~)` | |

## 设备 · 系统 · 电话

| 微信能力 | 本框架 | 备注 |
|---|---|---|
| getSystemInfoSync | ✅ `system_info()` | 同步快照 |
| getNetworkType | ✅ `get_network_type(on_result~)` | |
| getBatteryInfo | ✅ `get_battery_info(on_result~)` | |
| makePhoneCall | ✅ `make_phone_call(number)` | |
| 平台探测 | ✅ `detect_platform()` → `MiniPlatform` | 跨端适配层 |

## 媒体 · 文件 · 扫码

| 微信能力 | 本框架 | 备注 |
|---|---|---|
| chooseImage | ✅ `choose_image(count~, on_result~)` | 回调路径数组 |
| previewImage | ✅ `preview_image(urls, current~)` | |
| getImageInfo | ✅ `get_image_info(src, on_result~)` | 宽高 |
| saveImageToPhotosAlbum | ✅ `save_image_to_album(path, on_ok~, on_fail~)` | 需授权 |
| scanCode | ✅ `scan_code(on_result~)` | 失败回空串 |
| downloadFile | ✅ `download_file(url, on_result~)` | 临时路径 |
| uploadFile | 🔜 规划 | 表单上传 |
| chooseVideo / chooseMedia | 🔜 规划 | 视频/多选媒体 |
| 文件系统 FileSystemManager | — | 大批量文件场景再评估 |

## 位置 · 网络 · 开放

| 微信能力 | 本框架 | 备注 |
|---|---|---|
| getLocation | ✅ `get_location(on_result~)` | gcj02，回调对象 |
| openLocation | ✅ `open_location(lat, lng, name~, address~)` | |
| wx.request | ✅ `request(url, http_method~, data~, on_response, on_fail)` | 暴露 status/header |
| login | ✅ `login(on_result~)` | code 回调 |
| 用户信息 getUserProfile | 🔜 规划 | 需 button 手势触发 |
| 权限 openSetting/getSetting/authorize | 🔜 规划 | 授权拒绝后的设置引导 |
| 支付 requestPayment | — | 需商户号，不做 |
| 分享/收藏菜单 showShareMenu 等 | 🔜 规划 | 卡片构造已备 `share_card` `timeline_card` `favorite_card` |

## 生命周期与钩子（模型层，非 wx 绑定）

| 能力 | 本框架 | 备注 |
|---|---|---|
| App onLaunch/onError 等 | ✅ `register_app` handlers | onError 全局错误钩子 |
| Page 生命周期/自定义事件 | ✅ `register_page` handlers | 任意名字透传 |
| 带返回值钩子 | ✅ `PageDef.returns` + `share_card` `timeline_card` `favorite_card` | onShareAppMessage/onShareTimeline/onAddToFavorites |
| 组件 observers/pageLifetimes | ✅ `ComponentDef` | |
| 跨页共享状态 | ✅ `create_store` + `bind_store` | 非 wx API，框架自研 |

## 覆盖率小结

- **已绑定：约 55 个 pub 函数**，覆盖工具/业务类小程序的主流程
  （数据、交互、导航、路由、剪贴板、设备、媒体、文件、位置、网络、登录、分享）
- 未绑定项集中于：需商户/权限流（支付、用户信息、相册授权引导）与低频系统级 API；
  其中 🔜 标记的是社区贡献与后续版本的天然候选
