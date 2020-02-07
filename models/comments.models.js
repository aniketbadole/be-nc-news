const connection = require("../connection");
const { checkIfArticleExist } = require("../models/articles.models");

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
  return connection("comments")
    .select("comments.*")
    .where({ article_id })
    .orderBy(sort_by, order)
    .then(commentRows => {
      return Promise.all([commentRows, checkIfArticleExist(article_id)]);
    })
    .then(([commentRows, articleExist]) => {
      if (articleExist) {
        return commentRows;
      } else return Promise.reject({ status: 404, msg: "Not Found" });
    });
  // .then(comments => {
  //   if (comments.length === 0) {
  //     return Promise.reject({ status: 404, msg: "Not Found" });
  //   } else {
  //     return comments;
  //   }

  // if (comments.length !== 0) {
  //   return connection
  //     .select("*")
  //     .from("comments")
  //     .where({ article_id })
  //     .orderBy(sort_by, order);
  // } else {
  //   return Promise.reject({ status: 404, msg: "Not Found" });
  // }

  // });
};

const patchCommentsByCommentID = (comment_id, inc_votes = 0) => {
  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
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
