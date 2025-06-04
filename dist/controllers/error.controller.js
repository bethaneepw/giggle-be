"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongoErrors = (err, req, res, next) => {
    if (err.name === "CastError") {
        if (err.kind === "ObjectId") {
            res.status(400).send({ msg: "Invalid request!" });
        }
    }
    else
        next(err);
};
const handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
const catchAllErrors = (err, req, res, next) => {
    console.log(err, "error log in catch all");
    res.status(500).send({ msg: "Internal server error!" });
};
module.exports = { handleCustomErrors, catchAllErrors, handleMongoErrors };
