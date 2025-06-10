"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectChatbyId = void 0;
const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
const selectChatbyId = (chats_id) => {
    return Chat.findbyId(chats_id)
        .orFail(() => {
        throw { msg: "Chat does not exist!", status: 404 };
    })
        .then((Chat) => {
        return Chat;
    });
};
exports.selectChatbyId = selectChatbyId;
