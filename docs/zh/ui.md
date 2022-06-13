## 如何为 fastboard 实现 UI

讲这个问题之前我们要先定义什么叫 <q>UI</q>，一个朴素的想法是把 UI 看成一个简单的 MVC 结构——数据 <q>流向</q> 视图，以及一系列操作可以修改数据。以这个 React 组件为例：

```js
function App() {
  let [count, setCount] = useState(0);
  //   ^ 数据
  return <button onClick={() => setCount(count + 1)}>{count}</button>; // 视图
  //             ^ 有可能引发数据变化的操作
}
```

其他框架（Vue、Svelte）我就不赘述了，这里的基本思想是：数据和视图有关，而且必须是响应式的（能够监听到数据变动从而通知 UI 更新）；操作有可能和数据有关，也可以无关。

因此我们的核心库给出了这样的接口：

```js
let app = await createFastboard({ ...config });
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

### 封装成库

#### React

我们可以利用 [React Hooks](https://zh-hans.reactjs.org/docs/hooks-intro.html)，将其做成响应式的值：

```js
import { useState, useEffect } from "react";

function useAppWritable(app) {
  const [value, setValue] = useState(app.writable.value);

  useEffect(() => app.writable.subscribe(setValue), [app]);
  // 这里利用了一个"巧合"：subscribe 返回的 dispose 函数恰好可以被 useEffect 自动调用，
  // 在退出组件时清除监听。

  return value;
}
```

#### Vue(3)

利用 Vue3 的[响应式接口](https://v3.vuejs.org/api/reactivity-api.html)：

**警告**：Fastboard 内部有一些值本身是封装成 Proxy 的，此时在 vue 里二次嵌套 proxy 很容易发生问题，建议不要将 app 放到 `data` 或者 `ref` `reactive` 里，一定要放的话建议使用 [`shallowRef`](https://v3.vuejs.org/api/refs-api.html#shallowref)。

```js
import { ref, readonly, computed, onUnmounted } from "vue";

function useAppWritable(app) {
  const writable = ref(app.writable.value);

  const dispose = app.writable.reaction(value => {
    writable.value = value;
  });

  onUnmounted(dispose);

  // 不希望外部调用 "writable.value ="
  return readonly(writable);

  // 如果希望封装成可变的值，可以用 computed，
  return computed({
    get: () => writable.value,
    set: value => {
      app.writable.set(value);
      // 注意！这里不是 writable.value = value，
      // 我们需要修改到真实的数据，而不是封装的
    },
  });
}
```

#### Svelte

我们的接口<q>恰好</q>也是 Svelte [Store](https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract) 的接口，因此可以直接使用：

```svelte
<script>
let writable = app.writable;
</script>

<div>{$writable ? '可写' : '不可写'}</div>
```
