const postCommentByArticleID = require("../models/comments.models");

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

module.exports = addCommentByArticleID;
