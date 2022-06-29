# @netless/fastboard

[中文](./README-zh.md) | [Sandbox](https://codesandbox.io/s/vanilla-fastboard-example-trns09?file=/src/index.ts)

A starter library for making whiteboard web app, based on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk), [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager) and [netless-app](https://github.com/netless-io/netless-app).

<img src="https://user-images.githubusercontent.com/8097890/165052277-f0bc1fba-c261-44a8-8219-cd7832ee3091.jpg" align="center">

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API Reference](./docs/api.md)

## Install

<pre class="language-bash">
npm add <b>@netless/fastboard</b> @netless/window-manager white-web-sdk
</pre>

> **Note**: `@netless/window-manager` and `white-web-sdk` are **peerDependencies**.

## Usage

### Vanilla JavaScript

```js
import { createFastboard, createUI } from "@netless/fastboard";

async function main() {
  const fastboard = await createFastboard({
    // [1]
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "us-sv", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "gb-lon"
    },
    // [2]
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
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
      region: "us-sv", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "gb-lon"
    },
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
  }));

  return <Fastboard app={fastboard} />;
}

// The root element must have a visible size
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
const appId = fastboard.manager.addApp({ kind: MyApp.kind });
```

Once inserted, it returns an ID of the app. You can use it to close the app:

```js
fastboard.manager.closeApp(appId);
```

[Read more about Netless Apps.](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md)

#### Insert PDF, PPT and PPTX

Fastboard has built-in support for viewing [converted](https://developer.netless.link/server-en/home/server-conversion) files.

```js
// insert PDF/PPT/PPTX to the main whiteboard
const appId = await fastboard.insertDocs("filename.pptx", conversionResponse);
```

The `conversionResponse` is the result of [this api](https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress).

> **Advanced Usage**
>
> If you already knows the conversion task uuid and token, you can insert the file with:
>
> ```js
> fastboard.insertDocs({
>   fileType: "pptx", // "pdf" | "pptx"
>   scenePath: `/pptx/${taskId}`,
>   taskId: taskId,
>   title: "filename.pptx",
> });
> ```

#### Insert Video & Audio

```js
const appId = await fastboard.insertMedia("filename.mp3", fileUrl);
```

The `fileUrl` is the url to load the media file, like "src" in `<video src>`.
Fastboard itself does not contain any logic about upload/save a file.

#### Insert [@netless/app-monaco](https://github.com/netless-io/netless-app/tree/master/packages/app-monaco)

> **Note**: `@netless/app-monaco` is not installed by default, you have to install and register it before using this app.
>
> ```js
> import { register } from "@netless/fastboard";
> register({ kind: "Monaco", src: () => import("@netless/app-monaco") });
> ```

```js
const appId = await fastboard.manager.addApp({
  kind: "Monaco",
  options: { title: "Code Editor" },
});
```

#### Insert [@netless/app-countdown](https://github.com/netless-io/netless-app/tree/master/packages/app-countdown)

> **Note**: `@netless/app-countdown` is not installed by default, you have to install and register it before using this app.
>
> ```js
> import { register } from "@netless/fastboard";
> register({ kind: "Countdown", src: () => import("@netless/app-countdown") });
> ```

```js
const appId = await fastboard.manager.addApp({
  kind: "Countdown",
  options: { title: "Countdown" },
});
```

#### Insert [@netless/app-geogebra](https://github.com/netless-io/netless-app/tree/master/packages/app-geogebra)

> **Note**: `@netless/app-geogebra` is not installed by default, you have to install and register it before using this app.
>
> ```js
> import { register } from "@netless/fastboard";
> register({ kind: "GeoGebra", src: () => import("@netless/app-geogebra") });
> ```

```js
const appId = await fastboard.manager.addApp({
  kind: "GeoGebra",
  options: { title: "GeoGebra" },
});
```

#### Insert [@netless/app-plyr](https://github.com/netless-io/netless-app/tree/master/packages/app-plyr)

> **Note**: `@netless/app-plyr` is not installed by default, you have to install and register it before using this app.
>
> ```js
> import { register } from "@netless/fastboard";
> register({ kind: "Plyr", src: () => import("@netless/app-plyr") });
> ```

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

> **Note**: `@netless/app-embedded-page` is not installed by default, you have to install and register it before using this app.
>
> ```js
> import { register } from "@netless/fastboard";
> register({ kind: "EmbeddedPage", src: () => import("@netless/app-embedded-page") });
> ```

```js
const appId = await fastboard.manager.addApp({
  kind: "EmbeddedPage",
  options: { title: "Google Docs" },
  attributes: {
    src: "https://docs.google.com/document/d/1bd4SRb5BmTUjPGrFxU2V7KI2g_mQ-HQUBxKTxsEn5e4/edit?usp=sharing",
  },
});
```

> **Note**: EmbeddedPage uses [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) to display external web resources, you'd better not embedding 2 more nested iframes (i.e. webpage>iframe1>iframe2) in the same page.

More apps goto [netless-app](#https://github.com/netless-io/netless-app).

## License

MIT @ [netless](https://github.com/netless-io)
