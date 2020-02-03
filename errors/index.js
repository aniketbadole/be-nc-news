exports.handleCustomErorrs = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErorrs = (err, req, res, next) => {
  if (err.code !== undefined) {
    const psqlErrors = {
      23503: { status: 404, msg: "Not Found" },
      "22P02": { status: 400, msg: "Invalid Query" }
    };
    res
      .status(psqlErrors[err.code].status)
      .send({ msg: psqlErrors[err.code].msg });
  } else next(err);
};

exports.handleServerErorrs = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handle405Errors = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
