"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectChatById = void 0;
const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
const selectChatById = (chats_id) => {
    return Chat.findById(chats_id)
        .orFail(() => {
        throw { msg: "Chat does not exist!", status: 404 };
    })
        .then((chat) => {
        return chat;
    });
};
exports.selectChatById = selectChatById;
