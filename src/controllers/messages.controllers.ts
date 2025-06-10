import { Request, Response } from "express";
const { eventSchema } = require("../../db/schema/eventSchema");
const { mongoose } = require("mongoose");
const { selectMessagesByChatId} = require("../models/messages.models")

exports.getMessagesByChatId = (req: Request, res: Response, next): Promise<void> => {
    const { chat_id } = req.params;
    return selectMessagesByChatId(chat_id)
    .then((event) => {
        res.status(200).send({ event })
    })
    .catch(next);
}