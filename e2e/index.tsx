import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { createWhiteboardApp } from "../src";
import "./index.css";

function App() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      createWhiteboardApp({
        target: ref.current,
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
  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
}

ReactDOM.render(<App />, document.getElementById("app"));
