"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectChatById, selectChatsByUserId } = require("../models/chats.models");
const chats = require("../../db/data/test/chats");
exports.getChatById = (req, res, next) => {
    const { chats_id } = req.params;
    return selectChatById(chats_id)
        .then((chat) => {
        res.status(200).send({ chat });
    })
        .catch(next);
};
exports.getChatsByUserId = (req, res, next) => {
    const { user_id } = req.params;
    console.log(user_id);
    return selectChatsByUserId(user_id).then((chats) => {
        res.status(200).send({ chats });
    });
};
