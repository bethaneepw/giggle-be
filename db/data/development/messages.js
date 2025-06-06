const { mongoose } = require("mongoose");
const { messageSchema } = require("../../schema/messageSchema");

const Message = mongoose.model("messages", messageSchema);

module.exports = [
  new Message({
    _id: "6841b9d0574bb808eb4d16f4",
    roomId: "6841b9d0574bb808eb4d16f2",
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Hey Miriel! Was wondering about your modal nodes ticket, how are the seats for it?",
    displayToClient: true,
    timestamp: new Date("2025-06-01T10:05:00Z"),
  }),
  new Message({
    _id: "6841b9d0574bb808eb4d16f5",
    roomId: "6841b9d0574bb808eb4d16f2",
    senderId: "60b3e1c2e00e9d3d0b42b0e5", // Miriel's _id
    body: "Haven't been to the venue before but I think its at the front of the seated section! Would you want it?",
    displayToClient: true,
    timestamp: new Date("2025-06-01T10:10:00Z"),
  }),

  new Message({
    _id: "6841b9d69604b12e0a17d9e5",
    roomId: "6841b9d69604b12e0a17d9e4", // Chat between freyja_redmane and user
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Hey Freyja! I saw you had a spare ticket for the Black Knives. I'm going to be in Brighton that weekend if you wanted company?",
    displayToClient: true,
    timestamp: new Date("2025-06-02T09:00:00Z"),
  }),
  new Message({
    _id: "6841b9d69604b12e0a17d9e6",
    roomId: "6841b9d69604b12e0a17d9e4",
    senderId: "6841b8841eca10853eb5fa0d", // Freyja's _id
    body: "Yeah I would! I was thinking of grabbing something to eat first and having a mooch by the sea if you'd like to join for that",
    displayToClient: true,
    timestamp: new Date("2025-06-02T09:05:00Z"),
  }),
  new Message({
    _id: "6841b9d69604b12e0a17d9e7",
    roomId: "6841b9d69604b12e0a17d9e4",
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Sounds amazing!",
    displayToClient: true,
    timestamp: new Date("2025-06-02T09:10:00Z"),
  }),

  new Message({
    _id: "6842b1396d370f75bc847aa5",
    roomId: "6841b9dbee93fa89db55ba0f", // Chat between scarlett_m and user
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Hey Scarlett! I saw you're going to see J.J. Slider at KOKO in London. I saw them last year and they were so good!",
    displayToClient: true,
    timestamp: new Date("2025-06-03T11:30:00Z"),
  }),
  new Message({
    _id: "6842b1585796b75f538554f9",
    roomId: "6841b9dbee93fa89db55ba0f",
    senderId: "6841b8841eca10853eb5fa0d", // Scarlett's _id
    body: "omg how was it??? i wanted to go last year too but had a wedding that weekend :(( i'm so happy to go this time haha",
    displayToClient: true,
    timestamp: new Date("2025-06-03T11:35:00Z"),
  }),
  new Message({
    _id: "6842b15f19b2789c2f25736a",
    roomId: "6841b9dbee93fa89db55ba0f",
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Loved it! They did an acoustic version of J.J.Bubblegum and it was sooooo good",
    displayToClient: true,
    timestamp: new Date("2025-06-03T11:40:00Z"),
  }),
];
