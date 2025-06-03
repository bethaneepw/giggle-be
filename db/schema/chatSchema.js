const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
{
    room_ref: { type: String, required: true },
    user_ids: {type: Array, length: 2, required: true },
    msgs: [
      {
        msgId: {type: Number, require: true },
        senderUsername: {type: String, required: true },
        body: {type: String, required: true},
        timestamp: {type: Date, required: true},
        displayToClient: {type: Boolean, default: true, required: true}
      },
    ],
})

module.exports = mongoose.model("chats", chatSchema)