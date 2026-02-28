
import React from "react";


const Answer = ({ option, checked, onSelect }) => {
  return (
    <div className="answer-div">
      <input className="answer-radio"
        type="radio"
        name="answers"
        checked={checked}
        onChange={onSelect}
      />
      <label className="answer-label">{option.text}</label>
    </div>
  );
};

export default Answer;