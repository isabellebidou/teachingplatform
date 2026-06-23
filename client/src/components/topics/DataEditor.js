import React from "react";

function DataEditor({ data, setFormData }) {
  const updateSentence = (datasetIndex, questionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      data: prev.data.map((dataset, dIndex) =>
        dIndex === datasetIndex
          ? {
              ...dataset,
              questions: dataset.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? { ...q, sentence: value }
                  : q
              )
            }
          : dataset
      )
    }));
  };

  const updateOptionText = (datasetIndex, questionIndex, optionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      data: prev.data.map((dataset, dIndex) =>
        dIndex === datasetIndex
          ? {
              ...dataset,
              questions: dataset.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      options: q.options.map((opt, oIndex) =>
                        oIndex === optionIndex
                          ? { ...opt, text: value }
                          : opt
                      )
                    }
                  : q
              )
            }
          : dataset
      )
    }));
  };

  const toggleCorrect = (datasetIndex, questionIndex, optionIndex) => {
    setFormData(prev => ({
      ...prev,
      data: prev.data.map((dataset, dIndex) =>
        dIndex === datasetIndex
          ? {
              ...dataset,
              questions: dataset.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      options: q.options.map((opt, oIndex) =>
                        oIndex === optionIndex
                          ? { ...opt, isCorrect: !opt.isCorrect }
                          : opt
                      )
                    }
                  : q
              )
            }
          : dataset
      )
    }));
  };
  const addQuestion = datasetIndex => {

  setFormData(prev => ({
    ...prev,
    data: prev.data.map((dataset, index) =>
      index === datasetIndex
        ? {
            ...dataset,
            questions: [
              ...dataset.questions,
              {
                sentence: "",
                options: [
                  {
                    text: "",
                    isCorrect: true
                  },
                  {
                    text: "",
                    isCorrect: false
                  }
                ]
              }
            ]
          }
        : dataset
    )
  }));
};
const addOption = (
  datasetIndex,
  questionIndex
) => {

  setFormData(prev => ({
    ...prev,
    data: prev.data.map((dataset, dIndex) =>
      dIndex === datasetIndex
        ? {
            ...dataset,
            questions: dataset.questions.map(
              (question, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...question,
                      options: [
                        ...question.options,
                        {
                          text: "",
                          isCorrect: false
                        }
                      ]
                    }
                  : question
            )
          }
        : dataset
    )
  }));
};

  return (
    <div>
      <h2>Admin Question Editor</h2>

      {data?.map((dataset, datasetIndex) => (
        <div
          key={datasetIndex}
          className="datasetDivUpdate"

        >
          <h3>Dataset {datasetIndex + 1}</h3>
        <button
            onClick = {addQuestion}>
            + Add Question
          </button>

          {dataset.questions?.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="questionUpdate"
            >
              {/* Sentence */}
              <label>Sentence</label>
              <textarea
              className="sentenceUpdate"
                value={question.sentence || ""}
                onChange={(e) =>
                  updateSentence(
                    datasetIndex,
                    questionIndex,
                    e.target.value
                  )
                }
              />

              {/* Options */}
              <h4>Options</h4>
              <button
            onClick = {addOption}>
            + Add Option
          </button>

              {question.options?.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="optionUpdate"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px"
                  }}
                >
                  {/* Option text */}
                  <input
                    type="text"
                    className="optionTextUpdate"
                    value={option.text || ""}
                    onChange={(e) =>
                      updateOptionText(
                        datasetIndex,
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
               
                  />

                  {/* isCorrect toggle */}
                  <label>
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={() =>
                        toggleCorrect(
                          datasetIndex,
                          questionIndex,
                          optionIndex
                        )
                      }
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DataEditor;