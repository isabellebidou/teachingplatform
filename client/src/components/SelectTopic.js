import { useTranslation } from "react-i18next";

export default function SelectTopic({
  topics,
  selectedTopic,
  onChange
}) {
const {i18n } = useTranslation();
const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  return (
    <select
      value={selectedTopic?._id || ""}
      onChange={(e) => {
        const topic = topics.find(s => s._id === e.target.value);
        onChange(topic);
      }}
    >
      {topics.map(topic => (
        <option key={topic._id} value={topic._id}>
          <option>{topic.name[lang]}</option>
        </option>
      ))}
    </select>
  );
}