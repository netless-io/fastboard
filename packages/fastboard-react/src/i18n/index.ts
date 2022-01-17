import type { i18n } from "i18next";
import type { Language } from "../typings";

import { createContext, useContext, useMemo } from "react";
import i18next from "i18next";
import en from "./en.json";
import zhCN from "./zh-CN.json";

export interface CreateI18nParams {
  language?: Language;
}

export const createI18n = async ({
  language = (navigator.language as Language) || "zh-CN",
}: CreateI18nParams = {}) => {
  await i18next.init({
    lng: language,
    resources: { en, "zh-CN": zhCN },
  });
  return i18next;
};

export const I18nContext = /* @__PURE__ */ createContext<i18n | null>(null);

export function useTranslation() {
  const i18n = useContext(I18nContext);
  const t = useMemo(() => (i18n ? i18n.getFixedT(null, ["translation"]) : (id: string) => id), [i18n]);
  return { t, i18n };
}
