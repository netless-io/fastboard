import type { i18n } from "i18next";
import type { Room } from "white-web-sdk";
import type { Theme } from "../src/types";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { room } from "./mock";
import { RedoUndo, Toolbar } from "../src";
import "./style.scss";

import { createI18n } from "../src/i18n";
import { PageControl } from "../src/components/PageControl";
import { ZoomControl } from "../src/components/ZoomControl";
import {
  DarkControls,
  LanguageControls,
  PageControlControls,
  RedoUndoControls,
  ToolbarControls,
  WritableControls,
  ZoomControlControls,
} from "./controls";
import { Handler } from "./controls/resize";

function App() {
  const [, forceUpdate] = useState({});
  const [language, setLanguage] = useState<"en" | "zh-CN">("zh-CN");
  const [i18n, setI18n] = useState<i18n | null>(null);
  const [writable, set_writable] = useState(true);
  const [dark, set_dark] = useState(false);
  const [redo_undo, set_redo_undo] = useState(true);
  const [page_control, set_page_control] = useState(true);
  const [zoom_control, set_zoom_control] = useState(true);
  const [toolbar, setToolbar] = useState(true);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    createI18n({ language }).then(setI18n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (i18n) i18n.changeLanguage(language);
    forceUpdate({});
  }, [i18n, language]);

  useEffect(() => {
    room.setWritable(writable);
  }, [writable]);

  const theme: Theme = dark ? "dark" : "light";

  const props = { theme, room: room as unknown as Room, i18n };

  return (
    <>
      <div className={clsx("wrapper", { dark })}>
        <div className="left">{toolbar && <Toolbar {...props} />}</div>
        <div className="bottom-left">
          {redo_undo && <RedoUndo {...props} />}
          {zoom_control && <ZoomControl {...props} />}
        </div>
        <div className="bottom-right">
          {page_control && <PageControl {...props} />}
        </div>
      </div>
      <div className="bottom-hang">
        <LanguageControls language={language} setLanguage={setLanguage} />
        <WritableControls writable={writable} setWritable={set_writable} />
        <DarkControls dark={dark} setDark={set_dark} />
        <RedoUndoControls visible={redo_undo} setVisible={set_redo_undo} />
        <PageControlControls
          visible={page_control}
          setVisible={set_page_control}
        />
        <ZoomControlControls
          visible={zoom_control}
          setVisible={set_zoom_control}
        />
        <ToolbarControls visible={toolbar} setVisible={setToolbar} />
      </div>
      <div className="right-hang">
        <a href="/e2e.html">E2E Test</a>
      </div>
      <Handler
        target={document.querySelector("#app") as HTMLDivElement}
        defaultSize={{ width: 600, height: 400 }}
      />
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
