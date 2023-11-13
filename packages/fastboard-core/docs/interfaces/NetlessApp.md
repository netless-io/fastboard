[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / NetlessApp

# Interface: NetlessApp<Attributes, MagixEventPayloads, AppOptions, SetupResult\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Attributes` | `any` |
| `MagixEventPayloads` | `any` |
| `AppOptions` | `any` |
| `SetupResult` | `any` |

## Table of contents

### Properties

- [config](NetlessApp.md#config)
- [kind](NetlessApp.md#kind)
- [setup](NetlessApp.md#setup)

## Properties

### config

• `Optional` **config**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `height?` | `number` | Box height relative to whiteboard. 0~1. Default 0.5. |
| `minheight?` | `number` | Minimum box height relative to whiteboard. 0~1. Default 340 / 720. |
| `minwidth?` | `number` | Minimum box width relative to whiteboard. 0~1. Default 340 / 720. |
| `singleton?` | `boolean` | App only single instance. |
| `width?` | `number` | Box width relative to whiteboard. 0~1. Default 0.5. |

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.44/node_modules/@netless/window-manager/dist/typings.d.ts:8

___

### kind

• **kind**: `string`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.44/node_modules/@netless/window-manager/dist/typings.d.ts:7

___

### setup

• **setup**: (`context`: `AppContext`<`Attributes`, `MagixEventPayloads`, `AppOptions`\>) => `SetupResult`

#### Type declaration

▸ (`context`): `SetupResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `AppContext`<`Attributes`, `MagixEventPayloads`, `AppOptions`\> |

##### Returns

`SetupResult`

#### Defined in

node_modules/.pnpm/@netless+window-manager@0.4.58_white-web-sdk@2.16.44/node_modules/@netless/window-manager/dist/typings.d.ts:20
