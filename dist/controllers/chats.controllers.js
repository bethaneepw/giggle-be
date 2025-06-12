"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatById = exports.getChats = void 0;
const { selectChats, selectChatById } = require("../models/chats.models");
const { selectUserByUserId } = require("../models/users.models");
const { selectMessagesByRoomId, getMessageCountByRoomId, getLastMessageByRoomId, } = require("../models/messages.models");
const getChats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield selectChats();
        const chatsWithUserInfo = yield Promise.all(chats.map((chat) => __awaiter(void 0, void 0, void 0, function* () {
            const userPromises = chat.user_ids.map((userId) => selectUserByUserId(userId).catch(() => null));
            const users = (yield Promise.all(userPromises)).filter((user) => user !== null);
            const messageCount = yield getMessageCountByRoomId(chat._id);
            const lastMessage = yield getLastMessageByRoomId(chat._id);
            return Object.assign(Object.assign({}, chat.toObject()), { users: users.map((user) => ({
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                })), messageCount, lastMessage: lastMessage
                    ? {
                        body: lastMessage.body,
                        timestamp: lastMessage.timestamp,
                        senderUsername: lastMessage.senderUsername,
                    }
                    : null });
        })));
        res.status(200).json(chatsWithUserInfo);
    }
    catch (error) {
        next(error);
    }
});
exports.getChats = getChats;
const getChatById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chat_id } = req.params;
        const chat = yield selectChatById(chat_id);
        const messages = yield selectMessagesByRoomId(chat_id);
        const chatWithMessages = Object.assign(Object.assign({}, chat.toObject()), { msgs: messages });
        res.status(200).json(chatWithMessages);
    }
    catch (error) {
        console.error("=== Error in getChatById:", error);
        next(error);
    }
});
exports.getChatById = getChatById;
