const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const Message = mongoose.model("messages", messageSchema);

exports.selectMessagesByChatId = (chat_id) => {
  return Message.find({ roomId: chat_id })
    .orFail(() => {
      console.log("oopsie");
    })
    .then((messages) => {
      return messages;
    });
};
