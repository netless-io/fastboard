[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / Writable

# Interface: Writable<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`Readable`](Readable.md)<`T`\>

  ↳ **`Writable`**

## Table of contents

### Properties

- [value](Writable.md#value)

### Methods

- [dispose](Writable.md#dispose)
- [reaction](Writable.md#reaction)
- [set](Writable.md#set)
- [subscribe](Writable.md#subscribe)
- [update](Writable.md#update)

## Properties

### value

• `Readonly` **value**: `T`

#### Inherited from

[Readable](Readable.md).[value](Readable.md#value)

#### Defined in

[packages/fastboard-core/src/utils/store.ts:11](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L11)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Readable](Readable.md).[dispose](Readable.md#dispose)

#### Defined in

[packages/fastboard-core/src/utils/store.ts:7](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L7)

___

### reaction

▸ **reaction**(`this`, `run`): [`Unsubscriber`](../modules.md#unsubscriber)

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `void` |
| `run` | [`Subscriber`](../modules.md#subscriber)<`T`\> |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

#### Inherited from

[Readable](Readable.md).[reaction](Readable.md#reaction)

#### Defined in

[packages/fastboard-core/src/utils/store.ts:13](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L13)

___

### set

▸ **set**(`this`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `void` |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:17](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L17)

___

### subscribe

▸ **subscribe**(`this`, `run`): [`Unsubscriber`](../modules.md#unsubscriber)

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `void` |
| `run` | [`Subscriber`](../modules.md#subscriber)<`T`\> |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

#### Inherited from

[Readable](Readable.md).[subscribe](Readable.md#subscribe)

#### Defined in

[packages/fastboard-core/src/utils/store.ts:12](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L12)

___

### update

▸ **update**(`this`, `updater`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `void` |
| `updater` | [`Updater`](../modules.md#updater)<`T`\> |

#### Returns

`void`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:18](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L18)
