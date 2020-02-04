const {
  selectArticlesByID,
  updateVotesByID
} = require("../models/articles.models");

const getArticlesByID = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesByID(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const changeVotesByID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateVotesByID(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getArticlesByID, changeVotesByID };
