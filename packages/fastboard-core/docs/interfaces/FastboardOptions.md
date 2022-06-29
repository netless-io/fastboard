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

• **joinRoom**: `Omit`<[`JoinRoomParams`](../modules.md#joinroomparams), ``"useMultiViews"`` \| ``"disableNewPencil"`` \| ``"disableMagixEventDispatchLimit"``\> & { `callbacks?`: `Partial`<[`RoomCallbacks`](../modules.md#roomcallbacks)\>  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:545](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L545)

___

### managerConfig

• `Optional` **managerConfig**: `Omit`<[`MountParams`](../modules.md#mountparams), ``"room"``\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:548](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L548)

___

### netlessApps

• `Optional` **netlessApps**: [`NetlessApp`](NetlessApp.md)<`any`, `any`, `any`, `any`\>[]

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:549](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L549)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:542](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardApp.ts#L542)
