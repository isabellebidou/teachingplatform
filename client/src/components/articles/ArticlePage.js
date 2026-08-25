import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

function ArticlePage() {
  const { slug } = useParams()

  const { i18n } = useTranslation()
  const lang = i18n.language.startsWith("fr") ? "fr" : "en"

  const localizedText = (field) => {
    if (typeof field === "string") return field
    return field?.[lang] || field?.en || field?.fr || ""
  }

  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${slug}`)

        if (!response.ok) {
          throw new Error("Article not found")
        }

        const data = await response.json()
        setArticle(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!article) {
    return <p>Article not found.</p>
  }

  return (
    <div className="page">
      <div className="article">
        <h1>{localizedText(article.title)}</h1>

        <p className="itemp">{localizedText(article.excerpt)}</p>

        {article.sections?.map((section, index) => (
          <section key={index}>
            {section.heading && <h2>{localizedText(section.heading)}</h2>}

            {section.body &&
              localizedText(section.body).map((paragraph, i) => (
                <p className="itemp" key={i}>
                  {paragraph}
                </p>
              ))}

            {section.items && localizedText(section.items).length > 0 && (
              <ul className="itemp">
                {localizedText(section.items).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <div className="placeholder"></div>
    </div>
  )
}

export default ArticlePage
