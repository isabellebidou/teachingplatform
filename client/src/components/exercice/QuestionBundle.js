import React from "react";
import Question from "./Question";
import Answers from "./Answers";

const QuestionBundle = ({ questionIndex, question,selectedAnswer,onSelectAnswer}) => {

  return (

      <div className="quizz">
        <Question qIndex = {questionIndex} question={question.sentence}/>
        <Answers qIndex = {questionIndex} options={question.options} selectedAnswer={selectedAnswer}
  onSelectAnswer={onSelectAnswer} />
      </div>
  
  );
};

export default QuestionBundle;