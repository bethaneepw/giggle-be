const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user_ids: {
    type: Array,
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 2;
      },
      message: `must contain 2 user_ids`,
    },
  },
});

module.exports = { chatSchema };
