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
      console.log("Empty messages??");
      return messages;
    });
};

export const allMessages = () => {
  return Message.find({}).then((messages: any) => {
    return messages;
  });
};
