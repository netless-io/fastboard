# 基于 white-web-sdk / window-manager 集成 appliance-plugin 自定义 Selector 与 Floatbar

本文面向业务接入方，说明如何在 `white-web-sdk + @netless/window-manager` 下集成 `@netless/appliance-plugin`，并基于 selector 事件和命令式 API 自定义：

- selector UI
- floatbar UI
- 选中元素属性面板
- 自定义定位容器


## 1. 适用场景

如果客户希望：

- 关闭内置 floatbar
- 保留内置 selector 能力
- 自己渲染按钮、色板、字号、文本样式、复制/删除/层级等 UI
- 自己决定自定义 floatbar 挂到哪个容器
- 自己决定 selector 边框 / 控制点样式

建议直接使用本文这套接入方式。

## 2. 接入总览

整体思路分两层：

1. `appliance-plugin` 继续负责：
   - 选中
   - 拖拽 / 拉伸 / 旋转 / 端点编辑
   - 选中元素查询
   - 更新选中元素
   - undo / redo 接入

2. 业务侧负责：
   - 监听 selector 相关事件
   - 根据 `getSelectedElements()` 渲染自己的 floatbar
   - 调用 `updateSelectedElements()` / `updateElement()` 等命令式接口
   - 通过 `overwriteSelectorStyles` 或完全自定义 DOM UI 来覆盖视觉样式

## 3. 初始化配置

最小推荐配置可以参考 [example/src/customSelectorMulti.ts](/Users/hongqiuer/work/appliance-plugin/example/src/customSelectorMulti.ts)。

关键点有三个：

1. white room 侧关闭默认 floatBar：

```ts
const room = await whiteWebSdk.joinRoom({
  ...,
  floatBar: false,
  invisiblePlugins: [WindowManager as any, ApplianceMultiPlugin],
  useMultiViews: true,
});
```

2. `window-manager` 挂载时打开 `supportAppliancePlugin`：

```ts
const manager = await WindowManager.mount({
  room,
  container: elm,
  chessboard: true,
  cursor: true,
  supportAppliancePlugin: true,
});
```

3. `appliance-plugin` 推荐 extras：

```ts
const plugin = await ApplianceMultiPlugin.getInstance(manager as any, {
  options: {
    cdn: {
      fullWorkerUrl,
      subWorkerUrl,
    },
    extras: {
      textEditor: {
        showFloatBar: false,
        canSelectorSwitch: true,
        rightBoundBreak: true,
      },
      overwriteSelectorStyles: {
        highlightBox: {
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "#1677ff",
        },
        highlightBoxPoint: {
          backgroundColor: "#1677ff",
        },
        highlightBoxPointDot: {
          borderColor: "#1677ff",
        },
      },
    },
  },
});
```

## 4. 对外事件语义

### 4.1 `selectedElementsChange`

只表示“当前 selector 最终选中了谁”。

特点：

- 只在 `selectedIds` 变化时触发
- 不承载过程态
- 不表示拖拽/缩放/旋转中的中间过程

类型：

```ts
type SelectedElementsChangeInfo = {
  viewId: string;
  scenePath?: string;
  selectorId: string;
  reason: "select" | "clear";
  viewRect?: SelectorViewRect;
  selectedIds: string[];
  selectorInfo?: SelectorInfo;
};
```

推荐用途：

- 控制 floatbar 显示/隐藏
- 在首次选中后刷新业务面板
- 在 `clear` 时销毁业务自定义 UI

### 4.2 `selectorGeometryChange`

只表示“当前 selector 的最终几何结果变化”。

特点：

- 坐标统一输出 `viewRect`
- 不承载 `emitEventType`
- 不承载 `workState`
- 不表示过程态

类型：

```ts
type SelectorGeometryChangeInfo = {
  viewId: string;
  scenePath?: string;
  selectorId: string;
  source: "selector-action" | "property-change" | "camera-change";
  action:
    | "select"
    | "clear"
    | "selectorTransform"
    | "setFontStyle"
    | "setStyle"
    | "cameraTransform";
  viewRect?: SelectorViewRect;
  requestId?: string;
};
```

推荐用途：

- 更新自定义 floatbar 位置
- 响应 camera 变化重新定位 UI
- 响应字体、颜色、缩放等导致的最终选框变化

### 4.3 `selectorTransformChange`

只表示 selector 拖拽、拉伸、旋转、端点编辑等过程态。

特点：

- 仅依赖 `EPostMessageType.SelectorTransform`
- 只暴露 `viewId + emitEventType + workState`

类型：

```ts
type SelectorTransformChangeInfo = {
  viewId: string;
  emitEventType: EmitEventType;
  workState: EventWorkState;
};
```

推荐用途：

- 过程态时隐藏自定义 floatbar
- 在 `Done` 后重新调用 `getSelectedElements()` 拉一次最终快照

### 4.4 `remoteSelectorChange`

表示远端 / 被同步端 selector 的同步结果变化。

特点：

- 默认不承诺过程态
- 更适合做“远端当前选中了谁”的展示

类型：

```ts
type RemoteSelectorChangeInfo = {
  viewId: string;
  scenePath?: string;
  uid: string;
  selectorId: string;
  source: "sync";
  action: "select" | "clear" | "update";
  viewRect?: SelectorViewRect;
  selectedIds: string[];
  selectedElements?: SelectedElementInfo[];
};
```

## 5. 推荐事件监听方式

推荐监听三条本端链路：

- `selectedElementsChange`
- `selectorGeometryChange`
- `selectorTransformChange`

业务侧典型写法如下：

```ts
import {
  EventWorkState,
  type SelectedElementsChangeInfo,
  type SelectorGeometryChangeInfo,
  type SelectorTransformChangeInfo,
  type SelectedElementsSnapshot,
} from "@netless/appliance-plugin";

const isTransformStart = (workState: EventWorkState) =>
  workState === EventWorkState.Start || workState === EventWorkState.Doing;

const isTransformDone = (workState: EventWorkState) =>
  workState === EventWorkState.Done;

function bindCustomSelector(appliancePlugin: any) {
  const refresh = (viewId?: string) => {
    const snapshot = appliancePlugin.getSelectedElements(
      viewId,
    ) as SelectedElementsSnapshot | undefined;
    // 基于 snapshot 重新渲染自定义 floatbar
  };

  const onSelected = (payload: SelectedElementsChangeInfo) => {
    if (payload.reason === "clear") {
      // 隐藏自定义 UI
      return;
    }
    refresh(payload.viewId);
  };

  const onGeometry = (payload: SelectorGeometryChangeInfo) => {
    if (!payload.viewRect || payload.action === "clear") {
      // 隐藏自定义 UI
      return;
    }
    refresh(payload.viewId);
  };

  const onTransform = (payload: SelectorTransformChangeInfo) => {
    if (isTransformStart(payload.workState)) {
      // 过程态隐藏 UI
      return;
    }
    if (isTransformDone(payload.workState)) {
      requestAnimationFrame(() => refresh(payload.viewId));
    }
  };

  appliancePlugin.addListener("selectedElementsChange", onSelected);
  appliancePlugin.addListener("selectorGeometryChange", onGeometry);
  appliancePlugin.addListener("selectorTransformChange", onTransform);

  return () => {
    appliancePlugin.removeListener("selectedElementsChange", onSelected);
    appliancePlugin.removeListener("selectorGeometryChange", onGeometry);
    appliancePlugin.removeListener("selectorTransformChange", onTransform);
  };
}
```

## 6. 命令式 API

这些方法都挂在 `appliancePlugin` 上。

### 6.1 `getSelectedElements(viewId?)`

主动获取当前 selector 快照。

签名：

```ts
getSelectedElements(viewId?: string): SelectedElementsSnapshot | undefined;
```

返回值：

```ts
type SelectedElementsSnapshot = {
  viewId: string;
  scenePath?: string;
  viewRect?: SelectorViewRect;
  selectedIds: string[];
  selectedElements: SelectedElementInfo[];
};
```

建议：

- 事件只负责通知“有变化”
- 具体 UI 渲染尽量以 `getSelectedElements()` 的实时快照为准

### 6.1.1 `isElementPropertySupported(toolsType, field)`

判断某个属性字段是否属于指定 `toolsType` 的可编辑能力。

```ts
isElementPropertySupported(
  toolsType: EToolsKey,
  field: ElementPropertyField,
): boolean;
```

推荐用途：

- 客户端动态控制 floatbar 按钮显隐
- 避免为当前教具展示无效按钮
- 避免手写复杂的 `toolsType` 白名单

示例：

```ts
const supported = appliancePlugin.isElementPropertySupported(
  element.toolsType,
  "strokeColor",
);
```

### 6.2 `blurSelector(viewId?)`

清空当前 selector 选中态。

```ts
blurSelector(viewId?: string): Promise<ClearSelectedElementsResult>;
```

权限要求：

- 必须在可写权限下调用
- 建议先判断 `room.isWritable === true`

典型用途：

- 点关闭按钮
- 自定义面板失焦
- 切换业务工具前主动清空选中

### 6.3 `updateSelectedElements(viewId?, changes)`

更新当前 selector 选中的元素集合属性。

多窗口推荐显式传 `viewId`：

```ts
updateSelectedElements(
  viewId: string,
  changes: UpdateSelectedElementChanges,
): Promise<UpdateSelectedElementsResult>;
```

权限要求：

- 必须在可写权限下调用
- 建议先判断 `room.isWritable === true`

支持字段：

```ts
type UpdateSelectedElementChanges = {
  toolsType?: EToolsKey;
  strokeColor?: string;
  fillColor?: string;
  thickness?: number;
  strokeType?: EStrokeType;
  fontColor?: string;
  fontBgColor?: string;
  fontSize?: number;
  bold?: "bold" | "normal";
  italic?: "italic" | "normal";
  underline?: boolean;
  lineThrough?: boolean;
  isLocked?: boolean;
  zIndexLayer?: ElayerType;
  shape?: {
    vertices?: number;
    innerVerticeStep?: number;
    innerRatio?: number;
    placement?: SpeechBalloonPlacement;
  };
};
```

`toolsType` 只用于 `shape.*` 更新时路由内部 `SetShapeOpt`，推荐自定义 floatbar 调整 Star / Polygon / SpeechBalloon 参数时显式传入：

```ts
updateSelectedElements(viewId, {
  toolsType: EToolsKey.Star,
  shape: {
    vertices: 12,
  },
});
```

### 6.4 `copySelectedElements(viewId?)`

复制当前选中元素。

```ts
copySelectedElements(viewId?: string): Promise<CopySelectedElementsResult>;
```

权限要求：

- 必须在可写权限下调用
- 建议先判断 `room.isWritable === true`

### 6.5 `deleteSelectedElements(viewId?)`

删除当前选中元素。

```ts
deleteSelectedElements(viewId?: string): Promise<DeleteSelectedElementsResult>;
```

权限要求：

- 必须在可写权限下调用
- 建议先判断 `room.isWritable === true`

### 6.6 `updateElement(elementId, scenePath, viewId, updateElementInfo)`

单元素最终态更新接口。

```ts
updateElement(
  elementId: string,
  scenePath: string,
  viewId: string,
  updateElementInfo: UpdateElementInfo,
  useUndoRedoStack?: boolean,
): Promise<boolean>;
```

权限要求：

- 必须在可写权限下调用
- 建议先判断 `room.isWritable === true`

特点：

- storage-first
- 不支持 selector 本身
- 需要业务显式声明 `toolsType`
- 运行时会校验声明的 `toolsType` 和实际元素类型是否一致

适用场景：

- 非当前选中的某个单元素更新
- 业务需要绕开 selector、直接更新指定元素

### 6.7 `getFloatbarContainer(viewId?)`

获取 plugin 在当前 view 内提供的自定义 floatbar 容器。

```ts
getFloatbarContainer(viewId?: string): HTMLElement | undefined;
```

这是推荐挂载方式。

优点：

- 与当前 view 同坐标系
- `selectorGeometryChange.viewRect` 可直接使用
- 不需要额外计算 offset

### 6.8 `getViewOffsetToContainer(container, viewId?)`

当业务想把所有 floatbar 统一挂到外部 overlay root 时，使用这个方法换算坐标。

```ts
getViewOffsetToContainer(
  container: HTMLElement,
  viewId?: string,
): SelectorViewOffset | undefined;
```

## 7. 推荐 floatbar 挂载方式

### 7.1 推荐方式：挂到内部容器

建议优先使用：

```ts
const container = appliancePlugin.getFloatbarContainer(viewId);
```

然后将业务自定义 React/Vue/DOM 直接挂到这个容器下。

这时：

- `selectorGeometryChange.viewRect.x/y`
- `getSelectedElements().viewRect.x/y`

都可以直接当成该容器内定位坐标使用。

### 7.2 外部容器方式

如果业务必须挂到统一 overlay root：

```ts
const offset = appliancePlugin.getViewOffsetToContainer(overlayRoot, viewId);
const left = viewRect.x + offset.x;
const top = viewRect.y + offset.y;
```

## 8. 自定义 selector 样式

如果客户只是想改 selector 视觉，而不想接管交互逻辑，建议使用：

```ts
extras: {
  overwriteSelectorStyles: {
    highlightBox: CSSProperties,
    highlightBoxPoint: CSSProperties,
    highlightBoxPoints: {
      LT?: CSSProperties,
      LC?: CSSProperties,
      LB?: CSSProperties,
      TC?: CSSProperties,
      RT?: CSSProperties,
      RC?: CSSProperties,
      RB?: CSSProperties,
      BC?: CSSProperties,
    },
    highlightBoxPointDot: CSSProperties,
    highlightBoxLock: CSSProperties,
  },
}
```

适合做：

- 边框颜色
- 边框粗细
- 控制点颜色
- 端点样式
- 锁定图标样式

不适合做：

- 完整替换 selector 交互逻辑
- 完整替换拖拽/缩放/旋转逻辑

## 9. `SelectedElementInfo` 数据结构

`getSelectedElements()` 返回的每个元素结构如下：

```ts
type SelectedElementInfo = {
  id: string;
  toolsType: EToolsKey;
  rect?: SelectorViewRect;
  centerPos?: [number, number];
  canRotate?: boolean;
  canLock?: boolean;
  scaleType?: EScaleType;
  isLocked?: boolean;
  style: {
    strokeColor?: string;
    fillColor?: string;
    thickness?: number;
    strokeType?: EStrokeType;
    fontColor?: string;
    fontBgColor?: string;
    zIndex?: number;
  };
  text?: {
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    bold?: "bold" | "normal";
    italic?: "italic" | "normal";
    underline?: boolean;
    lineThrough?: boolean;
    textAlign?: "left" | "center" | "right";
    verticalAlign?: "top" | "middle" | "bottom";
    boxPoint?: [number, number];
    boxSize?: [number, number];
  };
  shape?: {
    vertices?: number;
    innerVerticeStep?: number;
    innerRatio?: number;
    placement?: SpeechBalloonPlacement;
  };
};
```

业务可以用它来：

- 根据 `toolsType` 渲染按钮
- 读取当前样式态
- 判断按钮 active 状态

## 10. 不同 `toolsType` 可更新属性总表

这部分建议客户直接按 `isElementPropertySupported(toolsType, field)` 做运行时控制；下面表格用于静态理解。

### 10.0 `EToolsKey` 公开枚举值

`@netless/appliance-plugin` 公开的 `EToolsKey` 为数字枚举，常用值如下：

```ts
enum EToolsKey {
  Pencil = 1,
  Eraser = 2,
  PencilEraser = 3,
  BitMapEraser = 4,
  Selector = 5,
  Clicker = 6,
  Arrow = 7,
  Hand = 8,
  LaserPen = 9,
  Text = 10,
  Straight = 11,
  Rectangle = 12,
  Ellipse = 13,
  Star = 14,
  Triangle = 15,
  Rhombus = 16,
  Polygon = 17,
  SpeechBalloon = 18,
  Image = 19,
  BackgroundSVG = 20,
}
```

### 10.1 字段全集

```ts
type ElementPropertyField =
  | "strokeColor"
  | "fillColor"
  | "thickness"
  | "strokeType"
  | "fontColor"
  | "fontBgColor"
  | "fontSize"
  | "bold"
  | "italic"
  | "underline"
  | "lineThrough"
  | "isLocked"
  | "zIndexLayer"
  | "shape.vertices"
  | "shape.innerVerticeStep"
  | "shape.innerRatio"
  | "shape.placement";
```

### 10.2 推荐运行时判断方式

```ts
const supported = appliancePlugin.isElementPropertySupported(
  element.toolsType,
  "strokeColor",
);
```

### 10.3 `toolsType -> 可更新字段`

#### Text

`EToolsKey.Text`

支持：

- `fontColor`
- `fontBgColor`
- `fontSize`
- `bold`
- `italic`
- `underline`
- `lineThrough`
- `zIndexLayer`

不支持：

- `strokeColor`
- `fillColor`
- `thickness`
- `strokeType`
- `isLocked`
- `shape.*`

#### Pencil

`EToolsKey.Pencil`

支持：

- `strokeColor`
- `thickness`
- `strokeType`
- `zIndexLayer`

说明：

- `Pencil` 是唯一完整支持 `EStrokeType.Stroke` 的类型

#### LaserPen

`EToolsKey.LaserPen`

支持：

- `strokeColor`
- `thickness`
- `strokeType`
- `zIndexLayer`

说明：

- `strokeType` 仅支持：
  - `Normal`
  - `Dotted`
  - `LongDotted`
- 不支持 `Stroke`

#### Arrow

`EToolsKey.Arrow`

支持：

- `strokeColor`
- `thickness`
- `strokeType`
- `zIndexLayer`

说明：

- `strokeType` 仅支持：
  - `Normal`
  - `Dotted`
  - `LongDotted`

#### Straight

`EToolsKey.Straight`

支持：

- `strokeColor`
- `thickness`
- `strokeType`
- `zIndexLayer`

说明：

- `strokeType` 仅支持：
  - `Normal`
  - `Dotted`
  - `LongDotted`

#### Rectangle / Ellipse / Triangle / Rhombus

支持：

- `strokeColor`
- `fillColor`
- `thickness`
- `zIndexLayer`

说明：

- `Rectangle`、`Ellipse` 的 `strokeType` 仅支持：
  - `Normal`
  - `Dotted`
  - `LongDotted`
- `Triangle`、`Rhombus` 当前建议不要对外暴露 `strokeType` 按钮
- 原因是：从宽字段能力上看它们属于 shape stroke 类，但当前运行时对 `strokeType` 的值约束没有稳定放开
- 如果业务要做绝对稳妥的 UI，建议：
  - `Triangle`、`Rhombus` 只暴露 `strokeColor / fillColor / thickness / zIndexLayer`
  - `strokeType` 仅对 `Pencil / LaserPen / Arrow / Straight / Rectangle / Ellipse / Polygon / Star / SpeechBalloon` 暴露

#### Polygon

`EToolsKey.Polygon`

支持：

- `strokeColor`
- `fillColor`
- `thickness`
- `strokeType`
- `zIndexLayer`
- `shape.vertices`

说明：

- `strokeType` 仅支持 `Normal / Dotted / LongDotted`

#### Star

`EToolsKey.Star`

支持：

- `strokeColor`
- `fillColor`
- `thickness`
- `strokeType`
- `zIndexLayer`
- `shape.vertices`
- `shape.innerVerticeStep`
- `shape.innerRatio`

说明：

- `strokeType` 仅支持 `Normal / Dotted / LongDotted`

#### SpeechBalloon

`EToolsKey.SpeechBalloon`

支持：

- `strokeColor`
- `fillColor`
- `thickness`
- `strokeType`
- `zIndexLayer`
- `shape.placement`

说明：

- `strokeType` 仅支持 `Normal / Dotted / LongDotted`

#### Image

`EToolsKey.Image`

支持：

- `isLocked`
- `zIndexLayer`

#### BackgroundSVG

`EToolsKey.BackgroundSVG`

支持：

- `isLocked`
- `zIndexLayer`

#### Selector / Eraser / PencilEraser / BitMapEraser / Clicker / Hand

这些类型不建议作为业务元素更新目标。

其中：

- `Selector` 不能作为 `updateElement()` 的目标
- `Eraser` / `PencilEraser` / `BitMapEraser` / `Clicker` / `Hand` 不是常规可编辑业务元素

## 11. 字段值域说明

### 11.1 `strokeType`

```ts
enum EStrokeType {
  Normal = "Normal",
  Stroke = "Stroke",
  Dotted = "Dotted",
  LongDotted = "LongDotted",
}
```

约束：

- `Stroke` 仅建议用于 `Pencil`
- 若当前选中集合里存在支持 `strokeType` 的非 `Pencil` 元素，则不要下发 `Stroke`

### 11.2 `zIndexLayer`

```ts
enum ElayerType {
  Top = 1,
  Bottom = 2,
}
```

业务语义：

- `Top`: 置顶一层
- `Bottom`: 置底一层

### 11.3 `workState`

```ts
enum EventWorkState {
  Pending = 0,
  Start = 1,
  Doing = 2,
  Done = 3,
  Unwritable = 4,
}
```

对于自定义 floatbar，一般只需要关心：

- `Start`
- `Doing`
- `Done`

### 11.4 `SpeechBalloonPlacement`

```ts
type SpeechBalloonPlacement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";
```

### 11.5 文本样式值

```ts
bold: "bold" | "normal";
italic: "italic" | "normal";
underline: boolean;
lineThrough: boolean;
```

## 12. 推荐的按钮显示策略

建议不要手写 `toolsType` 白名单，而是按当前选中元素动态判断。

示例：

```ts
const supportsAnyField = (
  elements: SelectedElementInfo[],
  field: ElementPropertyField,
) => {
  return elements.some((element) =>
    appliancePlugin.isElementPropertySupported(element.toolsType, field),
  );
};
```

例如：

- 有任意元素支持 `fontSize`，就显示字号按钮
- 有任意元素支持 `fillColor`，就显示填充色板
- `lock` 按钮建议只在单选 image 时显示

这个策略可直接参考 [example/src/view/customSelectorFloatbar/index.tsx](/Users/hongqiuer/work/appliance-plugin/example/src/view/customSelectorFloatbar/index.tsx)。

## 13. 一个最小可用的自定义 floatbar 流程

1. 初始化 room 时关闭默认 `floatBar`
2. 初始化 plugin 时设置：
   - `textEditor.showFloatBar = false`
   - `overwriteSelectorStyles`
3. 监听：
   - `selectedElementsChange`
   - `selectorGeometryChange`
   - `selectorTransformChange`
4. 每次事件触发后调用 `getSelectedElements(viewId)`
5. 将自定义 UI 挂到 `getFloatbarContainer(viewId)` 返回的容器
6. 按 `selectedElements` 和 `isElementPropertySupported()` 决定按钮显隐
7. 点击按钮时调用：
   - `updateSelectedElements()`
   - `copySelectedElements()`
   - `deleteSelectedElements()`
   - `blurSelector()`

## 14. 推荐 import 清单

业务侧通常直接从 `@netless/appliance-plugin` 引入这些类型和值：

```ts
import {
  ApplianceMultiPlugin,
  EToolsKey,
  EStrokeType,
  ElayerType,
  EventWorkState,
  type SelectedElementInfo,
  type SelectedElementsSnapshot,
  type SelectedElementsChangeInfo,
  type SelectorGeometryChangeInfo,
  type SelectorTransformChangeInfo,
  type RemoteSelectorChangeInfo,
  type SelectorViewRect,
  type ElementPropertyField,
  type UpdateSelectedElementChanges,
  type UpdateElementInfo,
} from "@netless/appliance-plugin";
```

## 15. 接入建议

推荐业务按下面优先级落地：

1. 先接 `getSelectedElements + getFloatbarContainer + updateSelectedElements`
2. 再接 `selectorTransformChange`，处理过程态隐藏
3. 最后再按需要接：
   - `updateElement`
   - `remoteSelectorChange`
   - `getViewOffsetToContainer`

这样路径最短，也最不容易把 selector 过程态和最终态混在一起。
