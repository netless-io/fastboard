import type { FastboardUIConfig, Language, Theme } from "..";

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { resizable } from "@netless/fastboard-ui/test/resizable";
import { Fastboard, stockedApps, useFastboard } from "../src";
import "./style.scss";

const search = new URLSearchParams(location.search);

const FastboardLayout: FastboardUIConfig = {
  page_control: { enable: true },
  redo_undo: { enable: true },
  toolbar: { enable: true },
  zoom_control: { enable: true },
};

function App() {
  const app = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: import.meta.env.VITE_APPID,
      region: "cn-hz",
    },
    joinRoom: {
      uid: Math.random().toString(36).slice(2),
      uuid: import.meta.env.VITE_ROOM_UUID,
      roomToken: import.meta.env.VITE_ROOM_TOKEN,
      isWritable: search.get("isWritable") === "1",
    },
    managerConfig: {
      cursor: true,
    },
  }));

  (window as any).app = app;

  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("en");

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
      <Fastboard app={app} theme={theme} language={lang} config={FastboardLayout} />
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
      <div className="links">
        <a href="/replay.html">Replay</a>
      </div>
    </>
  );
}

stockedApps.push(
  // {
  //   icon: "https://api.iconify.design/logos:youtube-icon.svg?color=currentColor",
  //   kind: "Plyr",
  //   label: "YouTube",
  //   onClick(app) {
  //     app.manager.addApp({
  //       kind: "Plyr",
  //       options: { title: "YouTube" },
  //       attributes: {
  //         src: "https://www.youtube.com/embed/bTqVqk7FSmY",
  //         provider: "youtube",
  //       },
  //     });
  //   },
  // },
  // {
  //   icon: "https://api.iconify.design/logos:google-icon.svg?color=currentColor",
  //   kind: "EmbeddedPage",
  //   label: "Google Docs",
  //   onClick(app) {
  //     app.manager.addApp({
  //       kind: "EmbeddedPage",
  //       options: { title: "Google Docs" },
  //       attributes: {
  //         src: "https://docs.google.com/document/d/1bd4SRb5BmTUjPGrFxU2V7KI2g_mQ-HQUBxKTxsEn5e4/edit?usp=sharing",
  //       },
  //     });
  //   },
  // },
  {
    icon: "https://api.iconify.design/ic:baseline-slideshow.svg?color=currentColor",
    kind: "Slide",
    label: "Slide",
    onClick(app) {
      const taskId = "9abed6605bbc11ec88a83b917638a00c";
      app.insertDocs({
        fileType: "pptx",
        scenePath: `/Slide/${taskId}`,
        taskId,
        title: "星空",
      });
    },
  },
  {
    icon: "https://api.iconify.design/material-symbols:video-stable-outline.svg?color=currentColor",
    kind: "Media",
    label: "Media",
    onClick: app => {
      app.insertMedia("a.mp4", "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4");
    },
  },
  {
    icon: "https://api.iconify.design/logos:youtube-icon.svg?color=currentColor",
    kind: "Plyr",
    label: "YouTube",
    onClick(app) {
      app.manager.addApp({
        kind: "Plyr",
        options: { title: "YouTube" },
        attributes: {
          src: "https://www.youtube.com/embed/bTqVqk7FSmY",
          provider: "youtube",
        },
      });
    },
  }
);

const root = document.getElementById("app") as HTMLDivElement;
ReactDOM.createRoot(root).render(<App />);

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
