const {
  selectArticlesByID,
  updateVotesByID,
  selectAllArticles
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

const getAllArticles = (req, res, next) => {
  const { query } = req;
  const { sort_by } = req.query;
  const { order } = req.query;
  console.log(sort_by, order);
  console.log("in getAllArticles article controller");
  selectAllArticles(sort_by, order, query)
    .then(articles => {
      console.log(articles, "controller!");
      res.status(200).send(articles);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getArticlesByID, changeVotesByID, getAllArticles };
