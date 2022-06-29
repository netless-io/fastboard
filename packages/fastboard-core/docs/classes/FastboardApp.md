[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardApp

# Class: FastboardApp<TEventData\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | `any` |

## Table of contents

### Constructors

- [constructor](FastboardApp.md#constructor)

### Properties

- [\_appsStatus](FastboardApp.md#_appsstatus)
- [\_destroyed](FastboardApp.md#_destroyed)
- [\_disposers](FastboardApp.md#_disposers)
- [\_syncRealCamera](FastboardApp.md#_syncrealcamera)
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

- [\_addManagerListener](FastboardApp.md#_addmanagerlistener)
- [\_addRoomListener](FastboardApp.md#_addroomlistener)
- [\_assertNotDestroyed](FastboardApp.md#_assertnotdestroyed)
- [\_insertDocsImpl](FastboardApp.md#_insertdocsimpl)
- [addPage](FastboardApp.md#addpage)
- [bindCollector](FastboardApp.md#bindcollector)
- [bindContainer](FastboardApp.md#bindcontainer)
- [cleanCurrentScene](FastboardApp.md#cleancurrentscene)
- [destroy](FastboardApp.md#destroy)
- [insertDocs](FastboardApp.md#insertdocs)
- [insertImage](FastboardApp.md#insertimage)
- [insertMedia](FastboardApp.md#insertmedia)
- [moveCamera](FastboardApp.md#movecamera)
- [nextPage](FastboardApp.md#nextpage)
- [prevPage](FastboardApp.md#prevpage)
- [redo](FastboardApp.md#redo)
- [removePage](FastboardApp.md#removepage)
- [setAppliance](FastboardApp.md#setappliance)
- [setStrokeColor](FastboardApp.md#setstrokecolor)
- [setStrokeWidth](FastboardApp.md#setstrokewidth)
- [setTextColor](FastboardApp.md#settextcolor)
- [setTextSize](FastboardApp.md#settextsize)
- [toggleDottedLine](FastboardApp.md#toggledottedline)
- [undo](FastboardApp.md#undo)

## Constructors

### constructor

• **new FastboardApp**<`TEventData`\>(`sdk`, `room`, `manager`, `syncedStore`, `hotKeys`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdk` | [`WhiteWebSdk`](WhiteWebSdk.md) |
| `room` | [`Room`](../interfaces/Room.md) |
| `manager` | [`WindowManager`](WindowManager.md) |
| `syncedStore` | [`SyncedStore`](SyncedStore.md)<`TEventData`\> |
| `hotKeys` | `Partial`<[`HotKeys`](../modules.md#hotkeys)\> |

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:228](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L228)

## Properties

### \_appsStatus

• `Private` **\_appsStatus**: [`AppsStatus`](../interfaces/AppsStatus.md) = `{}`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:165](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L165)

___

### \_destroyed

• `Private` **\_destroyed**: `boolean` = `false`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:145](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L145)

___

### \_disposers

• `Private` **\_disposers**: () => `void`[] = `[]`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:143](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L143)

___

### \_syncRealCamera

• `Private` **\_syncRealCamera**: `SyncRealCamera`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:166](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L166)

___

### appsStatus

• `Readonly` **appsStatus**: [`Readable`](../interfaces/Readable.md)<[`AppsStatus`](../interfaces/AppsStatus.md)\>

Apps status.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:226](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L226)

___

### boxState

• `Readonly` **boxState**: [`Readable`](../interfaces/Readable.md)<`undefined` \| ``"minimized"`` \| ``"maximized"`` \| ``"normal"``\>

Current window-manager's windows' state (is it maximized?).

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:181](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L181)

___

### camera

• `Readonly` **camera**: [`Readable`](../interfaces/Readable.md)<[`Camera`](../modules.md#camera)\>

Baseline camera information.

Change the camera position by `app.moveCamera()`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:204](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L204)

___

### canRedoSteps

• `Readonly` **canRedoSteps**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many times can I call `app.redo()`?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:192](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L192)

___

### canUndoSteps

• `Readonly` **canUndoSteps**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many times can I call `app.undo()`?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:197](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L197)

___

### focusedApp

• `Readonly` **focusedApp**: [`Readable`](../interfaces/Readable.md)<`undefined` \| `string`\>

Current window-manager's focused app's id.

**`Example`**

```ts
"HelloWorld-1A2b3C4d"
```

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:187](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L187)

___

### hotKeys

• `Readonly` **hotKeys**: `Partial`<[`HotKeys`](../modules.md#hotkeys)\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:233](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L233)

___

### manager

• `Readonly` **manager**: [`WindowManager`](WindowManager.md)

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:231](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L231)

___

### memberState

• `Readonly` **memberState**: [`Readable`](../interfaces/Readable.md)<[`MemberState`](../modules.md#memberstate)\>

Current tool's info, like "is using pencil?", "what color?".

Change the tool by `app.setAppliance()`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:211](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L211)

___

### phase

• `Readonly` **phase**: [`Readable`](../interfaces/Readable.md)<``"connecting"`` \| ``"connected"`` \| ``"reconnecting"`` \| ``"disconnecting"`` \| ``"disconnected"``\>

Is current room online?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:176](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L176)

___

### room

• `Readonly` **room**: [`Room`](../interfaces/Room.md)

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:230](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L230)

___

### sceneIndex

• `Readonly` **sceneIndex**: [`Writable`](../interfaces/Writable.md)<`number`\>

0..n-1, current index of main view scenes.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:216](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L216)

___

### sceneLength

• `Readonly` **sceneLength**: [`Readable`](../interfaces/Readable.md)<`number`\>

How many pages are in the main view?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:221](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L221)

___

### sdk

• `Readonly` **sdk**: [`WhiteWebSdk`](WhiteWebSdk.md)

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:229](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L229)

___

### syncedStore

• `Readonly` **syncedStore**: [`SyncedStore`](SyncedStore.md)<`TEventData`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:232](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L232)

___

### writable

• `Readonly` **writable**: [`Writable`](../interfaces/Writable.md)<`boolean`\>

Is current room writable?

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:171](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L171)

## Methods

### \_addManagerListener

▸ `Private` **_addManagerListener**<`K`\>(`name`, `listener`): () => `void`

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

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:156](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L156)

___

### \_addRoomListener

▸ `Private` **_addRoomListener**<`K`\>(`name`, `listener`): () => `void`

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

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:150](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L150)

___

### \_assertNotDestroyed

▸ `Private` **_assertNotDestroyed**(): `void`

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:146](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L146)

___

### \_insertDocsImpl

▸ `Private` **_insertDocsImpl**(`__namedParameters`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`InsertDocsParams`](../modules.md#insertdocsparams) |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:510](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L510)

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

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:413](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L413)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:290](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L290)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:282](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L282)

___

### cleanCurrentScene

▸ **cleanCurrentScene**(): `void`

Delete all things on the main view.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:334](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L334)

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroy fastboard (disconnect from the whiteboard room).

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:298](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L298)

___

### insertDocs

▸ **insertDocs**(`filename`, `response`): `Promise`<`undefined` \| `string`\>

Insert PDF/PPTX from conversion result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filename` | `string` | - |
| `response` | [`ConversionResponse`](../modules.md#conversionresponse) | https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:467](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L467)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:473](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L473)

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

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:485](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L485)

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

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:437](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L437)

___

### insertMedia

▸ **insertMedia**(`title`, `src`): `Promise`<`undefined` \| `string`\>

Insert sounds and videos.

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `src` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:531](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L531)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:325](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L325)

___

### nextPage

▸ **nextPage**(): `Promise`<`boolean`\>

Goto next page (the main whiteboard view).

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:401](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L401)

___

### prevPage

▸ **prevPage**(): `Promise`<`boolean`\>

Goto previous page (the main whiteboard view).

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:393](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L393)

___

### redo

▸ **redo**(): `void`

Redo a step on main view.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:317](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L317)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:426](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L426)

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

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:342](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L342)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:361](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L361)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:353](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L353)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:380](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L380)

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

[packages/fastboard-core/src/impl/FastboardApp.ts:369](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L369)

___

### toggleDottedLine

▸ **toggleDottedLine**(`force?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `force?` | `boolean` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:385](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L385)

___

### undo

▸ **undo**(): `void`

Undo a step on main view.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:309](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L309)
