import type { WhiteboardApp } from "../src";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Handler } from "../playground/controls/resize";
import { createWhiteboardApp } from "../src";
import "./index.scss";

const CanvasSize = { width: 600, height: 400 };

function App() {
  const app = useRef<WhiteboardApp>();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref) {
      app.current = createWhiteboardApp({
        target: ref,
        sdkConfig: {
          appIdentifier: import.meta.env.VITE_APPID,
        },
        joinRoom: {
          uuid: import.meta.env.VITE_ROOM_UUID,
          roomToken: import.meta.env.VITE_ROOM_TOKEN,
          uid: "test",
        },
      });
    }
  }, [ref]);

  return (
    <>
      <div ref={setRef} style={{ width: "100%", height: "100%" }} />
      {ref && (
        <Handler
          target={ref.parentElement as HTMLDivElement}
          defaultSize={CanvasSize}
        />
      )}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
