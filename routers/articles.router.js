const articlesRouter = require("express").Router();
const {
  getArticlesByID,
  changeVotesByID
} = require("../controllers/articles.controller");
const { handle405Errors } = require("../errors/index");

articlesRouter
  .route("/:article_id")
  .get(getArticlesByID)
  .patch(changeVotesByID)
  .all(handle405Errors);

articlesRouter.route("/").all(handle405Errors);

module.exports = articlesRouter;
