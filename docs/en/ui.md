## Write Your Own UI (for Fastboard)

Fastboard's UI is well decoupled from the core logic, which enables you to easily create your own UI through the API provided by [Fastboard Core](../../packages/fastboard-core).

UI is nothing but some components _reflecting_ the value of the _state_. Take the following React component for example:

```js
function App() {
  let [count, setCount] = useState(0);
  //   ^ state
  return <button onClick={() => setCount(count + 1)}>{count}</button>; // view (UI)
  //             ^ actions to modify state (not view!)
}
```

To make our _state_ **observable**, Fastboard provides several _values_ which can be observed through callbacks:

```js
let app = await createFastboard({ ...config });
app.writable; // { value: true, subscribe/reaction, set? }
```

**value**

Get current value.

**subscribe/reaction**

Listens for changes in the value and the callback parameter is the new value.
The difference between the 2 methods is that `subscribe` will execute the callback at once
while `reaction` won't.

Returns a function to unsubscribe.

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

(Maybe exist) Set the value. Note that this change may not be updated to `value` immediately since we have to sync it.

### Use the Core API in Front-end Frameworks

#### React

We can make use of [React Hooks](https://reactjs.org/docs/hooks-intro.html) to listen updates to these values:

```js
import { useState, useEffect } from "react";

function useAppWritable(app) {
  const [value, setValue] = useState(app.writable.value);

  useEffect(() => app.writable.subscribe(setValue), [app]);
  // The disposer returned by `subscribe` can just be passed into `useEffect`, so convenient.

  return value;
}
```

#### Vue3

We can make use of the [Reactivity API](https://v3.vuejs.org/api/reactivity-api.html) of Vue3:

**Warning**: Some values in Fastboard are implemented in `Proxy`, don't let them be wrapped again in Vue's `data` or `ref`, `reactive`, use [`shallowRef`](https://v3.vuejs.org/api/refs-api.html#shallowref) instead.

```js
import { ref, readonly, computed, onUnmounted } from "vue";

function useAppWritable(app) {
  const writable = ref(app.writable.value);

  const dispose = app.writable.reaction(value => {
    writable.value = value;
  });

  onUnmounted(dispose);

  // Do not want users to do {{ writable = true }}
  return readonly(writable);

  // If you want to make the value writable, you can use `computed` to proxy it.
  return computed({
    get: () => writable.value,
    set: value => {
      app.writable.set(value);
      // Important: do not call `writable.value = value` here,
      // instead we should let that happen in the reaction callback.
    },
  });
}
```

#### Svelte

Our interface is compatible with the Svelte [Store](https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract) API, so you can use it directly:

```svelte
<script>
let writable = app.writable;
</script>

<div>{$writable ? 'you can control the whiteboard' : 'readonly'}</div>
```
