const connection = require("../connection");

const selectUsers = username => {
  return connection("users")
    .select("*")
    .where("username", username)
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return results[0];
      }
    });
};

module.exports = selectUsers;
