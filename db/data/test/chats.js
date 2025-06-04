const { mongoose } = require("mongoose");
const {chatSchema} = require("../../schema/chatSchema");

const Chat = mongoose.model("chats", chatSchema)

module.exports = [
  new Chat({
    _id: "68405d38239a61ea5b7ad204",
    user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59522"],
    msgs: [
      { msgId: 0, senderUsername: "TheBoss", body: "Hello!", timestamp: "2025-01-24T00:01:00Z", displayToClient: true },
      { msgId: 1, senderUsername: "BoygeniusMVP", body: "Hey Bruce :)", timestamp: "2025-01-25T00:05:00Z", displayToClient: true },
    ],
  }),

  new Chat({
    _id: "68405d38239a61ea5b7ad207",
    user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
    msgs: [
      {
        msgId: 0,
        senderUsername: "col99",
        body: "Hey it's me your pal Col",
        timestamp: "2025-01-24T00:01:00Z",
        displayToClient: true
      },
      {  msgId: 1, senderUsername: "TheBoss", body: "Oh...hey", timestamp: "2025-01-25T00:05:00Z", displayToClient: true },
      {
        msgId: 2,
        senderUsername: "TheBoss",
        body: "What did you want?",
        timestamp: "2025-01-26T00:05:00Z",
        displayToClient: true
      },
      {
        msgId: 3,
        senderUsername: "col99",
        body: "Just wanted to be friends...",
        timestamp: "2025-01-26T00:05:10Z",
        displayToClient: false
      },
    ],
  }),
];
