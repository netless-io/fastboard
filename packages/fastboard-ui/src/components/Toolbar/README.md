## Fastboard Toolbar

```
+---+     vertically center of the viewport
| ^ |-+   up/down button to do scroll
: / :<|   collapse/expand button to toggle toolbar to the left
| v |-+
+---+     dynamic height according to the viewport
```

This doc will give you an overview of how the toolbar structures, from top (outer) to bottom (inner).

### The Outmost Container

<pre>--- content
 &uarr;
 : |&larr; handler
 &darr;
---</pre>

```svelte
<container style="height: 100%; display: flex; align-items: center">
  <content style="height: {computed_height}px" />
  <handler style="position: absolute; left: 100%" />
</container>
```

- Container has the full height for further calculations.
- Content is actually visible parts, it has background color.\
  Its height will be calculated later.
- Handler is the button to collapse/expand the toolbar.

### The Content

<pre>------- content
   ^    up button
 .---.  scrollable area
 :   :
 '---'
   v    down button
-------</pre>

```svelte
<content style="height: {computed_height}px">
  <up-button />
  <scrollable-area style="overflow: hidden" />
  <down-button />
</content>
```

The `computed_height` is calculated by:

```js
const max_height = button_height * 2 + scrollable_area_full_height;
const full_height = container.height;
computed_height = full_height < max_height ? full_height : max_height;
```
