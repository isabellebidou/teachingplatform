import i18n from "i18next";


import enFeedback from "./locales/en/feedback.json" with { type: "json" };
import frFeedback from "./locales/fr/feedback.json" with { type: "json" };
import enExercise from "./locales/en/exercise.json" with { type: "json" };
import frExercise from "./locales/fr/exercise.json" with { type: "json" };
import enStressFeedback from "./locales/en/stressFeedBack.json" with { type: "json" };
import frStressFeedback from "./locales/en/stressFeedBack.json" with { type: "json" };


i18n
  .init({
  resources: {
    en: { feedback: enFeedback, exercise: enExercise, stressFeedback: enStressFeedback},
    fr: { feedback: frFeedback ,exercise: frExercise,stressFeedback : frStressFeedback}
  },

    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;