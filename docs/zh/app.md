## 如何开发自定义窗口插件 Netless App

### 目录

> [!NOTE]
> 请使用 GitHub 左上角/右上角的导航按钮来查看目录。

### 注册与使用

窗口插件<q>Netless App</q>本质上是一个实现了特定接口的 JavaScript 对象，只要满足接口规范就可以使用 [`Windowmanager.register()`](https://github.com/netless-io/window-manager/blob/master/docs/api.md#register) 注册并使用 [`manager.addApp()`](https://github.com/netless-io/window-manager/blob/master/docs/api.md#addApp) 插入到白板房间里，这个插入动作是同步且持久化的，因此你的插件在其他客户端或者刷新页面后也不会消失。

这个接口长这样:

```ts
interface NetlessApp {
  kind: string;
  config?: AppConfig;
  setup(context: AppContext): any;
}
```

因此，一个最小定义的 Netless App 只需要填写一个 `kind`:

```js
const MyApp = {
  kind: "MyApp",
  setup() {},
};
```

在进入房间前注册:

```js
import { register } from "@netless/fastboard";

register({
  kind: "MyApp",
  src: MyApp,
});
```

在房间内插入:

> [!NOTE]
> 你需要有可写 ([`isWritable`](https://developer.netless.link/javascript-zh/home/construct-room-and-player#iswritable): true) 权限才能插入窗口插件。

```js
fastboard.manager.addApp({ kind: "MyApp" });
```

#### `register()` 参考

```js
register({
  kind: "MyApp",
  // 满足 NetlessApp 接口的对象, 或者可以通过 <script> 标签加载的脚本地址
  src: MyApp,
  // 传给 MyApp 的本地配置, 可以用 context.getAppOptions() 获取
  appOptions: {},
});
```

#### `addApp()` 参考

```js
fastboard.manager.addApp({
  kind: "MyApp",
  // 如果这个 app 可以被动态加载, 可以通过这个参数同步给其他客户端
  src: "url/to/my-app.js",
  options: {
    // 窗口的标题
    title: "My App",
    // 默认挂载一块白板并设置白板的路径, 可以用 context.getInitScenePath() 获取
    scenePath: "/my-app-path",
  },
  // 默认同步状态, 可以用 context.storage 读取以及修改
  attributes: {},
});
```

#### 在移动端 SDK 里注册和使用

由于[移动端 SDK](https://github.com/netless-io/whiteboard-bridge) 只会打包官方插件，因此如果想要在移动端注册一样的插件，需要你自己下载各端 SDK 的源码进行修改和编译/打包。

### 开发插件

让我们回到开头那个最小的例子，当你插入它时，画面上出现了一个空白的窗口。

#### 自定义窗口内容

`getBox()` 会返回一个对象用于控制窗口内容，详见 [API 参考](#api-参考) 里的 `ReadonlyTeleBox`。

```ts
import type { NetlessApp } from "@netless/fastboard";

const MyApp: NetlessApp = {
  kind: "MyApp",
  setup(context) {
    const box = context.getBox();
    // 挂载自定义样式
    box.mountStyles(`.my-app { color: red }`);
    // 挂载自定义元素
    box.mountContent(Object.assign(document.createElement("h1"), { textContent: "Hello, world!" }));
  },
};
```

#### 状态同步

`createStorage(name, defaultState)` 会返回一个对象用于进行状态同步，详见 [API 参考](#api-参考) 里的 `Storage`。

```ts
const App: NetlessApp = {
  kind: "MyApp",
  setup(context) {
    const counter$ = context.createStorage("counter", { count: 1 });
    console.log(counter$.state.count); // 1

    // 监听状态变更
    counter$.addStateChangedListener(diff => {
      if (diff.count) console.log(diff.count.oldValue, "->", diff.count.newValue);
    });

    // 写入新状态
    if (context.getIsWritable()) {
      counter$.setState({
        count: 2,
        disabled: true,
        // 注意: setState() 只会进行浅比较, 这里 `sea` 被 `===` 比较判定为不同
        sea: { a: 1, b: false },
      });
    }
  },
};
```

#### 广播事件

`dispatchMagixEvent(name, payload)` 可以用来发送全局广播事件。

```ts
const App: NetlessApp = {
  kind: "MyApp",
  setup(context) {
    context.addMagixEventListener("my-event", event => {
      // 判断发送者不是自己
      if (event.authorId !== context.getDisplayer().observerId) {
        console.log(event.payload); // 1
      }
    });
    context.dispatchMagixEvent("my-event", 1);
  },
};
```

#### 关闭窗口时的清理工作

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

### API 参考

```ts
interface AppConfig {
  // 初始化窗口宽度, 0~1, 默认为 0.5
  width?: number;
  // 初始化窗口高度, 0~1, 默认为 0.5
  height?: number;
  // 窗口最小宽度, 0~1, 默认为 340 / 720
  minwidth?: number;
  // 窗口最小高度, 0~1, 默认为 340 / 720
  minheight?: number;
  // 是否单例 (只允许整个房间创建一个该 App), 默认为 false
  singleton?: boolean;
}

interface AppContext {
  // 当前窗口的唯一 ID, 格式为 {kind}-{hash}
  readonly appId: string;
  // 一些状态变更事件, 如关闭、获得焦点等
  readonly emitter: AppEmitter;
  // 是否是当前用户刚插入的, 可以在这里进行一些初始化操作
  readonly isAddApp: boolean;
  // 是否在回放中, 和只读不同的是, 回放时存在 seek 行为, 可能会让事件和状态发生意想不到的变化
  readonly isReplay: boolean;
  // 控制窗口内容
  getBox(): ReadonlyTeleBox;
  // 状态同步
  createStorage(name: string, defaultState?: {}): Storage;
  // 广播事件
  // 只有在可写 context.getIsWritable() 为 true 时才能调用
  dispatchMagixEvent(name: string, payload?: any): void;
  // 监听事件, 返回一个取消监听的函数
  addMagixEventListener(name: string, handler: (event: MagixEvent) => void): () => void;
  // 获取当前房间实例, room 是在线房间, player 是回放
  getDisplayer(): Room | Player;
  // 向窗口顶部挂载一块白板, 调用后 getView() 会返回这个白板的实例
  mountView(dom: HTMLElement): void;
  // 获取白板实例, 如果插入时传入了 scenePath 参数, 会自动在窗口上贴一块白板
  getView(): View | undefined;
}

interface ReadonlyTeleBox {
  // 窗口相对白板的宽, 0~1
  readonly width: number;
  // 窗口相对白板的高, 0~1
  readonly height: number;
  // 当前窗口是否处于焦点
  readonly focus: boolean;
  // 当前是否只读, 此时不能调用状态同步和广播事件接口
  readonly readonly: boolean;
  // 一些状态变更事件, 如只读、主题等
  readonly events: TeleBoxEvents;
  // 挂载样式
  mountStyles(style: string | HTMLStyleElement): void;
  // 挂载窗口内容元素
  mountContent(content: HTMLElement): void;
  // 挂载窗口底栏
  mountFooter(content: HTMLElement): void;
}

interface Storage {
  // 当前状态, 如果你熟悉 React state 的概念会很好理解
  readonly state: Record<string, any>;
  // 写入新状态, 会对每个 key-value 进行浅比较, 当 value 为 undefined 时表示删除
  // 只有在可写 context.getIsWritable() 为 true 时才能调用
  setState(state: Record<string, any>): void;
  // 监听状态变更, diff 的格式为 { [key]: { oldValue, newValue } }
  // 返回一个取消监听的函数
  addStateChangedListener(handler: (diff: Diff) => void): () => void;
}

interface MagixEvent {
  // 事件名, 例如 "my-event"
  readonly event: string;
  // 事件内容
  readonly payload: any;
  // 发送者的 session ID, 可以和 getDisplayer().observerId 进行比较判断是否是自己发的
  readonly authoId: number;
}
```

### 其他参考资料

上面的 API 参考只是一些常用的接口，更多接口请参考 TypeScript 类型定义。强烈建议阅读一下[官方插件](https://github.com/netless-io/netless-app)的源码来理解如何使用这些接口。

### 示例 App - 计数器

```ts
const Counter: NetlessApp = {
  kind: "Counter",
  setup(context) {
    // 界面 - 一个按钮
    const btn = document.createElement("button");
    context.getBox().mountContent(btn);

    // 初始化状态和界面
    const counter$ = context.createStorage("counter", { count: 0 });
    btn.textContent = "" + counter$.state.count;

    // 监听状态变化时更新界面
    const stopListen = counter$.addStateChangedListener(() => {
      btn.textContent = "" + counter$.state.count;
    });

    // 设置界面交互时修改状态
    btn.onclick = () => counter$.setState({ count: counter$.state.count + 1 });

    // 清理工作
    context.emitter.on("destroy", () => {
      stopListen();
    });
  },
};
```

### 示例 App - 计数器 React 版

```tsx
import type { Storage } from "@netless/window-manager";
import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App({ counter$ }: { counter$: Storage<{ count: number }> }) {
  const [count, setLocalCount] = useState(counter$.state.count);

  const increment = useCallback(() => {
    counter$.setState({ count: count + 1 });
  }, [count, counter$]);

  useEffect(
    () =>
      counter$.addStateChangedListener(() => {
        setLocalCount(counter$.state.count);
      }),
    [counter$]
  );

  return <button onClick={increment}>{count}</button>;
}

const Counter: NetlessApp = {
  kind: "Counter",
  setup(context) {
    const counter$ = context.createStorage("counter", { count: 0 });

    const root = createRoot(context.getBox().$content);

    root.render(<App counter$={counter$} />);

    context.emitter.on("destroy", () => {
      root.unmount();
    });
  },
};
```
