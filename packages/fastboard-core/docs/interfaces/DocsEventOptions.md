[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / DocsEventOptions

# Interface: DocsEventOptions

## Table of contents

### Properties

- [page](DocsEventOptions.md#page)
- [scale](DocsEventOptions.md#scale)
- [target](DocsEventOptions.md#target)
- [appId](DocsEventOptions.md#appid)

## Properties

### appId

• `Optional` **appId**: `string`

Deprecated alias for `target`.

___

### page

• `Optional` **page**: `number`

Used by `jumpToPage` event, range from 1 to total pages count.

#### Defined in

[packages/fastboard-core/src/helpers/docs.ts:8](https://github.com/netless-io/fastboard/blob/c9ccce0/packages/fastboard-core/src/helpers/docs.ts#L8)

___

### scale

• `Optional` **scale**: `number`

Used by `scalePage`. Relative to fitted size; `1` means fitted size.

#### Defined in

[packages/fastboard-core/src/helpers/docs.ts:10](https://github.com/netless-io/fastboard/blob/c9ccce0/packages/fastboard-core/src/helpers/docs.ts#L10)

___

### target

• `Optional` **target**: `string`

`mainView` or a concrete appId. Defaults to the focused app, then mainView.

#### Defined in

[packages/fastboard-core/src/helpers/docs.ts:6](https://github.com/netless-io/fastboard/blob/c9ccce0/packages/fastboard-core/src/helpers/docs.ts#L6)
