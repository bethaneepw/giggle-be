const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

export const selectChats = () => {
  return Chat.find({}).then((chats) => {
    return chats;
  });
};

export const selectChatByChatId = (chatId) => {
  return Chat.findById(chatId)
    .orFail(() => {
      throw { msg: "Chat does not exist!", status: 404 };
    })
    .then((chat) => {
      return chat;
    });
};

export const selectChatsByUserId = (userId) => {
  return Chat.find({ user_ids: userId }).then((chats) => {
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