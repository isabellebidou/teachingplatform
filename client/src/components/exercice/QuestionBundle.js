import React from "react";
import Question from "./Question";
import Answers from "./Answers";

const QuestionBundle = ({ question, onAnswerCheck }) => {
  return (
    <div>
      <div className="content">
        <Question question={question.question}/>
        <Answers onAnswerCheck = {onAnswerCheck} answers={question.answers} />
      </div>
    </div>
  );
};

export default QuestionBundle;