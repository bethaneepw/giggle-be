"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyMessageById = exports.getLastMessageByRoomId = exports.getMessageCountByRoomId = exports.addMessageByRoomId = exports.addNewMessage = exports.selectMessagesByRoomId = exports.selectMessageByMessageId = exports.selectMessages = void 0;
const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const Message = mongoose.model("messages", messageSchema);
const selectChatById = require("./chats.models");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
const selectMessages = () => {
    return Message.find({}).then((messages) => {
        return messages;
    });
};
exports.selectMessages = selectMessages;
const selectMessageByMessageId = (messageId) => {
    return Message.findById(messageId)
        .orFail(() => {
        throw { msg: "Message does not exist!", status: 404 };
    })
        .then((message) => {
        return message;
    });
};
exports.selectMessageByMessageId = selectMessageByMessageId;
const selectMessagesByRoomId = (roomId) => {
    console.log("=== selectMessagesByRoomId called with roomId:", roomId);
    console.log("=== roomId type:", typeof roomId);
    const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
        ? new mongoose.Types.ObjectId(roomId)
        : roomId;
    console.log("=== Using queryRoomId:", queryRoomId);
    return Message.find({
        roomId: queryRoomId,
        displayToClient: true
    })
        .sort({ timestamp: 1 })
        .orFail(() => {
        throw { msg: "Chat Room does not exist!", status: 404 };
    })
        .then((messages) => {
        return messages;
    });
};
exports.selectMessagesByRoomId = selectMessagesByRoomId;
const addNewMessage = (roomId, senderId, body, senderUsername = null, displayToClient = true) => {
    if (!roomId || !senderId || !body) {
        throw { msg: "roomId, senderId, and body are required!", status: 400 };
    }
    if (body.trim() === "") {
        throw { msg: "Message body cannot be empty!", status: 400 };
    }
    return Message.create({
        roomId,
        senderId,
        senderUsername,
        body: body.trim(),
        timestamp: new Date(),
        displayToClient,
        msgId: Date.now(),
    }).then((newMessage) => {
        return newMessage;
    });
};
exports.addNewMessage = addNewMessage;
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
const getMessageCountByRoomId = (roomId) => {
    const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
        ? new mongoose.Types.ObjectId(roomId)
        : roomId;
    return Message.countDocuments({
        roomId: queryRoomId,
        displayToClient: true
    }).then((count) => {
        return count;
    });
};
exports.getMessageCountByRoomId = getMessageCountByRoomId;
const getLastMessageByRoomId = (roomId) => {
    const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
        ? new mongoose.Types.ObjectId(roomId)
        : roomId;
    return Message.findOne({
        roomId: queryRoomId,
        displayToClient: true
    })
        .sort({ timestamp: -1 })
        .then((message) => {
        return message;
    });
};
exports.getLastMessageByRoomId = getLastMessageByRoomId;
const modifyMessageById = (message_id, dataToUpdate) => {
    const { displayToClient } = dataToUpdate;
    if (displayToClient === true || displayToClient === false) {
        return Message.findByIdAndUpdate(message_id, { $set: { displayToClient: displayToClient } }, { new: true, runValidators: true }).then((updatedMessage) => {
            return updatedMessage;
        });
    }
    else {
        throw { msg: "Invalid request!", status: 400 };
    }
};
exports.modifyMessageById = modifyMessageById;
module.exports = {
    selectMessages: exports.selectMessages,
    selectMessageByMessageId: exports.selectMessageByMessageId,
    selectMessagesByRoomId: exports.selectMessagesByRoomId,
    addNewMessage: exports.addNewMessage,
    getMessageCountByRoomId: exports.getMessageCountByRoomId,
    getLastMessageByRoomId: exports.getLastMessageByRoomId,
    allMessages: exports.selectMessages
};
