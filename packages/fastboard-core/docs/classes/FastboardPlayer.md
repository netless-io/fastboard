[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardPlayer

# Class: FastboardPlayer<TEventData\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TEventData` | `any` |

## Table of contents

### Constructors

- [constructor](FastboardPlayer.md#constructor)

### Properties

- [\_destroyed](FastboardPlayer.md#_destroyed)
- [\_disposers](FastboardPlayer.md#_disposers)
- [\_setPlaybackRate](FastboardPlayer.md#_setplaybackrate)
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

- [\_addPlayerListener](FastboardPlayer.md#_addplayerlistener)
- [\_assertNotDestroyed](FastboardPlayer.md#_assertnotdestroyed)
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
| `TEventData` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdk` | [`WhiteWebSdk`](WhiteWebSdk.md) |
| `player` | `Player` |
| `manager` | [`WindowManager`](WindowManager.md) |
| `syncedStore` | [`SyncedStore`](SyncedStore.md)<`TEventData`\> |

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:70](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L70)

## Properties

### \_destroyed

• `Private` **\_destroyed**: `boolean` = `false`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:28](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L28)

___

### \_disposers

• `Private` **\_disposers**: () => `void`[] = `[]`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:26](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L26)

___

### \_setPlaybackRate

• `Private` **\_setPlaybackRate**: (`value`: `number`) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:54](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L54)

___

### canplay

• `Readonly` **canplay**: [`Readable`](../interfaces/Readable.md)<`boolean`\>

Will become true after buffering.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:52](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L52)

___

### currentTime

• `Readonly` **currentTime**: [`Writable`](../interfaces/Writable.md)<`number`\>

Player current time in milliseconds.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:42](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L42)

___

### duration

• `Readonly` **duration**: [`Readable`](../interfaces/Readable.md)<`number`\>

Playback duration in milliseconds.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:63](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L63)

___

### manager

• `Readonly` **manager**: [`WindowManager`](WindowManager.md)

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:73](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L73)

___

### phase

• `Readonly` **phase**: [`Readable`](../interfaces/Readable.md)<``"waitingFirstFrame"`` \| ``"playing"`` \| ``"pause"`` \| ``"stop"`` \| ``"ended"`` \| ``"buffering"``\>

Player state, like "is it playing?".

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:47](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L47)

___

### playbackRate

• `Readonly` **playbackRate**: [`Writable`](../interfaces/Writable.md)<`number`\>

Playback speed, default `1`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:58](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L58)

___

### player

• `Readonly` **player**: `Player`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:72](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L72)

___

### sdk

• `Readonly` **sdk**: [`WhiteWebSdk`](WhiteWebSdk.md)

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:71](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L71)

___

### state

• `Readonly` **state**: [`Readable`](../interfaces/Readable.md)<[`PlayerState`](../modules.md#playerstate)\>

Get state of room at that time, like "who was in the room?".

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:68](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L68)

___

### syncedStore

• `Readonly` **syncedStore**: [`SyncedStore`](SyncedStore.md)<`TEventData`\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:74](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L74)

## Methods

### \_addPlayerListener

▸ `Private` **_addPlayerListener**<`K`\>(`name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `DisplayerCallbacks` \| ``"onPhaseChanged"`` \| ``"onIsPlayableChanged"`` \| ``"onLoadFirstFrame"`` \| ``"onPlayerStateChanged"`` \| ``"onStoppedWithError"`` \| ``"onProgressTimeChanged"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `listener` | `PlayerCallbacks`[`K`] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:33](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L33)

___

### \_assertNotDestroyed

▸ `Private` **_assertNotDestroyed**(): `void`

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:29](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L29)

___

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:113](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L113)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:105](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L105)

___

### destroy

▸ **destroy**(): `void`

Destroy fastboard player.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:121](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L121)

___

### pause

▸ **pause**(): `void`

Change player state to paused.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:145](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L145)

___

### play

▸ **play**(): `void`

Change player state to playing.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:138](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L138)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:130](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L130)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:161](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L161)

___

### stop

▸ **stop**(): `void`

Change player state to stopped.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:153](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L153)
