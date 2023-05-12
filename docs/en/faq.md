## FAQ

### TypeError: Tippy.setDefaultProps is not a function

This means that your bundler does not support ESM format libraries.

Please try another bundler like [esbuild](https://esbuild.github.io/) or [vite](https://vitejs.dev/).

### Can't import the named export 'AnimationMode' from non EcmaScript module

This means that your bundler does not handle CJS-ESM interop well, see
[#20](https://github.com/netless-io/fastboard/issues/20).

Please try another bundler like [esbuild](https://esbuild.github.io/) or [vite](https://vitejs.dev/).

### How to customize the toolbar's apps panel

You can use the `apps` variable to do so, see
[#17](https://github.com/netless-io/fastboard/issues/17).

To completely hide the toolbar or just the apps button, set the config.toolbar.enable or config.toolbar.apps.enable.

```js
const ui = createUI(fastboard, container);
ui.update({ config: { toolbar: { enable: false } } });
```

```jsx
const config = useMemo(() => ({ toolbar: { enable: false } }), []);
const ui = <Fastboard app={fastboard} config={config} />;
```

### How to control apps, like page-down the slide

It is not supported as for official apps. You may write your own app to do that.

[Official Apps](https://github.com/netless-io/netless-app) are all open-sourced,
you can refer to the [App Dev Docs](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md) to write your own app.

On the other hand, if you only want to change the appearance of some elements,
it is recommended to use CSS to override the styles.

### How to make the ratio changeable / to customize the camera sync logic

In order to ensure the accuracy of multi-end synchronization, the camera sync (including the relative position of the whiteboard and apps) is based on a premise: the whiteboard ratio of all clients is the same value. The default is `9/16`. You can modify this value by managerConfig.containerSizeRatio when initializing.

If you don't want this sync logic, you can set managerConfig.viewMode to `freedom`, then the whiteboard will no longer follow the perspective of others, and you need to call the moveCamera method to implement the perspective-related business by yourself.
