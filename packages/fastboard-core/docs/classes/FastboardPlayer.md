[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardPlayer

# Class: FastboardPlayer

## Hierarchy

- `FastboardPlayerBase`

  ↳ **`FastboardPlayer`**

## Table of contents

### Constructors

- [constructor](FastboardPlayer.md#constructor)

### Properties

- [\_destroyed](FastboardPlayer.md#_destroyed)
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

### Methods

- [\_addMainViewListener](FastboardPlayer.md#_addmainviewlistener)
- [\_addManagerListener](FastboardPlayer.md#_addmanagerlistener)
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

• **new FastboardPlayer**(`sdk`, `player`, `manager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdk` | [`WhiteWebSdk`](WhiteWebSdk.md) |
| `player` | `Player` |
| `manager` | [`WindowManager`](WindowManager.md) |

#### Inherited from

FastboardPlayerBase.constructor

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:19](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L19)

## Properties

### \_destroyed

• `Protected` **\_destroyed**: `boolean` = `false`

#### Inherited from

FastboardPlayerBase.\_destroyed

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:21](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L21)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:105](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L105)

___

### canplay

• `Readonly` **canplay**: [`Readable`](../interfaces/Readable.md)<`boolean`\>

Will become true after buffering.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:100](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L100)

___

### currentTime

• `Readonly` **currentTime**: [`Writable`](../interfaces/Writable.md)<`number`\>

Player current time in milliseconds.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:80](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L80)

___

### duration

• `Readonly` **duration**: [`Readable`](../interfaces/Readable.md)<`number`\>

Playback duration in milliseconds.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:124](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L124)

___

### manager

• `Readonly` **manager**: [`WindowManager`](WindowManager.md)

#### Inherited from

FastboardPlayerBase.manager

___

### phase

• `Readonly` **phase**: [`Readable`](../interfaces/Readable.md)<``"waitingFirstFrame"`` \| ``"playing"`` \| ``"pause"`` \| ``"stop"`` \| ``"ended"`` \| ``"buffering"``\>

Player state, like "is it playing?".

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:92](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L92)

___

### playbackRate

• `Readonly` **playbackRate**: [`Writable`](../interfaces/Writable.md)<`number`\>

Playback speed, default `1`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:109](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L109)

___

### player

• `Readonly` **player**: `Player`

#### Inherited from

FastboardPlayerBase.player

___

### sdk

• `Readonly` **sdk**: [`WhiteWebSdk`](WhiteWebSdk.md)

#### Inherited from

FastboardPlayerBase.sdk

___

### state

• `Readonly` **state**: [`Readable`](../interfaces/Readable.md)<`PlayerState`\>

Get state of room at that time, like "who was in the room?".

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:131](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L131)

## Methods

### \_addMainViewListener

▸ `Protected` **_addMainViewListener**<`K`\>(`name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ViewCallbacks`](../modules.md#viewcallbacks) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `listener` | [`ViewCallbacks`](../modules.md#viewcallbacks)[`K`] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

FastboardPlayerBase.\_addMainViewListener

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:43](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L43)

___

### \_addManagerListener

▸ `Protected` **_addManagerListener**<`K`\>(`name`, `listener`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`PublicEvent`](../modules.md#publicevent) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `listener` | (`value`: [`PublicEvent`](../modules.md#publicevent)[`K`]) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

FastboardPlayerBase.\_addManagerListener

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:34](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L34)

___

### \_addPlayerListener

▸ `Protected` **_addPlayerListener**<`K`\>(`name`, `listener`): () => `void`

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

#### Inherited from

FastboardPlayerBase.\_addPlayerListener

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:28](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L28)

___

### \_assertNotDestroyed

▸ `Protected` **_assertNotDestroyed**(): `void`

#### Returns

`void`

#### Inherited from

FastboardPlayerBase.\_assertNotDestroyed

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:22](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L22)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:72](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L72)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:64](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L64)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

FastboardPlayerBase.destroy

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:49](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L49)

___

### pause

▸ **pause**(): `void`

Change player state to paused.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:155](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L155)

___

### play

▸ **play**(): `void`

Change player state to playing.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:147](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L147)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:139](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L139)

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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:171](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L171)

___

### stop

▸ **stop**(): `void`

Change player state to stopped.

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:163](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardPlayer.ts#L163)
