import React from "react"
import { useTranslation } from "react-i18next";

function TopicDetails({ topic }) {
  const { t,i18n } = useTranslation("topic")
  //const lang = i18n.language
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  if (!topic) return <div>No topic selected</div>

  return (
    <div >
      <h2>{t("h2TopicName")}: {topic.name?.[lang]} - {topic.level}</h2>
      <p>{t("pTopicRule")}: {topic.rule?.[lang]} </p>

      {topic.examples && topic.examples.length > 0 && (
        <>
        <h3>{t("h3TopicExamples")}:</h3>
        <ul>
          {topic.examples.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
        </>
      )}
    </div>
  )
}

export default TopicDetails