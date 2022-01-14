import type { i18n } from "i18next";

import { useEffect, useState } from "preact/hooks";
import "./style.scss";

import { Online } from "./Online";
import { Replay } from "./Replay";
import { DarkControls, LanguageControls, ModeControls } from "./controls";
import { Handler } from "./controls/resize";
import { createI18n } from "../src/i18n";
import { render } from "preact";

function App() {
  const [dark, set_dark] = useState(false);
  const [mode, set_mode] = useState<"online" | "replay">("online");
  const [, forceUpdate] = useState({});
  const [language, set_language] = useState<"en" | "zh-CN">("zh-CN");
  const [i18n, setI18n] = useState<i18n | null>(null);

  useEffect(() => {
    createI18n({ language }).then(setI18n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (i18n) i18n.changeLanguage(language);
    forceUpdate({});
  }, [i18n, language]);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <>
      {mode === "replay" ? (
        <Replay dark={dark} i18n={i18n} />
      ) : (
        <Online dark={dark} i18n={i18n} />
      )}
      <div className="right-hang">
        <DarkControls dark={dark} setDark={set_dark} />
        <ModeControls mode={mode} setMode={set_mode} />
        <LanguageControls language={language} setLanguage={set_language} />
        <div className="row">
          <a href="/e2e.html">E2E Test</a>
        </div>
      </div>
      <Handler
        target={document.querySelector("#app") as HTMLDivElement}
        defaultSize={{ width: 600, height: 400 }}
      />
    </>
  );
}

render(<App />, document.querySelector("#app") as HTMLDivElement);
