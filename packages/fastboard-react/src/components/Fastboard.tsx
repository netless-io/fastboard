import type { FastboardApp } from "@netless/fastboard";
import type { PropsWithChildren } from "react";
import type { Language, Theme } from "../typings";

import React, { useCallback, useEffect } from "react";

import { createI18n, I18nContext } from "../i18n";
import { useAsyncValue, useForceUpdate } from "../internal";
import { FastboardAppContext, ThemeContext, useFastboardApp, useHideControls } from "./hooks";
import { PageControl } from "./PageControl";
import { RedoUndo } from "./RedoUndo";
import { Toolbar } from "./Toolbar";
import { ZoomControl } from "./ZoomControl";

export interface FastboardProps {
  app?: FastboardApp | null;
  theme?: Theme;
  layout?: { Toolbar?: boolean; RedoUndo?: boolean; ZoomControl?: boolean; PageControl?: boolean };
  language?: Language;
}

export function Fastboard({ app, ...restProps }: PropsWithChildren<FastboardProps>) {
  if (!app) {
    return <div className="fastboard-root" />;
  }

  return (
    <FastboardAppContext.Provider value={app}>
      <FastboardInternal {...restProps} />
    </FastboardAppContext.Provider>
  );
}

function FastboardInternal({
  language,
  layout = {},
  theme = "light",
  children,
}: Omit<PropsWithChildren<FastboardProps>, "app">) {
  const app = useFastboardApp();
  const forceUpdate = useForceUpdate();
  const i18n = useAsyncValue(() => createI18n({ language }));

  useEffect(() => {
    if (i18n) i18n.changeLanguage(language);
    forceUpdate();
  }, [forceUpdate, i18n, language]);

  const useWhiteboard = useCallback(
    (container: HTMLDivElement | null) => {
      container && app && app.manager.bindContainer(container);
    },
    [app]
  );

  const hideControls = useHideControls();
  const showControls = !hideControls;

  const {
    Toolbar: toolbar = showControls || hideControls === "toolbar-only",
    RedoUndo: redo_undo = showControls,
    ZoomControl: zoom_control = showControls,
    PageControl: page_control = showControls,
  } = layout;

  return (
    <ThemeContext.Provider value={theme}>
      <I18nContext.Provider value={i18n}>
        <div className="fastboard-root">
          <div className="fastboard-view" ref={useWhiteboard} />
          {children ? (
            children
          ) : (
            <>
              {toolbar && (
                <div className="fastboard-left">
                  <Toolbar />
                </div>
              )}
              {(redo_undo || zoom_control) && (
                <div className="fastboard-bottom-left">
                  {redo_undo && <RedoUndo />}
                  {zoom_control && <ZoomControl />}
                </div>
              )}
              {page_control && (
                <div className="fastboard-bottom-right">
                  <PageControl />
                </div>
              )}
            </>
          )}
        </div>
      </I18nContext.Provider>
    </ThemeContext.Provider>
  );
}
