import i18n from "i18next";


import enFeedback from "./locales/en/feedback.json" assert { type: "json" };
import frFeedback from "./locales/fr/feedback.json" assert { type: "json" };
import enExercise from "./locales/en/exercise.json" assert { type: "json" };
import frExercise from "./locales/fr/exercise.json" assert { type: "json" };


i18n
  .init({
  resources: {
    en: { feedback: enFeedback, exercise: enExercise},
    fr: { feedback: frFeedback ,exercise: frExercise},
  },

    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;