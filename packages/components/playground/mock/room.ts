/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Room } from "white-web-sdk";
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
} as Partial<Room> as Room;

export { trigger };
