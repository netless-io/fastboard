各文件夹功能：

- components

  框架无关、无重型依赖的组件，包含 redo-undo, resize, toolbar 等组件。

  ```tsx
  // as svelte component
  import { RedoUndo } from "@netless/components";
  // -- vanilla
  const redo_undo = new RedoUndo({ target: $el, props: { room, manager } });
  redo_undo.$destroy(); // remove it from $el

  <RedoUndo {room} {manager} />;

  // as react component
  import { RedoUndo } from "@netless/components/react";
  const element = <RedoUndo room={room} manager={manager} />;

  // as vue component
  <redo-undo />;
  // -- in <script setup>
  import { RedoUndo } from "@netless/components/vue";
  // -- in global (not recommended)
  import netless from "@netless/components/vue";
  const app = createApp(App);
  app.use(netless);
  ```

- agora-whiteboard-sdk

  使用了上面 components 的一个开箱即用的白板库，整合了上面所有组件的配置参数。

- playground

  使用了上面两个库的 web 应用，编写一些 mock 用于在无白板环境下测试组件。
