[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardOptions

# Interface: FastboardOptions

## Table of contents

### Properties

- [joinRoom](FastboardOptions.md#joinroom)
- [managerConfig](FastboardOptions.md#managerconfig)
- [sdkConfig](FastboardOptions.md#sdkconfig)

## Properties

### joinRoom

• **joinRoom**: `Omit`<[`JoinRoomParams`](../modules.md#joinroomparams), ``"useMultiViews"`` \| ``"disableNewPencil"`` \| ``"disableMagixEventDispatchLimit"``\> & { `callbacks?`: `Partial`<[`RoomCallbacks`](../modules.md#roomcallbacks)\>  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:549](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardApp.ts#L549)

___

### managerConfig

• `Optional` **managerConfig**: `Omit`<[`MountParams`](../modules.md#mountparams), ``"room"``\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:552](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardApp.ts#L552)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:546](https://github.com/netless-io/fastboard/blob/7fdd876/packages/fastboard-core/src/impl/FastboardApp.ts#L546)
