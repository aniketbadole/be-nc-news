const commentsRouter = require("express").Router();
const {
  changeVotesByCommentID
} = require("../controllers/comments.controller");
const { handle405Errors } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(changeVotesByCommentID)
  .all(handle405Errors);

module.exports = commentsRouter;
