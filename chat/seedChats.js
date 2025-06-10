const mongoose = require("mongoose");
const Chat = require("./models/Chat"); // adjust path as needed

async function seed() {
  await mongoose.connect("mongodb://localhost:27017/giggle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const chatData = [
    new Chat({
      _id: "68405d38239a61ea5b7ad204",
      user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59522"],
    }),

    new Chat({
      _id: "68405d38239a61ea5b7ad207",
      user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
    }),
  ];

  await Chat.deleteMany(); // optional: clear existing chats first
  await Chat.insertMany(chatData);

  console.log("Chats inserted!");
  mongoose.disconnect();
}

seed();
