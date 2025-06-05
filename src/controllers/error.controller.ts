import { ErrorRequestHandler } from "express";

const handleMongoErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    if (err.kind === "ObjectId") {
      res.status(400).send({ msg: "Invalid request!" });
    }
  }

  if (err.errors) {
    res.status(400).send({ msg: "Invalid information!" });
  } else next(err);
};

const handleCustomErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

const catchAllErrors: ErrorRequestHandler = (err, req, res) => {
  console.log(err, "Error log in catch all");
  res.status(500).send({ msg: "Internal server error!" });
};

module.exports = { handleCustomErrors, catchAllErrors, handleMongoErrors };
