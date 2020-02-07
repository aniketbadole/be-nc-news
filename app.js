const express = require("express");

const app = express();
app.use(express.json());

const apiRouter = require("./routers/api.router");
const {
  handle405Errors,
  handleCustomErorrs,
  handlePsqlErorrs,
  handleServerErorrs
} = require("./errors/index");

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send("Route does not exist!");
});

app.use(handle405Errors);
app.use(handleCustomErorrs);
app.use(handlePsqlErorrs);
app.use(handleServerErorrs);

module.exports = app;
