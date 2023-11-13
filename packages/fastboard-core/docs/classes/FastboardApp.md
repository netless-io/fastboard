[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardApp

# Class: FastboardApp<TEventData\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

## Hierarchy

- `FastboardAppBase`<`TEventData`\>

  ↳ **`FastboardApp`**

## Table of contents

### Constructors

- [constructor](FastboardApp.md#constructor)

### Properties

- [\_destroyed](FastboardApp.md#_destroyed)
- [appsStatus](FastboardApp.md#appsstatus)
- [boxState](FastboardApp.md#boxstate)
- [camera](FastboardApp.md#camera)
- [canRedoSteps](FastboardApp.md#canredosteps)
- [canUndoSteps](FastboardApp.md#canundosteps)
- [focusedApp](FastboardApp.md#focusedapp)
- [hotKeys](FastboardApp.md#hotkeys)
- [manager](FastboardApp.md#manager)
- [memberState](FastboardApp.md#memberstate)
- [phase](FastboardApp.md#phase)
- [room](FastboardApp.md#room)
- [sceneIndex](FastboardApp.md#sceneindex)
- [sceneLength](FastboardApp.md#scenelength)
- [sdk](FastboardApp.md#sdk)
- [syncedStore](FastboardApp.md#syncedstore)
- [writable](FastboardApp.md#writable)

### Methods

- [addPage](FastboardApp.md#addpage)
- [bindCollector](FastboardApp.md#bindcollector)
- [bindContainer](FastboardApp.md#bindcontainer)
- [cleanCurrentScene](FastboardApp.md#cleancurrentscene)
- [destroy](FastboardApp.md#destroy)
- [insertCodeEditor](FastboardApp.md#insertcodeeditor)
- [insertCountdown](FastboardApp.md#insertcountdown)
- [insertDocs](FastboardApp.md#insertdocs)
- [insertGeoGebra](FastboardApp.md#insertgeogebra)
- [insertImage](FastboardApp.md#insertimage)
- [insertMedia](FastboardApp.md#insertmedia)
- [moveCamera](FastboardApp.md#movecamera)
- [moveCameraToContain](FastboardApp.md#movecameratocontain)
- [nextPage](FastboardApp.md#nextpage)
- [prevPage](FastboardApp.md#prevpage)
- [redo](FastboardApp.md#redo)
- [removePage](FastboardApp.md#removepage)
- [setAppliance](FastboardApp.md#setappliance)
- [setPencilEraserSize](FastboardApp.md#setpencilerasersize)
- [setStrokeColor](FastboardApp.md#setstrokecolor)
- [setStrokeWidth](FastboardApp.md#setstrokewidth)
- [setTextColor](FastboardApp.md#settextcolor)
- [setTextSize](FastboardApp.md#settextsize)
- [toggleDottedLine](FastboardApp.md#toggledottedline)
- [undo](FastboardApp.md#undo)

## Constructors

### constructor

• **new FastboardApp**<`TEventData`\>(`sdk`, `room`, `manager`, `hotKeys`, `syncedStore`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdk` | [`WhiteWebSdk`](WhiteWebSdk.md) |
| `room` | [`Room`](../interfaces/Room.md) |
| `manager` | [`WindowManager`](WindowManager.md) |
| `hotKeys` | `Partial`<[`HotKeys`](../modules.md#hotkeys)\> |
| `syncedStore` | [`SyncedStore`](SyncedStore.md)<`TEventData`\> |

#### Inherited from

FastboardAppBase<TEventData\>.constructor

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:40](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L40)

## Properties

### \_destroyed

• `Protected` **\_destroyed**: `boolean` = `false`

#### Inherited from

FastboardAppBase.\_destroyed

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:48](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L48)

___

### appsStatus

• `Readonly` **appsStatus**: [`Readable`](../interfaces/Readable.md)<[`AppsStatus`](../interfaces/AppsStatus.md)\>

Apps status.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:304](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L304)

___

### boxState

• `Readonly` **boxState**: [`Readable`](../interfaces/Readable.md)<`undefined` \| ``"minimized"`` \| ``"maximized"`` \| ``"normal"``\>

Current window-manager's windows' state (is it maximized?).

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:229](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L229)

___

### camera

• `Readonly` **camera**: [`Readable`](../interfaces/Readable.md)<[`Camera`](../modules.md#camera)\>

Current camera information of main view.

Change the camera position by `app.moveCamera()`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:264](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L264)

___

### canRedoSteps

• `Readonly` **canRedoSteps**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many times can I call `app.redo()`?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:246](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L246)

___

### canUndoSteps

• `Readonly` **canUndoSteps**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many times can I call `app.undo()`?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:254](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L254)

___

### focusedApp

• `Readonly` **focusedApp**: [`Readable`](../interfaces/Readable.md)<`undefined` \| `string`\>

Current window-manager's focused app's id.

**`Example`**

```ts
"HelloWorld-1A2b3C4d"
```

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:238](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L238)

___

### hotKeys

• `Readonly` **hotKeys**: `Partial`<[`HotKeys`](../modules.md#hotkeys)\>

#### Inherited from

FastboardAppBase.hotKeys

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:44](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L44)

___

### manager

• `Readonly` **manager**: [`WindowManager`](WindowManager.md)

#### Inherited from

FastboardAppBase.manager

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:43](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L43)

___

### memberState

• `Readonly` **memberState**: [`Readable`](../interfaces/Readable.md)<[`MemberState`](../modules.md#memberstate)\>

Current tool's info, like "is using pencil?", "what color?".

Change the tool by `app.setAppliance()`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:274](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L274)

___

### phase

• `Readonly` **phase**: [`Readable`](../interfaces/Readable.md)<``"connecting"`` \| ``"connected"`` \| ``"reconnecting"`` \| ``"disconnecting"`` \| ``"disconnected"``\>

Is current room online?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:221](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L221)

___

### room

• `Readonly` **room**: [`Room`](../interfaces/Room.md)

#### Inherited from

FastboardAppBase.room

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:42](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L42)

___

### sceneIndex

• `Readonly` **sceneIndex**: [`Writable`](../interfaces/Writable.md)<`number`\>

0..n-1, current index of main view scenes.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:282](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L282)

___

### sceneLength

• `Readonly` **sceneLength**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many pages are in the main view?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:294](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L294)

___

### sdk

• `Readonly` **sdk**: [`WhiteWebSdk`](WhiteWebSdk.md)

#### Inherited from

FastboardAppBase.sdk

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:41](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L41)

___

### syncedStore

• `Readonly` **syncedStore**: [`SyncedStore`](SyncedStore.md)<`TEventData`\>

#### Inherited from

FastboardAppBase.syncedStore

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:45](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L45)

___

### writable

• `Readonly` **writable**: [`Writable`](../interfaces/Writable.md)<`boolean`\>

Is current room writable?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:209](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L209)

## Methods

### addPage

▸ **addPage**(`params?`): `Promise`<`void`\>

Add one page to the main whiteboard view.

**`Example`**

```ts
addPage({ after: true }) // add one page right after current one.
nextPage() // then, goto that page.
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`AddPageParams`](../modules.md#addpageparams) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:436](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L436)

___

### bindCollector

▸ **bindCollector**(`container`): `void`

Move window-manager's collector to some place.

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:201](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L201)

___

### bindContainer

▸ **bindContainer**(`container`): `void`

Render this app to some DOM.

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:193](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L193)

___

### cleanCurrentScene

▸ **cleanCurrentScene**(): `void`

Delete all things on the main view.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:346](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L346)

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroy fastboard (disconnect from the whiteboard room).

#### Returns

`Promise`<`void`\>

#### Inherited from

FastboardAppBase.destroy

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:83](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L83)

___

### insertCodeEditor

▸ **insertCodeEditor**(): `Promise`<`undefined` \| `string`\>

Insert the Monaco Code Editor app.

**`Deprecated`**

Use `app.manager.addApp({ kind: 'Monaco' })` instead.

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:596](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L596)

___

### insertCountdown

▸ **insertCountdown**(): `Promise`<`undefined` \| `string`\>

Insert the Countdown app.

**`Deprecated`**

Use `app.manager.addApp({ kind: 'Countdown' })` instead.

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:608](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L608)

___

### insertDocs

▸ **insertDocs**(`filename`, `status`): `Promise`<`undefined` \| `string`\>

Insert PDF/PPTX from conversion result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filename` | `string` | - |
| `status` | [`ConversionResponse`](../modules.md#conversionresponse) | https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:503](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L503)

▸ **insertDocs**(`filename`, `response`): `Promise`<`undefined` \| `string`\>

Insert PDF/PPTX from projector conversion result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filename` | `string` | - |
| `response` | [`ProjectorResponse`](../interfaces/ProjectorResponse.md) | https://developer.netless.link/server-zh/home/server-projector#get-%E6%9F%A5%E8%AF%A2%E4%BB%BB%E5%8A%A1%E8%BD%AC%E6%8D%A2%E8%BF%9B%E5%BA%A6 |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:509](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L509)

▸ **insertDocs**(`params`): `Promise`<`undefined` \| `string`\>

Manual way.

**`Example`**

```ts
app.insertDocs({
  fileType: 'pptx',
  scenePath: `/pptx/${conversion.taskId}`,
  taskId: conversion.taskId,
  title: 'Title',
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`InsertDocsParams`](../modules.md#insertdocsparams) |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:521](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L521)

___

### insertGeoGebra

▸ **insertGeoGebra**(): `Promise`<`undefined` \| `string`\>

Insert the GeoGebra app.

**`Deprecated`**

Use `app.manager.addApp({ kind: 'GeoGebra' })` instead.

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:620](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L620)

___

### insertImage

▸ **insertImage**(`url`, `crossOrigin?`): `Promise`<`void`\>

Insert an image to the main view.

**`Example`**

```ts
insertImage("https://i.imgur.com/CzXTtJV.jpg")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | - |
| `crossOrigin?` | `string` \| `boolean` | Whether to load the image with CORS enabled, default is `true`. |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:462](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L462)

___

### insertMedia

▸ **insertMedia**(`title`, `src`): `Promise`<`undefined` \| `string`\>

Insert the Media Player app.

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `src` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:583](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L583)

___

### moveCamera

▸ **moveCamera**(`camera`): `void`

Move current main view's camera position.

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Partial`<[`Camera`](../modules.md#camera)\> & { `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  } |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:330](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L330)

___

### moveCameraToContain

▸ **moveCameraToContain**(`rectangle`): `void`

Move current main view's camera to include a rectangle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | `Size` & { `originX`: `number` ; `originY`: `number`  } & { `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  } |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:338](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L338)

___

### nextPage

▸ **nextPage**(): `Promise`<`boolean`\>

Goto next page (the main whiteboard view).

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:424](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L424)

___

### prevPage

▸ **prevPage**(): `Promise`<`boolean`\>

Goto previous page (the main whiteboard view).

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:416](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L416)

___

### redo

▸ **redo**(): `void`

Redo a step on main view.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:322](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L322)

___

### removePage

▸ **removePage**(`index?`): `Promise`<`boolean`\>

Remove one page at given index or current page (by default).

Requires `@netless/window-manager` >= 0.4.30.

**`Example`**

```ts
removePage() // remove current page
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `index?` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:449](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L449)

___

### setAppliance

▸ **setAppliance**(`appliance`, `shape?`): `void`

Set current tool, like "pencil".

#### Parameters

| Name | Type |
| :------ | :------ |
| `appliance` | [`ApplianceNames`](../enums/ApplianceNames.md) \| ``"selector"`` \| ``"clicker"`` \| ``"laserPointer"`` \| ``"pencil"`` \| ``"rectangle"`` \| ``"ellipse"`` \| ``"shape"`` \| ``"eraser"`` \| ``"pencilEraser"`` \| ``"text"`` \| ``"straight"`` \| ``"arrow"`` \| ``"hand"`` |
| `shape?` | [`ShapeType`](../enums/ShapeType.md) \| ``"triangle"`` \| ``"rhombus"`` \| ``"pentagram"`` \| ``"speechBalloon"`` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:354](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L354)

___

### setPencilEraserSize

▸ **setPencilEraserSize**(`size`): `void`

Set pencil eraser size.

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:408](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L408)

___

### setStrokeColor

▸ **setStrokeColor**(`strokeColor`): `void`

Set pencil and shape's color.

#### Parameters

| Name | Type |
| :------ | :------ |
| `strokeColor` | [`Color`](../modules.md#color) |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:373](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L373)

___

### setStrokeWidth

▸ **setStrokeWidth**(`strokeWidth`): `void`

Set pencil and shape's thickness.

#### Parameters

| Name | Type |
| :------ | :------ |
| `strokeWidth` | `number` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:365](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L365)

___

### setTextColor

▸ **setTextColor**(`textColor`): `void`

Set text color.

**`Example`**

```ts
setTextColor([0x66, 0xcc, 0xff])
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `textColor` | [`Color`](../modules.md#color) |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:392](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L392)

___

### setTextSize

▸ **setTextSize**(`textSize`): `void`

Set text size. Default is 16.

#### Parameters

| Name | Type |
| :------ | :------ |
| `textSize` | `number` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:381](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L381)

___

### toggleDottedLine

▸ **toggleDottedLine**(`force?`): `void`

Toggle dotted line effect on pencil.

#### Parameters

| Name | Type |
| :------ | :------ |
| `force?` | `boolean` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:400](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L400)

___

### undo

▸ **undo**(): `void`

Undo a step on main view.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:314](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L314)
