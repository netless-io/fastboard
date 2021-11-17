import { createWhiteboardApp } from "../src";
import { createRoom, getUID } from "./common";

const { VITE_APPID, VITE_TOKEN, VITE_ROOM_UUID, VITE_ROOM_TOKEN } = import.meta.env;

if (!VITE_APPID) {
  throw new Error("VITE_APPID is not defined");
}

async function prepare(): Promise<{ uuid: string; roomToken: string }> {
  let uuid: string | undefined;
  let roomToken: string | undefined;

  const query = new URLSearchParams(location.search);
  if (query.has("uuid") && query.has("roomToken")) {
    uuid = query.get("uuid")!;
    roomToken = query.get("roomToken")!;
  }

  if (!uuid || !roomToken) {
    const room = JSON.parse(localStorage.getItem("room") || "{}");
    if (room.uuid && room.roomToken) {
      ({ uuid, roomToken } = room);
    }
  }

  if (!uuid || !roomToken) {
    uuid = VITE_ROOM_UUID;
    roomToken = VITE_ROOM_TOKEN;
  }

  if ((!uuid || !roomToken) && VITE_TOKEN) {
    const shouldCreateRoom = window.confirm(
      "Not found uuid/roomToken both in query and localStorage and env, create one?"
    );
    if (shouldCreateRoom) {
      ({ uuid, roomToken } = await createRoom());
    }
  }

  if (!uuid || !roomToken) {
    throw new Error("Not found uuid/roomToken both in query and localStorage and env.");
  }

  return { uuid, roomToken };
}

prepare().then(({ uuid, roomToken }) => {
  let app = createWhiteboardApp({
    target: document.getElementById("app")!,
    appIdentifier: VITE_APPID,
    joinRoom: {
      uid: getUID(),
      uuid,
      roomToken,
    },
  });
  Object.assign(window, { app });
});
