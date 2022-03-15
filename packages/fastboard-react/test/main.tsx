/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastboardApp, Theme, Language } from "..";

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { resizable } from "@netless/fastboard-ui/test/resizable";
import { createFastboard, genUID, Fastboard } from "../src";
import "./style.scss";

function App() {
  const [app, setApp] = useState<FastboardApp | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("en");
  const [, forceUpdate] = useState({});

  useEffect(() => {
    let app_instance: FastboardApp | undefined;

    createFastboard({
      sdkConfig: {
        appIdentifier: import.meta.env.VITE_APPID,
        region: "cn-hz",
      },
      joinRoom: {
        uid: genUID(),
        uuid: import.meta.env.VITE_ROOM_UUID,
        roomToken: import.meta.env.VITE_ROOM_TOKEN,
      },
      managerConfig: {
        cursor: true,
      },
    }).then(app => {
      (window as any).app = app;
      (window as any).forceUpdate = forceUpdate;
      setApp((app_instance = app));
    });

    return () => {
      if (app_instance) {
        app_instance.destroy();
      }
    };
  }, []);

  const updateTheme = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(ev.currentTarget.value as Theme);
  }, []);

  const updateLang = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(ev.currentTarget.value as Language);
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);

  return (
    <>
      <Fastboard
        app={app}
        theme={theme}
        language={lang}
        containerRef={useCallback((el: HTMLDivElement | null) => {
          console.log(el);
        }, [])}
      />
      <div className="controller">
        <label>
          <small>Theme</small>
          <select name="theme" onInput={updateTheme}>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </label>
        <label>
          <small>Language</small>
          <select name="lang" onInput={updateLang}>
            <option value="en">English</option>
            <option value="zh-CN">简体中文</option>
          </select>
        </label>
      </div>
    </>
  );
}

const root = document.getElementById("app") as HTMLDivElement;

ReactDOM.render(<App />, root);

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
