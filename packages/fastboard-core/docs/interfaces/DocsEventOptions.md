[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / DocsEventOptions

# Interface: DocsEventOptions

## Table of contents

### Properties

- [appId](DocsEventOptions.md#appid)
- [page](DocsEventOptions.md#page)

## Properties

### appId

• `Optional` **appId**: `string`

If provided, will dispatch to the specific app. Default to the focused app.

#### Defined in

[packages/fastboard-core/src/helpers/docs.ts:6](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/helpers/docs.ts#L6)

___

### page

• `Optional` **page**: `number`

Used by `jumpToPage` event, range from 1 to total pages count.

#### Defined in

[packages/fastboard-core/src/helpers/docs.ts:8](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/helpers/docs.ts#L8)
