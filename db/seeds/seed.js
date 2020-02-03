const {
  topicsData,
  articlesData,
  commentsData,
  usersData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  console.log(articlesData);
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicsData);
      const usersInsertions = knex("users").insert(usersData);

      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedArticleData = formatDates(articlesData);
      console.log(formattedArticleData, "<<<");
      return knex("articles")
        .insert(formattedArticleData)
        .returning("*");
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentsData, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
