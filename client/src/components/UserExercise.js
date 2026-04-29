import { fetchGrammarTopics } from "../actions/index.js"
import SelectTopic from "./SelectTopic.js"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import QuestionBundle from "./exercice/QuestionBundle.js"
import axios from "axios"
import { useTranslation } from "react-i18next";
//import { map } from "jquery"

import { logError as error } from "../utils/utils.js"
import { log } from "../utils/utils.js";

function UserExercise({ grammarTopics = [], auth, fetchGrammarTopics }) {
  const { t, i18n } = useTranslation("exercise");
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";
  const [questions, setQuestions] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [instructions, setInstructions] = useState(null)
  const [answeredQuestion, setAnsweredQuestion] = useState(0) // index
  const [score, setScore] = useState(0)
  const [gameStarted, setStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedBack] = useState([])
  const grade = Math.round((score * 100) / questions.length)


  useEffect(() => {
    fetchGrammarTopics()
     log("auth:", auth.level)
  }, [fetchGrammarTopics])

  useEffect(() => {
    if (grammarTopics.length > 0) {
      setSelectedTopic(grammarTopics[0])
    }
  }, [grammarTopics])
  useEffect(() => {
     log("questions state changed:", questions)
  }, [questions])
  const resetGame = () => {
  setQuestions([])
  setSelectedTopic(null)
  setStarted(false)
  setIsLoading(false)
  setInstructions(null) // if you have it
  setAnsweredQuestion(0)
  setScore(0)
  setFinished(false)
  setSelectedAnswer(null)
  setFeedBack([])
}

  const handleClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)
     log("selectedTopic", selectedTopic)
    try {
      const res = await axios.post("/api/exercice", { selectedTopic })
      setQuestions(res.data.questions)
      setInstructions(res.data.instructions)
      setStarted(true)
    } catch (err) {
       error("Error generating exercice:", err)
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

    if (answeredQuestion === questions.length - 1) {
      setFinished(true)
       log(feedback, null, 2)
    } else {
      setAnsweredQuestion((prev) => prev + 1)
    }
  }
  const handleSelectAnswer = (option) => {
    setSelectedAnswer(option)
  }
  const above80 = () => {
    const congratulations = auth.level.startsWith("C")
      ? [
          "Excellent work! You really know your stuff.",
          "Great job! Your hard work is paying off.",
          "Well done! You scored above 80% — keep it up!",
          "Fantastic result! You should be proud of yourself.",
          "Impressive performance! You’ve mastered this quiz.",
          "Bravo! Your score shows strong understanding.",
          "Congratulations! You passed in flying colours!",
          "Outstanding! You clearly prepared well.",
          "Nice work! You’re doing great!",
          "Super job! Keep learning and pushing forward.",
        ]
      : [
          "Great job! 🎉",
          "Well done! 😊",
          "Awesome work! ⭐",
          "You did it! 👏",
          "Excellent! 🌟",
          "Nice work! 👍",
          "Super job! 🚀",
          "Fantastic! 😄",
          "Good going! 💪",
          "You’re amazing! 🤩",
        ]
    return congratulations[Math.floor(Math.random() * 10)]
  }
  return (
    <div className="page">
      <div className="exercice-div">
        {!gameStarted && (
          <h2>{t("h2SelectTopic")}</h2>
        )}

        {!gameStarted && (
          <SelectTopic
            className="exercice-select"
            topics={grammarTopics}
            selectedTopic={selectedTopic}
            onChange={setSelectedTopic}
          />
        )}
        {!gameStarted && selectedTopic && (
          <button  className="largeBtn" onClick={handleClick} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loader"></span> {t( "btnLoading")}
              </>
            ) : (
              <>
              {t( "btnGenerate")}
              </>
              
            )}
          </button>
        )}

        {/* once exercice is generated and started */}
        {gameStarted && selectedTopic && questions.length > 0 && (
          <h2>{selectedTopic.name?.[lang]}</h2>
        )}

        {gameStarted && instructions && questions.length > 0 && (
          <h3>{instructions}</h3>
        )}
        {gameStarted && selectedTopic.rule && questions.length > 0 && (
          <p>{selectedTopic.rule?.[lang]}</p>
        )}
        {gameStarted &&
          selectedTopic.examples &&
          selectedTopic.examples.length > 0 &&
          questions.length > 0 &&
          selectedTopic.examples.map((e) => (
            <ul>
              <li>{e}</li>
            </ul>
          ))}

        {!finished && gameStarted && questions.length > 0 && (
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
            {t("btnNext")}
          </button>
        )}

        {/* once finished */}

        {finished && (
          <div className="exercicResultDiv">
            <table className="resultTable">
              <thead>
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
              </thead>

              {feedback.map((f, index) => (
                <tbody key={index + "tb"}>
                  <tr
                    key={index + "tr"}
                    className={index % 2 === 0 ? "even" : "odd"}
                  >
                    <td key={index + "td1"}>{f.question}</td>
                    <td key={index + "td2"}>{f.wrongAnswer}</td>
                    <td key={index + "td3"}>{f.correctAnswer}</td>

                    <td key={index + "td4"}>
                      {f.isCorrect ? (
                        <span style={{ color: "green" }}>✓</span>
                      ) : (
                        <span style={{ color: "red" }}>✘</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            {grade > 80 ? (
              <div className="grade">
                {grade}/100 {above80()}
              </div>
            ) : (
              <div className="grade">{grade}/100</div>
            )}
            <button onClick={resetGame}>{t("btnStartNew")}</button>
          </div>
        )}
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return { grammarTopics: state.grammarTopics, auth: state.auth }
}
export default connect(mapStateToProps, { fetchGrammarTopics })(UserExercise)
