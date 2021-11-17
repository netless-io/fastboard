# agora-whiteboard-sdk

A whiteboard starter, based on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk).

## Install

```bash
npm add agora-whiteboard-sdk
```

## Usage

```js
import { createWhiteboardApp } from "agora-whiteboard-sdk";

let app = createWhiteboardApp({
  target: document.getElementById("whiteboard"),
  appIdentifier: "whiteboard-appid",
  joinRoom: {
    uid: "unique_id_for_each_client",
    uuid: "room-uuid",
    roomToken: "NETLESSROOM_...",
  },
});
```

## Develop

```bash
pnpm i
pnpm dev
```

## License

MIT @ [netless](https://github.com/netless-io)
