import Answer from "./Answer.js"

export default function Answers({ qIndex, options ,selectedAnswer, onSelectAnswer}) {

   

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
