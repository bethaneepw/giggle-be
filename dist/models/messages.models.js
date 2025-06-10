"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageByRoomId = exports.allMessages = exports.selectMessagesbyRoomId = void 0;
const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const Message = mongoose.model("messages", messageSchema);
const selectChatById = require("./chats.models");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
const selectMessagesbyRoomId = (roomId) => {
    return Message.find({ roomId: roomId })
        .orFail(() => {
        throw { msg: "Chat Room does not exist!", status: 404 };
    })
        .then((messages) => {
        return messages;
    });
};
exports.selectMessagesbyRoomId = selectMessagesbyRoomId;
const allMessages = () => {
    return Message.find({}).then((messages) => {
        return messages;
    });
};
exports.allMessages = allMessages;
const addMessageByRoomId = (roomId, senderId, body) => {
    return Message.create({
        roomId: "68405d38239a61ea5b7ad207",
        senderId,
        body,
    }).then((message) => {
        return message;
    });
};
exports.addMessageByRoomId = addMessageByRoomId;
