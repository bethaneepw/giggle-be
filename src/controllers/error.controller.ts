import { ErrorRequestHandler } from "express";

// const handleMongoErrors: ErrorRequestHandler = (err, req, res, next) => {};

const handleCustomErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err, "err in handlecustom");
  console.log(next);
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

const catchAllErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error!" });
};

module.exports = { handleCustomErrors, catchAllErrors };
