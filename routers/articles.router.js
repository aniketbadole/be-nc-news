const articlesRouter = require("express").Router();
const {
  getArticlesByID,
  changeVotesByID
} = require("../controllers/articles.controller");
const {
  addCommentByArticleID,
  getCommentsByArticleID
} = require("../controllers/comments.controller");
const { handle405Errors } = require("../errors/index");

articlesRouter
  .route("/:article_id")
  .get(getArticlesByID)
  .patch(changeVotesByID)
  .all(handle405Errors);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleID)
  .post(addCommentByArticleID)
  .all(handle405Errors);

articlesRouter.route("/").all(handle405Errors);

module.exports = articlesRouter;
