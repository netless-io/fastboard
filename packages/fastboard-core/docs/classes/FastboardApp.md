[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardApp

# Class: FastboardApp

## Hierarchy

- `FastboardAppBase`

  ↳ **`FastboardApp`**

## Table of contents

### Constructors

- [constructor](FastboardApp.md#constructor)

### Properties

- [\_appsStatus](FastboardApp.md#_appsstatus)
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

- [\_addMainViewListener](FastboardApp.md#_addmainviewlistener)
- [\_addManagerListener](FastboardApp.md#_addmanagerlistener)
- [\_addRoomListener](FastboardApp.md#_addroomlistener)
- [\_assertNotDestroyed](FastboardApp.md#_assertnotdestroyed)
- [\_insertDocsImpl](FastboardApp.md#_insertdocsimpl)
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
- [setStrokeColor](FastboardApp.md#setstrokecolor)
- [setStrokeWidth](FastboardApp.md#setstrokewidth)
- [setTextColor](FastboardApp.md#settextcolor)
- [setTextSize](FastboardApp.md#settextsize)
- [undo](FastboardApp.md#undo)

## Constructors

### constructor

• **new FastboardApp**(`sdk`, `room`, `manager`, `hotKeys`, `syncedStore`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdk` | [`WhiteWebSdk`](WhiteWebSdk.md) |
| `room` | [`Room`](../interfaces/Room.md) |
| `manager` | [`WindowManager`](WindowManager.md) |
| `hotKeys` | `Partial`<[`HotKeys`](../modules.md#hotkeys)\> |
| `syncedStore` | `SyncedStore`<`any`\> |

#### Inherited from

FastboardAppBase.constructor

## Properties

### \_appsStatus

• `Private` **\_appsStatus**: [`AppsStatus`](../interfaces/AppsStatus.md) = `{}`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:270](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L270)

___

### \_destroyed

• `Protected` **\_destroyed**: `boolean` = `false`

#### Inherited from

FastboardAppBase.\_destroyed

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:47](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L47)

___

### appsStatus

• `Readonly` **appsStatus**: [`Readable`](../interfaces/Readable.md)<[`AppsStatus`](../interfaces/AppsStatus.md)\>

Apps status.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:274](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L274)

___

### boxState

• `Readonly` **boxState**: [`Readable`](../interfaces/Readable.md)<`undefined` \| ``"minimized"`` \| ``"maximized"`` \| ``"normal"``\>

Current window-manager's windows' state (is it maximized?).

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:200](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L200)

___

### camera

• `Readonly` **camera**: [`Readable`](../interfaces/Readable.md)<[`Camera`](../modules.md#camera)\>

Current camera information of main view.

Change the camera position by `app.moveCamera()`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:235](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L235)

___

### canRedoSteps

• `Readonly` **canRedoSteps**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many times can I call `app.redo()`?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:217](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L217)

___

### canUndoSteps

• `Readonly` **canUndoSteps**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many times can I call `app.undo()`?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:225](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L225)

___

### focusedApp

• `Readonly` **focusedApp**: [`Readable`](../interfaces/Readable.md)<`undefined` \| `string`\>

Current window-manager's focused app's id.

**`Example`**

 ```ts
"HelloWorld-1A2b3C4d"
```

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:209](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L209)

___

### hotKeys

• `Readonly` **hotKeys**: `Partial`<[`HotKeys`](../modules.md#hotkeys)\>

#### Inherited from

FastboardAppBase.hotKeys

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:43](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L43)

___

### manager

• `Readonly` **manager**: [`WindowManager`](WindowManager.md)

#### Inherited from

FastboardAppBase.manager

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:42](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L42)

___

### memberState

• `Readonly` **memberState**: [`Readable`](../interfaces/Readable.md)<[`MemberState`](../modules.md#memberstate)\>

Current tool's info, like "is using pencil?", "what color?".

Change the tool by `app.setAppliance()`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:245](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L245)

___

### phase

• `Readonly` **phase**: [`Readable`](../interfaces/Readable.md)<``"connecting"`` \| ``"connected"`` \| ``"reconnecting"`` \| ``"disconnecting"`` \| ``"disconnected"``\>

Is current room online?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:192](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L192)

___

### room

• `Readonly` **room**: [`Room`](../interfaces/Room.md)

#### Inherited from

FastboardAppBase.room

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:41](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L41)

___

### sceneIndex

• `Readonly` **sceneIndex**: [`Writable`](../interfaces/Writable.md)<`number`\>

0..n-1, current index of main view scenes.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:253](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L253)

___

### sceneLength

• `Readonly` **sceneLength**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many pages are in the main view?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:265](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L265)

___

### sdk

• `Readonly` **sdk**: [`WhiteWebSdk`](WhiteWebSdk.md)

#### Inherited from

FastboardAppBase.sdk

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:40](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L40)

___

### syncedStore

• `Readonly` **syncedStore**: `SyncedStore`<`any`\>

#### Inherited from

FastboardAppBase.syncedStore

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:44](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L44)

___

### writable

• `Readonly` **writable**: [`Writable`](../interfaces/Writable.md)<`boolean`\>

Is current room writable?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:180](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L180)

## Methods

### \_addMainViewListener

▸ `Protected` **_addMainViewListener**<`K`\>(`name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ViewCallbacks`](../modules.md#viewcallbacks) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `listener` | [`ViewCallbacks`](../modules.md#viewcallbacks)[`K`] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

FastboardAppBase.\_addMainViewListener

___

### \_addManagerListener

▸ `Protected` **_addManagerListener**<`K`\>(`name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`PublicEvent`](../modules.md#publicevent) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `listener` | (`value`: [`PublicEvent`](../modules.md#publicevent)[`K`]) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

FastboardAppBase.\_addManagerListener

___

### \_addRoomListener

▸ `Protected` **_addRoomListener**<`K`\>(`name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `DisplayerCallbacks` \| ``"onPhaseChanged"`` \| ``"onRoomStateChanged"`` \| ``"onDisconnectWithError"`` \| ``"onKickedWithReason"`` \| ``"onCanUndoStepsUpdate"`` \| ``"onCanRedoStepsUpdate"`` \| ``"willInterceptKeyboardEvent"`` \| ``"onKeyDown"`` \| ``"onKeyUp"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `listener` | [`RoomCallbacks`](../modules.md#roomcallbacks)[`K`] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

FastboardAppBase.\_addRoomListener

___

### \_assertNotDestroyed

▸ `Protected` **_assertNotDestroyed**(): `void`

#### Returns

`void`

#### Inherited from

FastboardAppBase.\_assertNotDestroyed

___

### \_insertDocsImpl

▸ `Private` **_insertDocsImpl**(`__namedParameters`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`InsertDocsParams`](../modules.md#insertdocsparams) |

#### Returns

`Promise`<`undefined` \| `string`\>

___

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

___

### cleanCurrentScene

▸ **cleanCurrentScene**(): `void`

Delete all things on the main view.

#### Returns

`void`

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroy fastboard (disconnect from the whiteboard room).

#### Returns

`Promise`<`void`\>

#### Inherited from

FastboardAppBase.destroy

___

### insertCodeEditor

▸ **insertCodeEditor**(): `Promise`<`undefined` \| `string`\>

Insert the Monaco Code Editor app.

**`Deprecated`**

 Use `app.manager.addApp({ kind: 'Monaco' })` instead.

#### Returns

`Promise`<`undefined` \| `string`\>

___

### insertCountdown

▸ **insertCountdown**(): `Promise`<`undefined` \| `string`\>

Insert the Countdown app.

**`Deprecated`**

 Use `app.manager.addApp({ kind: 'Countdown' })` instead.

#### Returns

`Promise`<`undefined` \| `string`\>

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

▸ **insertDocs**(`params`): `Promise`<`undefined` \| `string`\>

Manual way.

**`Example`**

 app.insertDocs({
  fileType: 'pptx',
  scenePath: `/pptx/${conversion.taskId}`,
  taskId: conversion.taskId,
  title: 'Title',
})

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`InsertDocsParams`](../modules.md#insertdocsparams) |

#### Returns

`Promise`<`undefined` \| `string`\>

___

### insertGeoGebra

▸ **insertGeoGebra**(): `Promise`<`undefined` \| `string`\>

Insert the GeoGebra app.

**`Deprecated`**

 Use `app.manager.addApp({ kind: 'GeoGebra' })` instead.

#### Returns

`Promise`<`undefined` \| `string`\>

___

### insertImage

▸ **insertImage**(`url`): `Promise`<`void`\>

Insert an image to the main view.

**`Example`**

 ```ts
insertImage("https://i.imgur.com/CzXTtJV.jpg")
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`void`\>

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

___

### nextPage

▸ **nextPage**(): `Promise`<`boolean`\>

Goto next page (the main whiteboard view).

#### Returns

`Promise`<`boolean`\>

___

### prevPage

▸ **prevPage**(): `Promise`<`boolean`\>

Goto previous page (the main whiteboard view).

#### Returns

`Promise`<`boolean`\>

___

### redo

▸ **redo**(): `void`

Redo a step on main view.

#### Returns

`void`

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

___

### setAppliance

▸ **setAppliance**(`appliance`, `shape?`): `void`

Set current tool, like "pencil".

#### Parameters

| Name | Type |
| :------ | :------ |
| `appliance` | [`ApplianceNames`](../enums/ApplianceNames.md) \| ``"selector"`` \| ``"clicker"`` \| ``"laserPointer"`` \| ``"pencil"`` \| ``"rectangle"`` \| ``"ellipse"`` \| ``"shape"`` \| ``"eraser"`` \| ``"text"`` \| ``"straight"`` \| ``"arrow"`` \| ``"hand"`` |
| `shape?` | [`ShapeType`](../enums/ShapeType.md) \| ``"triangle"`` \| ``"rhombus"`` \| ``"pentagram"`` \| ``"speechBalloon"`` |

#### Returns

`void`

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

___

### undo

▸ **undo**(): `void`

Undo a step on main view.

#### Returns

`void`
