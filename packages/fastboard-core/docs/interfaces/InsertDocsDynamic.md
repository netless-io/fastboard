[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / InsertDocsDynamic

# Interface: InsertDocsDynamic

Params for slides, they are rendered in @netless/app-slide with animations.

## Table of contents

### Properties

- [fileType](InsertDocsDynamic.md#filetype)
- [scenePath](InsertDocsDynamic.md#scenepath)
- [scenes](InsertDocsDynamic.md#scenes)
- [taskId](InsertDocsDynamic.md#taskid)
- [title](InsertDocsDynamic.md#title)
- [url](InsertDocsDynamic.md#url)

## Properties

### fileType

• `Readonly` **fileType**: ``"pptx"``

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:141](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L141)

___

### scenePath

• `Readonly` **scenePath**: `string`

Unique string for binding whiteboard view to the doc. Must start with `/`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:143](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L143)

___

### scenes

• `Optional` `Readonly` **scenes**: [`SceneDefinition`](../modules.md#scenedefinition)[]

**`Example`**

```ts
[{ name: '1' }, { name: '2' }, { name: '3' }]
```

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:151](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L151)

___

### taskId

• `Readonly` **taskId**: `string`

Conversion task id, see https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:145](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L145)

___

### title

• `Optional` `Readonly` **title**: `string`

Window title.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:147](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L147)

___

### url

• `Optional` `Readonly` **url**: `string`

Where the slide resource placed.

**`Default`**

`https://convertcdn.netless.link/dynamicConvert`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:149](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L149)
