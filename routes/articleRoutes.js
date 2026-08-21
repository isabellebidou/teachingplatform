import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";
import requireAdminAccess from "../middlewares/requireAdminAccess.js";
import { logError } from "../services/utils.js";

export default (app) => {
  const Article = mongoose.model("articles");

  // GET all published articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await Article.find({ published: true }).sort({
        createdAt: -1,
      });
      res.send(articles);
    } catch (err) {
      logError(err);
      res.status(500).send("Failed to fetch articles");
    }
  });

  // GET one published article by English or French slug
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await Article.findOne({
        published: true,
        $or: [{ "slug.en": req.params.slug }, { "slug.fr": req.params.slug }],
      });

      if (!article) {
        return res.status(404).send("Article not found");
      }

      res.send(article);
    } catch (err) {
      logError(err);
      res.status(500).send("Failed to fetch article");
    }
  });

  // CREATE article
  app.post(
    "/api/article",
    requireLogin,
    requireAdminAccess,
    async (req, res) => {
      try {
        const { slug, title, excerpt, category, published, sections } = req.body;

        const article = new Article({
          slug,
          title,
          excerpt,
          category,
          published,
          sections,
        });

        await article.save();

        res.send(article);
      } catch (err) {
        logError(err);
        res.status(422).send(err);
      }
    },
  );
};
