module.exports = [
  {
    room_ref: "01",
    user_ids: [0, 1],
    msgs: [
      { senderId: 0, body: "Hello!", timestamp: "2025-01-24T00:01:00Z" },
      { senderId: 1, body: "Hey Bruce :)", timestamp: "2025-01-25T00:05:00Z" },
    ],
  },
  {
    room_ref: "03",
    user_ids: [0, 3],
    msgs: [
      {
        senderId: 3,
        body: "Hey it's me your pal Col",
        timestamp: "2025-01-24T00:01:00Z",
      },
      { senderId: 0, body: "Oh...hey", timestamp: "2025-01-25T00:05:00Z" },
      {
        senderId: 0,
        body: "What did you want?",
        timestamp: "2025-01-26T00:05:00Z",
      },
    ],
  },
];
