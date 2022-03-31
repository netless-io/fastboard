# API

## 目录

- [顶层方法](#top-level-functions)
  - [`createFastboard`](#createfastboard)
  - [`mount`](#mount)
- [实例方法](#instance-methods)
  - [`bindContainer`](#bindcontainer)
  - [`undo`](#undo)
  - [`redo`](#redo)
  - [`moveCamera`](#movecamera)
  - [`moveCameraToContain`](#movecameratocontain)
  - [`cleanCurrentScene`](#cleancurrentscene)
  - [`setAppliance`](#setappliance)
  - [`setStrokeWidth`](#setstrokewidth)
  - [`setStrokeColor`](#setstrokecolor)
  - [`setTextColor`](#settextcolor)
  - [`setTextSize`](#settextsize)
  - [`insertImage`](#insertimage)
  - [`insertDocs`](#insertdocs)
  - [`insertMedia`](#insertmedia)
- [UI 相关属性](#ui-values)
  - [`writable`](#writable)
  - [`boxState`](#boxState)
  - [`focusedApp`](#focusedapp)
  - [`canRedoSteps`](#canredosteps)
  - [`canUndoSteps`](#canundosteps)
  - [`camera`](#camera)
  - [`memberState`](#memberstate)
  - [`sceneIndex`](#sceneindex)
  - [`sceneLength`](#scenelength)
  - [`appsStatus`](#appsstatus)

<h2 id="top-level-functions">顶层方法</h2>

### createFastboard

> 创建 FastboardApp

```js
let app = await createFastboard({
  // 必填项只有下面这些
  sdkConfig: {
    appIdentifier: APPID,
    region: "ch-hz",
  },
  joinRoom: {
    uid: "unique_id",
    uuid: ROOM_UUID,
    roomToken: ROOM_TOKEN,
  },
  // 完整配置见下方
});
```

参数

| name          | type                                | desc                                                                                                          |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| sdkConfig     | [required] WhiteWebSdkConfiguration | [SDK 配置](https://developer.netless.link/javascript-zh/home/construct-white-web-sdk)                         |
| joinRoom      | [required] JoinRoomParams           | [加入房间配置](https://developer.netless.link/javascript-zh/home/construct-room-and-player)                   |
| managerConfig | [optional] MountParams              | [WindowManager 配置](https://github.com/netless-io/window-manager/blob/master/docs/api.md#windowmanagermount) |

### mount

> 将 FastboardApp 挂载到 DOM

```js
let ui = mount(app, document.getElementById("#board"));
ui.update({ theme: "dark", language: "zh-CN" });
ui.destroy();
```

参数

| name | type                    | desc                               |
| ---- | ----------------------- | ---------------------------------- |
| app  | [required] FastboardApp | 从 createFastboard 获取的 app 对象 |
| dom  | [required] HTMLElement  | 挂载的 DOM 元素                    |
| opts | [optional] MountOptions | UI 配置                            |

```ts
type MountOptions = {
  // 默认 "light"
  theme?: "light" | "dark";
  // 默认 "en"
  language?: "en" | "zh-CN";
  // 具体配置每个组件是否显示
  config?: {
    toolbar?: { enable?: boolean };
    redo_undo?: { enable?: boolean };
    zoom_control?: { enable?: boolean };
    page_control?: { enable?: boolean };
  };
  // 白板的 div 出现的时候会触发这个回调
  containerRef?: (container: HTMLDivElement | null) => void;
};
```

返回值

```ts
type ReturnValue = {
  // 更新 UI
  update: (opts: MountOptions) => void;
  // 卸载白板
  destroy: () => void;
};
```

<h2 id="instance-methods">实例方法</h2>

### bindContainer

> 绑定白板到 DOM（注意，这里只有白板本身，不包含任何外部组件）

```js
app.bindContainer(document.getElementById("#whiteboard"));
```

参数

| name | type                   | desc                |
| ---- | ---------------------- | ------------------- |
| dom  | [required] HTMLElement | 挂载白板的 DOM 元素 |

### bindCollector

> 修改 WindowManager 的 <q>抽屉</q> 的位置

```js
app.bindCollector(document.getElementById("#collector"));
```

参数

| name | type                   | desc                       |
| ---- | ---------------------- | -------------------------- |
| dom  | [required] HTMLElement | 挂载 collector 的 DOM 元素 |

### undo

> 撤销

```js
app.undo();
```

### redo

> 重做

```js
app.redo();
```

### moveCamera

> 移动视角

```js
app.moveCamera({ centerX: 0, centerY: 0, scale: 1 });
```

参数

| name    | type              | default | desc                                      |
| ------- | ----------------- | ------- | ----------------------------------------- |
| centerX | [optional] number | 0       | 视角的中心对准的点的 x 坐标（世界坐标系） |
| centerY | [optional] number | 0       | 视角的中心对准的点的 y 坐标（世界坐标系） |
| scale   | [optional] number | 1       | 缩放                                      |

### moveCameraToContain

> 移动视角到包含一个区域

```js
app.moveCameraToContain({ originX: -100, originY: -100, width: 200, height: 200 });
```

参数

| name    | type              | desc     |
| ------- | ----------------- | -------- |
| originX | [required] number | 左上角 X |
| originY | [required] number | 左上角 Y |
| width   | [required] number | 宽       |
| height  | [required] number | 高       |

### cleanCurrentScene

> 清空当前选中场景

```js
app.cleanCurrentScene();
```

### setAppliance

> 设置教具

```js
app.setAppliance("pencil");
app.setAppliance("shape", "triangle");
```

参数

| name      | type                      | desc                               |
| --------- | ------------------------- | ---------------------------------- |
| appliance | [required] ApplianceNames | 教具                               |
| shape     | [optional] ShapeType      | 当 appliance 是 shape 时，用的形状 |

类型

```ts
enum ApplianceNames {
  selector = "selector",
  clicker = "clicker",
  laserPointer = "laserPointer",
  pencil = "pencil",
  rectangle = "rectangle",
  ellipse = "ellipse",
  shape = "shape",
  eraser = "eraser",
  text = "text",
  straight = "straight",
  arrow = "arrow",
  hand = "hand",
}
enum ShapeType {
  Triangle = "triangle",
  Rhombus = "rhombus",
  Pentagram = "pentagram",
  SpeechBalloon = "speechBalloon",
}
```

### setStrokeWidth

> 设置笔触宽度

```js
app.setStrokeWidth(1);
```

### setStrokeColor

> 设置笔触颜色

```js
app.setStrokeColor([255, 0, 0]); // 红色
```

### setTextColor

> 设置文字颜色

```js
app.setTextColor([255, 0, 0]); // 红色
```

### setTextSize

> 设置文字大小

```js
app.setTextSize(16);
```

### insertImage

> 插入图片

```js
await app.insertImage("cdn/path/to/image");
```

参数

| name | type   | desc     |
| ---- | ------ | -------- |
| url  | string | 图片地址 |

### insertDocs

> 插入 PDF / PPT

```js
const appId = await app.insertDocs("文件名.pptx", conversionResponse);
```

参数

| name     | type                                                                                                                                                               | desc     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| title    | string                                                                                                                                                             | 窗口标题 |
| response | [ConversionResponse](https://developer.netless.link/server-zh/home/server-conversion#get-%E6%9F%A5%E8%AF%A2%E4%BB%BB%E5%8A%A1%E8%BD%AC%E6%8D%A2%E8%BF%9B%E5%BA%A6) | 转码结果 |

返回的 appId 见 [WindowManager](https://github.com/netless-io/window-manager/blob/master/docs/api.md#addApp) 文档。

### insertMedia

> 插入音视频

```js
const appId = await app.insertMedia("文件名.mp3", url);
```

参数

| name  | type   | desc       |
| ----- | ------ | ---------- |
| title | string | 窗口标题   |
| url   | string | 音视频地址 |

<h2 id="ui-values">UI 相关属性</h2>

类型

```ts
export type FastboardDisposer = () => void;

export interface FastboardReadable<T> {
  readonly value: T;
  subscribe(callback: (value: T) => void): FastboardDisposer;
  reaction(callback: (value: T) => void): FastboardDisposer;
}

export interface FastboardWritable<T, SetFn = (value: T) => void> extends FastboardReadable<T> {
  setValue: SetFn;
}
```

### writable

> 当前房间是否可写，理论上，不可写时要将所有 UI 组件禁用

```js
app.writable.value; // true | false
app.writable.setValue(false); // 切换到不可写状态
app.writable.subscribe(value => {
  // value 变化时触发
});
```

类型

```ts
type writable = FastboardWritable<boolean>;
```

### boxState

> App 窗口状态

类型

```ts
type boxState = FastboardReadable<"normal" | "minimized" | "maximized" | undefined>;
```

### focusedApp

> 当前选中的 App

类型

```ts
type focusedApp = FastboardReadable<string | undefined>;
```

### canRedoSteps

> 能重做的步数

类型

```ts
type canRedoSteps = FastboardReadable<number>;
```

### canUndoSteps

> 能撤销的步数

类型

```ts
type canUndoSteps = FastboardReadable<number>;
```

### camera

> 视角

类型

```ts
type camera = FastboardReadable<Camera>;
type Camera = {
  centerX: number;
  centerY: number;
  scale: number;
};
```

### memberState

> 用户状态（正在用的教具之类）

类型

```ts
type memberState = FastboardReadable<MemberState>;
type MemberState = {
  currentApplianceName: ApplianceNames;
  strokeColor: Color;
  textColor?: Color;
  strokeWidth: number;
  textSize: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  shapeType?: ShapeType;
};
```

### sceneIndex

> 场景下标

类型

```ts
type sceneIndex = FastboardReadable<number>;
```

### sceneLength

> 场景数量

类型

```ts
type sceneLength = FastboardReadable<number>;
```

### appsStatus

> 场景数量

类型

```ts
type appsStatus = FastboardReadable<AppsStatus>;
type AppsStatus = {
  [kind: string]: {
    status: "idle" | "loading" | "failed";
    reason?: string;
  };
};
```
