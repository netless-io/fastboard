[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / WindowManager

# Class: WindowManager

## Hierarchy

- `InvisiblePlugin`<`WindowMangerAttributes`\>

  ↳ **`WindowManager`**

## Implements

- `PageController`

## Table of contents

### Constructors

- [constructor](WindowManager.md#constructor)

### Properties

- [\_addApp](WindowManager.md#_addapp)
- [\_destroy](WindowManager.md#_destroy)
- [\_pageState](WindowManager.md#_pagestate)
- [appListeners](WindowManager.md#applisteners)
- [appManager](WindowManager.md#appmanager)
- [attributes](WindowManager.md#attributes)
- [bindMainView](WindowManager.md#bindmainview)
- [boxManager](WindowManager.md#boxmanager)
- [callbacks](WindowManager.md#callbacks)
- [containerResizeObserver](WindowManager.md#containerresizeobserver)
- [containerSizeRatio](WindowManager.md#containersizeratio)
- [cursorManager](WindowManager.md#cursormanager)
- [dependencies](WindowManager.md#dependencies)
- [displayer](WindowManager.md#displayer)
- [emitter](WindowManager.md#emitter)
- [ensureAttributes](WindowManager.md#ensureattributes)
- [isDynamicPPT](WindowManager.md#isdynamicppt)
- [isReplay](WindowManager.md#isreplay)
- [readonly](WindowManager.md#readonly)
- [setupScenePath](WindowManager.md#setupscenepath)
- [version](WindowManager.md#version)
- [viewMode](WindowManager.md#viewmode)
- [container](WindowManager.md#container)
- [containerSizeRatio](WindowManager.md#containersizeratio-1)
- [debug](WindowManager.md#debug)
- [displayer](WindowManager.md#displayer-1)
- [initContainer](WindowManager.md#initcontainer)
- [initManager](WindowManager.md#initmanager)
- [isCreated](WindowManager.md#iscreated)
- [kind](WindowManager.md#kind)
- [params](WindowManager.md#params)
- [playground](WindowManager.md#playground)
- [wrapper](WindowManager.md#wrapper)

### Accessors

- [apps](WindowManager.md#apps)
- [boxState](WindowManager.md#boxstate)
- [camera](WindowManager.md#camera)
- [cameraState](WindowManager.md#camerastate)
- [canOperate](WindowManager.md#canoperate)
- [canRedoSteps](WindowManager.md#canredosteps)
- [canUndoSteps](WindowManager.md#canundosteps)
- [darkMode](WindowManager.md#darkmode)
- [focused](WindowManager.md#focused)
- [focusedView](WindowManager.md#focusedview)
- [mainView](WindowManager.md#mainview)
- [mainViewSceneDir](WindowManager.md#mainviewscenedir)
- [mainViewSceneIndex](WindowManager.md#mainviewsceneindex)
- [mainViewScenesLength](WindowManager.md#mainviewsceneslength)
- [pageState](WindowManager.md#pagestate)
- [prefersColorScheme](WindowManager.md#preferscolorscheme)
- [room](WindowManager.md#room)
- [sceneState](WindowManager.md#scenestate)
- [topApp](WindowManager.md#topapp)
- [registered](WindowManager.md#registered)

### Methods

- [\_dispose](WindowManager.md#_dispose)
- [\_refresh](WindowManager.md#_refresh)
- [addApp](WindowManager.md#addapp)
- [addPage](WindowManager.md#addpage)
- [bindCollectorContainer](WindowManager.md#bindcollectorcontainer)
- [bindContainer](WindowManager.md#bindcontainer)
- [cleanCurrentScene](WindowManager.md#cleancurrentscene)
- [closeApp](WindowManager.md#closeapp)
- [completeImageUpload](WindowManager.md#completeimageupload)
- [convertToPointInWorld](WindowManager.md#converttopointinworld)
- [copy](WindowManager.md#copy)
- [delete](WindowManager.md#delete)
- [destroy](WindowManager.md#destroy)
- [duplicate](WindowManager.md#duplicate)
- [getAttributesValue](WindowManager.md#getattributesvalue)
- [getMainViewSceneIndex](WindowManager.md#getmainviewsceneindex)
- [getMainViewScenePath](WindowManager.md#getmainviewscenepath)
- [insertImage](WindowManager.md#insertimage)
- [insertText](WindowManager.md#inserttext)
- [lockImage](WindowManager.md#lockimage)
- [lockImages](WindowManager.md#lockimages)
- [moveCamera](WindowManager.md#movecamera)
- [moveCameraToContain](WindowManager.md#movecameratocontain)
- [nextPage](WindowManager.md#nextpage)
- [onAppDestroy](WindowManager.md#onappdestroy)
- [onAttributesUpdate](WindowManager.md#onattributesupdate)
- [onDestroy](WindowManager.md#ondestroy)
- [paste](WindowManager.md#paste)
- [prevPage](WindowManager.md#prevpage)
- [queryAll](WindowManager.md#queryall)
- [queryOne](WindowManager.md#queryone)
- [redo](WindowManager.md#redo)
- [refresh](WindowManager.md#refresh)
- [removePage](WindowManager.md#removepage)
- [safeSetAttributes](WindowManager.md#safesetattributes)
- [safeUpdateAttributes](WindowManager.md#safeupdateattributes)
- [setAttributes](WindowManager.md#setattributes)
- [setBoxState](WindowManager.md#setboxstate)
- [setCameraBound](WindowManager.md#setcamerabound)
- [setContainerSizeRatio](WindowManager.md#setcontainersizeratio)
- [setMainViewSceneIndex](WindowManager.md#setmainviewsceneindex)
- [setMainViewScenePath](WindowManager.md#setmainviewscenepath)
- [setMaximized](WindowManager.md#setmaximized)
- [setMinimized](WindowManager.md#setminimized)
- [setPrefersColorScheme](WindowManager.md#setpreferscolorscheme)
- [setReadonly](WindowManager.md#setreadonly)
- [setViewMode](WindowManager.md#setviewmode)
- [switchMainViewToWriter](WindowManager.md#switchmainviewtowriter)
- [undo](WindowManager.md#undo)
- [updateAttributes](WindowManager.md#updateattributes)
- [mount](WindowManager.md#mount)
- [register](WindowManager.md#register)
- [unregister](WindowManager.md#unregister)

## Constructors

### constructor

• **new WindowManager**(`context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `InvisiblePluginContext` |

#### Overrides

InvisiblePlugin&lt;WindowMangerAttributes\&gt;.constructor

## Properties

### \_addApp

• `Private` **\_addApp**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:135

___

### \_destroy

• `Private` **\_destroy**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:220

___

### \_pageState

• `Private` `Optional` **\_pageState**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:111

___

### appListeners

• `Optional` **appListeners**: `AppListeners`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:104

___

### appManager

• `Optional` **appManager**: `AppManager`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:107

___

### attributes

• `Readonly` **attributes**: `WindowMangerAttributes`

#### Inherited from

InvisiblePlugin.attributes

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.25/node_modules/white-web-sdk/types/index.d.ts:478

___

### bindMainView

• `Private` **bindMainView**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:221

___

### boxManager

• `Private` `Optional` **boxManager**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:112

___

### callbacks

• `Readonly` **callbacks**: `Callbacks`<`InvisibleCallbacks`<`WindowMangerAttributes`\>\>

#### Inherited from

InvisiblePlugin.callbacks

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.25/node_modules/white-web-sdk/types/index.d.ts:476

___

### containerResizeObserver

• `Private` `Optional` **containerResizeObserver**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:114

___

### containerSizeRatio

• **containerSizeRatio**: `number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:115

___

### cursorManager

• `Optional` **cursorManager**: `CursorManager`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:108

___

### dependencies

• **dependencies**: `Record`<`string`, `string`\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:103

___

### displayer

• `Readonly` **displayer**: `Displayer`<`DisplayerCallbacks`\>

#### Inherited from

InvisiblePlugin.displayer

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.25/node_modules/white-web-sdk/types/index.d.ts:474

___

### emitter

• **emitter**: `Emittery`<[`PublicEvent`](../modules.md#publicevent), [`PublicEvent`](../modules.md#publicevent) & `OmnipresentEventData`, ``"ready"``\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:106

___

### ensureAttributes

• `Private` **ensureAttributes**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:244

___

### isDynamicPPT

• `Private` **isDynamicPPT**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:243

___

### isReplay

• **isReplay**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:110

___

### readonly

• `Optional` **readonly**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:105

___

### setupScenePath

• `Private` **setupScenePath**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:136

___

### version

• **version**: `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:102

___

### viewMode

• **viewMode**: `ViewMode`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:109

___

### container

▪ `Static` `Optional` **container**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:98

___

### containerSizeRatio

▪ `Static` **containerSizeRatio**: `number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:100

___

### debug

▪ `Static` **debug**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:99

___

### displayer

▪ `Static` **displayer**: `Displayer`<`DisplayerCallbacks`\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:95

___

### initContainer

▪ `Static` `Private` **initContainer**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:119

___

### initManager

▪ `Static` `Private` **initManager**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:118

___

### isCreated

▪ `Static` `Private` **isCreated**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:101

___

### kind

▪ `Static` **kind**: `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:94

___

### params

▪ `Static` `Private` `Optional` **params**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:113

___

### playground

▪ `Static` `Optional` **playground**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:97

___

### wrapper

▪ `Static` `Optional` **wrapper**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.34_white-web-sdk@2.16.25/node_modules/@netless/window-manager/dist/index.d.ts:96

## Accessors

### apps

• `get` **apps**(): `undefined` \| `Apps`

#### Returns

`undefined` \| `Apps`

___

### boxState

• `get` **boxState**(): `undefined` \| ``"minimized"`` \| ``"maximized"`` \| ``"normal"``

#### Returns

`undefined` \| ``"minimized"`` \| ``"maximized"`` \| ``"normal"``

___

### camera

• `get` **camera**(): [`Camera`](../modules.md#camera)

#### Returns

[`Camera`](../modules.md#camera)

___

### cameraState

• `get` **cameraState**(): `CameraState`

#### Returns

`CameraState`

___

### canOperate

• `get` **canOperate**(): `boolean`

#### Returns

`boolean`

___

### canRedoSteps

• `get` **canRedoSteps**(): `number`

#### Returns

`number`

___

### canUndoSteps

• `get` **canUndoSteps**(): `number`

#### Returns

`number`

___

### darkMode

• `get` **darkMode**(): `boolean`

#### Returns

`boolean`

___

### focused

• `get` **focused**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### focusedView

• `get` **focusedView**(): `undefined` \| `View`

#### Returns

`undefined` \| `View`

___

### mainView

• `get` **mainView**(): `View`

#### Returns

`View`

___

### mainViewSceneDir

• `get` **mainViewSceneDir**(): `string`

#### Returns

`string`

___

### mainViewSceneIndex

• `get` **mainViewSceneIndex**(): `number`

#### Returns

`number`

___

### mainViewScenesLength

• `get` **mainViewScenesLength**(): `number`

#### Returns

`number`

___

### pageState

• `get` **pageState**(): `PageState`

#### Returns

`PageState`

#### Implementation of

PageController.pageState

___

### prefersColorScheme

• `get` **prefersColorScheme**(): `undefined` \| ``"light"`` \| ``"dark"`` \| ``"auto"``

#### Returns

`undefined` \| ``"light"`` \| ``"dark"`` \| ``"auto"``

___

### room

• `get` **room**(): [`Room`](../interfaces/Room.md)

#### Returns

[`Room`](../interfaces/Room.md)

___

### sceneState

• `get` **sceneState**(): `SceneState`

#### Returns

`SceneState`

___

### topApp

• `get` **topApp**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### registered

• `Static` `get` **registered**(): `Map`<`string`, `RegisterParams`<`any`, `any`, `any`\>\>

#### Returns

`Map`<`string`, `RegisterParams`<`any`, `any`, `any`\>\>

## Methods

### \_dispose

▸ **_dispose**(`shouldCallback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shouldCallback` | `boolean` |

#### Returns

`void`

#### Inherited from

InvisiblePlugin.\_dispose

___

### \_refresh

▸ **_refresh**(): `void`

**`Inner`**

 

#### Returns

`void`

___

### addApp

▸ **addApp**<`T`\>(`params`): `Promise`<`undefined` \| `string`\>

创建一个 app 至白板

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `AddAppParams`<`T`\> |

#### Returns

`Promise`<`undefined` \| `string`\>

___

### addPage

▸ **addPage**(`params?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`AddPageParams`](../modules.md#addpageparams) |

#### Returns

`Promise`<`void`\>

#### Implementation of

PageController.addPage

___

### bindCollectorContainer

▸ **bindCollectorContainer**(`container`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

___

### bindContainer

▸ **bindContainer**(`container`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

___

### cleanCurrentScene

▸ **cleanCurrentScene**(): `void`

#### Returns

`void`

___

### closeApp

▸ **closeApp**(`appId`): `Promise`<`void`\>

关闭 APP

#### Parameters

| Name | Type |
| :------ | :------ |
| `appId` | `string` |

#### Returns

`Promise`<`void`\>

___

### completeImageUpload

▸ **completeImageUpload**(`uuid`, `url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |
| `url` | `string` |

#### Returns

`void`

___

### convertToPointInWorld

▸ **convertToPointInWorld**(`point`): `Point`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | `Point` |

#### Returns

`Point`

___

### copy

▸ **copy**(): `void`

#### Returns

`void`

___

### delete

▸ **delete**(): `void`

#### Returns

`void`

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Overrides

InvisiblePlugin.destroy

___

### duplicate

▸ **duplicate**(): `void`

#### Returns

`void`

___

### getAttributesValue

▸ **getAttributesValue**(`key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `string`[] |

#### Returns

`any`

#### Inherited from

InvisiblePlugin.getAttributesValue

___

### getMainViewSceneIndex

▸ **getMainViewSceneIndex**(): `number`

返回 mainView 的 SceneIndex

#### Returns

`number`

___

### getMainViewScenePath

▸ **getMainViewScenePath**(): `undefined` \| `string`

返回 mainView 的 ScenePath

#### Returns

`undefined` \| `string`

___

### insertImage

▸ **insertImage**(`info`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | `ImageInformation` |

#### Returns

`void`

___

### insertText

▸ **insertText**(`x`, `y`, `text`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `text` | `undefined` \| `string` |

#### Returns

`string`

___

### lockImage

▸ **lockImage**(`uuid`, `locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |
| `locked` | `boolean` |

#### Returns

`void`

___

### lockImages

▸ **lockImages**(`locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locked` | `boolean` |

#### Returns

`void`

___

### moveCamera

▸ **moveCamera**(`camera`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Partial`<[`Camera`](../modules.md#camera)\> & { `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  } |

#### Returns

`void`

___

### moveCameraToContain

▸ **moveCameraToContain**(`rectangle`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | `Size` & { `originX`: `number` ; `originY`: `number`  } & `Readonly`<{ `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  }\> |

#### Returns

`void`

___

### nextPage

▸ **nextPage**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

PageController.nextPage

___

### onAppDestroy

▸ **onAppDestroy**(`kind`, `listener`): `void`

app destroy 回调

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |
| `listener` | (`error`: `Error`) => `void` |

#### Returns

`void`

___

### onAttributesUpdate

▸ **onAttributesUpdate**(`attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | `WindowMangerAttributes` |

#### Returns

`void`

#### Inherited from

InvisiblePlugin.onAttributesUpdate

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Overrides

InvisiblePlugin.onDestroy

___

### paste

▸ **paste**(): `void`

#### Returns

`void`

___

### prevPage

▸ **prevPage**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

PageController.prevPage

___

### queryAll

▸ **queryAll**(): `AppProxy`[]

查询所有的 App

#### Returns

`AppProxy`[]

___

### queryOne

▸ **queryOne**(`appId`): `undefined` \| `AppProxy`

查询单个 App

#### Parameters

| Name | Type |
| :------ | :------ |
| `appId` | `string` |

#### Returns

`undefined` \| `AppProxy`

___

### redo

▸ **redo**(): `number`

#### Returns

`number`

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

___

### removePage

▸ **removePage**(`index?`): `Promise`<`boolean`\>

删除一页
默认删除当前页, 可以删除指定 index 页
最低保留一页

#### Parameters

| Name | Type |
| :------ | :------ |
| `index?` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

PageController.removePage

___

### safeSetAttributes

▸ **safeSetAttributes**(`attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | `any` |

#### Returns

`void`

___

### safeUpdateAttributes

▸ **safeUpdateAttributes**(`keys`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |
| `value` | `any` |

#### Returns

`void`

___

### setAttributes

▸ **setAttributes**(`modifyAttributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modifyAttributes` | `Partial`<`WindowMangerAttributes`\> |

#### Returns

`void`

#### Inherited from

InvisiblePlugin.setAttributes

___

### setBoxState

▸ **setBoxState**(`boxState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `boxState` | ``"minimized"`` \| ``"maximized"`` \| ``"normal"`` |

#### Returns

`void`

___

### setCameraBound

▸ **setCameraBound**(`cameraBound`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cameraBound` | `CameraBound` |

#### Returns

`void`

___

### setContainerSizeRatio

▸ **setContainerSizeRatio**(`ratio`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ratio` | `number` |

#### Returns

`void`

___

### setMainViewSceneIndex

▸ **setMainViewSceneIndex**(`index`): `Promise`<`void`\>

设置 mainView 的 SceneIndex, 并且切换白板为可写状态

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`<`void`\>

___

### setMainViewScenePath

▸ **setMainViewScenePath**(`scenePath`): `Promise`<`void`\>

设置 mainView 的 ScenePath, 并且切换白板为可写状态

#### Parameters

| Name | Type |
| :------ | :------ |
| `scenePath` | `string` |

#### Returns

`Promise`<`void`\>

___

### setMaximized

▸ **setMaximized**(`maximized`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maximized` | `boolean` |

#### Returns

`void`

___

### setMinimized

▸ **setMinimized**(`minimized`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `minimized` | `boolean` |

#### Returns

`void`

___

### setPrefersColorScheme

▸ **setPrefersColorScheme**(`scheme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | ``"light"`` \| ``"dark"`` \| ``"auto"`` |

#### Returns

`void`

___

### setReadonly

▸ **setReadonly**(`readonly`): `void`

设置所有 app 的 readonly 模式

#### Parameters

| Name | Type |
| :------ | :------ |
| `readonly` | `boolean` |

#### Returns

`void`

___

### setViewMode

▸ **setViewMode**(`mode`): `void`

设置 ViewMode

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `ViewMode` |

#### Returns

`void`

___

### switchMainViewToWriter

▸ **switchMainViewToWriter**(): `undefined` \| `Promise`<`void`\>

切换 mainView 为可写

#### Returns

`undefined` \| `Promise`<`void`\>

___

### undo

▸ **undo**(): `number`

#### Returns

`number`

___

### updateAttributes

▸ **updateAttributes**(`keys`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string` \| `string`[] |
| `value` | `any` |

#### Returns

`void`

#### Inherited from

InvisiblePlugin.updateAttributes

___

### mount

▸ `Static` **mount**(`params`): `Promise`<[`WindowManager`](WindowManager.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MountParams`](../modules.md#mountparams) |

#### Returns

`Promise`<[`WindowManager`](WindowManager.md)\>

___

### register

▸ `Static` **register**<`AppOptions`, `SetupResult`, `Attributes`\>(`params`): `Promise`<`void`\>

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

___

### unregister

▸ `Static` **unregister**(`kind`): `void`

注销插件

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `string` |

#### Returns

`void`
