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

[packages/fastboard-core/src/impl/FastboardApp.ts:97](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L97)

___

### scenePath

• `Readonly` **scenePath**: `string`

Unique string for binding whiteboard view to the doc. Must start with `/`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:99](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L99)

___

### scenes

• `Optional` `Readonly` **scenes**: [`SceneDefinition`](../modules.md#scenedefinition)[]

**`Example`**

```ts
[{ name: '1' }, { name: '2' }, { name: '3' }]
```

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:107](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L107)

___

### taskId

• `Readonly` **taskId**: `string`

Conversion task id, see https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:101](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L101)

___

### title

• `Optional` `Readonly` **title**: `string`

Window title.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:103](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L103)

___

### url

• `Optional` `Readonly` **url**: `string`

Where the slide resource placed.

**`Default`**

`https://convertcdn.netless.link/dynamicConvert`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:105](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L105)
