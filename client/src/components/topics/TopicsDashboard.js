import { fetchTopics } from "../../actions"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import TopicList from "./TopicList.js"
import TopicDetails from "./TopicDetails.js"
import { useTranslation } from "react-i18next"


function TopicsDashboard({ topics = [], fetchTopics }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const displayedTopic = selectedTopic || topics[0] || null
  const { t, i18n } = useTranslation("exercise")
  const lang = i18n.language.startsWith("fr") ? "fr" : "en"
  const [search, setSearch] = useState("")
  const filteredTopics = topics.filter((topic) =>
    topic.name?.[lang]?.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    fetchTopics()
  }, [fetchTopics])

  useEffect(() => {
    if (topics.length > 0) {
      setSelectedTopic(topics[0])
    }
  }, [topics])

  return (
    <div className="page">
              <div className="leftp">
      <div id="selectDiv">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

        <TopicList
          topics={!filteredTopics == "" ? filteredTopics : topics}
          onSelect={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
      </div>
      <div className="rightp">
      <TopicDetails topic={selectedTopic} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { topics: state.topics }
}

export default connect(mapStateToProps, { fetchTopics })(TopicsDashboard)
