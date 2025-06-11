"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = require("../../endpoints.json");
const getApi = (req, res) => {
    res.status(200).send({ endpoints });
};
module.exports = { getApi };
// const endpoints = require("../../endpoints.json");
// import { Request, Response } from "express";
// exports.getApi = (req: Request, res: Response): void => {
//   res.status(200).send({ endpoints });
// };
