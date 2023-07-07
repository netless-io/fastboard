[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardReplayOptions

# Interface: FastboardReplayOptions

## Table of contents

### Properties

- [managerConfig](FastboardReplayOptions.md#managerconfig)
- [netlessApps](FastboardReplayOptions.md#netlessapps)
- [replayRoom](FastboardReplayOptions.md#replayroom)
- [sdkConfig](FastboardReplayOptions.md#sdkconfig)

## Properties

### managerConfig

• `Optional` **managerConfig**: `Omit`<[`MountParams`](../modules.md#mountparams), ``"room"``\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:199](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardPlayer.ts#L199)

___

### netlessApps

• `Optional` **netlessApps**: [`NetlessApp`](NetlessApp.md)<`any`, `any`, `any`, `any`\>[]

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:200](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardPlayer.ts#L200)

___

### replayRoom

• **replayRoom**: `Omit`<`ReplayRoomParams`, ``"useMultiViews"``\> & { `callbacks?`: `Partial`<`PlayerCallbacks`\>  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:196](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardPlayer.ts#L196)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:193](https://github.com/netless-io/fastboard/blob/1326312/packages/fastboard-core/src/impl/FastboardPlayer.ts#L193)
