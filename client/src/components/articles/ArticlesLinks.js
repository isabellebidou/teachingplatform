import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

function ArticleList() {
  const [items, setItems] = useState([])
  const { i18n } = useTranslation()
  const lang = i18n.language.startsWith("fr") ? "fr" : "en"
  const localizedText = (field) => {
    if (typeof field === "string") return field
    return field?.[lang] || field?.en || field?.fr || ""
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const userData = await fetch(`/api/articles/`)
    const items = await userData.json()
    setItems(items)
  }

  return (
    <section>
      <dl key={0}>
        {items.map((article, i) => {
          const slug = localizedText(article.slug)
          const excerpt = localizedText(article.excerpt)

          return (
            <div key={article._id}>
              <dt key={i + "dt"}>{slug}</dt>
              <dd key={i + "dd"}>{excerpt}</dd>
              <Link to={`/articles/${slug}`}>Read more</Link>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

export default ArticleList
