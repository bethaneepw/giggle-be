const { mongoose } = require("mongoose");
const {messageSchema} = require("../../schema/messageSchema");

const Message = mongoose.model("messages", messageSchema);

module.exports = [
  new Message({
    _id: "68417f723fccab577bca7acd",
    roomId: "68405d38239a61ea5b7ad204",
    senderId: "68405b9711f50eebe1b59521",
    body: "Hello!",
    timestamp: "2025-01-24T00:01:00Z",
    displayToClient: true,
  }),
  new Message({
    _id: "6841804c339a59226e971569",
    roomId: "68405d38239a61ea5b7ad204",
    senderId: "68405b9711f50eebe1b59521",
    body: "Hey Burce :(",
    timestamp: "2025-01-25T00:05:00Z",
    displayToClient: false,
  }),
  new Message({
    _id: "68417f7b6b110742fc30a551",
    roomId: "68405d38239a61ea5b7ad204",
    senderId: "68405b9711f50eebe1b59521",
    body: "Hey Bruce :)",
    timestamp: "2025-01-25T00:05:00Z",
    displayToClient: true,
  }),
  new Message({
    _id: "68417f821617540f249d9602",
    roomId: "68405d38239a61ea5b7ad207",
    senderId: "68405b9711f50eebe1b59523",
    body: "Hey it's me your pal Col",
    timestamp: "2025-01-24T00:01:54Z",
    displayToClient: true,
  }),
  new Message({
    roomId: "68405d38239a61ea5b7ad207",
    senderId: "68405b9711f50eebe1b59521",
    body: "Oh...hey",
    timestamp: "2025-01-25T00:05:00Z",
    displayToClient: true,
  }),
  new Message({
    _id: "68417f91c0cadf7869342c42",
    roomId: "68405d38239a61ea5b7ad207",
    senderId: "68405b9711f50eebe1b59521",
    body: "What did you want?",
    timestamp: "2025-01-26T00:05:00Z",
    displayToClient: true,
  }),
  new Message({
    _id: "68417f99cc80869edc3c3931",
    roomId: "68405d38239a61ea5b7ad207",
    senderId: "68405b9711f50eebe1b59523",
    body: "Just wanted to be friends...",
    timestamp: "2025-01-26T00:05:10Z",
    displayToClient: false,
  }),
];
