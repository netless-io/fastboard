[@netless/fastboard-core](../README.md) / [Exports](../modules.md) / FastboardReplayOptions

# Interface: FastboardReplayOptions

## Table of contents

### Properties

- [managerConfig](FastboardReplayOptions.md#managerconfig)
- [replayRoom](FastboardReplayOptions.md#replayroom)
- [sdkConfig](FastboardReplayOptions.md#sdkconfig)

## Properties

### managerConfig

• `Optional` **managerConfig**: `Omit`<[`MountParams`](../modules.md#mountparams), ``"room"``\>

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:184](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardPlayer.ts#L184)

___

### replayRoom

• **replayRoom**: `Omit`<`ReplayRoomParams`, ``"useMultiViews"``\> & { `callbacks?`: `Partial`<`PlayerCallbacks`\>  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:181](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardPlayer.ts#L181)

___

### sdkConfig

• **sdkConfig**: `Omit`<[`WhiteWebSdkConfiguration`](../modules.md#whitewebsdkconfiguration), ``"useMobXState"``\> & { `region`: `string`  }

#### Defined in

[packages/fastboard-core/src/impl/FastboardPlayer.ts:178](https://github.com/netless-io/fastboard/blob/2826099/packages/fastboard-core/src/impl/FastboardPlayer.ts#L178)
