import { i18n, Messages } from "@lingui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const locales = {
  en: "English",
  zh: "Chinese",
  ja: "Japanese",
  es: "Spanish",
  de: "German",
  fr: "French",
  ko: "Korean",
  pt: "Portuguese",
  ar: "Arabic",
};

export async function loadCatalog(locale: string) {
  const { messages } = await import(`../locales/${locale}/messages`);
  return messages;
}

export function useLinguiInit(messages: Messages) {
  const router = useRouter();
  const locale = router.locale || router.defaultLocale!;
  const isClient = typeof window !== "undefined";

  // if (!isClient && locale !== i18n.locale) {
  //   i18n.loadAndActivate({ locale, messages });
  // }
  if (isClient && i18n.locale === undefined) {
    i18n.loadAndActivate({ locale, messages });
  }

  useEffect(() => {
    const localeDidChange = locale !== i18n.locale;
    if (localeDidChange) {
      i18n.loadAndActivate({ locale, messages });
    }
  }, [locale]);

  return i18n;
}
