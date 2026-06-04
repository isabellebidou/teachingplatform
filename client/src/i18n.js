
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import LanguageDetector from "i18next-browser-languagedetector";

import enLanding from "./locales/en/landing.json";
import frLanding from "./locales/fr/landing.json";
import enAudio from "./locales/en/audio.json";
import frAudio from "./locales/fr/audio.json";
import enExercise from "./locales/en/exercise.json";
import frExercise from "./locales/fr/exercise.json";
import enTopic from "./locales/en/topic.json";
import frTopic from "./locales/fr/topic.json";
import enStress from "./locales/en/stress.json";
import frStress from "./locales/fr/stress.json";
import enOffers from "./locales/en/offers.json";
import frOffers from "./locales/fr/offers.json";


i18n
  .use(initReactI18next)
  .init({
  resources: {
    en: { landing: enLanding, audio: enAudio, exercise: enExercise, topic: enTopic, stress: enStress, offers: enOffers},
    fr: { landing: frLanding, audio: frAudio, exercise: frExercise, topic: frTopic, stress: frStress, offers: frOffers},
  },

    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;