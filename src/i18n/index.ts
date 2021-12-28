import i18next from "i18next";
import en from "./en.json";
import zhCN from "./zh-CN.json";

export type CreateI18nParams = {
  language?: string;
};

export const createI18n = async (params: CreateI18nParams) => {
  const defaultLang = navigator.language || "zh-CN";
  const lng = params.language || defaultLang;

  await i18next.init({
    lng,
    resources: {
      en: en,
      "zh-CN": zhCN,
    },
  });

  return i18next;
};
