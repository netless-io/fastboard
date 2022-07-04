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

[packages/fastboard-core/src/impl/FastboardApp.ts:553](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L553)

___

### managerConfig

• `Optional` **managerConfig**: `Omit`<[`MountParams`](../modules.md#mountparams), ``"room"``\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:556](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L556)

___

### netlessApps

• `Optional` **netlessApps**: [`NetlessApp`](NetlessApp.md)<`any`, `any`, `any`, `any`\>[]

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:557](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L557)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardApp.ts:550](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardApp.ts#L550)
