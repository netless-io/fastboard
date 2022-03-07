import type { FastboardApp } from "@netless/fastboard-core";
import type { ForwardedRef } from "react";
import type { Language, Theme } from "../typings";

import React, { forwardRef, useCallback, useEffect } from "react";
import { createI18n, I18nContext } from "../i18n";
import { useAsyncValue, useForceUpdate } from "../internal";
import { FastboardAppContext, ThemeContext, useFastboardApp, useHideControls } from "./hooks";
import { PageControl } from "./PageControl";
import { RedoUndo } from "./RedoUndo";
import { Toolbar } from "./Toolbar";
import { ZoomControl } from "./ZoomControl";
import { hideAll } from "./tippy-util";

export interface FastboardProps {
  app?: FastboardApp | null;
  theme?: Theme;
  layout?: { Toolbar?: boolean; RedoUndo?: boolean; ZoomControl?: boolean; PageControl?: boolean };
  language?: Language;
}

export type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type WithForwardedRef<T = HTMLDivElement> = { forwardedRef: ForwardedRef<T> };

export const Fastboard = /* @__PURE__ */ forwardRef<HTMLDivElement, FastboardProps & DivProps>(
  function Fastboard({ app, theme, layout, language, ...restProps }, ref) {
    if (!app) {
      return <div className="fastboard-root" ref={ref} {...restProps} />;
    }

    return (
      <FastboardAppContext.Provider value={app}>
        <FastboardInternal forwardedRef={ref} {...{ theme, layout, language }} {...restProps} />
      </FastboardAppContext.Provider>
    );
  }
);

function FastboardInternal({
  forwardedRef,
  language,
  layout = {},
  theme = "light",
  children,
  ...restProps
}: Omit<FastboardProps, "app"> & DivProps & WithForwardedRef) {
  const app = useFastboardApp();
  const forceUpdate = useForceUpdate();
  const i18n = useAsyncValue(() => createI18n({ language }));

  useEffect(() => {
    if (i18n) i18n.changeLanguage(language);
    forceUpdate();
  }, [forceUpdate, i18n, language]);

  useEffect(() => {
    app.manager.setPrefersColorScheme(theme);
  }, [app, theme]);

  const useWhiteboard = useCallback(
    (container: HTMLDivElement | null) => {
      if (container && app) app.bindContainer(container);
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
        <div {...restProps} className="fastboard-root" ref={forwardedRef}>
          <div className="fastboard-view" ref={useWhiteboard} onTouchStartCapture={hideAll} />
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
