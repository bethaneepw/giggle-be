module.exports = [
  {
    room_ref: "01",
    user_ids: ["TheBoss", "BoygeniusMVP"],
    msgs: [
      { senderUsername: "TheBoss", body: "Hello!", timestamp: "2025-01-24T00:01:00Z" },
      { senderUsername: "BoygeniusMVP", body: "Hey Bruce :)", timestamp: "2025-01-25T00:05:00Z" },
    ],
  },
  {
    room_ref: "03",
    user_ids: ["TheBoss", "col99"],
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
  },
];
