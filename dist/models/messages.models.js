"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMessages = exports.selectChatbyId = void 0;
const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const message = mongoose.model("messages", messageSchema);
const selectChatbyId = (roomId) => {
    return message.findbyId(roomId)
        .orFail(() => {
        throw { msg: "Message does not exist, status:404" };
    })
        .then((message) => {
        return message;
    });
};
exports.selectChatbyId = selectChatbyId;
const allMessages = () => {
    return message.find({}).then((messages) => {
        return messages;
    });
};
exports.allMessages = allMessages;

