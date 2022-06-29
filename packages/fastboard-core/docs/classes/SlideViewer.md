[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / SlideViewer

# Class: SlideViewer

## Table of contents

### Constructors

- [constructor](SlideViewer.md#constructor)

### Properties

- [$content](SlideViewer.md#$content)
- [$footer](SlideViewer.md#$footer)
- [$slide](SlideViewer.md#$slide)
- [\_destroyed](SlideViewer.md#_destroyed)
- [\_infoPromise](SlideViewer.md#_infopromise)
- [\_isFrozen](SlideViewer.md#_isfrozen)
- [\_ready](SlideViewer.md#_ready)
- [\_readyPromise](SlideViewer.md#_readypromise)
- [\_slideCount](SlideViewer.md#_slidecount)
- [footer](SlideViewer.md#footer)
- [sideEffect](SlideViewer.md#sideeffect)
- [sidebar](SlideViewer.md#sidebar)
- [slide](SlideViewer.md#slide)
- [styles](SlideViewer.md#styles)

### Methods

- [destroy](SlideViewer.md#destroy)
- [freeze](SlideViewer.md#freeze)
- [prepare](SlideViewer.md#prepare)
- [ready](SlideViewer.md#ready)
- [setPage](SlideViewer.md#setpage)
- [setReadonly](SlideViewer.md#setreadonly)
- [unfreeze](SlideViewer.md#unfreeze)

## Constructors

### constructor

• **new SlideViewer**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `SlideViewerOptions` |

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:55

## Properties

### $content

• `Readonly` **$content**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:47

___

### $footer

• `Readonly` **$footer**: `HTMLElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:48

___

### $slide

• `Readonly` **$slide**: `HTMLDivElement`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:24

___

### \_destroyed

• `Private` **\_destroyed**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:54

___

### \_infoPromise

• `Private` `Readonly` **\_infoPromise**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:51

___

### \_isFrozen

• `Private` **\_isFrozen**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:61

___

### \_ready

• `Private` **\_ready**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:52

___

### \_readyPromise

• `Private` `Readonly` **\_readyPromise**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:50

___

### \_slideCount

• `Private` **\_slideCount**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:53

___

### footer

• `Readonly` **footer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$footer` | `HTMLDivElement` |
| `$pageNumberInput` | `HTMLInputElement` |
| `on_new_page_index` | (`callback`: (`newPageIndex`: `number`) => `void`) => `void` |
| `on_play` | (`callback`: () => `void`) => `void` |
| `on_toggle_preview` | (`callback`: () => `void`) => `void` |
| `set_page_count` | (`page_count_`: `number`) => `void` |
| `set_page_index` | (`page_index_`: `number`) => `void` |
| `set_readonly` | (`readonly_`: `boolean`) => `void` |
| `set_sidebar` | (`sidebar_`: `boolean`) => `void` |

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:36

___

### sideEffect

• `Private` `Readonly` **sideEffect**: `any`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:23

___

### sidebar

• `Readonly` **sidebar**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$content` | `HTMLDivElement` |
| `$preview` | `HTMLDivElement` |
| `destroy` | () => `void` |
| `get_active` | () => `boolean` |
| `on_new_page_index` | (`callback`: (`newPageIndex`: `number`) => `void`) => `void` |
| `set_active` | (`active_`: `boolean`) => `void` |
| `set_page_index` | (`page_index_`: `number`) => `void` |
| `set_pages` | (`pages_`: `PreviewPage`[]) => `void` |
| `set_readonly` | (`readonly_`: `boolean`) => `void` |

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:25

___

### slide

• `Readonly` **slide**: `Slide`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:49

___

### styles

▪ `Static` **styles**: `string`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:22

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:58

___

### freeze

▸ **freeze**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:62

___

### prepare

▸ **prepare**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`response`: `SlideViewerInfoResponse`) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:56

___

### ready

▸ **ready**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:57

___

### setPage

▸ **setPage**(`page`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:60

___

### setReadonly

▸ **setReadonly**(`readonly`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `readonly` | `boolean` |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:59

___

### unfreeze

▸ **unfreeze**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+app-slide@0.3.0-canary.4/node_modules/@netless/app-slide/dist/SlideViewer.d.ts:63
