const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user_ids: {
    type: Array,
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 2;
      },
      message: `must contain 2 user_ids`
    },
  },
  msgs: [
    {
      msgId: { type: Number, require: true },
      senderUsername: { type: String, required: true },
      body: { type: String, minlength: 1, required: true },
      timestamp: { type: Date, default: Date.now, required: true },
      displayToClient: { type: Boolean, default: true, required: true },
    },
  ],
});

module.exports = { chatSchema };
