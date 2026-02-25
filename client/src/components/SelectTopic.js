export default function SelectTopic({
  topics,
  selectedTopic,
  onChange
}) {
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
          {topic.name}
        </option>
      ))}
    </select>
  );
}