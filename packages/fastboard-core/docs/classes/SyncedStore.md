[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / SyncedStore

# Class: SyncedStore<TEventData\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

## Table of contents

### Constructors

- [constructor](SyncedStore.md#constructor)

### Properties

- [\_isPluginWritable$](SyncedStore.md#_ispluginwritable$)
- [\_isRoomWritable$](SyncedStore.md#_isroomwritable$)
- [\_plugin$](SyncedStore.md#_plugin$)
- [\_room](SyncedStore.md#_room)
- [\_sideEffect](SyncedStore.md#_sideeffect)
- [displayer](SyncedStore.md#displayer)

### Accessors

- [isPluginWritable](SyncedStore.md#ispluginwritable)
- [isRoomWritable](SyncedStore.md#isroomwritable)

### Methods

- [addEventListener](SyncedStore.md#addeventlistener)
- [addPluginWritableChangeListener](SyncedStore.md#addpluginwritablechangelistener)
- [addRoomWritableChangeListener](SyncedStore.md#addroomwritablechangelistener)
- [connectStorage](SyncedStore.md#connectstorage)
- [destroy](SyncedStore.md#destroy)
- [dispatchEvent](SyncedStore.md#dispatchevent)
- [nextFrame](SyncedStore.md#nextframe)
- [removeEventListener](SyncedStore.md#removeeventlistener)
- [setRoomWritable](SyncedStore.md#setroomwritable)

## Constructors

### constructor

• **new SyncedStore**<`TEventData`\>(`displayer`, `invisiblePlugin$`, `isRoomWritable$`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `displayer` | `Displayer`<`DisplayerCallbacks`\> |
| `invisiblePlugin$` | `ReadonlyVal`<`any`, `any`\> |
| `isRoomWritable$` | `ReadonlyVal`<`boolean`, `any`\> |

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:12

## Properties

### \_isPluginWritable$

• `Private` `Readonly` **\_isPluginWritable$**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:8

___

### \_isRoomWritable$

• `Private` `Readonly` **\_isRoomWritable$**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:9

___

### \_plugin$

• `Readonly` **\_plugin$**: `ReadonlyVal`<`any`, `any`\>

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:7

___

### \_room

• `Private` `Readonly` **\_room**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:11

___

### \_sideEffect

• `Private` `Readonly` **\_sideEffect**: `any`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:10

___

### displayer

• `Readonly` **displayer**: `Displayer`<`DisplayerCallbacks`\>

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:6

## Accessors

### isPluginWritable

• `get` **isPluginWritable**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:14

___

### isRoomWritable

• `get` **isRoomWritable**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:16

## Methods

### addEventListener

▸ **addEventListener**<`TEvent`\>(`event`, `listener`, `options?`): `MagixEventListenerDisposer`

Listen to events from others clients (and self messages).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends `string` = `MagixEventTypes`<`TEventData`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `listener` | `MagixEventHandler`<`TEventData`, `TEvent`\> |
| `options?` | `MagixEventListenerOptions` |

#### Returns

`MagixEventListenerDisposer`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:22

___

### addPluginWritableChangeListener

▸ **addPluginWritableChangeListener**(`listener`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | (`isWritable`: `boolean`) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:15

___

### addRoomWritableChangeListener

▸ **addRoomWritableChangeListener**(`listener`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | (`isWritable`: `boolean`) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:18

___

### connectStorage

▸ **connectStorage**<`TState`\>(`namespace?`, `defaultState?`): [`Storage`](Storage.md)<`TState`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `Record`<`string`, `unknown`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace?` | `string` |
| `defaultState?` | `TState` |

#### Returns

[`Storage`](Storage.md)<`TState`\>

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:13

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:26

___

### dispatchEvent

▸ **dispatchEvent**<`TEvent`\>(`event`, `payload`): `void`

Dispatch events to other clients (and self).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends `string` = `MagixEventTypes`<`TEventData`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `payload` | `TEventData`[`TEvent`] |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:20

___

### nextFrame

▸ **nextFrame**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:25

___

### removeEventListener

▸ **removeEventListener**<`TEvent`\>(`event`, `listener?`): `void`

Remove a Magix event listener.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEvent` | extends `string` = `MagixEventTypes`<`TEventData`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `TEvent` |
| `listener?` | `MagixEventHandler`<`TEventData`, `TEvent`\> |

#### Returns

`void`

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:24

___

### setRoomWritable

▸ **setRoomWritable**(`isWritable`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `isWritable` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/.pnpm/@netless+synced-store@2.0.7_white-web-sdk@2.16.44/node_modules/@netless/synced-store/dist/synced-store.d.ts:17
