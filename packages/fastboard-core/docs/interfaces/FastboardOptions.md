[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardOptions

# Interface: FastboardOptions

## Table of contents

### Properties

- [joinRoom](FastboardOptions.md#joinroom)
- [managerConfig](FastboardOptions.md#managerconfig)
- [netlessApps](FastboardOptions.md#netlessapps)
- [sdkConfig](FastboardOptions.md#sdkconfig)

## Properties

### joinRoom

• **joinRoom**: `Omit`<[`JoinRoomParams`](../modules.md#joinroomparams), ``"useMultiViews"`` \| ``"disableNewPencil"`` \| ``"disableMagixEventDispatchLimit"``\> & { `callbacks?`: `Partial`<`Omit`<[`RoomCallbacks`](../modules.md#roomcallbacks), ``"onCanUndoStepsUpdate"`` \| ``"onCanRedoStepsUpdate"``\>\>  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:623](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L623)

___

### managerConfig

• `Optional` **managerConfig**: `Omit`<[`MountParams`](../modules.md#mountparams), ``"room"``\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:626](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L626)

___

### netlessApps

• `Optional` **netlessApps**: [`NetlessApp`](NetlessApp.md)<`any`, `any`, `any`, `any`\>[]

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:627](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L627)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:620](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardApp.ts#L620)
