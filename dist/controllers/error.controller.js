"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongoErrors = (err, req, res, next) => { };
const handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
const catchAllErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal server error!" });
};
module.exports = { handleCustomErrors, catchAllErrors, handleMongoErrors };
