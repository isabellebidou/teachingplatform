import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGrammarTopics } from "./../../actions"
import { useTranslation } from "react-i18next"
import DataEditor from "./DataEditor.js"
import axios from "axios"

function TopicDetails({ topic, editMode, setEditMode }) {
  const { t, i18n } = useTranslation("topic")
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const lang = i18n.language.startsWith("fr") ? "fr" : "en"

  const [formData, setFormData] = useState(topic)
  const saveTopic = async () => {
    //const res = await axios.post("/api/exercice", { selectedTopic })
    /*console.log("topic._id", topic._id)
    console.log("formData._id", formData._id)*/
    try {
      const res = await axios.put(`/api/grammarTopics/${topic._id}`, formData)

      const updatedTopic = res.data

      setFormData(updatedTopic)
      dispatch(fetchGrammarTopics())

      //  alert("Topic saved")
    } catch (err) {
      console.error(err)
      alert("Save failed")
    }
  }

  useEffect(() => {
    setFormData(topic)
  }, [topic])

  if (!topic) return <div className="placeholder">No topic selected</div>

  return (
    <>
      {auth && auth.type === "admin" &&(
      <div className="topicsEditModeBtnDiv">
        <button
          className="topicsEditMode"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel Edit" : "Edit Topic"}
        </button>
        {editMode && <button onClick={saveTopic}>Save Topic</button>}
      </div>)}
      {!editMode && (
        <div>
          <h2>
            {t("h2TopicName")}: {topic.name?.[lang]} - {topic.level}
          </h2>

          <p>
            {t("pTopicRule")}: {topic.rule?.[lang]}
          </p>

          {topic.examples?.length > 0 && (
            <>
              <h3>{t("h3TopicExamples")}</h3>

              <ul>
                {topic.examples.map((e, index) => (
                  <li key={index}>{e}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {editMode && (
        <div className="admin-edit-panel">
          <h2>Edit Grammar Topic</h2>

          <h3>Name</h3>

          <label>English</label>
          <textarea
            value={formData.name?.en || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: {
                  ...formData.name,
                  en: e.target.value,
                },
              })
            }
          />

          <label>French</label>
          <textarea
            value={formData.name?.fr || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: {
                  ...formData.name,
                  fr: e.target.value,
                },
              })
            }
          />

          <h3>Level</h3>

          <select
            value={formData.level || "A1"}
            onChange={(e) =>
              setFormData({
                ...formData,
                level: e.target.value,
              })
            }
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <h3>Rule</h3>

          <label>English</label>
          <textarea
            value={formData.rule?.en || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                rule: {
                  ...formData.rule,
                  en: e.target.value,
                },
              })
            }
          />

          <label>French</label>
          <textarea
            value={formData.rule?.fr || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                rule: {
                  ...formData.rule,
                  fr: e.target.value,
                },
              })
            }
          />

          <h3>Allowed Answers</h3>

          <textarea
            value={(formData.allowedAnswers || []).join("\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                allowedAnswers: e.target.value.split("\n").filter(Boolean),
              })
            }
          />

          <h3>Allowed Incorrect Answers</h3>

          <textarea
            value={(formData.allowedIncorrectAnswers || []).join("\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                allowedIncorrectAnswers: e.target.value
                  .split("\n")
                  .filter(Boolean),
              })
            }
          />

          <h3>Suggestions</h3>

          <textarea
            value={(formData.suggestions || []).join("\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                suggestions: e.target.value.split("\n").filter(Boolean),
              })
            }
          />

          <h3>Examples</h3>

          <textarea
            value={(formData.examples || []).join("\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                examples: e.target.value.split("\n").filter(Boolean),
              })
            }
          />

          <h3>Common Errors</h3>

          <textarea
            value={(formData.commonErrors || []).join("\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                commonErrors: e.target.value.split("\n").filter(Boolean),
              })
            }
          />

          <h3>Number Of Options</h3>

          <input
            type="number"
            value={formData.numberOfOptions || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                numberOfOptions: Number(e.target.value),
              })
            }
          />

          <h3>Detail</h3>

          <textarea
            value={formData.detail || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                detail: e.target.value,
              })
            }
          />

          <h3>Active</h3>

          <select
            value={String(formData.active)}
            onChange={(e) =>
              setFormData({
                ...formData,
                active: e.target.value === "true",
              })
            }
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <button
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                data: [
                  ...prev.data,
                  {
                    instructions: "",
                    questions: [],
                  },
                ],
              }))
            }
          >
            + Add Dataset
          </button>
          <DataEditor data={formData.data} setFormData={setFormData} />
        </div>
      )}
    </>
  )
}

export default TopicDetails
