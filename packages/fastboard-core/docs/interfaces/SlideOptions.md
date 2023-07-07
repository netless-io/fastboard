[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / SlideOptions

# Interface: SlideOptions

## Hierarchy

- `Pick`<`ISlideConfig`, ``"rtcAudio"`` \| ``"useLocalCache"`` \| ``"resourceTimeout"`` \| ``"loaderDelegate"`` \| ``"urlInterrupter"`` \| ``"navigatorDelegate"`` \| ``"fixedFrameSize"`` \| ``"logger"``\>

  ↳ **`SlideOptions`**

## Table of contents

### Properties

- [autoFPS](SlideOptions.md#autofps)
- [autoResolution](SlideOptions.md#autoresolution)
- [bgColor](SlideOptions.md#bgcolor)
- [debug](SlideOptions.md#debug)
- [enableNvidiaDetect](SlideOptions.md#enablenvidiadetect)
- [fixedFrameSize](SlideOptions.md#fixedframesize)
- [forceCanvas](SlideOptions.md#forcecanvas)
- [loaderDelegate](SlideOptions.md#loaderdelegate)
- [logger](SlideOptions.md#logger)
- [maxFPS](SlideOptions.md#maxfps)
- [maxResolutionLevel](SlideOptions.md#maxresolutionlevel)
- [minFPS](SlideOptions.md#minfps)
- [navigatorDelegate](SlideOptions.md#navigatordelegate)
- [onRenderError](SlideOptions.md#onrendererror)
- [resolution](SlideOptions.md#resolution)
- [resourceTimeout](SlideOptions.md#resourcetimeout)
- [rtcAudio](SlideOptions.md#rtcaudio)
- [showRenderError](SlideOptions.md#showrendererror)
- [urlInterrupter](SlideOptions.md#urlinterrupter)
- [useLocalCache](SlideOptions.md#uselocalcache)

## Properties

### autoFPS

• `Optional` **autoFPS**: `boolean`

automatically decrease fps

**`Default`**

```ts
true
```

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1014

___

### autoResolution

• `Optional` **autoResolution**: `boolean`

whether to re-scale automatically

**`Default`**

```ts
true
```

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1016

___

### bgColor

• `Optional` **bgColor**: `string`

background color for slide animations

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1008

___

### debug

• `Optional` **debug**: `boolean`

show debug controller

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1004

___

### enableNvidiaDetect

• `Optional` **enableNvidiaDetect**: `boolean`

fix windows 11 nvidia rendering bug, downside: render next page slows down

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1022

___

### fixedFrameSize

• `Optional` **fixedFrameSize**: `Object`

设置 ppt 固定高宽, 设置后 ppt 不会跟随父元素的大小自动变化
如果有缩放需求，需要调用 updateFixedFrameSize 方法
width 及 height 属性单位为 px

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Inherited from

Pick.fixedFrameSize

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:244

___

### forceCanvas

• `Optional` **forceCanvas**: `boolean`

use canvas2d mode, downside: some 3d effects are lost

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1020

___

### loaderDelegate

• `Optional` **loaderDelegate**: `ILoaderDelegate`

远程资源代理, 详细使用参考 README

#### Inherited from

Pick.loaderDelegate

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:234

___

### logger

• `Optional` **logger**: `ILogger$1`

提供 logger 对象, 用以记录运行日志

#### Inherited from

Pick.logger

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:221

___

### maxFPS

• `Optional` **maxFPS**: `number`

maximal fps

**`Default`**

```ts
30
```

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1012

___

### maxResolutionLevel

• `Optional` **maxResolutionLevel**: `number`

1~4, default: 3

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1018

___

### minFPS

• `Optional` **minFPS**: `number`

minimal fps

**`Default`**

```ts
25
```

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1010

___

### navigatorDelegate

• `Optional` **navigatorDelegate**: `INavigatorDelegate`

ppt 页码导航代理, 添加此属性后, ppt 内部动作引起的页码变换, 全部走代理逻辑.

#### Inherited from

Pick.navigatorDelegate

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:238

___

### onRenderError

• `Optional` **onRenderError**: (`error`: `Error`, `pageIndex`: `number`) => `void`

#### Type declaration

▸ (`error`, `pageIndex`): `void`

custom error handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `pageIndex` | `number` |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1024

___

### resolution

• `Optional` **resolution**: `number`

scale

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1006

___

### resourceTimeout

• `Optional` **resourceTimeout**: `number`

资源加载超时时间, 默认 15 秒

#### Inherited from

Pick.resourceTimeout

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:230

___

### rtcAudio

• `Optional` **rtcAudio**: `RtcAudioClazz`

提供的音频播放器类, 用于 rtc 混音

#### Inherited from

Pick.rtcAudio

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:217

___

### showRenderError

• `Optional` **showRenderError**: `boolean`

whether to show an overlay of error message @default: true

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:1026

___

### urlInterrupter

• `Optional` **urlInterrupter**: `UrlInterrupter`

#### Inherited from

Pick.urlInterrupter

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:255

___

### useLocalCache

• `Optional` **useLocalCache**: `boolean`

是否启用本地缓存，启用后会将 ppt 远程资源缓存在 indexDB 中
默认为 true

#### Inherited from

Pick.useLocalCache

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:226
