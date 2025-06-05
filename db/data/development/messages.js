/*
const messageSchema = new mongoose.Schema({
      roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "chats",
          required: true,
        },
      senderId: { type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true, },
      body: { type: String, minlength: 1, required: true },
      timestamp: { type: Date, default: Date.now, required: true },
      displayToClient: { type: Boolean, default: true, required: true },
    })
      */

const { mongoose } = require("mongoose");
const { messageSchema } = require("../../schema/messageSchema");

const Message = mongoose.model("messages", messageSchema);
