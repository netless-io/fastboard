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

[packages/fastboard-core/src/impl/FastboardApp.ts:633](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L633)

___

### managerConfig

• `Optional` **managerConfig**: `Omit`<[`MountParams`](../modules.md#mountparams), ``"room"``\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:636](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L636)

___

### netlessApps

• `Optional` **netlessApps**: [`NetlessApp`](NetlessApp.md)<`any`, `any`, `any`, `any`\>[]

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:637](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L637)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:630](https://github.com/netless-io/fastboard/blob/c480e1b/packages/fastboard-core/src/impl/FastboardApp.ts#L630)
