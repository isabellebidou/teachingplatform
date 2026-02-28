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

  const displayNext = () => {
    if (!selectedAnswer) return

    if (selectedAnswer.isCorrect) {
      setScore((prev) => prev + 1)
    }

    setSelectedAnswer(null)
    setreadyForNext(false)

    if (answeredQuestion === questions.length-1) {
      setGrade((score * 100) / questions.length)
      setFinished((prev) => !prev)
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
      <SelectTopic className= "exercice-select"
        topics={grammarTopics}
        selectedTopic={selectedTopic}
        onChange={setSelectedTopic}
      />
      <button onClick={handleClick}>Generate Exercice</button>
      {/* once exercice is generated and started */}
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
        <button className="next-button" onClick={displayNext}>Next</button>
      )}

      {/* once finished */}
      {finished && <div>`{grade}/100`</div>}
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return { grammarTopics: state.grammarTopics }
}
export default connect(mapStateToProps, { fetchGrammarTopics })(UserExercice)
