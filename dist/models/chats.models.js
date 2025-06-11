"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectChatsByUserId = exports.selectChatById = exports.updateChatUsers = exports.deleteChatByChatId = exports.addNewChat = exports.selectChats = void 0;
const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
const selectChats = () => {
    return Chat.find({}).then((chats) => {
        return chats;
    });
};
exports.selectChats = selectChats;
const addNewChat = (user_ids) => {
    if (!user_ids || user_ids.length !== 2) {
        throw { msg: "Chat must have exactly 2 user IDs!", status: 400 };
    }
    return Chat.create({
        user_ids,
    }).then((newChat) => {
        return newChat;
    });
};
exports.addNewChat = addNewChat;
const deleteChatByChatId = (chatId) => {
    return Chat.findByIdAndDelete(chatId).then(() => { });
};
exports.deleteChatByChatId = deleteChatByChatId;
const updateChatUsers = (chatId, user_ids) => {
    if (!user_ids || user_ids.length !== 2) {
        throw { msg: "Chat must have exactly 2 user IDs!", status: 400 };
    }
    return Chat.findByIdAndUpdate(chatId, { user_ids: user_ids }, { new: true, runValidators: true }).then((updatedChat) => {
        return updatedChat;
    });
};
exports.updateChatUsers = updateChatUsers;
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
