## FAQ

### TypeError: Tippy.setDefaultProps is not a function

这是由于你的打包器不支持 ESM 模块导致的，建议使用更新的打包器如 esbuild 等。

> [!NOTE]
> 这个错误在 0.3.8 后已经被修复了，请检查你的依赖版本。

### \[WindowManger\]: room must be switched to be writable

Fastboard 需要至少一个有 `writer` 权限的用户进入房间来初始化数据，如果第一位用户没有这个权限就会报错。这里推荐给所有用户 (无论是你业务里的老师、学生、助教) 发放 `writer` 权限的 room token。同时，这种做法也有利于实现例如白板权限切换等业务，只需要相关用户调用 `fastboard.room.setWritable(true / false)` 即可。

### 如何使用代码操作 App

不支持。或者说这部分交互完全由 App 本身定义，Fastboard (Window Manager) 只是提供了一些基建让他们实现同步。内置的那些 App（包括 PPT/PDF 文档查看器、音视频播放器、代码编辑器、倒计时、GeoGebra 等）均不支持任何外部操作。

如果想要实现各种复杂交互，建议 fork 我们提供的插件或者自己从头编写。

[本仓库提供的一个简单介绍](./app.md) |
[官方所有 App 实现](https://github.com/netless-io/netless-app) |
[App 开发文档](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md)

对于简单的需求例如隐藏一些元素，建议优先使用 CSS 覆盖方式实现。

### 如何实现非固定比例视角

为了保证多端同步的准确性，视角同步（包括底部白板和窗口的相对位置）基于一个前提：所有端的白板比例都是同一值。默认为 `9/16`。你可以通过 managerConfig.containerSizeRatio 在初始化时修改这个值。

如果你不想要这个同步逻辑，可以设置 managerConfig.viewMode 为 `freedom`，此时白板不再跟随其他人的视角，需要你自己调用 moveCamera 等接口自行实现视角相关业务。

### 如何对齐其他音视频播放器进行回放

白板本身的播放器行为和一般播放器没什么不同——也有播放、暂停、跳转 (seek) 等接口，也会等待资源加载 (buffering)。问题是如何对多个播放器的进度条进行同步，在 web 端我们开发了一个 [SyncPlayer](https://github.com/netless-io/sync-player) 可以完成这个需求，请参考该库的 README 进行开发。

### 如何关闭所有窗口

你可以通过 `Object.keys(manager.apps)` 获得所有窗口的 appId 列表，然后调用 `manager.closeApp(appId)` 来关闭他们。

```js
Object.keys(fastboard.manager.apps).forEach(appId => {
  fastboard.manager.closeApp(appId);
});
```

> [!NOTE]
> 不要试图使用这个接口来<q>初始化</q>房间。由于每个 App 的结束逻辑是异步的，消息同步也是异步的，如果你在一瞬间快速频繁调用 closeApp() 和 addApp()，最终状态可能不是你想要的。
