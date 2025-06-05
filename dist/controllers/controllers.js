"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = require("../../endpoints.json");
exports.getApi = (req, res) => {
    res.status(200).send({ endpoints });
};
