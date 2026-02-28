import Answer from "./Answer.js"

export default function Answers({ qIndex, options ,selectedAnswer, onSelectAnswer}) {
    console.log("from Answers: ")
    console.log(JSON.stringify(qIndex, null, 2));
   

  return (
    <div className="answers-div">
      {options.map((option, index) => (
        <Answer
          option={option}
          key={`q${qIndex}a${index}`}
          checked={selectedAnswer === option}
          onSelect={() => onSelectAnswer(option)}
        />
      ))}
    </div>
  )
}
