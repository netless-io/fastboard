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

[packages/fastboard-core/src/utils/store.ts:8](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/utils/store.ts#L8)

## Methods

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
