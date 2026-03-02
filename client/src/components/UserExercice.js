import { fetchGrammarTopics } from "../actions"
import SelectTopic from "./SelectTopic"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import QuestionBundle from "./exercice/QuestionBundle"
import axios from "axios"

function UserExercice({ grammarTopics = [], fetchGrammarTopics }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answeredQuestion, setAnsweredQuestion] = useState(0) // index
  const [score, setScore] = useState(0)
  const [grade, setGrade] = useState(0)
  const [gameStarted, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [readyForNext, setreadyForNext] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedBack] = useState([])

  useEffect(() => {
    fetchGrammarTopics()
  }, [fetchGrammarTopics])

  useEffect(() => {
    if (grammarTopics.length > 0) {
      setSelectedTopic(grammarTopics[0])
    }
  }, [grammarTopics])
  useEffect(() => {
    console.log("questions state changed:", questions)
  }, [questions])

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/exercice", { selectedTopic })
      setQuestions(res.data.questions)
      setStarted(true)
    } catch (err) {
      console.error("Error generating exercice:", err)
    } finally {
    }
  }
  const findCorrectAnswer = (q) => {
    for (let index = 0; index < q.options.length; index++) {
      const option = q.options[index]
      if (option.isCorrect) return option
    }
  }

  const displayNext = () => {
    if (!selectedAnswer) return
    const correct = findCorrectAnswer(questions[answeredQuestion])
    if (selectedAnswer.isCorrect) {
      setScore((prev) => prev + 1)
      setFeedBack((prev) => [
        ...prev,
        {
          question: questions[answeredQuestion].sentence,
          wrongAnswer: selectedAnswer.text,
          correctAnswer: selectedAnswer.text,
          isCorrect: true,
        },
      ])
    } else {
      setFeedBack((prev) => [
        ...prev,
        {
          question: questions[answeredQuestion].sentence,
          wrongAnswer: selectedAnswer.text,
          correctAnswer: correct.text,
          isCorrect: false,
        },
      ])
    }
    setSelectedAnswer(null)
    setreadyForNext(false)

    if (answeredQuestion === questions.length - 1) {
      setGrade((score * 100) / questions.length)
      setFinished((prev) => !prev)
      console.log(feedback, null, 2)
    } else {
      setAnsweredQuestion((prev) => prev + 1)
    }
  }
  const handleSelectAnswer = (option) => {
    setSelectedAnswer(option)
    setreadyForNext(true)
  }

  return (
    <div className="page">
      <div className="exercice-div">
        {!gameStarted && (
          <SelectTopic
            className="exercice-select"
            topics={grammarTopics}
            selectedTopic={selectedTopic}
            onChange={setSelectedTopic}
          />
        )}
        {!gameStarted && selectedTopic && (
          <button onClick={handleClick}>Generate Exercice</button>
        )}
        {/* once exercice is generated and started */}
        {gameStarted &&  selectedTopic && questions.length > 0 && (
          <h2>{selectedTopic.name}</h2>
          )}

        {gameStarted &&  questions.instructions && questions.length > 0 && (
          <p>{questions.instructions}</p>
          )}

        {gameStarted && questions.length > 0 && (
          <QuestionBundle
            questionIndex={answeredQuestion}
            question={questions[answeredQuestion]}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          ></QuestionBundle>
        )}
        {/* once one option is selected */}
        {gameStarted && selectedAnswer && (
          <button className="next-button" onClick={displayNext}>
            Next
          </button>
        )}

        {/* once finished */}

        {finished && (
          <div className="exercicResultDiv">
            <div>{grade}/100</div>
            <table className="resultTable">
              <tr>
                <th>
                  <strong>Question:</strong>
                </th>
                <th>
                  <strong>Your answer:</strong>
                </th>
                <th>
                  <strong>Correct answer:</strong>
                </th>
                <th>
                  <strong></strong>
                </th>
              </tr>
              {feedback.map((f, index) => (
                <tr key={index}>
                  <td>{f.question}</td>
                  <td>{f.wrongAnswer}</td>
                  <td>{f.correctAnswer}</td>
                  <td>{f.correctAnswer}</td>
                  <td>
                    {f.isCorrect ? (
                      <span style={{ color: "green" }}>✓</span>
                    ) : (
                      <span style={{ color: "red" }}>✘</span>
                    )}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return { grammarTopics: state.grammarTopics }
}
export default connect(mapStateToProps, { fetchGrammarTopics })(UserExercice)
