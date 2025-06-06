const { mongoose } = require("mongoose");
const { chatSchema } = require("../../schema/chatSchema");

const Chat = mongoose.model("chats", chatSchema);

module.exports = [
  new Chat({
    _id: "6841b9d0574bb808eb4d16f2",
    user_ids: [
      "60b3e1c2e00e9d3d0b42b0e5", // _id of mirielLikesTurtles
      "6841b8a92dc3ed702a69d6b1", // _id of user
    ],
  }),
  new Chat({
    _id: "6841b9d69604b12e0a17d9e4",
    user_ids: [
      "6841b8a92dc3ed702a69d6b1", // _id of user
      "60b3e1c2e00e9d3d0b42b0e7", // _id of freyja_redmane
    ],
  }),
  new Chat({
    _id: "6841b9dbee93fa89db55ba0f",
    user_ids: [
      "6841b8841eca10853eb5fa0d", // _id of scarlett_m
      "6841b8a92dc3ed702a69d6b1", // _id of user
    ],
  }),
];
