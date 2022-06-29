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

[packages/fastboard-core/src/impl/FastboardPlayer.ts:174](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L174)

___

### netlessApps

• `Optional` **netlessApps**: [`NetlessApp`](NetlessApp.md)<`any`, `any`, `any`, `any`\>[]

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:175](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L175)

___

### replayRoom

• **replayRoom**: `Omit`<`ReplayRoomParams`, ``"useMultiViews"``\> & { `callbacks?`: `Partial`<`PlayerCallbacks`\>  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:171](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L171)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:168](https://github.com/netless-io/fastboard/blob/a90ccd5/packages/fastboard-core/src/impl/FastboardPlayer.ts#L168)
