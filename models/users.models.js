const connection = require("../connection");

const selectUsers = username => {
  return connection("users")
    .select("*")
    .where("username", username)
    .then(results => {
      return results[0];
    });
};

module.exports = selectUsers;
