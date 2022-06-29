## @netless/fastboard-core

A tiny wrapper of white-web-sdk and @netless/window-manager.

Used by [@netless/fastboard-ui](https://github.com/netless-io/fastboard/tree/main/packages/fastboard-ui).

### Usage

> **Warning**: This package is not intended to be used directly. You should use @netless/fastboard or @netless/fastboard-react instead.

```ts
import { FastboardApp } from "@netless/fastboard-core";

let sdk = new WhiteWebSdk();
let room = await sdk.joinRoom({ hotKeys });
let manager = await WindowManager.mount(room);
let syncedStore = await SyncedStorePlugin.init(room);

let app = new FastboardApp(sdk, room, manager, syncedStore, hotKeys);

// reactive values
app.writable.subscribe(w => console.log(w ? "room is writable" : "room is readonly"));

// methods
await app.insertImage("https://url/to/image.png");

// requires @netless/app-slide to be registered
await app.insertDocs("filename.pptx", conversionResponse);

// quit
await app.destroy();
```

### Advanced Usage

```ts
import { addRoomListener } from "@netless/fastboard-core";

const stopListen = addRoomListener(room, "onKeyDown", event => {
  console.log("keydown", event.key);
  stopListen();
});

import { createVal } from "@netless/fastboard-core";

const writable = createVal(
  // initial value
  room.isWritable,
  // setup listener, returns a cleanup function to stop listening
  set => addRoomListener(room, "onEnableWriteNowChanged", () => set(room.isWritable)),
  // optional setter
  newValue => room.setWritable(newValue)
);

writable.value; // true
writable.subscribe(w => console.log(w ? "room is writable" : "room is readonly"));
// change the value and invoke subs,
// if provided setter, this function will not change inner value directly, instead it calls the setter
writable.set(true);
writable.dispose(); // stop listening

// hacking, should not be used
writable.subs.forEach(f => f(writable.value)); // subs: Set<Subscriber>
writable.subs.clear(); // remove all subs
writable.value = false; // no trigger subs, but did change value
```

### License

MIT @ [netless](https://github.com/netless-io)
