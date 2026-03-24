
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import LanguageDetector from "i18next-browser-languagedetector";

import enLanding from "./locales/en/landing.json";
import frLanding from "./locales/fr/landing.json";
import enAudio from "./locales/en/audio.json";
import frAudio from "./locales/fr/audio.json";
import enExercise from "./locales/en/exercise.json";
import frExercise from "./locales/fr/exercise.json";


i18n
  .use(initReactI18next)
  .init({
  resources: {
    en: { landing: enLanding, audio: enAudio, exercise: enExercise },
    fr: { landing: frLanding, audio: frAudio, exercise: frExercise },
  },

    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;