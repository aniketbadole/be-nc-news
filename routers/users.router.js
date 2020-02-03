const usersRouter = require("express").Router();
const getUsers = require("../controllers/users.controller");
const { handle405Errors } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUsers)
  .all(handle405Errors);

usersRouter.route("/").all(handle405Errors);

module.exports = usersRouter;
