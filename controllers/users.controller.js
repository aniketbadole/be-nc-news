const selectUsers = require("../models/users.models");

const getUsers = (req, res, next) => {
  const { username } = req.params;
  selectUsers(username)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = getUsers;
