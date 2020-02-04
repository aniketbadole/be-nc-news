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

module.exports = postCommentByArticleID;
