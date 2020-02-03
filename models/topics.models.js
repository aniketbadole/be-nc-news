const connection = require("../connection");

const selectTopics = () => {
  return connection("topics")
    .select("*")
    .then(results => {
      return results;
    });
};

module.exports = selectTopics;
