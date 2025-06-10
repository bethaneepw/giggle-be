const { mongoose } = require("../../db/connection");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

export const selectChatbyId = (chats_id:any) => {
    return Chat.findbyId(chats_id)
    .orFail(() => {
        throw { msg: "Chat does not exist!", status: 404}
    })
    .then((Chat:any) => {
        return Chat
    })
}
