"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { eventSchema } = require("../../db/schema/eventSchema");
const { mongoose } = require("mongoose");
exports.getMessagesByChatId = (req, res, next) => {
    const { chat_id } = req.params;
    return selectMessagesByChatId(chat_id)
        .then((event) => {
        res.status(200).send({ event });
    })
        .catch(next);
};
