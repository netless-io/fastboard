## Migration Guide from `white-web-sdk`

If you've used `white-web-sdk` before, this document will guide you to migrate to Fastboard.
**If you didn't use white-web-sdk, there's no need to read this document, please go read [README](../../README.md).**

### Notable New Features

Fastboard mainly provides these new features in comparison with white-web-sdk:

- [Multi-window Mode](https://github.com/netless-io/window-manager)
- [Netless App](https://github.com/netless-io/netless-app)
  - Several official apps based on it, including synced slides and video/audio players.

### Breaking Changes

#### UI

Fastboard integrates several built-in components including Toolbar, RedoUndo, ZoomControl and PageControl.
We believe these components suits most of the users, but you may want to implement your own UI.
To do so, you can refer to the [Write Your Own UI](./ui.md) and [API Reference](./api.md) to learn how to make that.

#### Functions

- [Entering Room](#entering-room)
- [Leaving Room](#leaving-room)
- [Control Pages](#control-pages)
- [Switch Tools](#switch-tools)
- [Insert Images](#insert-images)
- [Open Slides](#open-slides)
- [Play Audio / Video](#play-audio--video)

#### Entering Room

You can enter a room with white-web-sdk previously by:

```js
import { WhiteWebSdk } from "white-web-sdk";
// Initialize SDK
let sdk = new WhiteWebSdk({
  appIdentifier: "whiteboard-appid",
  region: "cn-hz",
});
// Enter room
let room = await sdk.joinRoom({
  uid: "unique_id_for_each_client",
  uuid: "room-uuid",
  roomToken: "NETLESSROOM_...",
});
// Render the whiteboard
room.bindHtmlElement(document.getElementById("whiteboard"));
```

In fastboard, it is changed to:

```js
import { createFastboard, createUI } from "@netless/fastboard";
let fastboard = await createFastboard({
  sdkConfig: {
    appIdentifier: "whiteboard-appid",
    region: "cn-hz",
  },
  joinRoom: {
    uid: "unique_id_for_each_client",
    uuid: "room-uuid",
    roomToken: "NETLESSROOM_...",
  },
});
let ui = createUI(fastboard, document.getElementById("whiteboard"));
```

Instead of just whiteboard, Fastboard has several built-in UI components already for you to use.
You could use the `ui` object returned by `createUI` as above to control the built-in UI,
read the [API Reference](./api.md) to learn more.

#### Leaving Room

You have to call `room.disconnect()` to exit the room:

```js
// Leaving room
await room.disconnect();
```

In Fastboard, however, you have to destroy the UI and leave the room in 2 steps:

```js
ui.destroy();
await fastboard.destroy();
```

#### Control Pages

The concept of <q>scenes tree</q> in white-web-sdk is a bit complex and it is hard to understand pages in a tree data structure.
So it has been simplified to a one-dimensional <q>pages</q> interface in Fastboard.

```js
// Add a new page right after the current page
fastboard.addPage({ after: true });
// Navigate to next page
fastboard.nextPage();
// Delete current page
fastboard.removePage();
```

The original API also allowed to set background image and slide resources of a scene.
This has been removed in Fastboard. See [how to view slides in Fastboard](#open-slides).

#### Switch Tools

Previously, all settings to tools are done with `room.setMemberState`:

```js
room.setMemberState({ currentApplianceName: "pencil" });
room.setMemberState({ currentApplianceName: "shape", shapeType: "triangle" });
room.setMemberState({ strokeWidth: 1, strokeColor: [255, 0, 0] });
```

It is now changed to several atomic methods:

```js
fastboard.setAppliance("pencil");
fastboard.setAppliance("shape", "triangle");
fastboard.setStrokeWidth(1);
fastboard.setStrokeColor([255, 0, 0]);
```

#### Insert Images

Inserting a image in white-web-sdk is a bit complicated to use 2 APIs:

```js
// Preparing to insert an image to some place, with id <uuid>.
room.insertImage({ uuid, centerX, centerY, width, height, locked: false });
// Complete inserting, set the image url of some id.
room.completeImageUpload(uuid, url);
```

It is now simplified to:

```js
fastboard.insertImage(url);
```

The position of the image is automatically calculated to the most suitable place for reading and annotating.

#### Open Slides

In white-web-sdk, slides are inserted through the scenes API, which in practice we have found to be inconvenient in the following scenarios:

- Multiple slides open at the same time.
- PDF files are more easy to read in continuous scrolling rather than in pages.

In Fastboard, we use Netless App to represent slides, and you can insert them as follows:

```js
fastboard.insertDocs(title, response);
// e.g.
fastboard.insertDocs("hello.pdf", {
  uuid: "",
  type: "dynamic",
  status: "Finished",
  failedReason: "",
  progress: {
    /* ... */
  },
});
```

The `response` is the response object of [our converting service](https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress).

#### Play Audio / Video

```js
fastboard.insertMedia(title, url);
// e.g.
fastboard.insertMedia("hello.mp3", "https://example.org/hello.mp3");
```
