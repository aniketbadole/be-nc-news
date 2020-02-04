const connection = require("../connection");

const postCommentByArticleID = (article_id, username, body) => {
  return connection("comments")
    .insert({
      article_id: article_id,
      author: username,
      body: body
    })
    .returning("*")
    .then(comment => {
      console.log(comment, "******");
      return comment[0];
    });
};

const getAllCommentsByArticleID = article_id => {
  // console.log("in model");
  return connection("comments")
    .select("comments.*")
    .where({ article_id })
    .then(results => {
      return results;
    });
};

module.exports = { postCommentByArticleID, getAllCommentsByArticleID };
