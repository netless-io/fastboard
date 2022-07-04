[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / InsertDocsStatic

# Interface: InsertDocsStatic

Params for static docs, they are rendered as many images.

## Table of contents

### Properties

- [fileType](InsertDocsStatic.md#filetype)
- [scenePath](InsertDocsStatic.md#scenepath)
- [scenes](InsertDocsStatic.md#scenes)
- [title](InsertDocsStatic.md#title)

## Properties

### fileType

• `Readonly` **fileType**: ``"pdf"``

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:121](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L121)

___

### scenePath

• `Readonly` **scenePath**: `string`

Unique string for binding whiteboard view to the doc. Must start with `/`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:123](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L123)

___

### scenes

• `Readonly` **scenes**: [`SceneDefinition`](../modules.md#scenedefinition)[]

**`Example`**

 ```ts
[{ name: '1', ppt: { src: 'url/to/ppt/1.png' } }]
```

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:125](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L125)

___

### title

• `Optional` `Readonly` **title**: `string`

Window title.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:127](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L127)
