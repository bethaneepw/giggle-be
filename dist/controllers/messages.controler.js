"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectMessagebyRoomId, allMessages } = require("../models/messages.models");
// const { mongoose } = require("mongoose");
// const message = mongoose.model("messages", messageSchema)
exports.postMessagebyId = (req, res, next) => {
    const { roomId } = req.params;
    return selectChatbyId(roomId)
        .then((Message) => {
        res.status(201).send({ Message });
    })
        .catch(next);
};
exports.getMessagebyRoomId = (req, res, next) => {
    const { roomId } = req.params;
    return selectMessagebyRoomId(roomId)
        .then((Message) => {
        res.status(200).send({ Message });
    })
        .catch(next);
};
exports.deleteMessagebyId = (req, res, next) => {
    const { message_id } = req.params;
    return removeMessagebyId(message_id)
        .then((Message) => {
        res.status(204).send({ Message });
    })
        .catch(next);
};
exports.patchMessagebyId = (req, res, next) => {
    const { message_id } = req.params;
    return modifyMessagebyId(message_id)
        .then((Message) => {
        res.status(204).send({ Message });
    })
        .catch(next);
};
exports.getAllMessages = (req, res, next) => {
    return allMessages()
        .then((messages) => {
        res.status(200).send({ messages });
    })
        .catch(next);
};
