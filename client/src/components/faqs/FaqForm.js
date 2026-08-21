import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const FaqForm = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";
  const createEmptyFaq = () => ({
    question: { en: "", fr: "" },
    answer: { en: "", fr: "" },
  });
  const [faq, setFaq] = useState(createEmptyFaq)
  

  const handleLocalizedChange = (field, locale) => (e) => {
    setFaq({
      ...faq,
      [field]: {
        ...faq[field],
        [locale]: e.target.value,
      },
    })
  }
  

  const handleFaqSubmit = async (event) => {
    event.preventDefault();
    axios.post('/api/faq', faq)
      .then(res=>{
        setFaq(createEmptyFaq());
        
      })
  }


  return (
    <div className=" ">
      <dl>
        <dt>
        {faq.question[lang]}
          
        </dt>
        <dd>
        {faq.answer[lang]}
          
        </dd>

      </dl>



<form onSubmit={handleFaqSubmit}>

      <fieldset className="item photoThumbnail">
        <legend >enter a question in English </legend>
        <input type="text" name="question-en" value={faq.question.en} onChange={handleLocalizedChange("question", "en")} />
      </fieldset>
      <fieldset className="item photoThumbnail">
        <legend >enter a question in French </legend>
        <input type="text" name="question-fr" value={faq.question.fr} onChange={handleLocalizedChange("question", "fr")} />
      </fieldset>
      <fieldset className="item photoThumbnail">
        <legend >enter an answer in English</legend>
        <input type="text" name="answer-en" value={faq.answer.en} onChange={handleLocalizedChange("answer", "en")} />
      </fieldset>
      <fieldset className="item photoThumbnail">
        <legend >enter an answer in French</legend>
        <input type="text" name="answer-fr" value={faq.answer.fr} onChange={handleLocalizedChange("answer", "fr")} />
      </fieldset>
      <button type="submit" className="">
        upload FAQ
      </button>
      </form>

    </div>
  );

}

export default FaqForm;
