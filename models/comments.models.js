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
      return comment[0];
    });
};

const getAllCommentsByArticleID = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  // console.log("in model");
  return connection("comments")
    .select("comments.*")
    .where({ article_id })
    .orderBy(sort_by, order)
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return comments;
      }
      // if (comments.length !== 0) {
      //   return connection
      //     .select("*")
      //     .from("comments")
      //     .where({ article_id })
      //     .orderBy(sort_by, order);
      // } else {
      //   return Promise.reject({ status: 404, msg: "Not Found" });
      // }
    });
};

const patchCommentsByCommentID = (comment_id, inc_votes = 0) => {
  console.log("patchCommentsByCommentID comments model");
  console.log(inc_votes, "model inc_votes***");

  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      console.log(comment[0], "from model");
      return comment[0];
    });
};

const deleteCommentByCommentID = comment_id => {
  return connection("comments")
    .del()
    .where({ comment_id });
};

module.exports = {
  postCommentByArticleID,
  getAllCommentsByArticleID,
  patchCommentsByCommentID,
  deleteCommentByCommentID
};
