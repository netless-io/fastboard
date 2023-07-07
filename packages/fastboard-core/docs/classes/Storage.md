[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / Storage

# Class: Storage<TState\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `Record`<`string`, `any`\> = `any` |

## Table of contents

### Constructors

- [constructor](Storage.md#constructor)

### Properties

- [\_disconnected](Storage.md#_disconnected)
- [\_events](Storage.md#_events)
- [\_isWritable$](Storage.md#_iswritable$)
- [\_plugin$](Storage.md#_plugin$)
- [\_refine](Storage.md#_refine)
- [\_requireAccess](Storage.md#_requireaccess)
- [\_sideEffect](Storage.md#_sideeffect)
- [defaultState](Storage.md#defaultstate)
- [namespace](Storage.md#namespace)
- [off](Storage.md#off)
- [on](Storage.md#on)

### Accessors

- [disconnected](Storage.md#disconnected)
- [isWritable](Storage.md#iswritable)
- [state](Storage.md#state)

### Methods

- [deleteStorage](Storage.md#deletestorage)
- [disconnect](Storage.md#disconnect)
- [resetState](Storage.md#resetstate)
- [setState](Storage.md#setstate)

## Constructors

### constructor

• **new Storage**<`TState`\>(`«destructured»`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `Record`<`string`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `StorageConfig`<`TState`\> |

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:25

## Properties

### \_disconnected

• `Private` **\_disconnected**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:44

___

### \_events

• `Private` **\_events**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:24

___

### \_isWritable$

• `Private` **\_isWritable$**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:21

___

### \_plugin$

• `Private` **\_plugin$**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:20

___

### \_refine

• `Private` **\_refine**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:22

___

### \_requireAccess

• `Private` **\_requireAccess**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:45

___

### \_sideEffect

• `Private` **\_sideEffect**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:23

___

### defaultState

• **defaultState**: `Readonly`<`TState`\>

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:19

___

### namespace

• `Readonly` **namespace**: `string`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:18

___

### off

• **off**: <TEventName\>(`eventName`: `TEventName`, `listener`: `RemitterListener`<`StorageEventData`<`TState`\>, `TEventName`\>) => `boolean`

#### Type declaration

▸ <`TEventName`\>(`eventName`, `listener`): `boolean`

Remove a listener from the eventName.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventName` | extends `RemitterEventNames`<`StorageEventData`<`TState`\>\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEventName` |
| `listener` | `RemitterListener`<`StorageEventData`<`TState`\>, `TEventName`\> |

##### Returns

`boolean`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:40

___

### on

• **on**: <TEventName\>(`eventName`: `TEventName`, `listener`: `RemitterListener`<`StorageEventData`<`TState`\>, `TEventName`\>) => `RemitterDisposer`

#### Type declaration

▸ <`TEventName`\>(`eventName`, `listener`): `RemitterDisposer`

Add a listener to the eventName.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventName` | extends `RemitterEventNames`<`StorageEventData`<`TState`\>\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `TEventName` |
| `listener` | `RemitterListener`<`StorageEventData`<`TState`\>, `TEventName`\> |

##### Returns

`RemitterDisposer`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:36

## Accessors

### disconnected

• `get` **disconnected**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:43

___

### isWritable

• `get` **isWritable**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:26

___

### state

• `get` **state**(): `Readonly`<`TState`\>

#### Returns

`Readonly`<`TState`\>

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:27

## Methods

### deleteStorage

▸ **deleteStorage**(): `void`

delete synced storage data and disconnect from synced storage

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:32

___

### disconnect

▸ **disconnect**(): `void`

Disconnect from synced storage and release listeners

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:42

___

### resetState

▸ **resetState**(): `void`

reset storage state to default state

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:30

___

### setState

▸ **setState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `Partial`<`TState`\> |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.42/node_modules/@netless/synced-store/dist/storage.d.ts:28
