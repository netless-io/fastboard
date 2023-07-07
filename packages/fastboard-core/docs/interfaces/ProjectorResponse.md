[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / ProjectorResponse

# Interface: ProjectorResponse

## Table of contents

### Properties

- [convertedPercentage](ProjectorResponse.md#convertedpercentage)
- [errorCode](ProjectorResponse.md#errorcode)
- [errorMessage](ProjectorResponse.md#errormessage)
- [images](ProjectorResponse.md#images)
- [note](ProjectorResponse.md#note)
- [pageCount](ProjectorResponse.md#pagecount)
- [prefix](ProjectorResponse.md#prefix)
- [previews](ProjectorResponse.md#previews)
- [status](ProjectorResponse.md#status)
- [type](ProjectorResponse.md#type)
- [uuid](ProjectorResponse.md#uuid)

## Properties

### convertedPercentage

• **convertedPercentage**: `number`

0..100

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:161](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L161)

___

### errorCode

• `Optional` **errorCode**: `string`

20xxxxx

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:172](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L172)

___

### errorMessage

• `Optional` **errorMessage**: `string`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:173](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L173)

___

### images

• `Optional` **images**: `Record`<`number`, { `height`: `number` ; `url`: `string` ; `width`: `number`  }\>

{1:{width,height,url}}, only when type=static

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:170](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L170)

___

### note

• `Optional` **note**: `string`

{prefix}/{taskId}/jsonOutput/note.json

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:168](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L168)

___

### pageCount

• `Optional` **pageCount**: `number`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:164](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L164)

___

### prefix

• `Optional` **prefix**: `string`

https://example.org/path/to/dynamicConvert, only when type=dynamic

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:163](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L163)

___

### previews

• `Optional` **previews**: `Record`<`number`, `string`\>

{1:"{prefix}/{taskId}/preview/1.png"}, only when type=dynamic and preview=true

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:166](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L166)

___

### status

• **status**: ``"Waiting"`` \| ``"Converting"`` \| ``"Finished"`` \| ``"Fail"``

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:158](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L158)

___

### type

• **type**: ``"dynamic"`` \| ``"static"``

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:159](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L159)

___

### uuid

• **uuid**: `string`

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:157](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L157)
