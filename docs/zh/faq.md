## FAQ

### TypeError: Tippy.setDefaultProps is not a function

这是由于你的打包器不支持 ESM 模块导致的，建议使用更新的打包器如 esbuild 等。

### 如何使用代码操作 App

不支持。或者说这部分交互完全由 App 本身定义，Fastboard (Window Manager) 只是提供了一些基建让他们实现同步。内置的那些 App（包括 PPT/PDF 文档查看器、音视频播放器、代码编辑器、倒计时、GeoGebra 等）均不支持任何外部操作。

如果想要实现各种复杂交互，建议 fork 我们提供的插件或者自己从头编写。

[官方所有 App 实现](https://github.com/netless-io/netless-app) |
[App 开发文档](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md)

对于简单的需求例如隐藏一些元素，建议优先使用 CSS 覆盖方式实现。

### 如何实现非固定比例视角

为了保证多端同步的准确性，视角同步（包括底部白板和窗口的相对位置）基于一个前提：所有端的白板比例都是同一值。默认为 `9/16`。你可以通过 managerConfig.containerSizeRatio 在初始化时修改这个值。

如果你不想要这个同步逻辑，可以设置 managerConfig.viewMode 为 `freedom`，此时白板不再跟随其他人的视角，需要你自己调用 moveCamera 等接口自行实现视角相关业务。
