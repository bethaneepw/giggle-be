const { mongoose } = require("mongoose");
const { messageSchema } = require("../../schema/messageSchema");

const Message = mongoose.model("messages", messageSchema);

module.exports = [
  new Message({
    _id: "6841b9d0574bb808eb4d16f3",
    roomId: "6841b9d0574bb808eb4d16f2", // Chat between mirielLikesTurtles and user
    senderId: "60b3e1c2e00e9d3d0b42b0e5", // Miriel's _id
    body: "Hey there! I'm Miriel, nice to meet you. Looks like we're both into live music! Have you been to many gigs lately?",
    displayToClient: true,
    timestamp: new Date("2025-06-01T10:00:00Z"), 
  }),
  new Message({
    _id: "6841b9d0574bb808eb4d16f4",
    roomId: "6841b9d0574bb808eb4d16f2",
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Hey Miriel! I'm a big fan of live gigs too! I recently got a ticket for 'The Tarnished' at Alexandra Palace in London this summer. Ever heard of them?",
    displayToClient: true,
    timestamp: new Date("2025-06-01T10:05:00Z"),
  }),
  new Message({
    _id: "6841b9d0574bb808eb4d16f5",
    roomId: "6841b9d0574bb808eb4d16f2",
    senderId: "60b3e1c2e00e9d3d0b42b0e5", // Miriel's _id
    body: "Oh nice, 'The Tarnished' are awesome! I saw them last year. I bet the gig at Alexandra Palace is going to be epic. Do you go to many gigs in London?",
    displayToClient: true,
    timestamp: new Date("2025-06-01T10:10:00Z"),
  }),

  new Message({
    _id: "6841b9d69604b12e0a17d9e5",
    roomId: "6841b9d69604b12e0a17d9e4", // Chat between freyja_redmane and user
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Hey Freyja! I saw your profile and noticed you're going to see Black Knives in Brighton. That sounds amazing! I've been really getting into their music lately.",
    displayToClient: true,
    timestamp: new Date("2025-06-02T09:00:00Z"),
  }),
  new Message({
    _id: "6841b9d69604b12e0a17d9e6",
    roomId: "6841b9d69604b12e0a17d9e4",
    senderId: "6841b8841eca10853eb5fa0d", // Freyja's _id
    body: "Yes, I'm so excited! Black Knives at Concorde 2 is going to be insane. I think it's going to be one of those gigs you never forget. Are you into metal too?",
    displayToClient: true,
    timestamp: new Date("2025-06-02T09:05:00Z"),
  }),
  new Message({
    _id: "6841b9d69604b12e0a17d9e7",
    roomId: "6841b9d69604b12e0a17d9e4",
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Totally! Metal gigs are my favorite. Concorde 2 is such a great venue for a show like that. Have you seen them live before?",
    displayToClient: true,
    timestamp: new Date("2025-06-02T09:10:00Z"),
  }),

  new Message({
    _id: "6842b1396d370f75bc847aa5",
    roomId: "6841b9dbee93fa89db55ba0f", // Chat between scarlett_m and user
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Hey Scarlett! I saw you're going to see J.J. Slider at KOKO in London. That's going to be an epic night! I've been meaning to see them for a while.",
    displayToClient: true,
    timestamp: new Date("2025-06-03T11:30:00Z"),
  }),
  new Message({
    _id: "6842b1585796b75f538554f9",
    roomId: "6841b9dbee93fa89db55ba0f",
    senderId: "6841b8841eca10853eb5fa0d", // Scarlett's _id
    body: "Yes, I'm super pumped! KOKO is such a great venue too. Their live performances are wild, especially when the crowd gets going. Have you been to KOKO before?",
    displayToClient: true,
    timestamp: new Date("2025-06-03T11:35:00Z"),
  }),
  new Message({
    _id: "6842b15f19b2789c2f25736a",
    roomId: "6841b9dbee93fa89db55ba0f",
    senderId: "6841b8a92dc3ed702a69d6b1", // User's _id
    body: "Yeah, KOKO is awesome! I’ve been there a few times. Can’t wait for this gig. It’ll be a crazy night, for sure!",
    displayToClient: true,
    timestamp: new Date("2025-06-03T11:40:00Z"),
  }),
];
