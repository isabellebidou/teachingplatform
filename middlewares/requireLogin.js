// middlewares/requireLogin.js
export default (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "you must sign in" });
  }
  next();
};