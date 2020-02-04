const selectArticlesByID = require("../models/articles.models");

const getArticlesByID = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesByID(article_id)
    .then(article => {
      console.log({ article }, "controller!!!!");
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = getArticlesByID;
