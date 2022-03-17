# @netless/fastboard

[中文](./README-zh.md) | [Sandbox Link](https://codesandbox.io/s/vanilla-fastboard-example-trns09?file=/src/index.ts)

A starter library for making whiteboard web app, based on [white-web-sdk](https://www.npmjs.com/package/white-web-sdk), [@netless/window-manager](https://www.npmjs.com/package/@netless/window-manager) and [netless-app](https://github.com/netless-io/netless-app).

<p align=center>🚧 Working in Progress 🚧</p>

## Table of Contents

- [Install](#install)
- [Usage](#usage)

## Install

<pre class="language-bash">
npm add <b>@netless/fastboard</b> @netless/window-manager white-web-sdk
</pre>

> **Note:** `@netless/window-manager` and `white-web-sdk` are **peerDependencies**.

## Usage

### Vanilla JavaScript

```js
import { createFastboard, mount } from "@netless/fastboard";

let app;
async function mountFastboard(div) {
  app = await createFastboard({
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
    // [3]
    managerConfig: {
      cursor: true,
    },
  });
  return mount(app, div);
}

mountFastboard(document.getElementById("whiteboard")).then(({ update, destroy }) => {
  // Update app
  update({ theme: "dark" });

  // Terminate app
  destroy(); // close the ui
  app.destroy(); // disconnect the whiteboard
});
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
import { createFastboard, Fastboard } from "@netless/fastboard-react";
import ReactDOM from "react-dom";

function App() {
  const [app, setApp] = useState(null);

  useEffect(() => {
    // hold the app instance in the closure.
    // you can not rely on the outer "app" because this callback is only called once.
    let app_instance;

    createFastboard({
      sdkConfig: {
        appIdentifier: "whiteboard-appid",
        region: "us-sv", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "gb-lon"
      },
      joinRoom: {
        uid: "unique_id_for_each_client",
        uuid: "room-uuid",
        roomToken: "NETLESSROOM_...",
      },
    }).then(app => {
      // save the app instance to outer "app", also hold it by itself
      setApp((app_instance = app));
    });

    // terminate the app on component unmount
    return () => {
      if (app_instance) app_instance.destroy();
    };

    // must be called only once
  }, []);

  return <Fastboard app={app} language="en" theme="dark" />;
}

ReactDOM.render(<App />, document.getElementById("app"));
```

### Whiteboard Functions

#### Insert Picture

```js
await app.insertImage(fileUrl);
```

The `fileUrl` is the url to load the image file, like "src" in `<img src>`.
Fastboard itself does not contain any logic about upload/save a file.

#### Redo & Undo

```js
app.undo();
app.redo();
```

#### Move Camera

```js
app.moveCamera({ centerX: 0, centerY: 0, scale: 1 });
app.moveCameraToContain({ originX: -300, originY: -200, width: 600, height: 400 });
```

#### Set Tool

```js
app.setAppliance("pencil");
app.setAppliance("shape", "triangle");
app.setStrokeWidth(2);
app.setStrokeColor([r, g, b]);
```

### Netless Apps

#### Insert PDF, PPT and PPTX

```js
// insert PDF/PPT/PPTX to the main whiteboard
const appId = await app.insertDocs("filename.pptx", conversionResponse);
```

The `conversionResponse` is the result of [this api](https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress).

#### Insert Video & Audio

```js
const appId = await app.insertMedia("filename.mp3", fileUrl);
```

The `fileUrl` is the url to load the media file, like "src" in `<video src>`.
Fastboard itself does not contain any logic about upload/save a file.

#### Insert [@netless/app-monaco](https://github.com/netless-io/netless-app/tree/master/packages/app-monaco)

```js
const appId = await app.insertCodeEditor();
```

#### Insert [@netless/app-countdown](https://github.com/netless-io/netless-app/tree/master/packages/app-countdown)

```js
const appId = await app.insertCountdown();
```

#### Insert [@netless/app-geogebra](https://github.com/netless-io/netless-app/tree/master/packages/app-geogebra)

```js
const appId = await app.insertGeoGebra();
```

More apps goto [netless-app](#https://github.com/netless-io/netless-app).

## License

MIT @ [netless](https://github.com/netless-io)
