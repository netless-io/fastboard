import type { WhiteboardApp, WhiteboardAppConfig } from "@netless/fastboard";
import { createWhiteboardApp } from "@netless/fastboard";

import { render } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import { Handler } from "../src/controls/resize";
import { Fastboard } from "./Fastboard";
import "./index.scss";

const CanvasSize = { width: 720, height: 540 };

const config: WhiteboardAppConfig = {
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID,
  },
  joinRoom: {
    uuid: import.meta.env.VITE_ROOM_UUID,
    roomToken: import.meta.env.VITE_ROOM_TOKEN,
    uid: "test",
  },
  managerConfig: {
    chessboard: true,
  },
};

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<WhiteboardApp | null>(null);

  useEffect(() => {
    // capture the app instance by ourself
    let app: WhiteboardApp | null = null;
    createWhiteboardApp(config).then(a => {
      setApp((app = a));
      Object.assign(window, { app });
    });
    return () => void app?.dispose();
    // make sure to only create app once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(ref.current);
  }, [ref]);

  return (
    <>
      <Fastboard app={app} ref={ref} />
      <Handler
        target={document.getElementById("app") as HTMLDivElement}
        defaultSize={CanvasSize}
      />
    </>
  );
}

render(<App />, document.getElementById("app") as HTMLDivElement);
