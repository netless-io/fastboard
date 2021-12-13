/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Room, RoomState } from "white-web-sdk";
import { callbacks, trigger } from "./room-callbacks";

export const room = {
  callbacks,
  trigger,
  undo() {
    console.log("[room.undo]");
    return 1;
  },
  redo() {
    console.log("[room.redo]");
    return 1;
  },
  isWritable: false,
  state: {
    sceneState: {
      contextPath: "",
      index: 0,
      sceneName: "a",
      scenePath: "/init",
      scenes: [
        { name: "/init/1" },
        { name: "/init/2" },
        { name: "/init/3" },
        { name: "/init/4" },
        { name: "/init/5" },
        { name: "/init/6" },
      ],
    },
  } as Partial<RoomState> as RoomState,
} as Partial<Room> as Room;

export { trigger };
