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

[packages/fastboard-core/src/impl/FastboardApp.ts:86](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L86)

___

### scenePath

• `Readonly` **scenePath**: `string`

Unique string for binding whiteboard view to the doc. Must start with `/`.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:88](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L88)

___

### scenes

• `Readonly` **scenes**: [`SceneDefinition`](../modules.md#scenedefinition)[]

**`Example`**

```ts
[{ name: '1', ppt: { src: 'url/to/ppt/1.png' } }]
```

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:90](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L90)

___

### title

• `Optional` `Readonly` **title**: `string`

Window title.

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:92](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L92)
