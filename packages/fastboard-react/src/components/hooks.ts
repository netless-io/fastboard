import type { FastboardApp, FastboardReadable } from "@netless/fastboard-core";
import type { Theme } from "../typings";

import { BuiltinApps } from "@netless/window-manager";
import { createContext, useContext, useEffect, useState } from "react";

export const FastboardAppContext = /* @__PURE__ */ createContext<FastboardApp | null>(null);

export const ThemeContext = /* @__PURE__ */ createContext<Theme>("light");

export function useTheme(userTheme?: Theme | null) {
  const themeFromContext = useContext(ThemeContext);
  return userTheme || themeFromContext;
}

export function useFastboardApp() {
  const app = useContext(FastboardAppContext);
  if (!app) {
    throw new Error("useFastboardApp() can only be called inside of <Fastboard>");
  }
  return app;
}

export function useFastboardValue<T>(val: FastboardReadable<T>) {
  const [value, setValue] = useState(val.value);
  useEffect(() => val.subscribe(setValue), [val]);
  return value;
}

export function useWritable() {
  return useFastboardValue(useFastboardApp().writable);
}

export function useBoxState() {
  return useFastboardValue(useFastboardApp().boxState);
}

export function useFocusedApp() {
  return useFastboardValue(useFastboardApp().focusedApp);
}

export function useMaximized() {
  return useBoxState() === "maximized";
}

const AppsShouldShowToolbar = /* @__PURE__ */ (() => [BuiltinApps.DocsViewer, "Slide"])();

export function useHideControls() {
  const maximized = useMaximized();
  const focusedApp = useFocusedApp();

  if (maximized) {
    if (AppsShouldShowToolbar.some(kind => focusedApp?.includes(kind))) {
      return "toolbar-only";
    } else {
      return true;
    }
  }

  return false;
}
