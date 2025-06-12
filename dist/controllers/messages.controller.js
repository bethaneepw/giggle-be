"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectMessagesByRoomId, selectMessages, modifyMessageById, addMessageByRoomId, selectMessageByMessageId, } = require("../models/messages.models");
const { mongoose } = require("mongoose");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
exports.postMessageByRoomId = (req, res, next) => {
    const { roomId } = req.params;
    const { senderId, body } = req.body;
    if (!body) {
        return next({ msg: "Body must not be empty", status: 400 });
    }
    return Chat.findById(roomId)
        .orFail(() => {
        throw { msg: "Chat Room does not exist!", status: 404 };
    })
        .then((validChats) => {
        return Chat.find({ _id: roomId, user_ids: { $in: [senderId] } }).orFail(() => {
            throw { msg: "Invalid user for this chat!", status: 400 };
        });
    })
        .then(() => {
        return addMessageByRoomId(roomId, senderId, body);
    })
        .then((message) => {
        res.status(201).send({ message });
    })
        .catch((err) => {
        console.error(" Error creating message", err);
        next(err);
    });
};
exports.getMessagesbyRoomId = (req, res, next) => {
    const { roomId } = req.params;
    return selectMessagesByRoomId(roomId)
        .then((messages) => {
        res.status(200).send({ messages });
    })
        .catch(next);
};
exports.patchMessagebyId = (req, res, next) => {
    const { message_id } = req.params;
    const dataToUpdate = req.body;
    const pendingUpdateMessage = modifyMessageById(message_id, dataToUpdate);
    const pendingSelectMessageByMessageId = selectMessageByMessageId(message_id);
    return Promise.all([pendingUpdateMessage, pendingSelectMessageByMessageId])
        .then(([updatedMessage]) => {
        res.status(200).send({ updatedMessage });
    })
        .catch(next);
};
exports.getAllMessages = (req, res, next) => {
    return selectMessages()
        .then((messages) => {
        res.status(200).send({ messages });
    })
        .catch(next);
};
exports.postMessagebyId = (req, res) => {
    res.status(501).json({ error: "Not implemented" });
};
exports.deleteMessagebyId = (req, res) => {
    res.status(501).json({ error: "Not implemented" });
};
exports.patchMessagebyId = (req, res) => {
    res.status(501).json({ error: "Not implemented" });
};
