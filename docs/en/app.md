## Write you a Netless App

### Contents

> [!NOTE]
> Please use the navigation button at top-left / top-right corner on GitHub.

### Register and Add App

<q>Netless App</q> is defined as a JavaScript object with specific properties.
As long as you have satisfied the interface, you can use
[`Windowmanager.register()`][1] to register it and use [`manager.addApp()`][2]
to insert it to the whiteboard room. The insertion is synced to all clients
and the app's state is persisted. So your app will still be there even when
refreshing the page.

The `NetlessApp` interface looks like this:

```ts
interface NetlessApp {
  kind: string;
  config?: AppConfig;
  setup(context: AppContext): any;
}
```

A minimal definition of Netless App is like:

```js
const MyApp = {
  kind: "MyApp",
  setup() {},
};
```

Register it before joinning room:

```js
import { register } from "@netless/fastboard";

register({
  kind: "MyApp",
  src: MyApp,
});
```

Insert it when you're in room:

> [!NOTE]
> You will need the writer permission ([`isWritable`](): true) to insert an app.

```js
fastboard.manager.addApp({ kind: "MyApp" });
```

#### `register()`

```js
register({
  kind: "MyApp",
  // Can be an object that satisfies the NetlessApp interface,
  // or a string points to the CDN bundle of an app,
  // which should be able to be loaded by <script>.
  src: MyApp,
  // Local options passed to the app instance,
  // developers can access to this object by context.getAppOptions()
  appOptions: {},
});
```

#### `addApp()`

```js
fastboard.manager.addApp({
  kind: "MyApp",
  // A string points to the CDN bundle of an app,
  // only when you need to dyanmically register and add apps.
  // You don't have to set it if you have register()-ed it in all clients
  src: "url/to/my-app.js",
  options: {
    // The title of the added app's window
    title: "My App",
    // If set, fastboard will create a whiteboard view on it automatically,
    // developers can access to this path via context.getInitScenePath()
    scenePath: "/my-app-path",
  },
  // The initial state, synced to all clients,
  // developers can use context.storage to read and write states.
  attributes: {},
});
```

#### Register and Add App in Native SDKs (Android and iOS)

Because the [native SDK](https://github.com/netless-io/whiteboard-bridge) only
bundles with official apps. If you want to register the same custom app,
you will need to download the sources of the native SDKs and edit their codes
and compile/bundle it by yourself.

On the other hand, you can use the 'src'
<code>addApp({ <strong>src: 'url/to/my-app.js'</strong> })</code>
option to deliver your app through CDN links. In which case all clients will
try to download and install the app from the url.

### Develop Netless App

Back to the minimal case above, when you call the `addApp()` to insert it,
there will be a blank window on the screen.

#### Define the Contents of the Window

`context.getBox()` returns an object to control the contents of the window,
see the `ReadonlyTeleBox` section in [API Reference](#api-reference).

```ts
import type { NetlessApp } from "@netless/fastboard";

const MyApp: NetlessApp = {
  kind: "MyApp",
  setup(context) {
    const box = context.getBox();
    // Custom styles (will be appended to a <style> element on top of the window)
    box.mountStyles(`.my-app { color: red }`);
    // Custom contents (will be appended to the window)
    box.mountContent(Object.assign(document.createElement("h1"), { textContent: "Hello, world!" }));
  },
};
```

#### Sync States

`context.createStorage(name, defaultState)` returns an object to sync states,
see the `Storage` section in [API Reference](#api-reference).

```ts
const App: NetlessApp = {
  kind: "MyApp",
  setup(context) {
    const counter$ = context.createStorage("counter", { count: 1 });
    console.log(counter$.state.count); // 1

    // Listen to state change
    counter$.addStateChangedListener(diff => {
      if (diff.count) console.log(diff.count.oldValue, "->", diff.count.newValue);
    });

    // Write new states
    if (context.getIsWritable()) {
      counter$.setState({
        count: 2,
        disabled: true,
        // Note: setState() only does a shallow comparison
        // here the `sea` is considered changed because of `===`
        sea: { a: 1, b: false },
      });
    }
  },
};
```

#### Broadcast Messages

`context.dispatchMagixEvent(name, payload)` can be used to broadcast messages.

```ts
const App: NetlessApp = {
  kind: "MyApp",
  setup(context) {
    context.addMagixEventListener("my-event", event => {
      // If the sender is not current user
      if (event.authorId !== context.getDisplayer().observerId) {
        console.log(event.payload); // 1
      }
    });
    context.dispatchMagixEvent("my-event", 1);
  },
};
```

#### Cleanup on Window Close

```ts
const App: NetlessApp = {
  kind: "MyApp",
  setup(context) {
    context.emitter.on("destroy", () => {
      console.log(context.appId, "is closed");
    });
  },
};
```

### API Reference

```ts
interface AppConfig {
  // initial window width, 0~1, default is 0.5
  width?: number;
  // initial window height, 0~1, default is 0.5
  height?: number;
  // minimal window width, 0~1, default is 340 / 720
  minwidth?: number;
  // minimal window height, 0~1, default is 340 / 720
  minheight?: number;
  // singleton mode (only allow one app window to be created in this room), default is false
  singleton?: boolean;
}

interface AppContext {
  // unique ID of this app window, format is "{kind}-{hash}"
  readonly appId: string;
  // listen to events like window close or get focus
  readonly emitter: AppEmitter;
  // whether this app is just inserted by current user
  readonly isAddApp: boolean;
  // whether the room is in replay mode.
  // Note that it is different from the readonly mode because
  // there is a 'seek' event in replay mode, you may see events and
  // states change in a surprising way
  readonly isReplay: boolean;
  // control the window's contents
  getBox(): ReadonlyTeleBox;
  // sync states
  createStorage(name: string, defaultState?: {}): Storage;
  // broadcast messages
  // only effective when context.getIsWritable() is true
  dispatchMagixEvent(name: string, payload?: any): void;
  // listen to broadcast messages, returns a dispose function to cancel this listening
  addMagixEventListener(name: string, handler: (event: MagixEvent) => void): () => void;
  // get current whiteboard room, will be a player in replay mode
  getDisplayer(): Room | Player;
  // mount a whiteboard in some element, getView() will return something after calling this
  mountView(dom: HTMLElement): void;
  // get an object to control the whiteboard
  getView(): View | undefined;
}

interface ReadonlyTeleBox {
  // the relative width of the window to the whiteboard, 0~1
  readonly width: number;
  // the relative height of the window to the whiteboard, 0~1
  readonly height: number;
  // whether the window is in focus
  readonly focus: boolean;
  // whether in readonly mode, where you cannot set states nor send messages
  readonly readonly: boolean;
  // listen to window events like readonly mode changed or theme changed
  readonly events: TeleBoxEvents;
  // define the styles
  mountStyles(style: string | HTMLStyleElement): void;
  // define the contents
  mountContent(content: HTMLElement): void;
  // define the footer
  mountFooter(content: HTMLElement): void;
}

interface Storage {
  // Current state, which is an object like React state
  readonly state: Record<string, any>;
  // Write new states, it will compare each key-value in depth 1, like React state.
  // If you set value as undefined, it will delete the key.
  // Only effective when context.getIsWritable() is true.
  setState(state: Record<string, any>): void;
  // Listen to state changed, the 'diff' is in the form of { [key]: { oldValue, newValue } }
  // Returns a dispose function to cancel this listening
  addStateChangedListener(handler: (diff: Diff) => void): () => void;
}

interface MagixEvent {
  // Event name, e.g. "my-event"
  readonly event: string;
  // Event data, can be any JSON-serializable value
  readonly payload: any;
  // Sender's session ID, compare it with getDisplayer().observerId
  // to know whether the event is from local
  readonly authoId: number;
}
```

### Appendix

The APIs above are just frequently-used, please refer to the TypeScript
definition to learn more of them. It is highly recommended to read the sources
of [official apps](https://github.com/netless-io/netless-app) to understand
the usage of these APIs.

### Example App: Counter

```ts
const Counter: NetlessApp = {
  kind: "Counter",
  setup(context) {
    // Let's define the app's face as a button
    const btn = document.createElement("button");
    context.getBox().mountContent(btn);

    // Initialize states and contents
    const counter$ = context.createStorage("counter", { count: 0 });
    btn.textContent = "" + counter$.state.count;

    // When the state changed, update the contents
    const stopListen = counter$.addStateChangedListener(() => {
      btn.textContent = "" + counter$.state.count;
    });

    // When user clicked on the button, change the state
    btn.onclick = () => counter$.setState({ count: counter$.state.count + 1 });

    // Cleanup on window close
    context.emitter.on("destroy", () => {
      stopListen();
    });
  },
};
```

[1]: https://github.com/netless-io/window-manager/blob/master/docs/api.md#register
[2]: https://github.com/netless-io/window-manager/blob/master/docs/api.md#addApp
[3]: https://developer.netless.link/javascript-en/home/construct-room-and-player#iswritable
