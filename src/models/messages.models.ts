const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const Message = mongoose.model("messages", messageSchema);
const selectChatById = require("./chats.models");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

export const selectMessagesbyRoomId = (roomId: any) => {
  return Message.find({ roomId: roomId })
    .orFail(() => {
      throw { msg: "Chat Room does not exist!", status: 404 };
    })
    .then((messages: any) => {
      return messages;
    });
};

export const allMessages = () => {
  return Message.find({}).then((messages: any) => {
    return messages;
  });
};

export const addMessageByRoomId = (roomId: any, senderId: any, body: any) => {
  return Message.create({
    roomId: "68405d38239a61ea5b7ad207",
    senderId,
    body,
  }).then((message: any) => {
    return message;
  });
};
