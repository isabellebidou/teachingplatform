import { fetchTopics } from "../../actions"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import TopicList from "./TopicList.js"
import TopicDetails from "./TopicDetails.js"
import { useTranslation } from "react-i18next"
// exercice
import QuestionBundle from "../exercice/QuestionBundle.js"
import axios from "axios"

function TopicsDashboard({ topics = [], auth, fetchTopics }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [editMode, setEditMode] = useState(false);
  const { t, i18n } = useTranslation("exercise")
  const lang = i18n.language.startsWith("fr") ? "fr" : "en"
  const [search, setSearch] = useState("")
  const filteredTopics = topics.filter((topic) =>
    topic.name?.[lang]?.toLowerCase().includes(search.toLowerCase()),
  )

  // exercice
  const [questions, setQuestions] = useState([])
  const [instructions, setInstructions] = useState(null)
  const [answeredQuestion, setAnsweredQuestion] = useState(0) // index
  const [score, setScore] = useState(0)
  const [gameStarted, setStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedBack] = useState([])
  const Ai = false



  useEffect(() => {
    fetchTopics()
  }, [fetchTopics])

  useEffect(() => {
    if (topics.length > 0) {
      setSelectedTopic(topics[0])
    }
  }, [topics])



  const [dataSetIndex, setDataSetIndex] = useState(0);


  const grade = Math.round((score * 100) / questions?.length)
  // exercice
  useEffect(() => {}, [questions])
  const resetGame = () => {
    setQuestions([])
    setSelectedTopic(topics[0])
    setStarted(false)
    setIsLoading(false)
    setInstructions(null) 
    setAnsweredQuestion(0)
    setScore(0)
    setFinished(false)
    setSelectedAnswer(null)
    setFeedBack([])

  }
  const startNewDrill = () => {
  // reset game state
  setStarted(false);
  setIsLoading(false);
  setAnsweredQuestion(0);
  setScore(0);
  setFinished(false);
  setSelectedAnswer(null);
  setFeedBack([]);

  // next dataset

 const nextIndex = (dataSetIndex + 1) % selectedTopic.data.length;

  setDataSetIndex(nextIndex);
  setInstructions(selectedTopic.data[nextIndex].instructions)
  setQuestions(selectedTopic.data[nextIndex].questions)
  setStarted(true)
};
  const handleClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    //console.log("selectedTopic", selectedTopic)
    if (Ai) {
      try {
        const res = await axios.post("/api/exercice", { selectedTopic })
        setQuestions(res.data.questions)
        setInstructions(res.data.instructions)
        setStarted(true)
      } catch (err) {
        console.error("Error generating exercice:", err)
      } finally {
      }
    } else {
      const data = Array.isArray(selectedTopic.data)
        ? selectedTopic.data[dataSetIndex]
        : selectedTopic.data
      setQuestions(data.questions)
      setInstructions(data.instructions)
      setStarted(true)
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
      console.log(feedback, null, 2)
    } else {
      setAnsweredQuestion((prev) => prev + 1)
    }
  }
  const handleSelectAnswer = (option) => {
    setSelectedAnswer(option)
  }
  const above80 = () => {
    const congratulations = auth?.level?.startsWith("C")
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
      <div className="topicsContainer">
      {!gameStarted && (
        <>
          <div className="leftp">
            <div className="placeholder"></div>
            <div id="selectSearch">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <TopicList
              topics={!filteredTopics === "" ? filteredTopics : topics}
              onSelect={setSelectedTopic}
              selectedTopic={selectedTopic}
            />
            <div className="placeholder"></div>
          </div>
          <div className="rightp">
            <TopicDetails 
            topic={selectedTopic} 
            editMode={editMode}
            setEditMode={setEditMode}
            />
            <div className="placeholder"></div>
          </div>
        </>
      )}

      <div className="exercice-div">


        {/* once exercice is generated and started */}
        {gameStarted && selectedTopic && questions.length > 0 &&
        <h2>{selectedTopic.name?.[lang]}</h2>}

        {gameStarted && instructions && questions.length > 0 &&
        <h3>{instructions}</h3>}
        {gameStarted && selectedTopic.rule &&  questions.length > 0 && (
          <p>{selectedTopic.rule?.[lang]}</p>
        )}
        <ul key={"ul"}>
          {gameStarted &&
            selectedTopic.examples &&
            selectedTopic.examples.map((e, i) => <li key={i + "st"}>{e}</li>)}
        </ul>

        {!finished && gameStarted && (
          <QuestionBundle
            questionIndex={answeredQuestion}
            question={questions[answeredQuestion]}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          ></QuestionBundle>
        )}
        {gameStarted && !finished && (
          <button className="largeStopBtn" onClick={resetGame}>
            Stop
          </button>
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
            {Array.isArray(selectedTopic.data)  && dataSetIndex < selectedTopic.data.length-1 &&(
            <button class="next-button" onClick={startNewDrill}>{t("btnStartNew")}</button>
            )}

            <button  class="largeStopBtn" onClick={resetGame}>{t("btnTopics")}</button>
          </div>
        )}
                {!gameStarted && !editMode && selectedTopic && (
          <button className="exo" onClick={handleClick} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loader"></span> {t("btnLoading")}
              </>
            ) : (
              <>{t("btnGenerate")}</>
            )}
          </button>
        )}
      </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { topics: state.topics, auth: state.auth }
}

export default connect(mapStateToProps, { fetchTopics })(TopicsDashboard)
