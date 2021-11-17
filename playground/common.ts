export const log = console.log.bind(console);

export const post = <T>(path: string, body: unknown): Promise<T> =>
  fetch(`https://api.netless.link/v5/${path}`, {
    method: "POST",
    headers: {
      token: import.meta.env.VITE_TOKEN,
      region: "cn-hz",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(r => r.json());

export const StorageKey = "agora-whiteboard:room";

export async function createRoom(): Promise<{ uuid: string; roomToken: string }> {
  const { uuid } = await post<{ uuid: string }>("rooms", { limit: 0, isRecord: false });
  log(`uuid = %O`, uuid);
  const roomToken = await post<string>(`tokens/rooms/${uuid}`, { lifespan: 0, role: "admin" });
  log(`roomToken = %O`, roomToken);
  const room = { uuid, roomToken };
  localStorage.setItem(StorageKey, JSON.stringify(room));
  return room;
}

export function getUID(): string {
  let uid = sessionStorage.getItem("uid");
  if (!uid) {
    uid = Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("uid", uid);
  }
  return uid;
}
