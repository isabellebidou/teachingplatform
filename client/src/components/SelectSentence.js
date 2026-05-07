export default function SelectSentence({
  scripts,
  selectedScript,
  onChange
}) {
  return (
    <select className="scriptSelect"
      value={selectedScript?._id || ""}
      onChange={(e) => {
        const script = scripts.find(s => s._id === e.target.value);
        onChange(script);
      }}
    >
      {scripts.map(script => (
        <option key={script._id} value={script._id}>
          {script.sentence.length > 40
        ? script.sentence.slice(0, 40) + "..."
        : script.sentence}
        </option>
      ))}
    </select>
  );
}