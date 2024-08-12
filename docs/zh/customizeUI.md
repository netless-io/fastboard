## 如何自定义 fastboard上的控键

Fastboard 为了上手快，**不支持**高度定制化。如果想定制自己的控键,控制参考一下的介绍

### 定制toolbar

1、首先通过uiConfig中的`enable: false` 屏蔽fastboard自带的toolbar.

```js
// vanilla js
const ui = createUI(fastboard, container);
ui.update({ config: { ...ui_config } });

// react
<Fastboard app={fastboard} config={{ ...ui_config }} />;
```

上面的 `ui_config` 长这样：

```js
{
  toolbar: { enable: false },
  redo_undo: { enable: true },
  zoom_control: { enable: true },
  page_control: { enable: true },
}
```

2、然后自己实现一套toolbar组件,并和fastboard进行关联.

```jsx
import { useFastboard, Fastboard } from "@netless/fastboard-react";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  const fastboard = useFastboard(...);
  return (
    <div
      style={{
        height: "400px",
        border: "1px solid",
        background: "#f1f2f3",
      }}
    >
      <Fastboard app={fastboard} />
      {/**  自定义toolbar */}
      <CustomToolbar />
    </div>
  );
}

createRoot(document.getElementById("app")).render(<App />);
```

或者 原生js

```js
import { createFastboard, createUI } from "@netless/fastboard";

async function main() {
  const fastboard = await createFastboard(...);
  const container = createContainer();
  const ui = createUI(fastboard, container);
  ui.update({ config: { ...ui_config } });

  // .....
  // 退出 Fastboard (从白板房间断开)
  fastboard.destroy();
}
function createContainer() {
  const container = document.createElement("div");
  // 白板元素必须具有可见的大小
  Object.assign(container.style, {
    height: "400px",
    border: "1px solid",
    background: "#f1f2f3",
  });
  document.body.appendChild(container);
  container.appendChild(createCustomToolbar());
  return container;
}
function createCustomToolbar() {
  const customToolbar = document.createEgetlement("div");
  // 自定义的toolbar逻辑
  // ·····
  return customToolbar;
}
```

3、toolbar组件上响应教具的API
[参考fastboard的toolbar组件的调用](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/Toolbar/components/Contents.svelte)

```js
    //  const app = await createFastboard(...);
    //  const app = useFastboard(...);
    //  app 为 fastboard实例

    function clicker() {
        app?.setAppliance("clicker");
    }
    // 选择器
    function selector() {
        app?.setAppliance("selector");
    }
    // 画笔
    function pencil() {
        app?.setAppliance("pencil");
    }
    // 文字
    function text() {
        app?.setAppliance("text");
    }
    // 橡皮擦
    function eraser() {
        app?.setAppliance("eraser");
    }
    // 抓手
    function hand() {
        app?.setAppliance("hand");
    }
    // 激光笔
    function laserPointer() {
        app?.setAppliance("laserPointer");
    }
    // 清空当前白板
    function clear() {
        app?.cleanCurrentScene();
    }
    declare type Color = number[];
    // 设置文字的颜色
    function setTextColor(textColor: Color) {
        app?.setTextColor(textColor);
    }
    // 铅笔线框的颜色
    function setStrokeColor(textColor: Color) {
        app?.setStrokeColor(textColor);
    }
    // 铅笔线框的粗细
    function setStrokeWidth(strokeWidth: number) {
        app?.setStrokeWidth(strokeWidth);
    }
```

### 定制其他控件

除此,我们还可以通过上面的方式定制其他控键.

```js
    {
        toolbar: { enable: false },  // 关闭toolbar 控键
        redo_undo: { enable: false }, // 关闭redo/undo 控键
        zoom_control: { enable: false }, // 关闭 缩放画布 控键
        page_control: { enable: false },  // 关闭 页码 控键
    }
```

**undo/redo**
[参考fastboard的undo/redo组件的调用](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/RedoUndo/RedoUndo.svelte)

```js
function undo() {
  app?.undo();
}

function redo() {
  app?.redo();
}
/** 获取当前可撤销做次数 */
app?.canUndoSteps;
/** 获取当前可重做次数 */
app?.canRedoSteps;
```

**zoom**
[参考fastboard的zoom组件的调用](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/ZoomControl/ZoomControl.svelte)

```js
    type Camera = {
        /**
         * 视角的中心对准的点的 x 坐标（世界坐标系）
         */
        centerX: number;
        /**
         * 视角的中心对准的点的 y 坐标（世界坐标系）
         */
        centerY: number;
        /**
         * 视角拉伸会导致物体放大缩小的倍率
         */
        scale: number;
    };
    function moveCamera(camera: Camera) {
        app?.moveCamera(camera);
    }
```

**page**
[参考fastboard的zoom组件的调用](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/PageControl/PageControl.svelte)

```js
function prevPage() {
  app?.prevPage();
}

function nextPage() {
  app?.nextPage();
}

function addPage() {
  app?.addPage({ after: true });
  app?.nextPage();
}
```

### 注意项

注意:以上api的使用，必须是有写的权限下调用,可以通过监听`app.writable`状态获取是否可写.

```js
app.writable; // { value: true, subscribe/reaction, set? }
```

**value**

直接取到当前值。

**subscribe/reaction**

监听值变化，回调参数是新的值。区别是 subscribe 会当场执行一次，reaction 不会。

返回一个取消监听的函数。

```js
let dispose = app.writable.subscribe(value => {
  console.log("writable:", value);
}); // writable: true
app.writable.reaction(value => {
  console.log("writable2:", value);
}); // not print anything

app.writable.set(false); // writable: false, writable2: false

dispose();

app.writable.set(true); // writable2: true
```

**set**

（可能存在）修改值，只有某些值可以被修改，注意这个不一定会同步更新到 value 上，以 value 上的值为准。
