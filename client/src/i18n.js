
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enLanding from "./locales/en/landing.json";
import frLanding from "./locales/fr/landing.json";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { landing: enLanding },
      fr: { landing: frLanding },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;