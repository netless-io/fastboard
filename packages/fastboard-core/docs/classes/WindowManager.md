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
- [cameraUpdating](WindowManager.md#cameraupdating)
- [containerSizeRatio](WindowManager.md#containersizeratio)
- [cursorManager](WindowManager.md#cursormanager)
- [dependencies](WindowManager.md#dependencies)
- [displayer](WindowManager.md#displayer)
- [emitter](WindowManager.md#emitter)
- [ensureAttributes](WindowManager.md#ensureattributes)
- [isDynamicPPT](WindowManager.md#isdynamicppt)
- [isReplay](WindowManager.md#isreplay)
- [moveCamera](WindowManager.md#movecamera)
- [nextCamera](WindowManager.md#nextcamera)
- [onCameraUpdated](WindowManager.md#oncameraupdated)
- [readonly](WindowManager.md#readonly)
- [setupScenePath](WindowManager.md#setupscenepath)
- [version](WindowManager.md#version)
- [viewMode](WindowManager.md#viewmode)
- [viewMode$](WindowManager.md#viewmode$)
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

### Accessors

- [apps](WindowManager.md#apps)
- [baseCamera](WindowManager.md#basecamera)
- [baseSize](WindowManager.md#basesize)
- [boxState](WindowManager.md#boxstate)
- [camera](WindowManager.md#camera)
- [cameraState](WindowManager.md#camerastate)
- [canOperate](WindowManager.md#canoperate)
- [canRedoSteps](WindowManager.md#canredosteps)
- [canUndoSteps](WindowManager.md#canundosteps)
- [darkMode](WindowManager.md#darkmode)
- [focused](WindowManager.md#focused)
- [focusedView](WindowManager.md#focusedview)
- [fullscreen](WindowManager.md#fullscreen)
- [mainView](WindowManager.md#mainview)
- [mainViewSceneDir](WindowManager.md#mainviewscenedir)
- [mainViewSceneIndex](WindowManager.md#mainviewsceneindex)
- [mainViewScenesLength](WindowManager.md#mainviewsceneslength)
- [pageState](WindowManager.md#pagestate)
- [prefersColorScheme](WindowManager.md#preferscolorscheme)
- [room](WindowManager.md#room)
- [sceneState](WindowManager.md#scenestate)
- [teleboxManager](WindowManager.md#teleboxmanager)
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
- [createPPTHandler](WindowManager.md#createppthandler)
- [delete](WindowManager.md#delete)
- [destroy](WindowManager.md#destroy)
- [duplicate](WindowManager.md#duplicate)
- [getAttributesValue](WindowManager.md#getattributesvalue)
- [getMainViewSceneIndex](WindowManager.md#getmainviewsceneindex)
- [getMainViewScenePath](WindowManager.md#getmainviewscenepath)
- [insertImage](WindowManager.md#insertimage)
- [insertText](WindowManager.md#inserttext)
- [jumpPage](WindowManager.md#jumppage)
- [lockImage](WindowManager.md#lockimage)
- [lockImages](WindowManager.md#lockimages)
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
- [setBaseSize](WindowManager.md#setbasesize)
- [setBoxState](WindowManager.md#setboxstate)
- [setCameraBound](WindowManager.md#setcamerabound)
- [setContainerSizeRatio](WindowManager.md#setcontainersizeratio)
- [setContainerStyle](WindowManager.md#setcontainerstyle)
- [setFullscreen](WindowManager.md#setfullscreen)
- [setMainViewSceneIndex](WindowManager.md#setmainviewsceneindex)
- [setMainViewScenePath](WindowManager.md#setmainviewscenepath)
- [setMaximized](WindowManager.md#setmaximized)
- [setMinimized](WindowManager.md#setminimized)
- [setPrefersColorScheme](WindowManager.md#setpreferscolorscheme)
- [setReadonly](WindowManager.md#setreadonly)
- [setStageStyle](WindowManager.md#setstagestyle)
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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:132

## Properties

### \_addApp

• `Private` **\_addApp**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:151

___

### \_destroy

• `Private` **\_destroy**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:244

___

### \_pageState

• `Private` `Optional` **\_pageState**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:126

___

### appListeners

• `Optional` **appListeners**: `AppListeners`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:118

___

### appManager

• `Optional` **appManager**: `AppManager`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:121

___

### attributes

• `Readonly` **attributes**: `WindowMangerAttributes`

#### Inherited from

InvisiblePlugin.attributes

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:478

___

### bindMainView

• `Private` **bindMainView**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:245

___

### boxManager

• `Private` `Optional` **boxManager**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:127

___

### callbacks

• `Readonly` **callbacks**: `Callbacks`<`InvisibleCallbacks`<`WindowMangerAttributes`\>\>

#### Inherited from

InvisiblePlugin.callbacks

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:476

___

### cameraUpdating

• `Private` **cameraUpdating**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:129

___

### containerSizeRatio

• **containerSizeRatio**: `number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:131

___

### cursorManager

• `Optional` **cursorManager**: `CursorManager`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:122

___

### dependencies

• **dependencies**: `Record`<`string`, `string`\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:117

___

### displayer

• `Readonly` **displayer**: `Displayer`<`DisplayerCallbacks`\>

#### Inherited from

InvisiblePlugin.displayer

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:474

___

### emitter

• **emitter**: `Emittery`<[`PublicEvent`](../modules.md#publicevent), [`PublicEvent`](../modules.md#publicevent) & `_OmnipresentEventData`, ``"ready"``\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:120

___

### ensureAttributes

• `Private` **ensureAttributes**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:277

___

### isDynamicPPT

• `Private` **isDynamicPPT**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:276

___

### isReplay

• **isReplay**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:125

___

### moveCamera

• **moveCamera**: (`camera`: `Partial`<[`Camera`](../modules.md#camera)\> & { `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  }) => `void`

#### Type declaration

▸ (`camera`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Partial`<[`Camera`](../modules.md#camera)\> & { `animationMode?`: [`AnimationMode`](../enums/AnimationMode.md)  } |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:236

___

### nextCamera

• `Private` **nextCamera**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:130

___

### onCameraUpdated

• `Private` **onCameraUpdated**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:239

___

### readonly

• `Optional` **readonly**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:119

___

### setupScenePath

• `Private` **setupScenePath**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:152

___

### version

• **version**: `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:116

___

### viewMode

• **viewMode**: `ViewMode`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:123

___

### viewMode$

• **viewMode$**: `Val`<`ViewMode`, `any`\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:124

___

### container

▪ `Static` `Optional` **container**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:112

___

### containerSizeRatio

▪ `Static` **containerSizeRatio**: `number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:114

___

### debug

▪ `Static` **debug**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:113

___

### displayer

▪ `Static` **displayer**: `Displayer`<`DisplayerCallbacks`\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:110

___

### initContainer

▪ `Static` `Private` **initContainer**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:135

___

### initManager

▪ `Static` `Private` **initManager**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:134

___

### isCreated

▪ `Static` `Private` **isCreated**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:115

___

### kind

▪ `Static` **kind**: `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:109

___

### params

▪ `Static` `Private` `Optional` **params**: `any`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:128

___

### playground

▪ `Static` `Optional` **playground**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:111

## Accessors

### apps

• `get` **apps**(): `undefined` \| `Apps`

#### Returns

`undefined` \| `Apps`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:208

___

### baseCamera

• `get` **baseCamera**(): `undefined` \| { `centerX`: ``null`` \| `number` ; `centerY`: ``null`` \| `number` ; `id`: `string` ; `scale`: `number`  }

#### Returns

`undefined` \| { `centerX`: ``null`` \| `number` ; `centerY`: ``null`` \| `number` ; `id`: `string` ; `scale`: `number`  }

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:200

___

### baseSize

• `get` **baseSize**(): `undefined` \| `ISize`

#### Returns

`undefined` \| `ISize`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:206

___

### boxState

• `get` **boxState**(): `undefined` \| ``"minimized"`` \| ``"maximized"`` \| ``"normal"``

#### Returns

`undefined` \| ``"minimized"`` \| ``"maximized"`` \| ``"normal"``

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:209

___

### camera

• `get` **camera**(): [`Camera`](../modules.md#camera)

#### Returns

[`Camera`](../modules.md#camera)

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:199

___

### cameraState

• `get` **cameraState**(): `CameraState`

#### Returns

`CameraState`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:207

___

### canOperate

• `get` **canOperate**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:246

___

### canRedoSteps

• `get` **canRedoSteps**(): `number`

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:219

___

### canUndoSteps

• `get` **canUndoSteps**(): `number`

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:220

___

### darkMode

• `get` **darkMode**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:210

___

### focused

• `get` **focused**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:213

___

### focusedView

• `get` **focusedView**(): `undefined` \| `View`

#### Returns

`undefined` \| `View`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:214

___

### fullscreen

• `get` **fullscreen**(): `undefined` \| `TeleBoxFullscreen`

#### Returns

`undefined` \| `TeleBoxFullscreen`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:212

___

### mainView

• `get` **mainView**(): `View`

#### Returns

`View`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:198

___

### mainViewSceneDir

• `get` **mainViewSceneDir**(): `string`

#### Returns

`string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:216

___

### mainViewSceneIndex

• `get` **mainViewSceneIndex**(): `number`

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:215

___

### mainViewScenesLength

• `get` **mainViewScenesLength**(): `number`

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:218

___

### pageState

• `get` **pageState**(): `PageState`

#### Returns

`PageState`

#### Implementation of

PageController.pageState

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:222

___

### prefersColorScheme

• `get` **prefersColorScheme**(): `undefined` \| ``"light"`` \| ``"dark"`` \| ``"auto"``

#### Returns

`undefined` \| ``"light"`` \| ``"dark"`` \| ``"auto"``

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:211

___

### room

• `get` **room**(): [`Room`](../interfaces/Room.md)

#### Returns

[`Room`](../interfaces/Room.md)

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:247

___

### sceneState

• `get` **sceneState**(): `SceneState`

#### Returns

`SceneState`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:221

___

### teleboxManager

• `get` **teleboxManager**(): `TeleBoxManager`

#### Returns

`TeleBoxManager`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:223

___

### topApp

• `get` **topApp**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:217

___

### registered

• `Static` `get` **registered**(): `Map`<`string`, `RegisterParams`<`any`, `any`, `any`\>\>

#### Returns

`Map`<`string`, `RegisterParams`<`any`, `any`, `any`\>\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:136

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

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:494

___

### \_refresh

▸ **_refresh**(): `void`

**`Inner`**

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:266

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:150

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:164

___

### bindCollectorContainer

▸ **bindCollectorContainer**(`container`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:138

___

### bindContainer

▸ **bindContainer**(`container`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:137

___

### cleanCurrentScene

▸ **cleanCurrentScene**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:252

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:235

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:261

___

### convertToPointInWorld

▸ **convertToPointInWorld**(`point`): `Point`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | `Point` |

#### Returns

`Point`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:240

___

### copy

▸ **copy**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:256

___

### createPPTHandler

▸ **createPPTHandler**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `onPageJumpTo` | (`_pptUUID`: `string`, `index`: `number`) => `void` |
| `onPageToNext` | () => `void` |
| `onPageToPrev` | () => `void` |

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:271

___

### delete

▸ **delete**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:255

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Overrides

InvisiblePlugin.destroy

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:243

___

### duplicate

▸ **duplicate**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:258

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

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:486

___

### getMainViewSceneIndex

▸ **getMainViewSceneIndex**(): `number`

返回 mainView 的 SceneIndex

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:178

___

### getMainViewScenePath

▸ **getMainViewScenePath**(): `undefined` \| `string`

返回 mainView 的 ScenePath

#### Returns

`undefined` \| `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:174

___

### insertImage

▸ **insertImage**(`info`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | `ImageInformation` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:260

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:259

___

### jumpPage

▸ **jumpPage**(`index`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

PageController.jumpPage

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:163

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:262

___

### lockImages

▸ **lockImages**(`locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locked` | `boolean` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:263

___

### nextPage

▸ **nextPage**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

PageController.nextPage

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:161

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:190

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

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:482

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Overrides

InvisiblePlugin.onDestroy

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:242

___

### paste

▸ **paste**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:257

___

### prevPage

▸ **prevPage**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

PageController.prevPage

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:162

___

### queryAll

▸ **queryAll**(): `AppProxy`[]

查询所有的 App

#### Returns

`AppProxy`[]

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:227

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:231

___

### redo

▸ **redo**(): `number`

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:253

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:264

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:170

___

### safeSetAttributes

▸ **safeSetAttributes**(`attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | `any` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:248

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:249

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

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:488

___

### setBaseSize

▸ **setBaseSize**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `Size` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:270

___

### setBoxState

▸ **setBoxState**(`boxState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `boxState` | ``"minimized"`` \| ``"maximized"`` \| ``"normal"`` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:195

___

### setCameraBound

▸ **setCameraBound**(`cameraBound`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cameraBound` | `CameraBound` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:241

___

### setContainerSizeRatio

▸ **setContainerSizeRatio**(`ratio`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ratio` | `number` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:267

___

### setContainerStyle

▸ **setContainerStyle**(`style`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:268

___

### setFullscreen

▸ **setFullscreen**(`fullscreen`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullscreen` | `TeleBoxFullscreen` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:251

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:160

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:156

___

### setMaximized

▸ **setMaximized**(`maximized`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maximized` | `boolean` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:196

___

### setMinimized

▸ **setMinimized**(`minimized`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `minimized` | `boolean` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:197

___

### setPrefersColorScheme

▸ **setPrefersColorScheme**(`scheme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | ``"light"`` \| ``"dark"`` \| ``"auto"`` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:250

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:182

___

### setStageStyle

▸ **setStageStyle**(`style`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `string` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:269

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:194

___

### switchMainViewToWriter

▸ **switchMainViewToWriter**(): `undefined` \| `Promise`<`void`\>

切换 mainView 为可写

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:186

___

### undo

▸ **undo**(): `number`

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:254

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

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.27/node_modules/white-web-sdk/types/index.d.ts:490

___

### mount

▸ `Static` **mount**(`params`): `Promise`<[`WindowManager`](WindowManager.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MountParams`](../modules.md#mountparams) |

#### Returns

`Promise`<[`WindowManager`](WindowManager.md)\>

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:133

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:142

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

#### Defined in

node_modules/.pnpm/@netless+window-manager@1.0.0-canary.45_white-web-sdk@2.16.27/node_modules/@netless/window-manager/dist/src/index.d.ts:146
