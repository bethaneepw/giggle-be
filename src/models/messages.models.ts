const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const Message = mongoose.model("messages", messageSchema);
const selectChatById = require("./chats.models");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

export const selectMessages = () => {
  return Message.find({}).then((messages) => {
    return messages;
  });
};

export const selectMessageByMessageId = (messageId) => {
  return Message.findById(messageId)
    .orFail(() => {
      throw { msg: "Message does not exist!", status: 404 };
    })
    .then((message) => {
      return message;
    });
};

export const selectMessagesByRoomId = (roomId: any) => {
  console.log("=== selectMessagesByRoomId called with roomId:", roomId);
  console.log("=== roomId type:", typeof roomId);

  const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
    ? new mongoose.Types.ObjectId(roomId)
    : roomId;

  console.log("=== Using queryRoomId:", queryRoomId);

  return Message.find({
    roomId: queryRoomId,
    displayToClient: true,
  })
    .sort({ timestamp: 1 })
    .orFail(() => {
      throw { msg: "Chat Room does not exist!", status: 404 };
    })
    .then((messages: any) => {
      return messages;
    });
};

export const addNewMessage = (
  roomId,
  senderId,
  body,
  senderUsername = null,
  displayToClient = true
) => {
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

export const addMessageByRoomId = (roomId: any, senderId: any, body: any) => {
  if (
    !mongoose.Types.ObjectId.isValid(roomId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw { msg: "Invalid roomId or senderId", status: 400 };
  }

  return Message.create({
    roomId,
    senderId,
    body,
  }).then((message: any) => {
    return message;
  });
};

export const getMessageCountByRoomId = (roomId) => {
  const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
    ? new mongoose.Types.ObjectId(roomId)
    : roomId;

  return Message.countDocuments({
    roomId: queryRoomId,
    displayToClient: true,
  }).then((count) => {
    return count;
  });
};

export const getLastMessageByRoomId = (roomId) => {
  const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
    ? new mongoose.Types.ObjectId(roomId)
    : roomId;

  return Message.findOne({
    roomId: queryRoomId,
    displayToClient: true,
  })
    .sort({ timestamp: -1 })
    .then((message) => {
      return message;
    });
};

export const modifyMessageById = (message_id, dataToUpdate) => {
  const { displayToClient } = dataToUpdate;

  if (displayToClient === true || displayToClient === false) {
    return Message.findByIdAndUpdate(
      message_id,
      { $set: { displayToClient: displayToClient } },
      { new: true, runValidators: true }
    ).then((updatedMessage: any) => {
      return updatedMessage;
    });
  } else {
    throw { msg: "Invalid request!", status: 400 };
  }
};
