# @netless/fastboard

[Docs](./docs/en/) | [Sandbox](https://codesandbox.io/s/vanilla-fastboard-example-trns09?file=/src/index.ts) | [中文](./README-zh.md)

A starter library for making whiteboard web app, based on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk), [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager) and [netless-app](https://github.com/netless-io/netless-app).

<img src="https://user-images.githubusercontent.com/8097890/165052277-f0bc1fba-c261-44a8-8219-cd7832ee3091.jpg" align="center">

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Customization](#customization)

## Install

<pre class="language-bash">
npm add <b>@netless/fastboard</b> @netless/window-manager white-web-sdk
</pre>

> **Note:** `@netless/window-manager` and `white-web-sdk` are **peerDependencies**.

## Usage

### Vanilla JavaScript

```js
import { createFastboard, createUI } from "@netless/fastboard";

async function main() {
  const fastboard = await createFastboard({
    // [1]
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "us-sv", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "eu"
    },
    // [2]
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
      // (optional)
      userPayload: {
        nickName: "foo",
      },
    },
    // [3] (optional)
    managerConfig: {
      cursor: true,
    },
    // [4] (optional)
    netlessApps: [],
  });

  const container = createContainer();

  const ui = createUI(fastboard, container);

  // .....

  // destroy Fastboard UI
  ui.destroy();

  // .....

  // destroy Fastboard (disconnect from the whiteboard room)
  fastboard.destroy();
}

function createContainer() {
  const container = document.createElement("div");
  // Must give it a visible size
  Object.assign(container.style, {
    height: "400px",
    border: "1px solid",
    background: "#f1f2f3",
  });
  document.body.appendChild(container);
  return container;
}

main().catch(console.error);
```

<samp>[1]</samp> Read more about the SDK config at [Construct WhiteWebSDK object](https://developer.netless.link/javascript-en/home/construct-white-web-sdk)\
<samp>[2]</samp> Read more about join room config at [Construct Room and Player objects](https://developer.netless.link/javascript-en/home/construct-room-and-player)\
<samp>[3]</samp> Read more about WindowManager config at [WindowManager.mount()](https://github.com/netless-io/window-manager/blob/master/docs/api.md#mount)

### React

Install `@netless/fastboard-react`, use the `<Fastboard />` component.

<pre class="language-bash">
npm add <b>@netless/fastboard-react</b> @netless/window-manager white-web-sdk react react-dom
</pre>

```jsx
import { useFastboard, Fastboard } from "@netless/fastboard-react";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  const fastboard = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "us-sv", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "eu"
    },
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
  }));

  // Container must have a visible size
  return (
    <div
      style={{
        height: "400px",
        border: "1px solid",
        background: "#f1f2f3",
      }}
    >
      <Fastboard app={fastboard} />
    </div>
  );
}

createRoot(document.getElementById("app")).render(<App />);
```

### Whiteboard Functions

#### Insert Picture

```js
await fastboard.insertImage(fileUrl);
```

The `fileUrl` is the url to load the image file, like "src" in `<img src>`.
Fastboard itself does not contain any logic about upload/save a file.

#### Redo & Undo

```js
fastboard.undo();
fastboard.redo();
```

#### Move Camera

```js
fastboard.moveCamera({ centerX: 0, centerY: 0, scale: 1 });
fastboard.moveCameraToContain({ originX: -300, originY: -200, width: 600, height: 400 });
```

#### Set Tool

```js
fastboard.setAppliance("pencil");
fastboard.setAppliance("shape", "triangle");
fastboard.setStrokeWidth(2);
fastboard.setStrokeColor([r, g, b]);
```

### Netless Apps

#### Register & Insert Apps

Except for built-in apps in Fastboard, you can also insert your own apps. To do that,
You have to register app at each client before entering room (`createFastboard`):

```js
import { register } from "@netless/fastboard";
import MyApp from "my-app";

register({ kind: MyApp.kind, src: MyApp });
```

Or you can set `netlessApps` in `createFastboard` config:

```js
createFastboard({
  ..., // other config
  netlessApps: [MyApp],
});
```

Then add app into the room via:

```js
fastboard.manager.addApp({ kind: MyApp.kind });
```

[Read more about Netless Apps.](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md)

#### Insert PDF, PPT and PPTX

```js
// insert PDF/PPT/PPTX to the main whiteboard
const appId = await fastboard.insertDocs("filename.pptx", conversionResponse);
```

The `conversionResponse` is the result of [this api](https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress).

> **Note**: If you're using the new [projector](https://developer.netless.link/server-zh/home/server-projector) api, there's another way:
>
> ```js
> const appId1 = await fastboard.insertDocs({
>   fileType: "pdf",
>   scenePath: `/pdf/${response.uuid}`,
>   scenes: [
>     { name: "1", ppt: { width: 714, height: 1010, src: images[1].url } },
>     { name: "2", ppt: { width: 714, height: 1010, src: images[2].url } },
>   ],
>   title: "filename.pdf",
> });
>
> const appId2 = await fastboard.insertDocs({
>   fileType: "pptx",
>   scenePath: `/pptx/${response.uuid}`,
>   taskId: response.uuid,
>   title: "filename.pptx",
>   // "https://convertcdn.netless.link/dynamicConvert" by default
>   url: response.prefix,
> });
> ```

#### Listen PDF/PPTX Page Change Event

> **Note:** This feature requires the following versions of dependencies:
>
> - `@netless/app-slide` &ge; 0.2.50
> - `@netless/window-manager` &ge; 0.4.66

```js
// For static documents i.e. PDF files
const dispose = fastboard.manager.onAppEvent("DocsViewer", event => {
  if (event.type === "pageStateChange") console.log(event.value);
});
// For dynamic documents i.e. PPTX files
const dispose = fastboard.manager.onAppEvent("Slide", console.log);

onExitRoom(() => dispose());
```

The `event` above will be like:

```json
{
  "kind": "Slide",
  "appId": "Slide-aa1840ba",
  "type": "pageStateChange",
  "value": {
    "index": 0,
    "length": 12
  }
}
```

The `dispose` above is a function to stop listening.

#### Control the PDF/PPTX Apps

```js
import { dispatchDocsEvent } from "@netless/fastboard";

dispatchDocsEvent(fastboard, "nextPage"); // prevPage, nextStep, prevStep
dispatchDocsEvent(fastboard, "jumpToPage", { page: 2 });
```

By default it will dispatch event to the focused PDF/PPTX app, you can also specify the appId:

```js
dispatchDocsEvent(fastboard, "nextPage", { appId });
```

#### Set PPTX Render Options

```js
import { register, SlideApp, addSlideHooks } from "@netless/fastboard";

register({
  kind: SlideApp.kind,
  src: SlideApp,
  appOptions: {
    // ... your slide options here
    // Note: import type {SlideOptions} to get type hints
  },
  addHooks: addSlideHooks,
});
```

[Read more about these options.](https://developer.netless.link/faq-zh/home/slide-render-options)

#### Insert Video & Audio

```js
const appId = await fastboard.insertMedia("filename.mp3", fileUrl);
```

The `fileUrl` is the url to load the media file, like "src" in `<video src>`.
Fastboard itself does not contain any logic about upload/save a file.

#### Insert [@netless/app-monaco](https://github.com/netless-io/netless-app/tree/master/packages/app-monaco)

```js
const appId = await fastboard.manager.addApp({
  kind: "Monaco",
  options: { title: "Code Editor" },
});
```

#### Insert [@netless/app-countdown](https://github.com/netless-io/netless-app/tree/master/packages/app-countdown)

```js
const appId = await fastboard.manager.addApp({
  kind: "Countdown",
  options: { title: "Countdown" },
});
```

#### Insert [@netless/app-geogebra](https://github.com/netless-io/netless-app/tree/master/packages/app-geogebra)

```js
const appId = await fastboard.manager.addApp({
  kind: "GeoGebra",
  options: { title: "GeoGebra" },
});
```

#### Insert [@netless/app-plyr](https://github.com/netless-io/netless-app/tree/master/packages/app-plyr)

```js
const appId = await fastboard.manager.addApp({
  kind: "Plyr",
  options: { title: "YouTube" },
  attributes: {
    src: "https://www.youtube.com/embed/bTqVqk7FSmY",
    provider: "youtube",
  },
});
```

#### Insert [@netless/app-embedded-page](https://github.com/netless-io/netless-app/tree/master/packages/app-embedded-page)

```js
const appId = await fastboard.manager.addApp({
  kind: "EmbeddedPage",
  options: { title: "Google Docs" },
  attributes: {
    src: "https://docs.google.com/document/d/1bd4SRb5BmTUjPGrFxU2V7KI2g_mQ-HQUBxKTxsEn5e4/edit?usp=sharing",
  },
});
```

> **Note:** EmbeddedPage uses [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) to display external web resources, you'd better not embedding 2 more nested iframes (i.e. webpage>iframe1>iframe2) in the same page.

More apps goto [netless-app](#https://github.com/netless-io/netless-app).

## Customization

Fastboard isn't that customizable due to its <q>fast</q> design goal.
You may find it hard to add buttons to the toolbar or move the toolbar to another place.
In which case, you can **hide the unwanted parts and write your own**:

```jsx
// vanilla js
const ui = createUI(fastboard, container);
ui.update({ config: { toolbar: { enable: false } } });

// react
return (
  <>
    <Fastboard app={fastboard} config={{ toolbar: { enable: false } }} />
    <YourOwnUIComponent />
  </>
);
```

Then refer to the doc: [Write Your Own UI (for Fastboard)](./docs/en/ui.md).

## Error Handling

You will get callbacks when:

- Cannot connect to server at the very beginning
- Connecting status changed (to `reconnecting` or `disconnected`)
- Kicked from room (when the room is banned from the backend)

Note that Fastboard will reconnect automatically internally, you only have to do things below to ensure the user experience.

To properly handle these cases, please refer to this piece of code:

```js
try {
  fastboard = await createFastboard({
    sdkConfig: {
      onWhiteSetupFailed(error) {
        console.error("Failed to find the whiteboard server", error);
      },
    },
    joinRoom: {
      callbacks: {
        onPhaseChanged(phase) {
          if (phase === "reconnecting") console.log("Whiteboard connection lost, reconnecting...");
        },
        onDisconnectWithError(error) {
          console.error("Failed to connect to whiteboard server");
        },
        onKickedWithReason(reason) {
          console.log("You're kicked by", reason);
          // Properly close this room
          leaveRoom();
        },
      },
    },
  });
} catch (error) {
  console.error("Failed to join whiteboard room", error);
}
```

## License

MIT @ [netless](https://github.com/netless-io)
