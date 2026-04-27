import React from "react"
import { useTranslation } from "react-i18next";

function TopicList({ topics = [], onSelect, selectedTopic }) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <ol >
      {topics.map((topic, index) => (
        <li 
          key={topic._id}
          onClick={() => onSelect(topic)}
          style={{
            cursor: "pointer",
            fontWeight: selectedTopic?._id === topic._id ? "bold" : "normal",
            backgroundColor: selectedTopic?._id === topic._id ?   "rgba(183, 187, 184, 0.2)":"rgba(214, 210, 210, 0.1)" ,
      
          }}
        >
          <h3>{topic.name?.[lang]}</h3>
        </li>
      ))}
    </ol>
  )
}

export default TopicList
