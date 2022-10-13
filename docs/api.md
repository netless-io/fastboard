# @netless/fastboard

This document can also be applied to `@netless/fastboard-react`.

## Table of Contents

- [createFastboard(options)](#createfastboardoptions)
- [Class: FastboardApp](#class-fastboardapp)
  - Core API
    - [fastboard.phase](#fastboardphase)
    - [fastboard.writable](#fastboardwritable)
      - [Writable&lang;T&rang; and Readable&lang;T&rang;](#writablet-and-readablet)
    - [fastboard.memberState](#fastboardmemberstate)
    - [fastboard.bindContainer(element)](#fastboardbindcontainerelement)
    - [fastboard.destroy()](#fastboarddestroy)
    - [fastboard.appsStatus](#fastboardappsstatus)
    - [fastboard.boxState](#fastboardboxstate)
    - [fastboard.focusedApp](#fastboardfocusedapp)
  - Whiteboard Tools
    - [fastboard.setAppliance(appliance, shape?)](#fastboardsetapplianceappliance-shape)
    - [fastboard.setStrokeWidth(width)](#fastboardsetstrokewidthwidth)
    - [fastboard.setStrokeColor(color)](#fastboardsetstrokecolorcolor)
    - [fastboard.setTextSize(size)](#fastboardsettextsizesize)
    - [fastboard.setTextColor(color)](#fastboardsettextcolorcolor)
    - [fastboard.toggleDottedLine(force?)](#fastboardtoggledottedlineforce)
    - [fastboard.setPencilEraserSize(size)](#fastboardsetpencilerasersizesize)
    - [fastboard.toggleTextCanSelectText(force?)](#fastboardtoggletextcanselecttextforce)
    - [fastboard.cleanCurrentScene()](#fastboardcleancurrentscene)
  - Page Navigation
    - [fastboard.pageState](#fastboardpagestate)
    - [fastboard.pageIndex](#fastboardpageindex)
    - [fastboard.pageLength](#fastboardpagelength)
    - [fastboard.prevPage()](#fastboardprevpage)
    - [fastboard.nextPage()](#fastboardnextpage)
    - [fastboard.addPage(options?)](#fastboardaddpageoptions)
    - [fastboard.removePage(index?)](#fastboardremovepageindex)
    - [fastboard.jumpPage(index)](#fastboardsetpageindex)
  - Courseware Insertion
    - [fastboard.insertImage(url, options?)](#fastboardinsertimageurl-options)
    - [fastboard.insertMedia(title, src)](#fastboardinsertmediatitle-src)
    - [fastboard.insertDocs(title, conversionResponse)](#fastboardinsertdocstitle-conversionresponse)
    - [fastboard.insertDocs(options)](#fastboardinsertdocsoptions)
  - Redo Undo
    - [fastboard.canRedoSteps](#fastboardcanredosteps)
    - [fastboard.canUndoSteps](#fastboardcanundosteps)
    - [fastboard.undo()](#fastboardundo)
    - [fastboard.redo()](#fastboardredo)
  - Camera
    - [fastboard.camera](#fastboardcamera)
    - [fastboard.moveCamera(camera)](#fastboardmovecameracamera)

## createFastboard(options)

Returns a [`FastboardApp`](#class-fastboardapp) that allows to interact with the whiteboard.

- `options` {Object}
  - `sdkConfig` {Object} [Options](https://developer.netless.link/javascript-en/home/construct-white-web-sdk) passed to `new WhiteWebSdk(options)`.
  - `joinRoom` {Object} [Options](https://developer.netless.link/javascript-en/home/construct-room-and-player) passed to `sdk.joinRoom(options)`.
  - `managerConfig` {Object} [Options](https://github.com/netless-io/window-manager/blob/master/docs/api.md#mount) passed to `WindowManager.mount(options)`.
  - `netlessApps` {Array} [Netless Apps](https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md) to be registered.

These options are required:

- `sdkConfig.appIdentifier` {String} Obtain one at [the console](https://docs.agora.io/en/whiteboard/enable_whiteboard?platform=Web#enable-the-whiteboard-service).
- `sdkConfig.region` {String} The location of whiteboard services, possible values:
  - `cn-hz` (China)
  - `us-sv` (United States)
  - `sg` (Singapore)
  - `in-mum` (India)
  - `gb-lon` (United Kingdom)
- `joinRoom.uid` {String} The unique identifier of a user.
- `joinRoom.uuid` {String} The room UUID.
- `joinRoom.roomToken` {String} The room token.

## Class: FastboardApp

This class wraps [white-web-sdk](https://docs.agora.io/en/whiteboard/landing-page), [window-manager](https://github.com/netless-io/window-manager) and [synced-store](https://github.com/netless-io/synced-store). It not only exports all of them, but also provides many useful attributes and methods.

To create a `FastboardApp` instance, use [`createFastboard(options)`](#createfastboardoptions).

### fastboard.destroy()

Disconnect from the whiteboard room, invalidates all attributes and methods.

Returns a `Promise` that resolves when the room is disconnected.

### fastboard.bindContainer(element)

- `element` {HTMLElement} The element to render the whiteboard.

Render the whiteboard to the specified element.

### fastboard.writable

- {Writable&lang;Boolean&rang;}

Indicates whether the user has permission to change the whiteboard state, like drawing on it or move the camera.

#### Writable&lang;T&rang; and Readable&lang;T&rang;

This is an observable value that useful in implementing UI. It has these properties:

- `value` {T} The current value.
- `subscribe(callback)` {Function} Subscribe to the value changes.
  - `callback` {Function} The callback to be called when the value changes.\
    Returns a `Function` that unsubscribes the callback.
- `reaction(callback)` {Function} Subscribe to the value changes.
- `set(value)` {Function} Set the value. (Only available for Writable&lang;T&rang;)
- `update(callback)` {Function} Set the value with an updater function. (Only available for Writable&lang;T&rang;)
  - `callback` {Function} The updater function that receives current `value` and returns the new `value`.
- `dispose()` {Function} Unsubscribe all callbacks.

##### Notes

- `subscribe()` will call `callback(value)` immediately while `reaction()` will not.
- `set()` and `update()` may not update `value` immediately, because `value` is representing the latest current state of whiteboard. It will only be updated when the whiteboard state is synchronized.

##### Example Code

```js
fastboard.writable.value; // true
const dispose = fastboard.writable.subscribe(value => {
  console.log(value);
});
// logs: true
fastboard.writable.set(false);
// logs: false
dispose();
```

### fastboard.phase

- {Readable&lang;RoomPhase&rang;}

#### RoomPhase

- {String}

An enum of the room status, possible values:

- `connecting`
- `connected`
- `reconnecting`
- `disconnecting`
- `disconnected`

### fastboard.memberState

- {Readable&lang;MemberState&rang;}

#### MemberState

- {Object}

The current user's state in the whiteboard room, it has these properties:

- `currentApplianceName` {String} Tool, possible values:
  - `selector`
  - `clicker` (pass through all mouse events, whiteboard does not handle them)
  - `laserPointer`
  - `pencil`
  - `rectangle`
  - `ellipse`
  - `shape` (use the shape type, see `shapeType`)
  - `eraser` (deletes strokes and shapes)
  - `pencilEraser` (erases pencil strokes like a real one)
  - `text`
  - `straight` (line)
  - `arrow`
  - `hand`
- `strokeColor` {Array} Pencil and shape stroke color, this is an array of `[red, green, blue]`.
- `strokeWidth` {Number} Pencil and shape stroke width.
- `textColor` {Array} Text color.
- `textSize` {Number} Text size.
- `pencilEraserSize` {Integer} Eraser size, possible values: `1, 2, 3`.
- `bold` {Boolean} Text tool's bold state.
- `italic` {Boolean} Text tool's italic state.
- `underline` {Boolean} Text tool's underline state.
- `lineThrough` {Boolean} Text tool's strike through state.
- `dottedLine` {Boolean} Draw dotted line when using pencil.
- `shapeType` {String} Shape tool's type, possible values:
  - `triangle`
  - `rhombus`
  - `pentagram`
  - `speechBalloon`
- `textCanSelectText` {Boolean} When using the text tool, whether the user can select text like the using selector tool.

### fastboard.boxState

- {Readable&lang;BoxState&rang;}

#### BoxState

- {String|undefined}

An enum of the window status, possible values:

- `normal`
- `maximized`
- `minimized`
- `undefined` (initial state)

### fastboard.focusedApp

- {Readable&lang;String&rang;}

The appId of the focused app.

### fastboard.canRedoSteps

- {Readable&lang;Integer&rang;}

The number of steps that can be redone.

### fastboard.canUndoSteps

- {Readable&lang;Integer&rang;}

The number of steps that can be undone.

### fastboard.camera

- {Readable&lang;CameraState&rang;}

#### CameraState

- {Object}

The real local camera state, it has these properties:

- `scale` {Number} The scale of the camera.
- `centerX` {Number} The x coordinate of the camera center.
- `centerY` {Number} The y coordinate of the camera center.
- `width` {Number} The displayed width on the whiteboard.
- `height` {Number} The displayed height on the whiteboard.

### fastboard.pageState

- {Readable&lang;PageState&rang;}

#### PageState

- {Object}

The whiteboard page state.

- `index` {Integer} The index of the current page, from 0 to length - 1.
- `length` {Integer} The number of pages.

### fastboard.pageIndex

- {Writable&lang;Integer&rang;}

A shortcut of [`fastboard.pageState`](#fastboardpagestate) and `fastboard.jumpPage()`.

### fastboard.pageLength

- {Readable&lang;Integer&rang;}

A shortcut of [`fastboard.pageState`](#fastboardpagestate).

### fastboard.appsStatus

- {Readable&lang;AppsStatus&rang;}

#### AppsStatus

- {Object}

The downloading status of the apps. The key of this object is kind and the value is an object with these properties:

- `status` {String} App downloading status, possible values:
  - `idle`
  - `loading`
  - `failed`
- `reason` {String|undefined} The reason when `status` is `failed`.

### fastboard.undo()

Undo a step on whiteboard.

### fastboard.redo()

Redo a step on whiteboard.

### fastboard.moveCamera(camera)

Move the viewing position of whiteboard.

- `camera` {Object} The camera state to move to.
  - `scale` {Number} The scale of the camera.
  - `centerX` {Number} The x coordinate of the camera center.
  - `centerY` {Number} The y coordinate of the camera center.

### fastboard.cleanCurrentScene()

Delete all elements on the current page.

### fastboard.setAppliance(appliance, shape?)

Set the current tool.

- `appliance` {String} Tool, possible values see [`currentApplianceName`](#fastboardmemberstate).
- `shape` {String|undefined} The shape type when `appliance` is `shape`, possible values see [`shapeType`](#fastboardmemberstate).

### fastboard.setStrokeWidth(width)

Set the stroke width of the pencil and shape tools.

- `width` {Number} The stroke width.

### fastboard.setStrokeColor(color)

Set the stroke color of the pencil and shape tools.

- `color` {Array} The stroke color, this is an array of `[red, green, blue]`.

### fastboard.setTextSize(size)

Set the text size of the text tool.

- `size` {Number} The text size, default is 16.

### fastboard.setTextColor(color)

Set the text color of the text tool.

- `color` {Array} The text color, this is an array of `[red, green, blue]`.

### fastboard.toggleDottedLine(force?)

Toggle the dotted line state of the pencil tool.

- `force` {Boolean|undefined} The state to toggle to.

### fastboard.setPencilEraserSize(size)

Set the eraser size of the pencil eraser tool.

- `size` {Integer} The eraser size, possible values: `1, 2, 3`.

### fastboard.toggleTextCanSelectText(force?)

Toggle the text can select state of the text tool.

- `force` {Boolean|undefined} The state to toggle to.

### fastboard.prevPage()

Go to the previous page.

Returns a `Promise` of `Boolean` that indicates whether the operation is successful.

### fastboard.nextPage()

Go to the next page.

Returns a `Promise` of `Boolean` that indicates whether the operation is successful.

### fastboard.addPage(options?)

- `options` {Object} The options to add a page.
  - `after` {Boolean|undefined} Whether to add the page after the current page, default is `false`.
  - `scene` {SceneDefinition|Array|undefined} The config of the new page, pass an array to add multiple pages at once.

Returns a `Promise` of `Boolean` that indicates whether the operation is successful.

#### SceneDefinition

- {Object}

The config of a page, it has the following attributes.

- `name` {String} The unique name of the page, it will be a random UUID when not specified.
- `ppt` {Object} Additional properties of the page, includes:
  - `ppt.src` {String} The background image of the page.
  - `ppt.width` {Integer} The width of the background image.
  - `ppt.height` {Integer} The height of the background image.
  - `ppt.previewURL` {String} The thumbnail of the background image, can be omitted.

### fastboard.removePage(index?)

- `index` {Integer} The index of the page to remove, it will delete current page of omitted.

Returns a `Promise` of `Boolean` that indicates whether the operation is successful.

### fastboard.jumpPage(index)

- `index` {Integer} The index of the page to jump to.

Returns a `Promise` of `Boolean` that indicates whether the operation is successful.

### fastboard.insertImage(url, options?)

Insert an image to the whiteboard.

- `url` {String} The URL of the image to insert.
- `options` {Object} Additional options to insert the image.
  - `width` {Number|undefined} The width of the image.
  - `height` {Number|undefined} The height of the image. If both width and height are provided, it will not prefetch the image size.
  - `centerX` {Number|undefined} The x coordinate of the image.
  - `centerY` {Number|undefined} The y coordinate of the image.
  - `locked` {Boolean|undefined} Whether to lock the image, default is `false`.
  - `uniformScale` {Boolean|undefined} Whether to keep the aspect ratio of the image, default is `true`.

If one of `width` and `height` is not provided, this method will fetch the image size first.

Returns a `Promise` that indicates the insertion is finished.

### fastboard.insertMedia(title, src)

Insert an MP3 or MP4 file to the whiteboard.

- `title` {String} The title of the window containing the media player.
- `src` {String} The URL of the MP3 or MP4 file.

Returns a `Promise` of `String`, which is the app id of the underlying media player app.

### fastboard.insertDocs(title, conversionResponse)

Insert a [converted](https://developer.netless.link/server-en/home/server-conversion) document to the whiteboard.

- `title` {String} The title of the window containing the document.
- `conversionResponse` {Object} The [response](https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress) of the conversion API.

### fastboard.insertDocs(options)

Insert a converted document to the whiteboard, for advanced users.

- `options` {InsertDocsStatic|InsertDocsDynamic}

#### InsertDocsStatic

- `fileType` {"pdf"}
- `scenePath` {String} The whiteboard path to the doc, must start with `/`.
- `scenes` {Array} The scenes of the doc, see [`SceneDefinition`](#scenedefinition).
- `title` {String} The title of the window containing the document.

Recommended `scenePath` setup:

```js
const scenePath = "/ppt/" + taskId;
```

#### InsertDocsDynamic

- `fileType` {"pptx"}
- `scenePath` {String} The whiteboard path to the doc, must start with `/`.
- `taskId` {String} The [task uuid](https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress) of the conversion task.
- `title` {String} The title of the window containing the document.
- `url` {String} The URL prefix of the resources, can be omitted if using the default storage.

Recommended `scenePath` setup:

```js
const scenePath = "/pptx/" + taskId;
```
