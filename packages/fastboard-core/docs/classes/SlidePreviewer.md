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

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:966

## Properties

### $slide

• **$slide**: `HTMLDivElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:961

___

### bgColor

• `Readonly` **bgColor**: `string`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:957

___

### debug

• **debug**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:960

___

### destroyed

• `Private` **destroyed**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:988

___

### hotkeyListener

• `Private` **hotkeyListener**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:978

___

### namespace

• `Protected` **namespace**: `string`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:996

___

### onError

• `Protected` **onError**: (`__namedParameters`: { `error`: `Error`  }) => `void`

#### Type declaration

▸ (`«destructured»`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `error` | `Error` |

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:985

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

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:994

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

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:982

___

### onPlay

• `Protected` **onPlay**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:993

___

### onTransitionEnd

• `Protected` **onTransitionEnd**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:984

___

### onTransitionStart

• `Protected` **onTransitionStart**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:983

___

### ready

• **ready**: `boolean`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:963

___

### readyPromise

• `Readonly` **readyPromise**: `Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:965

___

### refreshPages

• `Protected` **refreshPages**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:990

___

### resolveReady

• `Private` **resolveReady**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:964

___

### sideEffect

• `Private` `Readonly` **sideEffect**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:962

___

### slide

• **slide**: ``null`` \| `Slide`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:959

___

### target

• `Readonly` **target**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:958

___

### viewer

• `Readonly` **viewer**: `DocsViewer`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:956

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:989

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

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:991

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

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:979

___

### registerEventListeners

▸ `Protected` **registerEventListeners**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:981

___

### registerHotKeys

▸ **registerHotKeys**(`windowLike`): `void`

In case you have a different window -- for example, in electron.
Use this method to re-register hotkeys.

**`Example`**

```ts
previewer.registerHotKeys(windowLike)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `windowLike` | `Window` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:977

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:969

___

### renderSlideContainer

▸ `Protected` **renderSlideContainer**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:992

___

### renderStyle

▸ `Protected` **renderStyle**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:980

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

node_modules/.pnpm/@netless+app-slide@0.2.39/node_modules/@netless/app-slide/dist/index.d.ts:995
