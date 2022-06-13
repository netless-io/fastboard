[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / Room

# Interface: Room

## Hierarchy

- `Displayer`

  ↳ **`Room`**

## Table of contents

### Properties

- [calibrationTimestamp](Room.md#calibrationtimestamp)
- [callbacks](Room.md#callbacks)
- [canRedoSteps](Room.md#canredosteps)
- [canUndoSteps](Room.md#canundosteps)
- [deviceType](Room.md#devicetype)
- [disableCameraTransform](Room.md#disablecameratransform)
- [disableDeviceInputs](Room.md#disabledeviceinputs)
- [disableEraseImage](Room.md#disableeraseimage)
- [disableOthersSelectingBox](Room.md#disableothersselectingbox)
- [disableSerialization](Room.md#disableserialization)
- [enableWriteNow](Room.md#enablewritenow)
- [handToolActive](Room.md#handtoolactive)
- [handToolKey](Room.md#handtoolkey)
- [isWritable](Room.md#iswritable)
- [observerId](Room.md#observerid)
- [phase](Room.md#phase)
- [region](Room.md#region)
- [roomToken](Room.md#roomtoken)
- [screenType](Room.md#screentype)
- [session](Room.md#session)
- [slice](Room.md#slice)
- [state](Room.md#state)
- [timeDelay](Room.md#timedelay)
- [uid](Room.md#uid)
- [uuid](Room.md#uuid)
- [version](Room.md#version)
- [views](Room.md#views)

### Methods

- [addMagixEventListener](Room.md#addmagixeventlistener)
- [bindHtmlElement](Room.md#bindhtmlelement)
- [cleanCurrentScene](Room.md#cleancurrentscene)
- [completeImageUpload](Room.md#completeimageupload)
- [convertToPointInWorld](Room.md#converttopointinworld)
- [copy](Room.md#copy)
- [createInvisiblePlugin](Room.md#createinvisibleplugin)
- [createScenesCallback](Room.md#createscenescallback)
- [delete](Room.md#delete)
- [disconnect](Room.md#disconnect)
- [dispatchMagixEvent](Room.md#dispatchmagixevent)
- [duplicate](Room.md#duplicate)
- [entireScenes](Room.md#entirescenes)
- [exportScene](Room.md#exportscene)
- [fillSceneSnapshot](Room.md#fillscenesnapshot)
- [generateScreenshot](Room.md#generatescreenshot)
- [getInvisiblePlugin](Room.md#getinvisibleplugin)
- [getPluginAttributes](Room.md#getpluginattributes)
- [getPluginRectangle](Room.md#getpluginrectangle)
- [getScene](Room.md#getscene)
- [importScene](Room.md#importscene)
- [insertImage](Room.md#insertimage)
- [insertPlugin](Room.md#insertplugin)
- [insertText](Room.md#inserttext)
- [lockImage](Room.md#lockimage)
- [lockImages](Room.md#lockimages)
- [memberState](Room.md#memberstate)
- [moveCamera](Room.md#movecamera)
- [moveCameraToContain](Room.md#movecameratocontain)
- [moveScene](Room.md#movescene)
- [moveSelectedComponentsToBottom](Room.md#moveselectedcomponentstobottom)
- [moveSelectedComponentsToTop](Room.md#moveselectedcomponentstotop)
- [paste](Room.md#paste)
- [pptNextStep](Room.md#pptnextstep)
- [pptPreviousStep](Room.md#pptpreviousstep)
- [putScenes](Room.md#putscenes)
- [redo](Room.md#redo)
- [refreshViewSize](Room.md#refreshviewsize)
- [removeMagixEventListener](Room.md#removemagixeventlistener)
- [removePlugin](Room.md#removeplugin)
- [removeScenes](Room.md#removescenes)
- [scalePptToFit](Room.md#scaleppttofit)
- [scenePathType](Room.md#scenepathtype)
- [scenePreview](Room.md#scenepreview)
- [setCameraBound](Room.md#setcamerabound)
- [setGlobalState](Room.md#setglobalstate)
- [setMemberState](Room.md#setmemberstate)
- [setSceneIndex](Room.md#setsceneindex)
- [setScenePath](Room.md#setscenepath)
- [setViewMode](Room.md#setviewmode)
- [setWritable](Room.md#setwritable)
- [stopBlockTimestamp](Room.md#stopblocktimestamp)
- [syncBlockTimestamp](Room.md#syncblocktimestamp)
- [undo](Room.md#undo)
- [updatePlugin](Room.md#updateplugin)
- [updateSelectedText](Room.md#updateselectedtext)
- [updateText](Room.md#updatetext)
- [waitMagixEvent](Room.md#waitmagixevent)

## Properties

### calibrationTimestamp

• `Readonly` **calibrationTimestamp**: `number`

与服务器时钟校准后的当前时间戳，单位为毫秒

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1529

___

### callbacks

• `Readonly` **callbacks**: `Callbacks`<`DisplayerCallbacks`\>

回调函数，你可以通过如下方式来操作回调函数。

**`example`**
```typescript
function sliceChangeCallback(slice) {
    // 监听到 onSliceChanged 回调
}

// 注册回调函数
displayer.callbacks.on("onSliceChanged", sliceChangeCallback);

// 注销回调函数
displayer.callbacks.off("onSliceChanged", sliceChangeCallback);

displayer.callbacks.once("onSliceChanged", function(slice) {
    // 仅仅回调一次
});
```

#### Inherited from

Displayer.callbacks

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1216

___

### canRedoSteps

• `Readonly` **canRedoSteps**: `number`

可重做步骤。即此时此刻，还可以调用多少次 ``room.redo()`` 方法。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1550

___

### canUndoSteps

• `Readonly` **canUndoSteps**: `number`

可撤销步骤。即此时此刻，还可以调用多少次 ``room.undo()`` 方法。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1545

___

### deviceType

• `Readonly` **deviceType**: `DeviceType`

该客户端的设备类型，决定 SDK 如何处理鼠标事件和触碰事件

#### Inherited from

Displayer.deviceType

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1242

___

### disableCameraTransform

• **disableCameraTransform**: `boolean`

是否禁止设备主动操作视角。
禁止后，用户无法使用鼠标滚轮，或在 touch 设备上通过多指手势来改变视角。
该属性不会影响 ``setCameraBound``、``moveCamera``、``moveCameraToContain`` 方法的使用。

#### Inherited from

Displayer.disableCameraTransform

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1282

___

### disableDeviceInputs

• **disableDeviceInputs**: `boolean`

是否禁止设备操作。
注意区分「只读模式」与「禁止设备操作」，具体参考进阶教程[《禁止设备操作｜禁止操作》](/javascript-zh/home/disable#禁止设备操作)。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1556

___

### disableEraseImage

• **disableEraseImage**: `boolean`

是否禁止橡皮擦除图片

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1561

___

### disableOthersSelectingBox

• **disableOthersSelectingBox**: `boolean`

是否隐藏其他人鼠标移动到白板组建上时，显示的高亮框。
该属性不会影响自己的高亮框显示。

#### Inherited from

Displayer.disableOthersSelectingBox

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1275

___

### disableSerialization

• **disableSerialization**: `boolean`

是否禁止如下方法（默认值是 ``true``）。可修改。

- ``room.redo``
- ``room.undo``
- ``room.duplicate``
- ``room.copy``
- ``room.paste``

房间内所有人的 ``white-web-sdk`` 的版本必须不低于 ``2.9.3`` 时，才能将该值设为 ``false``。房间内任何一个人将该值设为 ``false``，都会导致房间内低于 ``2.9.3`` 的用户前端报错且不能正常使用。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1574

___

### enableWriteNow

• `Readonly` **enableWriteNow**: `boolean`

当前是否允许对房间进行写操作

#### Inherited from

Displayer.enableWriteNow

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1257

___

### handToolActive

• **handToolActive**: `boolean`

是否启动抓手工具抓住屏幕以供用户拖动

#### Inherited from

Displayer.handToolActive

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1269

___

### handToolKey

• `Readonly` **handToolKey**: `undefined` \| `string`

按下键盘上哪个键能唤出抓手工具抓住屏幕以供用户拖动，若为 ``undefined`` 则关闭该功能

#### Inherited from

Displayer.handToolKey

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1262

___

### isWritable

• `Readonly` **isWritable**: `boolean`

房间是否「可写」

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1540

___

### observerId

• `Readonly` **observerId**: `number`

当前观察者的用户 ID。
若是实时房间，观察者是我自己。若是回放房间，观察者是当前跟随视角的用户，如果当前没有跟随任何用户的视角，则取值 AdminObserverId。

#### Inherited from

Displayer.observerId

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1222

___

### phase

• `Readonly` **phase**: `RoomPhase`

房间连接所处的阶段

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1524

___

### region

• `Readonly` **region**: `string`

当前房间所在的区域

#### Inherited from

Displayer.region

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1227

___

### roomToken

• `Readonly` **roomToken**: `string`

房间 Token，即加入房间时传入的字段。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1519

___

### screenType

• `Readonly` **screenType**: `ScreenType`

该客户端的屏幕类型，用于调整手势识别参数

#### Inherited from

Displayer.screenType

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1247

___

### session

• `Readonly` **session**: `string`

房间当前的 Session 的 ``uuid``。会被上报作为日志字段（如果开启了自动日志上报功能）。如果当前尚未与服务器建立连接，则为 ``undefined``。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1514

___

### slice

• `Readonly` **slice**: `string`

当前所处的 ``slice`` 的 UUID

#### Inherited from

Displayer.slice

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1232

___

### state

• `Readonly` **state**: [`RoomState`](../modules.md#roomstate)

业务状态
阅读 [《房间与回放的业务状态管理》](/javascript-zh/home/business-state-management) 、[《房间业务状态管理》](/document-zh/home/business-state-management) 以了解更多。

#### Overrides

Displayer.state

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1535

___

### timeDelay

• **timeDelay**: `number`

主动延迟接收的远端消息，单位是毫秒，默认值 ``0``。将该值设置成大于 ``0`` 的数字，可以人为造成类似网络时延的效果。可修改。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1579

___

### uid

• `Readonly` **uid**: `string`

加入该房间的用户的唯一标识符

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1509

___

### uuid

• `Readonly` **uuid**: `string`

房间的 ``uuid``，用于唯一标识该房间。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1504

___

### version

• `Readonly` **version**: `string`

当前 SDK 的版本

#### Inherited from

Displayer.version

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1237

___

### views

• `Readonly` **views**: `Views`

#### Inherited from

Displayer.views

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1264

## Methods

### addMagixEventListener

▸ **addMagixEventListener**(`event`, `listener`, `options?`): `void`

添加自定义事件监听器

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | 自定义事件名 |
| `listener` | `EventListener` | 自定义事件监听器 |
| `options?` | `MagixEventListenerOptions` | 监听配置 |

#### Returns

`void`

#### Inherited from

Displayer.addMagixEventListener

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1375

▸ **addMagixEventListener**(`event`, `listener`, `fireInterval`): `void`

添加自定义事件监听器

**`example`**
```typescript
function listener(events) {
    // 注意，事件会被攒起来，因此 events 是一个数组
    for (const event of events) {
        // 回调事件 event
    }
}
displayer.addMagixEventListener("my-event", listener, 100);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | 自定义事件名 |
| `listener` | `EventsListener` | 自定义事件监听器 |
| `fireInterval` | `number` | 限定回调间隔（毫秒），如果回调频率过高，会将调用频率降低到每经过一段间隔事件统一调用一次 |

#### Returns

`void`

#### Inherited from

Displayer.addMagixEventListener

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1394

___

### bindHtmlElement

▸ **bindHtmlElement**(`element`): `void`

将白板绑定到 HTML 元素上

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | ``null`` \| `HTMLDivElement` | 用于容纳白板的 HTML 元素容器。若为 ``null``，表明解除对白板的绑定。 |

#### Returns

`void`

#### Inherited from

Displayer.bindHtmlElement

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1330

___

### cleanCurrentScene

▸ **cleanCurrentScene**(`retainPpt?`): `void`

清理当前场景内所有内容。第一参数 ``retianPpt``

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `retainPpt?` | `boolean` | 表明是否保留 PPT 背景不被清理，默认值是 ``true`` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1672

___

### completeImageUpload

▸ **completeImageUpload**(`uuid`, `src`): `void`

设置图片资源。第一参数 ``uuid`` 是图片的唯一标识符，应该与 ``room.insertImage`` 中传入的 ``uuid`` 字段相同。
第二参数 ``src`` 是图片资源的 URL。具体例子可参考[《插入图片｜教具》](/javascript-zh/home/tools#插入图片)。

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |
| `src` | `string` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1714

___

### convertToPointInWorld

▸ **convertToPointInWorld**(`point`): `Object`

点的坐标系转换

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Object` | 屏幕坐标系上的点，以屏幕坐上角为原点。 |
| `point.x` | `number` | - |
| `point.y` | `number` | - |

#### Returns

`Object`

世界坐标系上的点

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Inherited from

Displayer.convertToPointInWorld

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1342

___

### copy

▸ **copy**(): `void`

复制当前选择工具所选的所有组键件。只有在 ``room.disableSerialization`` 为 ``false`` 的时候可调用。

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1736

___

### createInvisiblePlugin

▸ **createInvisiblePlugin**<`K`, `A`, `P`\>(`pluginClass`, `attributes`): `Promise`<`InvisiblePlugin`<`A`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | extends `Object` |
| `P` | extends `InvisiblePlugin`<`A`, `P`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginClass` | `InvisiblePluginClass`<`K`, `A`, `P`\> |
| `attributes` | `A` |

#### Returns

`Promise`<`InvisiblePlugin`<`A`\>\>

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1716

___

### createScenesCallback

▸ **createScenesCallback**(`path`, `callbacks?`): ``null`` \| `ScenesCallbacksNode`

创建监听器，以监听特定地址的场景组中子场景、子场景组列表的变化情况。
创建的监听器对象必须在使用完毕后调用 ``dispose()`` 释放。
当某个场景组已经被监听之后，无法再次创建新的监听器，除非上一个监听器被释放。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | 要监听的场景组地址。如果该地址对应一个场景，则取其父场景组 |
| `callbacks?` | `Partial`<`ScenesCallbacks`\> | 一开始要监听的内容，可选 |

#### Returns

``null`` \| `ScenesCallbacksNode`

返回一个 ScenesCallbacksNode 对象，当对应地址不存在时，返回 ``null``

#### Inherited from

Displayer.createScenesCallback

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1304

___

### delete

▸ **delete**(): `void`

删除当前选择工具所选的所有组件。

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1756

___

### disconnect

▸ **disconnect**(): `Promise`<`void`\>

令房间断开连接。这是一个异步方法，会返回 ``Promise`` 对象。

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1808

___

### dispatchMagixEvent

▸ **dispatchMagixEvent**(`event`, `payload`): `void`

向房间内广播自定义事件。其中，第一参数 ``event`` 是事件的名称，房间内其他成员可以通过它注册监听事件。
第二参数 ``payload`` 是负载，可以是任意类型的值，可根据具体业务自行设计。

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `payload` | `any` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1658

___

### duplicate

▸ **duplicate**(): `void`

复刻当前选择工具所选的所有组键件。只有在 ``room.disableSerialization`` 为 ``false`` 的时候可调用。

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1731

___

### entireScenes

▸ **entireScenes**(): `SceneMap`

获取当前房间中所有场景信息

#### Returns

`SceneMap`

#### Inherited from

Displayer.entireScenes

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1425

___

### exportScene

▸ **exportScene**(`scenePath`): `Promise`<`Blob`\>

导出特定场景路径的板书内容（包含 ppt 内容），可以直接保存为二进制文件。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scenePath` | `string` | 需要导出场景的路径，必须是 |

#### Returns

`Promise`<`Blob`\>

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1688

___

### fillSceneSnapshot

▸ **fillSceneSnapshot**(`scenePath`, `div`, `width?`, `height?`, `engine?`): `void`

生成屏幕快照

#### Parameters

| Name | Type |
| :------ | :------ |
| `scenePath` | `string` |
| `div` | `HTMLElement` |
| `width?` | `number` |
| `height?` | `number` |
| `engine?` | `RenderEngine` |

#### Returns

`void`

#### Inherited from

Displayer.fillSceneSnapshot

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1367

___

### generateScreenshot

▸ **generateScreenshot**(`scenePath?`, `width?`, `height?`): `Promise`<`string`\>

生成屏幕快照

#### Parameters

| Name | Type |
| :------ | :------ |
| `scenePath?` | `string` |
| `width?` | `number` |
| `height?` | `number` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Displayer.generateScreenshot

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1362

___

### getInvisiblePlugin

▸ **getInvisiblePlugin**<`A`\>(`kind`): ``null`` \| `InvisiblePlugin`<`A`\>

获取特定的不可件插件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |

#### Returns

``null`` \| `InvisiblePlugin`<`A`\>

#### Inherited from

Displayer.getInvisiblePlugin

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1335

___

### getPluginAttributes

▸ **getPluginAttributes**(`identifier`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` |

#### Returns

`any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1724

___

### getPluginRectangle

▸ **getPluginRectangle**(`identifier`): `undefined` \| [`Rectangle`](../modules.md#rectangle)

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` |

#### Returns

`undefined` \| [`Rectangle`](../modules.md#rectangle)

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1726

___

### getScene

▸ **getScene**(`path`): `undefined` \| `WhiteScene`

获取特定场景信息

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`undefined` \| `WhiteScene`

#### Inherited from

Displayer.getScene

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1430

___

### importScene

▸ **importScene**(`dir`, `payload`): `Promise`<[`SceneDefinition`](../modules.md#scenedefinition)\>

导入之前导出的板书内容。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | `string` | 当前板书内容，需要插入的场景目录位置，该目录的 ScenePathType 可以为空，但是不能为 conflict，这回导致该路径无法成功插入新场景。 |
| `payload` | `Blob` | 二进制文件的文件句柄指向 |

#### Returns

`Promise`<[`SceneDefinition`](../modules.md#scenedefinition)\>

板书内部的内容，一定会存在 name 字段，该字段不可更改；最后插入的板书路径为 dir + name。如果想修改板书路径，可以再调用 mvScene API 进行修改。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1696

___

### insertImage

▸ **insertImage**(`imageInfo`): `void`

在当前场景中插入图片
该操作往往需要和 ``room.completeImageUpload`` 配合使用，具体例子可参考[《插入图片｜教具》](/javascript-zh/home/tools#插入图片)。

#### Parameters

| Name | Type |
| :------ | :------ |
| `imageInfo` | `ImageInformation` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1702

___

### insertPlugin

▸ **insertPlugin**(`kind`, `description?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |
| `description?` | `PluginDescription`<`any`\> |

#### Returns

`string`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1718

___

### insertText

▸ **insertText**(`x`, `y`, `textContent?`): `string`

在指定位置插入文字

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | 第一个字的的左侧边中点，世界坐标系中的 x 坐标 |
| `y` | `number` | 第一个字的的左侧边中点，世界坐标系中的 y 坐标 |
| `textContent?` | `string` | 初始化文字的内容，不传则为空 |

#### Returns

`string`

该文字的标识符

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1781

___

### lockImage

▸ **lockImage**(`uuid`, `locked`): `void`

改变图片的锁定状态。若图片被锁定，则无法被框选、无法被拖动、无法被改变大小

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | 图片的 UUID |
| `locked` | `boolean` | - |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1708

___

### lockImages

▸ **lockImages**(`locked`): `void`

修改当前选中图片的锁定状态

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locked` | `boolean` | 是否锁定图片，当图片被锁定时，无法删除、移动、放缩。 |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1762

___

### memberState

▸ **memberState**(`memberId`): [`MemberState`](../modules.md#memberstate)

获取房间内特定用户的自定义状态

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `memberId` | `number` | 用户的 ID |

#### Returns

[`MemberState`](../modules.md#memberstate)

#### Inherited from

Displayer.memberState

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1310

___

### moveCamera

▸ **moveCamera**(`camera`): `void`

移动视角

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Partial`<[`Camera`](../modules.md#camera)\> & `Readonly`<{ `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  }\> |

#### Returns

`void`

#### Inherited from

Displayer.moveCamera

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1315

___

### moveCameraToContain

▸ **moveCameraToContain**(`rectangle`): `void`

移动视角以容纳特定的视觉矩形

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | `Size` & { `originX`: `number` ; `originY`: `number`  } & `Readonly`<{ `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  }\> |

#### Returns

`void`

#### Inherited from

Displayer.moveCameraToContain

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1322

___

### moveScene

▸ **moveScene**(`originalPath`, `targetPath`): `void`

在房间中移动场景。参考[《移动场景｜场景管理》](/javascript-zh/home/scenes-management#移动场景)。

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalPath` | `string` |
| `targetPath` | `string` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1682

___

### moveSelectedComponentsToBottom

▸ **moveSelectedComponentsToBottom**(): `void`

将当前选中的组件移动到底层

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1772

___

### moveSelectedComponentsToTop

▸ **moveSelectedComponentsToTop**(): `void`

将当前选中的组件移动到顶层

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1767

___

### paste

▸ **paste**(): `void`

粘贴上一次复制的组件。只有在 ``room.disableSerialization`` 为 ``false`` 的时候可调用。

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1741

___

### pptNextStep

▸ **pptNextStep**(): `void`

PPT 翻页到下一页。如果当前 PPT 没有动画，则切换到顺位索引 +1 的场景，如果有动画，则播放下一个动画。

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1798

___

### pptPreviousStep

▸ **pptPreviousStep**(): `void`

PPT 翻页到前一页。如果当前 PPT 没有动画，则切换到顺位索引 -1 的场景，如果有动画，则切换到上一个动画播放完毕的样子。

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1803

___

### putScenes

▸ **putScenes**(`path`, `scenes`, `index?`): `void`

在房间中插入场景。参考[《插入新场景｜场景管理》](/javascript-zh/home/scenes-management#插入新场景)。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | 想要插入到的场景组地址 |
| `scenes` | readonly [`SceneDefinition`](../modules.md#scenedefinition)[] | 场景描述列表 |
| `index?` | `number` | 从哪个索引所在位置插入 |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1666

___

### redo

▸ **redo**(): `number`

重做上一个动作。只有在 ``room.disableSerialization`` 为 ``false`` 的时候可调用。

#### Returns

`number`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1751

___

### refreshViewSize

▸ **refreshViewSize**(): `void`

仅当 ``autoResize: false`` 时调用有意义。
当白板的尺寸改变后，必须主动调用该方法让其同步。

#### Returns

`void`

#### Inherited from

Displayer.refreshViewSize

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1288

___

### removeMagixEventListener

▸ **removeMagixEventListener**(`event`, `listener?`): `void`

注销自定义事件监听器

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | 自定定义事件名 |
| `listener?` | `EventListener` | 要注销的监听器，若不传，则将该自定义事件之下的所有监听器全部注销 |

#### Returns

`void`

#### Inherited from

Displayer.removeMagixEventListener

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1401

___

### removePlugin

▸ **removePlugin**(`identifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1720

___

### removeScenes

▸ **removeScenes**(`path`): `void`

在房间中删除场景。参考[《删除场景｜场景管理》](/javascript-zh/home/scenes-management#删除场景)。

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1677

___

### scalePptToFit

▸ **scalePptToFit**(`animationMode?`): `void`

调整视角以将 PPT 充满屏幕。若当前场景没有 PPT，则什么都不做。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animationMode?` | [`AnimationMode`](../enums/AnimationMode.md) | 调整视角时的过渡动画模式 |

#### Returns

`void`

#### Inherited from

Displayer.scalePptToFit

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1414

___

### scenePathType

▸ **scenePathType**(`path`): `ScenePathType`

查看特定场景的类型

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | 该场景的路径 |

#### Returns

`ScenePathType`

#### Inherited from

Displayer.scenePathType

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1420

___

### scenePreview

▸ **scenePreview**(`scenePath`, `div`, `width?`, `height?`, `engine?`): `void`

生成场景预览

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scenePath` | `string` | 想要获取预览内容的场景的场景路径 |
| `div` | `HTMLElement` | 想要展示预览内容的 div |
| `width?` | `number` | 白板的缩放宽度：将当前白板内容，缩小到真实像素宽度。2.3.8 后，该参数为可选参数，如果不填，则默认为展示内容 div 的宽度。 |
| `height?` | `number` | 白板的缩放高度：将当前白板的内容，缩小到真实像素高度。2.3.8 后，该参数为可选参数，如果不填，则默认为展示内容 div 的高度。 |
| `engine?` | `RenderEngine` | - |

#### Returns

`void`

#### Inherited from

Displayer.scenePreview

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1357

___

### setCameraBound

▸ **setCameraBound**(`cameraBound`): `void`

修改 ``cameraBound`` 以调整视角边界

#### Parameters

| Name | Type |
| :------ | :------ |
| `cameraBound` | `CameraBound` |

#### Returns

`void`

#### Inherited from

Displayer.setCameraBound

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1293

___

### setGlobalState

▸ **setGlobalState**(`modifyState`): `GlobalState`

用于修改房间的 ``globalState`` 的字段。可以通过如下方法修改特定字段。

**`example`**
```typescript
room.setGlobalState({
    foobar: "hello world",
});
```

也可以通过将某个字段置为 ``undefined``，来删掉该字段。

**`example`**
```typescript
room.setGlobalState({
    foobar: undefined,
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `modifyState` | `Partial`<`GlobalState`\> |

#### Returns

`GlobalState`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1606

___

### setMemberState

▸ **setMemberState**(`modifyState`): [`MemberState`](../modules.md#memberstate)

用于修改房间的 ``memberState`` 的字段。可以通过如下方法修改特定字段。

**`example`**
```typescript
room.setMemberState({
    foobar: "hello world",
});
```

**`example`**
也可以通过将某个字段置为 ``undefined``，来删掉该字段。

```typescript
room.setMemberState({
    foobar: undefined,
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `modifyState` | `Partial`<[`MemberState`](../modules.md#memberstate)\> |

#### Returns

[`MemberState`](../modules.md#memberstate)

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1627

___

### setSceneIndex

▸ **setSceneIndex**(`index`): `void`

修改当前场景的索引号，会将切换当前房间的场景。

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1642

___

### setScenePath

▸ **setScenePath**(`scenePath`): `void`

修改当前场景地址，会将切换当前房间的场景。

#### Parameters

| Name | Type |
| :------ | :------ |
| `scenePath` | `string` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1637

___

### setViewMode

▸ **setViewMode**(`viewMode`): `void`

修改房间的 ``room.state.broadcastState.mode`` 的值。会改变自己或房间内其他人的视角模式。

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewMode` | `ViewMode` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1632

___

### setWritable

▸ **setWritable**(`isWritable`): `Promise`<`void`\>

修改 ``room.isWritable`` 的值。
该操作会向服务器发起请求，因此会返回一个 ``Promise`` 对象。注意通过 ``.catch()`` 的方式处理异常流程，因为请求可能被服务器拒绝，或失败。

#### Parameters

| Name | Type |
| :------ | :------ |
| `isWritable` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1585

___

### stopBlockTimestamp

▸ **stopBlockTimestamp**(): `void`

停止通过同步阻塞时间戳来人为制作间延

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1652

___

### syncBlockTimestamp

▸ **syncBlockTimestamp**(`timestamp`): `void`

同步阻塞时间戳，以人为制造时延

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1647

___

### undo

▸ **undo**(): `number`

撤回上一个动作。只有在 ``room.disableSerialization`` 为 ``false`` 的时候可调用。

#### Returns

`number`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1746

___

### updatePlugin

▸ **updatePlugin**(`identifier`, `description`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` |
| `description` | `PluginDescription`<`any`\> |

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1722

___

### updateSelectedText

▸ **updateSelectedText**(`format`): `void`

修改当前被选中的 text 的状态

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `TextFormat` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1793

___

### updateText

▸ **updateText**(`identifier`, `textContent`): `void`

编辑指定文字的内容

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | 文字的标识符。为 ``insertText()`` 的返回值。 |
| `textContent` | `string` | 文字要改成的内容 |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1788

___

### waitMagixEvent

▸ **waitMagixEvent**(`filter`): `Promise`<`Event`\>

等待直到特定的自定义事件发生

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `EventFilter` | 用于判断是否是想要的自定义事件，若是，该方法应该返回 ``true``。 |

#### Returns

`Promise`<`Event`\>

当特定自定义事件发生时，返回该事件

#### Inherited from

Displayer.waitMagixEvent

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.24/node_modules/white-web-sdk/types/index.d.ts:1408
