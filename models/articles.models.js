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

const selectAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  console.log("in selectAllArticles article model");
  //const key = Object.keys(query)[0];
  //const value = Object.values(query)[0];
  //console.log(key, value, "query kv");
  const authorQuery = queryBuilder => {
    if (author !== undefined) {
      queryBuilder.where("articles.author", author);
    }
  };
  const topicQuery = queryBuilder => {
    if (topic !== undefined) {
      queryBuilder.where("topic", topic);
    }
  };
  return connection("articles")
    .select("articles.*")
    .orderBy(sort_by, order)
    .modify(topicQuery)
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(authorQuery)
    .then(articles => {
      console.log(articles, "model!");
      return articles;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = { selectArticlesByID, updateVotesByID, selectAllArticles };
