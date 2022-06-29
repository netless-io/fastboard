[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / ProjectorResponse

# Interface: ProjectorResponse

## Table of contents

### Properties

- [convertedPercentage](ProjectorResponse.md#convertedpercentage)
- [errorCode](ProjectorResponse.md#errorcode)
- [errorMessage](ProjectorResponse.md#errormessage)
- [note](ProjectorResponse.md#note)
- [pageCount](ProjectorResponse.md#pagecount)
- [prefix](ProjectorResponse.md#prefix)
- [previews](ProjectorResponse.md#previews)
- [status](ProjectorResponse.md#status)
- [uuid](ProjectorResponse.md#uuid)

## Properties

### convertedPercentage

• **convertedPercentage**: `number`

0..100

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:114](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L114)

___

### errorCode

• **errorCode**: \`${number}\`

20xxxxx

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:123](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L123)

___

### errorMessage

• **errorMessage**: `string`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:124](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L124)

___

### note

• **note**: `string`

{prefix}/{taskId}/jsonOutput/note.json

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:121](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L121)

___

### pageCount

• **pageCount**: `number`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:117](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L117)

___

### prefix

• **prefix**: `string`

https://example.org/path/to/dynamicConvert

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:116](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L116)

___

### previews

• **previews**: `Record`<`number`, `string`\>

{1:"{prefix}/{taskId}/preview/1.png"}

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:119](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L119)

___

### status

• **status**: ``"Waiting"`` \| ``"Converting"`` \| ``"Finished"`` \| ``"Fail"``

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:112](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L112)

___

### uuid

• **uuid**: `string`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:111](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L111)
