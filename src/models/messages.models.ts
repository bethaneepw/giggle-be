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

export const selectMessagesByRoomId = (roomId:any) => {
  return Message.find({ 
    roomId: roomId,
    displayToClient: true 
  })
    .sort({ timestamp: 1 })
   .orFail(() => {
      throw { msg: "Chat Room does not exist!", status: 404 };
    })
    .then((messages: any) => {
      return messages;
    });
};


// export const addNewMessage = (
//   roomId,
//   senderId,
//   body,
//   senderUsername = null,
//   displayToClient = true
// ) => {
//   if (!roomId || !senderId || !body) {
//     throw { msg: "roomId, senderId, and body are required!", status: 400 };
//   }

//   if (body.trim() === "") {
//     throw { msg: "Message body cannot be empty!", status: 400 };
//   }

//   return Message.create({
//     roomId,
//     senderId,
//     senderUsername,
//     body: body.trim(),
//     timestamp: new Date(),
//     displayToClient,
//     msgId: Date.now(),
//   }).then((newMessage) => {
//     return newMessage;
//   });
// };

export const addMessageByRoomId = (roomId: any, senderId: any, body: any) => {
  return Message.create({
    roomId: "68405d38239a61ea5b7ad207",
    senderId,
    body,
  }).then((message: any) => {
    return message;
  });
};

export const getMessageCountByRoomId = (roomId) => {
  return Message.countDocuments({ 
    roomId: roomId,
    displayToClient: true 
  }).then((count) => {
    return count;
  });
};

export const getLastMessageByRoomId = (roomId) => {
  return Message.findOne({ 
    roomId: roomId,
    displayToClient: true 
  })
    .sort({ timestamp: -1 })
    .then((message) => {
      return message;
    });
};

export const modifyMessageById = (message_id, dataToUpdate) => {
  const { displayToClient } = dataToUpdate;
  if (displayToClient !== true || false) {
    throw { msg: "Invalid request!"}
  }
  return Message.findByIdAndUpdate(message_id, {displayToClient: displayToClient}, { new: true, runValidators: true })
}