const { mongoose } = require("mongoose");
const {chatSchema} = require("../../schema/chatSchema");

const Chat = mongoose.model("chats", chatSchema)