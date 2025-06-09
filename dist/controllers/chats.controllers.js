"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chats = require("../../db/data/test/chats");
exports.getChatbyId = (req, res, next) => {
    const { chats_id } = req.params;
    return selectChatbyId(chats_id)
        .then((chat) => {
        res.status(200).send({ chat });
    })
        .catch(next);
};
