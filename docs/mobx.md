# 使用 MobX

因为 whiteboard app 内部使用了 proxy, 在 mobx 里要将其标记成不跟踪 (false)
或者仅跟踪赋值 (observable.ref):

```tsx
import { makeAutoObservable, observable } from "mobx";

class YourAppStore {
  app: WhiteboardApp | null = null;
  constructor() {
    makeAutoObservable<this>(this, {
      app: observable.ref,
    });
  }
  async initialize() {
    this.app = await createWhiteboardApp({
      /* ... */
    });
  }
}
```
