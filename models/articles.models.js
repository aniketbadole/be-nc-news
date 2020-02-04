const connection = require("../connection");

const selectArticlesByID = article_id => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count({ comment_count: "comment_id" })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return article[0];
      }
    });
};

// const checkIfArticleExist = article_id => {
//   return connection("articles")
//     .select("articles.*")
//     .where({ article_id }).then(articleRows => {
//       if (articleRows.length === 0)
//     })
// };

const updateVotesByID = (article_id, inc_votes) => {
  return connection("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(article => {
      return article[0];
    });
};

module.exports = { selectArticlesByID, updateVotesByID };
