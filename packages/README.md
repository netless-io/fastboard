## Structure

```mermaid
graph LR
  user{user}==>fastboard
  fastboard-->ui(ui)
  fastboard-->core(core)
  user[entry point]==>fastboard-react
  fastboard-react-->fastboard
  fastboard-react-...->|peer|react
  ui-->svelte
  ui-..->|types|core
```

Simpler &darr;

```mermaid
graph LR
  fastboard-->ui(ui)
  fastboard-->core(core)
  fastboard-react-->fastboard
  ui-..->|types|core
```

1. Use fastboard-react **or** fastboard, the core and ui part are re-exported from the two entries.

2. React is a peer dependency for making sure there's only one React, otherwise react hooks may be broken. You have to install the fastboard-react package like this:

   ```bash
   npm add @netless/fastboard-react react react-dom
   ```
