const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

export const selectChatById = (_id: any) => {
  return Chat.findById(_id)
    .orFail(() => {
      throw { msg: "Chat does not exist!", status: 404 };
    })
    .then((chat: any) => {
      return chat;
    });
};

export const selectChatsByUserId = (_id: any) => {
  return Chat.find({user_ids: {$in: [_id]}})
    .orFail(() => {
      throw { msg: "Chat does not exist!", status: 404 };
    })
    .then((chat: any) => {
      return chat;
    });
};
