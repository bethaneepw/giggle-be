"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectChatsByUserId = exports.selectChatById = void 0;
const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
const selectChatById = (_id) => {
    return Chat.findById(_id)
        .orFail(() => {
        throw { msg: "Chat does not exist!", status: 404 };
    })
        .then((chat) => {
        return chat;
    });
};
exports.selectChatById = selectChatById;
const selectChatsByUserId = (_id) => {
    return Chat.find({ user_ids: { $in: [_id] } })
        .orFail(() => {
        throw { msg: "Chat does not exist!", status: 404 };
    })
        .then((chat) => {
        return chat;
    });
};
exports.selectChatsByUserId = selectChatsByUserId;
