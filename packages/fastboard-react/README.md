## @netless/fastboard-react

The React wrapper of [@netless/fastboard-ui](https://github.com/netless-io/fastboard/tree/main/packages/fastboard-ui).

## Usage

```js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useFastboard, Fastboard } from "@netless/fastboard-react";

function App() {
  const app = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "whiteboard_app_id",
    },
    joinRoom: {
      uid: "unique_user_id",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
  }));

  return <Fastboard app={app} />;
}

ReactDOM.render(<App />, document.getElementById("app"));
```

### License

MIT @ [netless](https://github.com/netless-io)
