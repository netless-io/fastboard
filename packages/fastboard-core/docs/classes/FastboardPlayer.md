[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardPlayer

# Class: FastboardPlayer<TEventData\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

## Hierarchy

- `FastboardPlayerBase`<`TEventData`\>

  ↳ **`FastboardPlayer`**

## Table of contents

### Constructors

- [constructor](FastboardPlayer.md#constructor)

### Properties

- [\_destroyed](FastboardPlayer.md#_destroyed)
- [canplay](FastboardPlayer.md#canplay)
- [currentTime](FastboardPlayer.md#currenttime)
- [duration](FastboardPlayer.md#duration)
- [manager](FastboardPlayer.md#manager)
- [phase](FastboardPlayer.md#phase)
- [playbackRate](FastboardPlayer.md#playbackrate)
- [player](FastboardPlayer.md#player)
- [sdk](FastboardPlayer.md#sdk)
- [state](FastboardPlayer.md#state)
- [syncedStore](FastboardPlayer.md#syncedstore)

### Methods

- [bindCollector](FastboardPlayer.md#bindcollector)
- [bindContainer](FastboardPlayer.md#bindcontainer)
- [destroy](FastboardPlayer.md#destroy)
- [pause](FastboardPlayer.md#pause)
- [play](FastboardPlayer.md#play)
- [seek](FastboardPlayer.md#seek)
- [setPlaybackRate](FastboardPlayer.md#setplaybackrate)
- [stop](FastboardPlayer.md#stop)

## Constructors

### constructor

• **new FastboardPlayer**<`TEventData`\>(`sdk`, `player`, `manager`, `syncedStore`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | extends `Record`<`string`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdk` | [`WhiteWebSdk`](WhiteWebSdk.md) |
| `player` | `Player` |
| `manager` | [`WindowManager`](WindowManager.md) |
| `syncedStore` | [`SyncedStore`](SyncedStore.md)<`TEventData`\> |

#### Inherited from

FastboardPlayerBase<TEventData\>.constructor

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:22](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L22)

## Properties

### \_destroyed

• `Protected` **\_destroyed**: `boolean` = `false`

#### Inherited from

FastboardPlayerBase.\_destroyed

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:29](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L29)

___

### canplay

• `Readonly` **canplay**: [`Readable`](../interfaces/Readable.md)<`boolean`\>

Will become true after buffering.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:114](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L114)

___

### currentTime

• `Readonly` **currentTime**: [`Writable`](../interfaces/Writable.md)<`number`\>

Player current time in milliseconds.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:94](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L94)

___

### duration

• `Readonly` **duration**: [`Readable`](../interfaces/Readable.md)<`number`\>

Playback duration in milliseconds.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:139](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L139)

___

### manager

• `Readonly` **manager**: [`WindowManager`](WindowManager.md)

#### Inherited from

FastboardPlayerBase.manager

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:25](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L25)

___

### phase

• `Readonly` **phase**: [`Readable`](../interfaces/Readable.md)<``"waitingFirstFrame"`` \| ``"playing"`` \| ``"pause"`` \| ``"stop"`` \| ``"ended"`` \| ``"buffering"``\>

Player state, like "is it playing?".

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:106](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L106)

___

### playbackRate

• `Readonly` **playbackRate**: [`Writable`](../interfaces/Writable.md)<`number`\>

Playback speed, default `1`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:124](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L124)

___

### player

• `Readonly` **player**: `Player`

#### Inherited from

FastboardPlayerBase.player

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:24](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L24)

___

### sdk

• `Readonly` **sdk**: [`WhiteWebSdk`](WhiteWebSdk.md)

#### Inherited from

FastboardPlayerBase.sdk

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:23](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L23)

___

### state

• `Readonly` **state**: [`Readable`](../interfaces/Readable.md)<`PlayerState`\>

Get state of room at that time, like "who was in the room?".

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:146](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L146)

___

### syncedStore

• `Readonly` **syncedStore**: [`SyncedStore`](SyncedStore.md)<`TEventData`\>

#### Inherited from

FastboardPlayerBase.syncedStore

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:26](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L26)

## Methods

### bindCollector

▸ **bindCollector**(`container`): `void`

Move window-manager's collector to some place.

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:86](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L86)

___

### bindContainer

▸ **bindContainer**(`container`): `void`

Render this player to some DOM.

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:78](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L78)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

FastboardPlayerBase.destroy

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:61](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L61)

___

### pause

▸ **pause**(): `void`

Change player state to paused.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:170](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L170)

___

### play

▸ **play**(): `void`

Change player state to playing.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:162](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L162)

___

### seek

▸ **seek**(`timestamp`): `Promise`<[`PlayerSeekingResult`](../enums/PlayerSeekingResult.md)\>

Seek to some time in milliseconds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

`Promise`<[`PlayerSeekingResult`](../enums/PlayerSeekingResult.md)\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:154](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L154)

___

### setPlaybackRate

▸ **setPlaybackRate**(`value`): `void`

Set playback speed, a shortcut for `speed.set(x)`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:186](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L186)

___

### stop

▸ **stop**(): `void`

Change player state to stopped.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:178](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardPlayer.ts#L178)
