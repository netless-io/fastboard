[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / Readable

# Interface: Readable<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`Readable`**

  ↳ [`Writable`](Writable.md)

## Table of contents

### Properties

- [value](Readable.md#value)

### Methods

- [reaction](Readable.md#reaction)
- [subscribe](Readable.md#subscribe)

## Properties

### value

• `Readonly` **value**: `T`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:8](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L8)

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

#### Defined in

[packages/fastboard-core/src/utils/store.ts:10](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L10)

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

#### Defined in

[packages/fastboard-core/src/utils/store.ts:9](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/utils/store.ts#L9)
