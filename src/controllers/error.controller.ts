import { ErrorRequestHandler } from "express";


const handleCustomErrors: ErrorRequestHandler = (err , req, res, next) => {
    if(err.status){
        res.status(err.status).send({msg: err.msg})
    } else next(err)
}

const catchAllErrors: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).send({msg: "Internal server error!"})
}

module.exports = {handleCustomErrors, catchAllErrors}