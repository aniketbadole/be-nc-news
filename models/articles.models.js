const connection = require("../connection");

const selectArticlesByID = article_id => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count({ comment_count: "comment_id" })
    .then(article => {
      console.log(article, "in model!!!!");
      return article[0];
    });
};

module.exports = selectArticlesByID;
