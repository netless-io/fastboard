[@netless/fastboard-core](README.md) / Exports

# @netless/fastboard-core

## Table of contents

### Enumerations

- [AnimationMode](enums/AnimationMode.md)
- [ApplianceNames](enums/ApplianceNames.md)
- [PlayerSeekingResult](enums/PlayerSeekingResult.md)
- [ShapeType](enums/ShapeType.md)

### Classes

- [FastboardApp](classes/FastboardApp.md)
- [FastboardPlayer](classes/FastboardPlayer.md)
- [SlidePreviewer](classes/SlidePreviewer.md)
- [Storage](classes/Storage.md)
- [SyncedStore](classes/SyncedStore.md)
- [WhiteWebSdk](classes/WhiteWebSdk.md)
- [WindowManager](classes/WindowManager.md)

### Interfaces

- [AppsConfig](interfaces/AppsConfig.md)
- [AppsStatus](interfaces/AppsStatus.md)
- [DocsEventOptions](interfaces/DocsEventOptions.md)
- [FastboardOptions](interfaces/FastboardOptions.md)
- [FastboardReplayOptions](interfaces/FastboardReplayOptions.md)
- [InsertDocsDynamic](interfaces/InsertDocsDynamic.md)
- [InsertDocsStatic](interfaces/InsertDocsStatic.md)
- [NetlessApp](interfaces/NetlessApp.md)
- [PreviewParams](interfaces/PreviewParams.md)
- [ProjectorResponse](interfaces/ProjectorResponse.md)
- [Readable](interfaces/Readable.md)
- [Room](interfaces/Room.md)
- [SlideController](interfaces/SlideController.md)
- [SlideOptions](interfaces/SlideOptions.md)
- [Writable](interfaces/Writable.md)

### Type Aliases

- [AddPageParams](modules.md#addpageparams)
- [Appliance](modules.md#appliance)
- [Camera](modules.md#camera)
- [Color](modules.md#color)
- [ConversionResponse](modules.md#conversionresponse)
- [Diff](modules.md#diff)
- [DiffOne](modules.md#diffone)
- [HotKey](modules.md#hotkey)
- [HotKeys](modules.md#hotkeys)
- [InsertDocsParams](modules.md#insertdocsparams)
- [JoinRoomParams](modules.md#joinroomparams)
- [MemberState](modules.md#memberstate)
- [MountParams](modules.md#mountparams)
- [PlayerPhase](modules.md#playerphase)
- [PublicEvent](modules.md#publicevent)
- [Rectangle](modules.md#rectangle)
- [RoomCallbacks](modules.md#roomcallbacks)
- [RoomPhase](modules.md#roomphase)
- [RoomState](modules.md#roomstate)
- [RoomStateChanged](modules.md#roomstatechanged)
- [SceneDefinition](modules.md#scenedefinition)
- [SetMemberStateFn](modules.md#setmemberstatefn)
- [Shape](modules.md#shape)
- [StartStopNotifier](modules.md#startstopnotifier)
- [Subscriber](modules.md#subscriber)
- [Unsubscriber](modules.md#unsubscriber)
- [Updater](modules.md#updater)
- [ViewCallbacks](modules.md#viewcallbacks)
- [WhiteWebSdkConfiguration](modules.md#whitewebsdkconfiguration)

### Variables

- [SlideApp](modules.md#slideapp)
- [slideApps](modules.md#slideapps)
- [version](modules.md#version)

### Functions

- [addManagerListener](modules.md#addmanagerlistener)
- [addPlayerListener](modules.md#addplayerlistener)
- [addRoomListener](modules.md#addroomlistener)
- [addSlideHooks](modules.md#addslidehooks)
- [addViewListener](modules.md#addviewlistener)
- [convertedFileToScene](modules.md#convertedfiletoscene)
- [createFastboard](modules.md#createfastboard)
- [dispatchDocsEvent](modules.md#dispatchdocsevent)
- [genUID](modules.md#genuid)
- [getImageSize](modules.md#getimagesize)
- [makeSlideParams](modules.md#makeslideparams)
- [previewSlide](modules.md#previewslide)
- [readable](modules.md#readable)
- [register](modules.md#register)
- [replayFastboard](modules.md#replayfastboard)
- [warn](modules.md#warn)
- [writable](modules.md#writable)

## Type Aliases

### AddPageParams

Ƭ **AddPageParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `after?` | `boolean` |
| `scene?` | [`SceneDefinition`](modules.md#scenedefinition) |

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.42/node_modules/@netless/window-manager/dist/Page/PageController.d.ts:2

___

### Appliance

Ƭ **Appliance**: \`${ApplianceNames}\`

pencil, eraser, rectangle...

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:124](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L124)

___

### Camera

Ƭ **Camera**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `centerX` | `number` | 视角的中心对准的点的 x 坐标（世界坐标系） |
| `centerY` | `number` | 视角的中心对准的点的 y 坐标（世界坐标系） |
| `scale` | `number` | 视角拉伸会导致物体放大缩小的倍率 |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:203

___

### Color

Ƭ **Color**: `number`[]

颜色，按照 RGB 的顺序填充颜色到数组中，每个数组的取值是 0~255。
例如 rgb(0,255,17) 对应的 ``Color`` 为 ``[0, 255, 17]``

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:75

___

### ConversionResponse

Ƭ **ConversionResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `failedReason?` | `string` |
| `progress` | `Progress` |
| `status` | `Status` |
| `type` | `ConversionType` |
| `uuid` | `string` |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:2930

___

### Diff

Ƭ **Diff**<`T`\>: { [K in keyof T]?: DiffOne<T[K]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/typings.d.ts:6

___

### DiffOne

Ƭ **DiffOne**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `newValue` | `T` |
| `oldValue?` | `T` |

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/typings.d.ts:2

___

### HotKey

Ƭ **HotKey**: `string` \| `HotKeyDescription` \| `ReadonlyArray`<`string` \| `HotKeyDescription`\> \| `HotKeyChecker`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:806

___

### HotKeys

Ƭ **HotKeys**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `changeToArrow` | [`HotKey`](modules.md#hotkey) | 切换到箭头工具（arrow） |
| `changeToClick` | [`HotKey`](modules.md#hotkey) | 切换到点选工具（clicker） |
| `changeToEllipse` | [`HotKey`](modules.md#hotkey) | 切换到圆形工具（ellipse） |
| `changeToEraser` | [`HotKey`](modules.md#hotkey) | 切换到橡皮工具（eraser） |
| `changeToHand` | [`HotKey`](modules.md#hotkey) | 切换到抓手工具（handle） |
| `changeToLaserPointer` | [`HotKey`](modules.md#hotkey) | 切换到激光笔（laserPointer） |
| `changeToPencil` | [`HotKey`](modules.md#hotkey) | 切换到铅笔工具（pencil） |
| `changeToPencilEraser` | [`HotKey`](modules.md#hotkey) | 切换到橡皮工具（仅用于擦除铅笔笔迹）（pencilEraser） |
| `changeToRectangle` | [`HotKey`](modules.md#hotkey) | 切换到矩形工具（rectangle） |
| `changeToSelector` | [`HotKey`](modules.md#hotkey) | 切换到选择工具（selector） |
| `changeToStraight` | [`HotKey`](modules.md#hotkey) | 切换到直线工具（straight） |
| `changeToText` | [`HotKey`](modules.md#hotkey) | 切换到文字工具（text） |
| `copy` | [`HotKey`](modules.md#hotkey) | 复制 |
| `delete` | [`HotKey`](modules.md#hotkey) | 删除 |
| `duplicate` | [`HotKey`](modules.md#hotkey) | 复刻 |
| `lock` | [`HotKey`](modules.md#hotkey) | 锁定放缩比例 |
| `lockCenter` | [`HotKey`](modules.md#hotkey) | 锁定沿着圆心放缩 |
| `paste` | [`HotKey`](modules.md#hotkey) | 粘贴 |
| `pencilPaintCircular` | [`HotKey`](modules.md#hotkey) | 使用铅笔时画圆 |
| `redo` | [`HotKey`](modules.md#hotkey) | 重做 |
| `undo` | [`HotKey`](modules.md#hotkey) | 撤回 |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:719

___

### InsertDocsParams

Ƭ **InsertDocsParams**: [`InsertDocsStatic`](interfaces/InsertDocsStatic.md) \| [`InsertDocsDynamic`](interfaces/InsertDocsDynamic.md)

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:154](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L154)

___

### JoinRoomParams

Ƭ **JoinRoomParams**: `ConstructRoomParams` & { `disableDeviceInputs?`: `boolean` ; `disableEraseImage?`: `boolean` ; `disableMagixEventDispatchLimit?`: `boolean` ; `disableNewPencil?`: `boolean` ; `disablePencilWrittingLimitFrequency?`: `boolean` ; `disableTextOperations?`: `boolean` ; `enableDrawPoint?`: `boolean` ; `floatBar?`: `boolean` \| `Partial`<`FloatBarOptions`\> ; `hotKeys?`: `Partial`<[`HotKeys`](modules.md#hotkeys)\> ; `isWritable?`: `boolean` ; `newPencilWritingQuality?`: `NewPencilWritingQuality` ; `region?`: `string` ; `rejectWhenReadonlyErrorLevel?`: `RoomErrorLevel` ; `roomToken`: `string` ; `uid`: `string` ; `undoCacheScenesCount?`: `number` ; `userPayload?`: { `[key: string]`: `any`;  } ; `uuid`: `string`  }

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:2594

___

### MemberState

Ƭ **MemberState**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bold?` | `boolean` | 是否加粗文字 |
| `currentApplianceName` | [`ApplianceNames`](enums/ApplianceNames.md) | 当前用户所选择的教具 |
| `dottedLine?` | `boolean` | 是否绘制虚线（仅限新铅笔工具） |
| `italic?` | `boolean` | 是否使用斜体 |
| `lineThrough?` | `boolean` | 是否显示删除线 |
| `pencilEraserSize?` | `number` | 铅笔橡皮的尺寸，取值 1~3 |
| `shapeType?` | [`ShapeType`](enums/ShapeType.md) | 使用 ``shape`` 教具时，绘制图形的具体类型 |
| `strokeColor` | [`Color`](modules.md#color) | 教具绘制线条的颜色 |
| `strokeWidth` | `number` | 教具绘制线条的粗细 |
| `textCanSelectText?` | `boolean` | 是否允许 text 选择和编辑文字 |
| `textColor?` | [`Color`](modules.md#color) | 文字颜色 |
| `textSize` | `number` | 文字的字体大小 |
| `underline?` | `boolean` | 是否显示下划线 |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:2215

___

### MountParams

Ƭ **MountParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `applianceIcons?` | `ApplianceIcons` | - |
| `chessboard?` | `boolean` | 显示 PS 透明背景，默认 true |
| `collectorContainer?` | `HTMLElement` | - |
| `collectorStyles?` | `Partial`<`CSSStyleDeclaration`\> | - |
| `container?` | `HTMLElement` | - |
| `containerSizeRatio?` | `number` | 白板高宽比例, 默认为 9 / 16 |
| `cursor?` | `boolean` | - |
| `debug?` | `boolean` | - |
| `disableCameraTransform?` | `boolean` | - |
| `overwriteStyles?` | `string` | - |
| `prefersColorScheme?` | `TeleBoxColorScheme` | - |
| `room` | [`Room`](interfaces/Room.md) \| `Player` | - |

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.42/node_modules/@netless/window-manager/dist/index.d.ts:76

___

### PlayerPhase

Ƭ **PlayerPhase**: \`${PlayerPhaseEnum}\`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:68](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardPlayer.ts#L68)

___

### PublicEvent

Ƭ **PublicEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `boxStateChange` | \`${TELE\_BOX\_STATE}\` |
| `cameraStateChange` | `CameraState` |
| `canRedoStepsChange` | `number` |
| `canUndoStepsChange` | `number` |
| `darkModeChange` | `boolean` |
| `focusedChange` | `string` \| `undefined` |
| `loadApp` | `LoadAppEvent` |
| `mainViewModeChange` | `ViewVisionMode` |
| `mainViewSceneIndexChange` | `number` |
| `mainViewScenePathChange` | `string` |
| `mainViewScenesLengthChange` | `number` |
| `pageStateChange` | `PageState` |
| `prefersColorSchemeChange` | `TeleBoxColorScheme` |
| `ready` | `undefined` |
| `sceneStateChange` | `SceneState` |

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.42/node_modules/@netless/window-manager/dist/callback.d.ts:6

___

### Rectangle

Ƭ **Rectangle**: `Size` & { `originX`: `number` ; `originY`: `number`  }

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:218

___

### RoomCallbacks

Ƭ **RoomCallbacks**: `DisplayerCallbacks` & { `onCanRedoStepsUpdate`: (`canUndoSteps`: `number`) => `void` ; `onCanUndoStepsUpdate`: (`canUndoSteps`: `number`) => `void` ; `onDisconnectWithError`: (`error`: `Error`) => `void` ; `onKeyDown`: (`event`: `KeyboardEvent`) => `void` ; `onKeyUp`: (`event`: `KeyboardEvent`) => `void` ; `onKickedWithReason`: (`reason`: `string`) => `void` ; `onPhaseChanged`: (`phase`: `RoomPhase`) => `void` ; `onRoomStateChanged`: (`modifyState`: `Partial`<[`RoomState`](modules.md#roomstate)\>) => `void` ; `willInterceptKeyboardEvent`: (`event`: `KeyboardEvent`) => `boolean`  }

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:1922

___

### RoomPhase

Ƭ **RoomPhase**: \`${RoomPhaseEnum}\`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:90](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L90)

___

### RoomState

Ƭ **RoomState**: `DisplayerState` & { `broadcastState`: `Readonly`<`BroadcastState`\> ; `memberState`: [`MemberState`](modules.md#memberstate)  }

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:2174

___

### RoomStateChanged

Ƭ **RoomStateChanged**: (`diff`: `Partial`<[`RoomState`](modules.md#roomstate)\>) => `void`

#### Type declaration

▸ (`diff`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `diff` | `Partial`<[`RoomState`](modules.md#roomstate)\> |

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:178](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L178)

___

### SceneDefinition

Ƭ **SceneDefinition**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | 场景名字 |
| `ppt?` | `PptDescription` | PPT 描述 |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:1975

___

### SetMemberStateFn

Ƭ **SetMemberStateFn**: (`partialMemberState`: `Partial`<[`MemberState`](modules.md#memberstate)\>) => `void`

#### Type declaration

▸ (`partialMemberState`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `partialMemberState` | `Partial`<[`MemberState`](modules.md#memberstate)\> |

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:176](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L176)

___

### Shape

Ƭ **Shape**: \`${ShapeType}\`

triangle, star...

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:126](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L126)

___

### StartStopNotifier

Ƭ **StartStopNotifier**<`T`\>: (`set`: [`Subscriber`](modules.md#subscriber)<`T`\>) => [`Unsubscriber`](modules.md#unsubscriber) \| `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`set`): [`Unsubscriber`](modules.md#unsubscriber) \| `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `set` | [`Subscriber`](modules.md#subscriber)<`T`\> |

##### Returns

[`Unsubscriber`](modules.md#unsubscriber) \| `void`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:5](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L5)

___

### Subscriber

Ƭ **Subscriber**<`T`\>: (`value`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:2](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L2)

___

### Unsubscriber

Ƭ **Unsubscriber**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:3](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L3)

___

### Updater

Ƭ **Updater**<`T`\>: (`value`: `T`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`T`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:4](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L4)

___

### ViewCallbacks

Ƭ **ViewCallbacks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCameraTransform` | (`mode`: `CameraTransformation`) => `void` |
| `onCameraUpdated` | (`camera`: [`Camera`](modules.md#camera)) => `void` |
| `onCameraUpdatedByDevice` | (`camera`: [`Camera`](modules.md#camera)) => `void` |
| `onCanRedoStepsUpdate` | (`canRedoSteps`: `number`) => `void` |
| `onCanUndoStepsUpdate` | (`canUndoSteps`: `number`) => `void` |
| `onHandToolActive` | (`active`: `boolean`) => `void` |
| `onKeyDown` | (`event`: `KeyboardEvent`) => `void` |
| `onKeyUp` | (`event`: `KeyboardEvent`) => `void` |
| `onRenderDuration` | (`renderDuration`: `number`) => `void` |
| `onScenePathUpdated` | (`scenePath`: `string`) => `void` |
| `onSizeUpdated` | (`size`: `Size`) => `void` |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:1217

___

### WhiteWebSdkConfiguration

Ƭ **WhiteWebSdkConfiguration**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHosts?` | `string`[] | 配置白板的 API 服务器域名列表，可以用于服务器代理。配置后，白板不再使用 sdk 自带配置。 **`Example`** ```ts [api.example.com] ``` |
| `appIdentifier` | `string` | 从管理控制台获取的参数，用于让 Netless 识别该客户端属于哪个账号的哪个项目，以便处理好权限和计费相关事宜 你可以阅读[《AppIdentifier｜项目与权限》](/home/project-and-authority#appidentifier)来了了解如何获取 appIdentifier |
| `deviceType?` | `DeviceType` | 该客户端的设备类型，决定 SDK 如何处理鼠标事件和触碰事件。如果填写错误，会导致 SDK 对设备输入响应行为不符合预期。如果不填，则会根据内在逻辑自动判断设备的类型。 |
| `disableCurveAnimes?` | `boolean` | 是否禁止新铅笔补间动画，默认是 ``true``。 房间其他人使用新铅笔绘制绘制笔迹曲线时，补间动画会向其中插入更多计算而来的帧，让动画更加流畅。 相应的，这会人为加大动画的延时。 关闭该功能，可以让延时缩短，但相应的，笔迹动画也会有卡顿。 |
| `disableNewPencilStroke?` | `boolean` | 是否禁止新铅笔工具展示笔锋，默认是 ``false``。 |
| `disableRotation?` | `boolean` | 是否禁止旋转功能，默认是 ``false``。 |
| `fontFamily?` | `string` | 设置文字工具（``currentApplianceName="text"``）的字体。若不传，文字工具则展示浏览器默认字体 |
| `fonts?` | `UserFonts` | 为 PPT 提供自定义字体文件。 如果你使用了 PPT 转网页服务，并且 PPT 中使用了非默认字体，并将转化后的文件在房间里展示。 你必须正确配置这个字段，才能让 PPT 正确展示。 |
| `handToolKey?` | `string` | 抓手工具热键。按下该键时，会自动切换成**抓手工具**（``currentApplianceName="hand"``），松开后，切回原来的工具。如果不传，则关闭该功能。 |
| `invisiblePlugins?` | `ReadonlyArray`<`InvisiblePluginClass`<`string`, `any`, `any`\>\> | 不可见插件列表。 |
| `loggerOptions?` | `LoggerOptions` | SDK 如何处理日志上报，默认是开启自动上报。更多关于日志的信息，可以参考[《线上日志》](/document-zh/home/oneline-log) |
| `onWhiteSetupFailed?` | (`error`: `Error`) => `void` | 用于处理 ``WhiteWebSdk`` 初始化失败的回调。 **`Example`** ```typescript const whiteWebSdk = new WhiteWebSdk({ appIdentifier: "$APP_IDENTIFIER", onWhiteSetupFailed: function(error) { console.error(error); }, }); ``` 如果是因为参数原因构造失败，会在调用 ``new WhiteWebSdk({...})`` 时抛出错误。该回调仅用来处理涉及网络或鉴权失败时的错误处理。 |
| `onlyCallbackRemoteStateModify?` | `boolean` | 默认为``true``。开启该功能后，若是主动调用``room`` 对象的方法来修改``room.state`` 的值，导致值变化，是不会调用回调方法通知说``room.state`` 发生改变了的。 关闭该功能后，只要``room.state`` 发生改变，就会回调。 如何判断是主动修改``room.state``？ 如果调用这些方法：``room.setGlobalState``、``room.setMemberState``、``room.setViewMode``、``room.setScenePath``、``room.setSceneIndex``、``room.moveCamera``、``room.moveCameraToContain``、``room.putScenes``、``room.removeScenes``、``room.moveScene``。 那么通过调用这些方法所修改的字段本身的变化，都是为 ** 主动修改 ** 导致的变化。 |
| `plugins?` | `Plugins` | 插件列表。 |
| `pptParams?` | `PptParams` | > 2.11.12 新增 useServerWrap 功能 动态 ppt 专用参数。 目前字段 ``useServerWrap``默认开启（2.12.18 默认开启），后续版本会变更为打开状态。开启后， 会使用服务器端排版结果，避免各平台显示效果不一致。 该功能要求 ppt 在 2021-02-10 进行转换，之前转换的 ppt 没有服务器端排版结果。 |
| `preloadDynamicPPT?` | `boolean` | 是否一次性加载 PPT 转网页的所有资源，默认是 ``false``。启用后，会在第一页时，就加载所有页面内容，会造成一定性能问题，已不推荐使用。 |
| `reconnectionOptions?` | `Partial`<`ReconnectionOptions`\> \| ``false`` | 断线重连设置，如果传入 ``false`` 或 ``{disableReconnect: true}`` 则可以关闭断线重连。 默认开启自动断线重连。 你可以参考[《实时房间状态管理》](/document-zh/home/room-state-management)了解更多关于断线重连相关的状态变化。 |
| `region?` | `string` | 连接的数据中心 |
| `renderEngine?` | `RenderEngine` | 对画面的渲染模式，默认值为 ``RenderEngine.Canvas`` |
| `screenType?` | `ScreenType` | 该客户端的屏幕类型，用于调整手势识别参数，默认为 ``ScreenType.Desktop``。 |
| `urlInterrupter?` | (`url`: `string`) => `string` | 将白板中的图片等资源的 URL 拦截并替换。例如，如下代码可以自动给所有图片 URL 加一个尾缀。 **`Example`** ```typescript const whiteWebSdk = new WhiteWebSdk({ appIdentifier: "$APP_IDENTIFIER", urlInterrupter: function(url) { return url + "?token=bm1n4pisugWrWK"; }, }); ``` |
| `useMobXState?` | `boolean` | 设置成 ``true`` 后，``displayer.state`` 会变成一个 MobX observable object，其成员变量只读，相当于都被修饰了 ``@observable``。 这意味着，当它的成员发生变化时，你可以用 MobX 的方式监听它的变化并自动响应。 |
| `wrappedComponents?` | `WrappedComponents` | 默认值为 ``[]``。这是一个装满 ``React.ComponentType`` 类型的数组，用于包装白板的 view。你可以用它对白板的 view 进行自定义包装。例如使用如下代码。 **`Example`** ```tsx import React from "react"; class WrappedCompnent extends React.Component { render() { return ( <div> <span>hello world</span> {this.props.children} </div> ); } } const whiteWebSdk = new WhiteWebSdk({ appIdentifier: "$APP_IDENTIFIER", wrappedComponents: [WrappedCompnent], }); ``` |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.42/node_modules/white-web-sdk/types/index.d.ts:2389

## Variables

### SlideApp

• `Const` **SlideApp**: [`NetlessApp`](interfaces/NetlessApp.md)<`Attributes`, `MagixEvents`, [`SlideOptions`](interfaces/SlideOptions.md), [`SlideController`](interfaces/SlideController.md)\>

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1044

___

### slideApps

• `Const` **slideApps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `boxes` | `Map`<`string`, `ReadonlyTeleBox`\> |
| `map` | `Map`<`string`, `FreezableSlide`\> |
| `queue` | `string`[] |
| `delete` | (`appId`: `string`) => `void` |
| `focus` | (`appId`: `string`) => `void` |
| `set` | (`appId`: `string`, `slide`: `FreezableSlide`, `box`: `ReadonlyTeleBox`) => `void` |
| `validateQueue` | () => `void` |

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:689

___

### version

• `Const` **version**: `string` = `__VERSION__`

#### Defined in

[packages/fastboard-core/src/behaviors/index.ts:56](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/behaviors/index.ts#L56)

## Functions

### addManagerListener

▸ **addManagerListener**<`K`\>(`manager`, `name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`PublicEvent`](modules.md#publicevent) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `manager` | [`WindowManager`](classes/WindowManager.md) |
| `name` | `K` |
| `listener` | (`value`: [`PublicEvent`](modules.md#publicevent)[`K`]) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/helpers/listen.ts:31](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/helpers/listen.ts#L31)

___

### addPlayerListener

▸ **addPlayerListener**<`K`\>(`player`, `name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `DisplayerCallbacks` \| ``"onPhaseChanged"`` \| ``"onIsPlayableChanged"`` \| ``"onLoadFirstFrame"`` \| ``"onPlayerStateChanged"`` \| ``"onStoppedWithError"`` \| ``"onProgressTimeChanged"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `player` | `Player` |
| `name` | `K` |
| `listener` | `PlayerCallbacks`[`K`] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/helpers/listen.ts:13](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/helpers/listen.ts#L13)

___

### addRoomListener

▸ **addRoomListener**<`K`\>(`room`, `name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `DisplayerCallbacks` \| ``"onPhaseChanged"`` \| ``"onRoomStateChanged"`` \| ``"onDisconnectWithError"`` \| ``"onKickedWithReason"`` \| ``"onCanUndoStepsUpdate"`` \| ``"onCanRedoStepsUpdate"`` \| ``"willInterceptKeyboardEvent"`` \| ``"onKeyDown"`` \| ``"onKeyUp"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | [`Room`](interfaces/Room.md) |
| `name` | `K` |
| `listener` | [`RoomCallbacks`](modules.md#roomcallbacks)[`K`] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/helpers/listen.ts:4](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/helpers/listen.ts#L4)

___

### addSlideHooks

▸ **addSlideHooks**(`emitter`): `void`

Put this function in your register code:
`WindowManager.register({ kind: 'Slide', src: SlideApp, addHooks })`
So that it will automatically freeze the app when it is not in focus.

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `Emittery`<`RegisterEvents`<`any`\>, `RegisterEvents`<`any`\> & `OmnipresentEventData`, `never`\> |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.42/node_modules/@netless/window-manager/dist/typings.d.ts:69

___

### addViewListener

▸ **addViewListener**<`K`\>(`view`, `name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ViewCallbacks`](modules.md#viewcallbacks) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `View` |
| `name` | `K` |
| `listener` | (`value`: [`ViewCallbacks`](modules.md#viewcallbacks)[`K`]) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/helpers/listen.ts:22](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/helpers/listen.ts#L22)

___

### convertedFileToScene

▸ **convertedFileToScene**(`f`, `i`): [`SceneDefinition`](modules.md#scenedefinition)

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `ConvertedFile` |
| `i` | `number` |

#### Returns

[`SceneDefinition`](modules.md#scenedefinition)

#### Defined in

[packages/fastboard-core/src/utils/misc.ts:37](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/misc.ts#L37)

___

### createFastboard

▸ **createFastboard**<`TEventData`\>(`«destructured»`): `Promise`<[`FastboardApp`](classes/FastboardApp.md)<`TEventData`\>\>

Create a FastboardApp instance.

**`Example`**

```ts
let app = await createFastboard({
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID,
    region: 'cn-hz',
  },
  joinRoom: {
    uid: unique_id,
    uuid: import.meta.env.VITE_ROOM_UUID,
    roomToken: import.meta.env.VITE_ROOM_TOKEN,
  },
})
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`FastboardOptions`](interfaces/FastboardOptions.md) |

#### Returns

`Promise`<[`FastboardApp`](classes/FastboardApp.md)<`TEventData`\>\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:645](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L645)

___

### dispatchDocsEvent

▸ **dispatchDocsEvent**(`fastboard`, `event`, `options?`): `boolean`

Send specific command to the static docs / slide app.
Only works for apps that were created by `insertDocs()`.

Returns false if failed to find the app or not writable.

For static docs, `nextPage` equals to `nextStep`, as with `prevPage` and `prevStep`.

**`Example`**

```js
// send "next page" to the focused app
dispatchDocsEvent(fastboard, "nextPage")

// send "prev page" to some app
dispatchDocsEvent(fastboard, "prevPage", {appId:"Slide-1a2b3c4d"})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `fastboard` | [`WindowManager`](classes/WindowManager.md) \| [`FastboardApp`](classes/FastboardApp.md)<`any`\> |
| `event` | ``"prevPage"`` \| ``"nextPage"`` \| ``"prevStep"`` \| ``"nextStep"`` \| ``"jumpToPage"`` |
| `options` | [`DocsEventOptions`](interfaces/DocsEventOptions.md) |

#### Returns

`boolean`

#### Defined in

[packages/fastboard-core/src/helpers/docs.ts:28](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/helpers/docs.ts#L28)

___

### genUID

▸ **genUID**(): `string`

#### Returns

`string`

#### Defined in

[packages/fastboard-core/src/utils/uid.ts:7](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/uid.ts#L7)

___

### getImageSize

▸ **getImageSize**(`url`, `fallback`): `Promise`<`Size`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `fallback` | `Size` |

#### Returns

`Promise`<`Size`\>

#### Defined in

[packages/fastboard-core/src/utils/misc.ts:3](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/misc.ts#L3)

___

### makeSlideParams

▸ **makeSlideParams**(`scenes`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scenes` | [`SceneDefinition`](modules.md#scenedefinition)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `scenes` | [`SceneDefinition`](modules.md#scenedefinition)[] |
| `taskId` | `string` |
| `url` | `string` |

#### Defined in

[packages/fastboard-core/src/utils/misc.ts:12](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/misc.ts#L12)

___

### previewSlide

▸ **previewSlide**(`«destructured»`): [`SlidePreviewer`](classes/SlidePreviewer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PreviewParams`](interfaces/PreviewParams.md) |

#### Returns

[`SlidePreviewer`](classes/SlidePreviewer.md)

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:954

___

### readable

▸ **readable**<`T`\>(`value`, `start?`): [`Readable`](interfaces/Readable.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `T` | `undefined` |
| `start` | [`StartStopNotifier`](modules.md#startstopnotifier)<`T`\> | `noop` |

#### Returns

[`Readable`](interfaces/Readable.md)<`T`\>

#### Defined in

[packages/fastboard-core/src/utils/store.ts:25](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L25)

___

### register

▸ **register**<`AppOptions`, `SetupResult`, `Attributes`\>(`params`): `Promise`<`void`\>

注册插件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `AppOptions` | `any` |
| `SetupResult` | `any` |
| `Attributes` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `RegisterParams`<`AppOptions`, `SetupResult`, `Attributes`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.42/node_modules/@netless/window-manager/dist/index.d.ts:126

___

### replayFastboard

▸ **replayFastboard**<`TEventData`\>(`«destructured»`): `Promise`<[`FastboardPlayer`](classes/FastboardPlayer.md)<`TEventData`\>\>

Create a FastboardPlayer instance.

**`Example`**

```ts
let player = await replayFastboard({
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID,
    region: 'cn-hz',
  },
  replayRoom: {
    room: "room uuid",
    roomToken: "NETLESSROOM_...",
    beginTimestamp: 1646619090394,
    duration: 70448,
  },
})
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`FastboardReplayOptions`](interfaces/FastboardReplayOptions.md) |

#### Returns

`Promise`<[`FastboardPlayer`](classes/FastboardPlayer.md)<`TEventData`\>\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:219](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardPlayer.ts#L219)

___

### warn

▸ **warn**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | ``"no-ppt-in-scenes"`` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/utils/warn.ts:7](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/warn.ts#L7)

___

### writable

▸ **writable**<`T`\>(`value`, `start?`, `set`): [`Writable`](interfaces/Writable.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `T` | `undefined` |
| `start` | [`StartStopNotifier`](modules.md#startstopnotifier)<`T`\> | `noop` |
| `set` | [`Subscriber`](modules.md#subscriber)<`T`\> | `undefined` |

#### Returns

[`Writable`](interfaces/Writable.md)<`T`\>

#### Defined in

[packages/fastboard-core/src/utils/store.ts:74](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L74)
