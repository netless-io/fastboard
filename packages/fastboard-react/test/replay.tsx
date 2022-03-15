/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastboardPlayer, Theme, Language } from "..";

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { resizable } from "@netless/fastboard-ui/test/resizable";
import { replayFastboard, ReplayFastboard } from "../src";
import "./style.scss";

function App() {
  const [log, setLog] = useState("preparing...");
  const [player, setPlayer] = useState<FastboardPlayer | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("en");
  const [, forceUpdate] = useState({});

  useEffect(() => {
    let player_instance: FastboardPlayer | undefined;

    replayFastboard({
      sdkConfig: {
        appIdentifier: import.meta.env.VITE_APPID,
        region: "cn-hz",
      },
      replayRoom: {
        room: "b86bf2109dbb11ecbce43722439862b5",
        roomToken:
          "NETLESSROOM_YWs9c21nRzh3RzdLNk1kTkF5WCZub25jZT00NDViMDEzMC05ZGJjLTExZWMtYTYzZi02ZDIwNmVhNjI4YTgmcm9sZT0yJnNpZz0wMGQ2ZWNjNzkwYWJkM2JhMzVmMzhlNmYzMjk1NTZjOTY4MGNhYjY1N2I4ZjgxZWFkMTE3OWMxNDBlYTYyODE4JnV1aWQ9Yjg2YmYyMTA5ZGJiMTFlY2JjZTQzNzIyNDM5ODYyYjU",
        beginTimestamp: 1646619090394,
        duration: 70448,
        callbacks: {
          onPhaseChanged(phase) {
            setLog(log => `${log}\nphase: ${phase}`);
          },
        },
      },
      managerConfig: {
        cursor: true,
      },
    }).then(player => {
      (window as any).player = player;
      (window as any).forceUpdate = forceUpdate;
      setPlayer((player_instance = player));
    });

    return () => {
      if (player_instance) {
        player_instance.destroy();
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
      <ReplayFastboard player={player} theme={theme} language={lang} />
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
      <div className="log">{log}</div>
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
