import { createWhiteboardApp } from "../src";
import { getUID } from "./common";
import { prepare } from "./prepare";

const { VITE_APPID } = import.meta.env;

if (!VITE_APPID) {
  throw new Error("VITE_APPID is not defined");
}

prepare().then(({ uuid, roomToken }) => {
  const app = createWhiteboardApp({
    target: document.getElementById("app") as HTMLElement,
    sdkConfig: {
      appIdentifier: VITE_APPID,
    },
    joinRoom: {
      uid: getUID(),
      uuid,
      roomToken,
    },
  });
  Object.assign(window, { app });
});
