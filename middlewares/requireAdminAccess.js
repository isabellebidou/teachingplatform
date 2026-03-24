// middlewares/requireAdmin.js
export default (req, res, next) => {
  if (req.user.type === "user") {
    return res.status(401).send({ error: "restricted access" });
  }
  next();
};