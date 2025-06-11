const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

export const selectChats = () => {
  return Chat.find({}).then((chats) => {
    return chats;
  });
};

export const addNewChat = (user_ids) => {
  if (!user_ids || user_ids.length !== 2) {
    throw { msg: "Chat must have exactly 2 user IDs!", status: 400 };
  }

  return Chat.create({
    user_ids,
  }).then((newChat) => {
    return newChat;
  });
};

export const deleteChatByChatId = (chatId) => {
  return Chat.findByIdAndDelete(chatId).then(() => {});
};

export const updateChatUsers = (chatId, user_ids) => {
  if (!user_ids || user_ids.length !== 2) {
    throw { msg: "Chat must have exactly 2 user IDs!", status: 400 };
  }

  return Chat.findByIdAndUpdate(
    chatId,
    { user_ids: user_ids },
    { new: true, runValidators: true }
  ).then((updatedChat) => {
    return updatedChat;
  });
};
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
  return Chat.find({ user_ids: { $in: [_id] } })
    .orFail(() => {
      throw { msg: "Chat does not exist!", status: 404 };
    })
    .then((chat: any) => {
      return chat;
    });
};
