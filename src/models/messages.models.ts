const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const message = mongoose.model("messages", messageSchema);

export const selectChatbyId = (roomId:any) => {
    return message.findbyId(roomId)
    .orFail(() => {
        throw { msg: "Message does not exist, status:404"}
    })
    .then((message) => {
        return message
    })
}