How do I customize the keys on fastboard

Fastboard for quick, ** does not support ** high customization. If you want to customize your own controls, the controls refer to the introduction

### Custom toolbar

1. First, shield fastboard's built-in toolbar through enable: false in uiConfig.

```js
    // vanilla js
    const ui = createUI(fastboard, container);
    ui.update({ config: { ... ui_config } });

    // react
    <Fastboard app={fastboard} config={{ ... ui_config }} />;
```
The 'ui_config' above looks like this:
```js
    {
        toolbar: { enable: false },
        redo_undo: { enable: true },
        zoom_control: { enable: true },
        page_control: { enable: true },
    }
```
2. Then implement a set of toolbar components and associate them with fastboard.
```jsx
    import { useFastboard, Fastboard } from "@netless/fastboard-react";
    import React from "react";
    import { createRoot } from "react-dom/client";

    function App() {
        const fastboard = useFastboard(...) ;
        return (
        <div
            style={{
                height: "400px",
                border: "1px solid",
                background: "#f1f2f3",
            }}
        >
            <Fastboard app={fastboard} />
            {/** Custom toolbar */}
            <CustomToolbar />
        </div>
        );
    }

    createRoot(document.getElementById("app")).render(<App />);
```
Or native js
```js
    import { createFastboard, createUI } from "@netless/fastboard";
    async function main() {
        const fastboard = await createFastboard(...) ;
        const container = createContainer();
        const ui = createUI(fastboard, container);
        ui.update({ config: { ... ui_config } });

        //.....
        // Exit Fastboard (disconnect from whiteboard room)
        fastboard.destroy();
    }
    function createContainer() {
        const container = document.createElement("div");
        // Whiteboard elements must have a visible size
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
        // Custom toolbar logic
        //
        return customToolbar;
    }
```
3. API on toolbar component to respond to teaching AIDS
[reference fastboard toolbar component calls](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/Toolbar/components/Contents.svelte)
```js
    //  const app = await createFastboard(...) ;
    //  const app = useFastboard(...) ;
    // app is the fastboard instance

    function clicker() {
        app.setAppliance("clicker");
    }
    // Selector
    function selector() {
        app.setAppliance("selector");
    }
    // Paintbrush
    function pencil() {
        app.setAppliance("pencil");
    }
    // Text
    function text() {
        app.setAppliance("text");
    }
    // An eraser
    function eraser() {
        app.setAppliance("eraser");
    }
    // Gripper
    function hand() {
        app.setAppliance("hand");
    }
    // Laser pointer
    function laserPointer() {
        app.setAppliance("laserPointer");
    }
    // Clear the current whiteboard
    function clear() {
        app.cleanCurrentScene();
    }
    declare type Color = number[];
    // Set the text color
    function setTextColor(textColor: Color) {
        app.setTextColor(textColor);
    }
    // Color of pencil wire frame
    function setStrokeColor(textColor: Color) {
        app.setStrokeColor(textColor);
    }
    // Thickness of pencil wire frame
    function setStrokeWidth(strokeWidth: number) {
        app.setStrokeWidth(strokeWidth);
    }
```

### Customize other controls

In addition, we can also customize other controls in the above way.
```js
    {
        toolbar: {enable: false}, // Disable the toolbar control key
        redo_undo: {enable: false}, // Disable the redo/undo key
        zoom_control: {enable: false}, // Turn off the Zoom canvas control
        page_control: {enable: false}, // Disable page control
    }
```

**undo/redo**
[reference fastboard undo/redo component calls](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/RedoUndo/RedoUndo.svelte)
```js
    function undo() {
        app.undo();
    }

    function redo() {
        app.redo();
    }
    /** Gets the current number of undo-done */
    app.canUndoSteps
    /** Gets the current number of reworks */
    app.canRedoSteps

```
**zoom**
[reference fastboard zoom component calls](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/ZoomControl/ZoomControl.svelte)
```js
    type Camera = {
        / * *
        * The X-coordinate of the point where the center of the Angle of view is aligned (world coordinate system)
        * /
        centerX: number;
        / * *
        * y coordinate of the point at which the center of the Angle of view is aligned (world coordinate system)
        * /
        centerY: number;
        / * *
        * Angle stretching causes objects to zoom in and out
        * /
        scale: number;
    };
    function moveCamera(camera: Camera) {
        app.moveCamera(camera);
    }
```
**page**
[reference fastboard page component calls](https://github.com/netless-io/fastboard/blob/main/packages/fastboard-ui/src/components/PageControl/PageControl.svelte)
```js
    function prevPage() {
        app.prevPage();
    }

    function nextPage() {
        app.nextPage();
    }

    function addPage() {
        app.addPage({ after: true });
        app.nextPage();
    }
```

### Attention items
Note: The use of the above api must be a write permission call, can be obtained by listening to the 'app.writable' state to obtain whether it is writable.
```js
    app.writable;  // { value: true, subscribe/reaction, set?  }
```
**value**
Fetch the current value directly.

**subscribe/reaction**

The listening value changes, and the callback parameter is the new value. The difference is subscribe does it once on the spot, reaction doesn't.

Returns a function that cancels listening.

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

Only some values can be modified. Note that this may not be synchronized to the value. The value on the value prevails.