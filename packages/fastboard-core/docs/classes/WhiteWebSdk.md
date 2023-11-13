[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / WhiteWebSdk

# Class: WhiteWebSdk

## Table of contents

### Constructors

- [constructor](WhiteWebSdk.md#constructor)

### Properties

- [akkoApp](WhiteWebSdk.md#akkoapp)
- [assertInvisiblePlugins](WhiteWebSdk.md#assertinvisibleplugins)
- [assertPlugins](WhiteWebSdk.md#assertplugins)
- [boundless](WhiteWebSdk.md#boundless)
- [deviceType](WhiteWebSdk.md#devicetype)
- [disableCurveAnimes](WhiteWebSdk.md#disablecurveanimes)
- [disableNewPencilStroke](WhiteWebSdk.md#disablenewpencilstroke)
- [disableRotation](WhiteWebSdk.md#disablerotation)
- [enableReportQuality](WhiteWebSdk.md#enablereportquality)
- [fontFamily](WhiteWebSdk.md#fontfamily)
- [fonts](WhiteWebSdk.md#fonts)
- [handToolKey](WhiteWebSdk.md#handtoolkey)
- [invisiblePlugins](WhiteWebSdk.md#invisibleplugins)
- [isCanvasRenderEngineAvailable](WhiteWebSdk.md#iscanvasrenderengineavailable)
- [isValidInvisiblePluginClass](WhiteWebSdk.md#isvalidinvisiblepluginclass)
- [mergeArray](WhiteWebSdk.md#mergearray)
- [onlyCallbackRemoteStateModify](WhiteWebSdk.md#onlycallbackremotestatemodify)
- [parseAppIdentifier](WhiteWebSdk.md#parseappidentifier)
- [plugins](WhiteWebSdk.md#plugins)
- [pptParams](WhiteWebSdk.md#pptparams)
- [preloadDynamicPPT](WhiteWebSdk.md#preloaddynamicppt)
- [qualityLoggerFactory](WhiteWebSdk.md#qualityloggerfactory)
- [region](WhiteWebSdk.md#region)
- [renderEngine](WhiteWebSdk.md#renderengine)
- [screenType](WhiteWebSdk.md#screentype)
- [standardizeCameraBound](WhiteWebSdk.md#standardizecamerabound)
- [standardizeUserPayload](WhiteWebSdk.md#standardizeuserpayload)
- [urlInterrupter](WhiteWebSdk.md#urlinterrupter)
- [useMobXState](WhiteWebSdk.md#usemobxstate)
- [version](WhiteWebSdk.md#version)
- [whiteLoggerFactory](WhiteWebSdk.md#whiteloggerfactory)
- [wrappedComponents](WhiteWebSdk.md#wrappedcomponents)
- [defaultValue](WhiteWebSdk.md#defaultvalue)
- [netState](WhiteWebSdk.md#netstate)

### Methods

- [isPlayable](WhiteWebSdk.md#isplayable)
- [joinRoom](WhiteWebSdk.md#joinroom)
- [pptConverter](WhiteWebSdk.md#pptconverter)
- [replayRoom](WhiteWebSdk.md#replayroom)

## Constructors

### constructor

• **new WhiteWebSdk**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration) |

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2797

## Properties

### akkoApp

• `Private` **akkoApp**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2861

___

### assertInvisiblePlugins

• `Private` **assertInvisiblePlugins**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2905

___

### assertPlugins

• `Private` **assertPlugins**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2903

___

### boundless

• `Private` **boundless**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2863

___

### deviceType

• `Readonly` **deviceType**: `DeviceType`

该客户端的设备类型，决定 SDK 如何处理鼠标事件和触碰事件

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2780

___

### disableCurveAnimes

• `Private` **disableCurveAnimes**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2879

___

### disableNewPencilStroke

• `Private` **disableNewPencilStroke**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2881

___

### disableRotation

• `Private` **disableRotation**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2883

___

### enableReportQuality

• `Private` **enableReportQuality**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2897

___

### fontFamily

• `Private` **fontFamily**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2877

___

### fonts

• `Private` **fonts**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2873

___

### handToolKey

• `Private` **handToolKey**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2875

___

### invisiblePlugins

• `Private` **invisiblePlugins**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2867

___

### isCanvasRenderEngineAvailable

• `Private` **isCanvasRenderEngineAvailable**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2899

___

### isValidInvisiblePluginClass

• `Private` **isValidInvisiblePluginClass**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2907

___

### mergeArray

• `Private` **mergeArray**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2909

___

### onlyCallbackRemoteStateModify

• `Private` **onlyCallbackRemoteStateModify**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2887

___

### parseAppIdentifier

• `Private` **parseAppIdentifier**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2901

___

### plugins

• `Private` **plugins**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2865

___

### pptParams

• `Private` **pptParams**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2891

___

### preloadDynamicPPT

• `Private` **preloadDynamicPPT**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2871

___

### qualityLoggerFactory

• `Private` **qualityLoggerFactory**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2859

___

### region

• `Readonly` **region**: `string`

默认所在区域
如果在调用 ``joinRoom``、``replayRoom``、``isPlayable`` 时没有指定 ``region``，则以此属性为准。

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2775

___

### renderEngine

• `Readonly` **renderEngine**: `RenderEngine`

对画面的渲染模式

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2790

___

### screenType

• `Readonly` **screenType**: `ScreenType`

该客户端的屏幕类型，用于调整手势识别参数

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2785

___

### standardizeCameraBound

• `Private` **standardizeCameraBound**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2895

___

### standardizeUserPayload

• `Private` **standardizeUserPayload**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2893

___

### urlInterrupter

• `Private` **urlInterrupter**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2889

___

### useMobXState

• `Private` **useMobXState**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2885

___

### version

• `Readonly` **version**: `string`

当前 SDK 的版本

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2795

___

### whiteLoggerFactory

• `Private` **whiteLoggerFactory**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2857

___

### wrappedComponents

• `Private` **wrappedComponents**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2869

___

### defaultValue

▪ `Static` `Private` **defaultValue**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2911

___

### netState

▪ `Static` `Private` **netState**: `any`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2855

## Methods

### isPlayable

▸ **isPlayable**(`params`): `Promise`<`boolean`\>

判断房间是否可播放

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `PlayableCheckingParams` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2825

___

### joinRoom

▸ **joinRoom**(`params`, `callbacks?`): `Promise`<[`Room`](../interfaces/Room.md)\>

加入一个实时房间

**`Throws`**

如果加入房间失败，则会异步地抛出错误

**`Example`**

```typescript
const joinRoomParams = {...};
const roomCallbacks = {...};

whiteWebSdk.joinRoom(joinRoomParams, roomCallbacks)
           .then(function (room) {
               // 加入房间成功，拿到 room 对象
           })
           .catch(function (error) {
               // 加入房间失败，拿到 error 对象
           });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`JoinRoomParams`](../modules.md#joinroomparams) | 加入房间的参数 |
| `callbacks?` | `Partial`<[`RoomCallbacks`](../modules.md#roomcallbacks)\> | 回调函数 |

#### Returns

`Promise`<[`Room`](../interfaces/Room.md)\>

异步地返回房间

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2820

___

### pptConverter

▸ **pptConverter**(`roomToken`): `LegacyPPTConverter`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `roomToken` | `string` |

#### Returns

`LegacyPPTConverter`

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2853

___

### replayRoom

▸ **replayRoom**(`params`, `callbacks?`): `Promise`<`Player`\>

回放房间录像

**`Throws`**

如果加入房间失败，则会异步地抛出错误

**`Example`**

```typescript
const replayRoomParams = {...};
const replayCallbacks = {...};

whiteWebSdk.replayRoom(replayRoomParams, replayCallbacks)
           .then(function (player) {
               // 回放成功，拿到 player 对象
           })
           .catch(function (error) {
               // 回放失败，拿到 error 对象
           });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `ReplayRoomParams` | 回放房间录像参数 |
| `callbacks?` | `Partial`<`PlayerCallbacks`\> | 回调函数 |

#### Returns

`Promise`<`Player`\>

异步地返回房间

#### Defined in

node_modules/.pnpm/white-web-sdk@2.16.44/node_modules/white-web-sdk/types/index.d.ts:2848
