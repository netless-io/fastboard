[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / SlidePreviewer

# Class: SlidePreviewer

## Table of contents

### Constructors

- [constructor](SlidePreviewer.md#constructor)

### Properties

- [$slide](SlidePreviewer.md#$slide)
- [bgColor](SlidePreviewer.md#bgcolor)
- [debug](SlidePreviewer.md#debug)
- [destroyed](SlidePreviewer.md#destroyed)
- [hotkeyListener](SlidePreviewer.md#hotkeylistener)
- [namespace](SlidePreviewer.md#namespace)
- [onError](SlidePreviewer.md#onerror)
- [onNewPageIndex](SlidePreviewer.md#onnewpageindex)
- [onPageChanged](SlidePreviewer.md#onpagechanged)
- [onPlay](SlidePreviewer.md#onplay)
- [onTransitionEnd](SlidePreviewer.md#ontransitionend)
- [onTransitionStart](SlidePreviewer.md#ontransitionstart)
- [ready](SlidePreviewer.md#ready)
- [readyPromise](SlidePreviewer.md#readypromise)
- [refreshPages](SlidePreviewer.md#refreshpages)
- [resolveReady](SlidePreviewer.md#resolveready)
- [sideEffect](SlidePreviewer.md#sideeffect)
- [slide](SlidePreviewer.md#slide)
- [target](SlidePreviewer.md#target)
- [viewer](SlidePreviewer.md#viewer)

### Methods

- [destroy](SlidePreviewer.md#destroy)
- [getPageIndex](SlidePreviewer.md#getpageindex)
- [mount](SlidePreviewer.md#mount)
- [registerEventListeners](SlidePreviewer.md#registereventlisteners)
- [registerHotKeys](SlidePreviewer.md#registerhotkeys)
- [render](SlidePreviewer.md#render)
- [renderSlideContainer](SlidePreviewer.md#renderslidecontainer)
- [renderStyle](SlidePreviewer.md#renderstyle)
- [wrapClassName](SlidePreviewer.md#wrapclassname)

## Constructors

### constructor

• **new SlidePreviewer**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.target` | `HTMLElement` |

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:21

## Properties

### $slide

• **$slide**: `HTMLDivElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:16

___

### bgColor

• `Readonly` **bgColor**: `string`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:12

___

### debug

• **debug**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:15

___

### destroyed

• `Private` **destroyed**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:43

___

### hotkeyListener

• `Private` **hotkeyListener**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:33

___

### namespace

• `Protected` **namespace**: `string`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:51

___

### onError

• `Protected` **onError**: (`__namedParameters`: { `error`: `Error`  }) => `void`

#### Type declaration

▸ (`__namedParameters`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.error` | `Error` |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:40

___

### onNewPageIndex

• `Protected` **onNewPageIndex**: (`index`: `number`) => `void`

#### Type declaration

▸ (`index`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:49

___

### onPageChanged

• `Protected` **onPageChanged**: (`page`: `number`) => `void`

#### Type declaration

▸ (`page`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:37

___

### onPlay

• `Protected` **onPlay**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:48

___

### onTransitionEnd

• `Protected` **onTransitionEnd**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:39

___

### onTransitionStart

• `Protected` **onTransitionStart**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:38

___

### ready

• **ready**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:18

___

### readyPromise

• `Readonly` **readyPromise**: `Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:20

___

### refreshPages

• `Protected` **refreshPages**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:45

___

### resolveReady

• `Private` **resolveReady**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:19

___

### sideEffect

• `Private` `Readonly` **sideEffect**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:17

___

### slide

• **slide**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:14

___

### target

• `Readonly` **target**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:13

___

### viewer

• `Readonly` **viewer**: `DocsViewer`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:11

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:44

___

### getPageIndex

▸ `Protected` **getPageIndex**(`page`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

`number`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:46

___

### mount

▸ **mount**(`taskId`, `url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `taskId` | `string` |
| `url` | `string` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:34

___

### registerEventListeners

▸ `Protected` **registerEventListeners**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:36

___

### registerHotKeys

▸ **registerHotKeys**(`windowLike`): `void`

In case you have a different window -- for example, in electron.
Use this method to re-register hotkeys.

**`example`**
previewer.registerHotKeys(windowLike)

#### Parameters

| Name | Type |
| :------ | :------ |
| `windowLike` | `Window` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:32

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:24

___

### renderSlideContainer

▸ `Protected` **renderSlideContainer**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:47

___

### renderStyle

▸ `Protected` **renderStyle**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:35

___

### wrapClassName

▸ `Protected` **wrapClassName**(`className`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` |

#### Returns

`string`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.1/node_modules/@netless/app-slide/dist/SlidePreviewer/index.d.ts:50
