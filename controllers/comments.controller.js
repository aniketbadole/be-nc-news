const {
  postCommentByArticleID,
  getAllCommentsByArticleID
} = require("../models/comments.models");

const addCommentByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;
  postCommentByArticleID(article_id, username, body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

const getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  getAllCommentsByArticleID(article_id)
    .then(comments => {
      console.log(comments, "controller!!");
      res.status(200).send(comments);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { addCommentByArticleID, getCommentsByArticleID };
