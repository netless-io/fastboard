import type { ApplianceNames } from "white-web-sdk";

export type { Diff, DiffOne, Storage, SyncedStore } from "@netless/synced-store";
export type {
  AddPageParams,
  MountParams,
  NetlessApp,
  PublicEvent,
  WindowManager,
  PageState,
} from "@netless/window-manager";
export type {
  AnimationMode,
  ApplianceNames,
  Camera,
  CameraState,
  Color,
  ConversionResponse,
  ConvertedFile,
  HotKey,
  HotKeys,
  JoinRoomParams,
  MemberState,
  Player,
  PlayerCallbacks,
  PlayerPhase,
  PlayerSeekingResult,
  PlayerState,
  Rectangle,
  ReplayRoomParams,
  Room,
  RoomCallbacks,
  RoomPhase,
  RoomState,
  SceneDefinition,
  ShapeType,
  View,
  ViewCallbacks,
  WhiteWebSdk,
  WhiteWebSdkConfiguration,
} from "white-web-sdk";

export type Appliance = `${ApplianceNames}`;
