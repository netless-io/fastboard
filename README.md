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
  sdkConfig: {
    appIdentifier: "whiteboard-appid",
  },
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
# upgrade dependencies
pnpm up -Lir
# install dependency to some package
pnpm add [-D] svelte --filter playground
# run scripts
pnpm build --filter components
```

## License

MIT @ [netless](https://github.com/netless-io)
