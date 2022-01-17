import type { Language } from "@netless/fastboard-react";

import { createFastboard } from "@netless/fastboard";
import { Fastboard } from "@netless/fastboard-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { DarkControls, LanguageControls } from "./controls";
import { Handler } from "./controls/resize";
import { useAsyncValue } from "./hooks";
import "./main.scss";

function App() {
  const app = useAsyncValue(() =>
    createFastboard({
      sdkConfig: {
        appIdentifier: import.meta.env.VITE_APPID,
      },
      joinRoom: {
        uid: Math.random().toString(36).slice(2),
        uuid: import.meta.env.VITE_ROOM_UUID,
        roomToken: import.meta.env.VITE_ROOM_TOKEN,
      },
    })
  );

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        console.log("dispose", app);
        app?.destroy();
      });
    }
  }, [app]);

  useEffect(() => {
    Object.assign(window, { app });
  }, [app]);

  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [language, setLanguage] = useState<Language>("zh-CN");

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <>
      <Fastboard app={app} language={language} theme={dark ? "dark" : "light"} />
      <div className="bottom-hang">
        <DarkControls dark={dark} setDark={setDark} />
        <LanguageControls language={language} setLanguage={setLanguage} />
      </div>
      <Handler
        target={document.querySelector("#app") as HTMLDivElement}
        defaultSize={{ width: 640, height: 480 }}
      />
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
