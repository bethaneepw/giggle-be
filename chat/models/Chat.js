const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    user_ids: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
module.exports = Chat;
