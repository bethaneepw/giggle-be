const { mongoose } = require("mongoose");
const { chatSchema } = require("../../schema/chatSchema");

const Chat = mongoose.model("chats", chatSchema);

module.exports = [
  new Chat({
    _id: "68405d38239a61ea5b7ad204",
    user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59522"],
  }),

  new Chat({
    _id: "68405d38239a61ea5b7ad207",
    user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
  }),

  new Chat({
    _id: "6847fefbcccbf3a1bacece94",
    user_ids: ["68405b9711f50eebe1b59522", "68405b9711f50eebe1b59523"],
  }),
];
