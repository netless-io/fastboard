[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / Readable

# Interface: Readable<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`Disposable`](Disposable.md)

  ↳ **`Readable`**

  ↳↳ [`Writable`](Writable.md)

## Table of contents

### Properties

- [value](Readable.md#value)

### Methods

- [dispose](Readable.md#dispose)
- [reaction](Readable.md#reaction)
- [subscribe](Readable.md#subscribe)

## Properties

### value

• `Readonly` **value**: `T`

#### Defined in

[packages/fastboard-core/src/utils/store.ts:11](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L11)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Disposable](Disposable.md).[dispose](Disposable.md#dispose)

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

#### Defined in

[packages/fastboard-core/src/utils/store.ts:13](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L13)

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

[packages/fastboard-core/src/utils/store.ts:12](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/utils/store.ts#L12)
