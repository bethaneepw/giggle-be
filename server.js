const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

// Import schemas directly
const { userSchema } = require("./db/schema/userSchema");
const { messageSchema } = require("./db/schema/messageSchema");
const { chatSchema } = require("./db/schema/chatSchema");

// Create models directly
const User = mongoose.model("users", userSchema);
const Message = mongoose.model("messages", messageSchema);
const Chat = mongoose.model("chats", chatSchema);

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/giggle-be"
);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on(
    "chat message",
    async ({ roomId, senderUsername, senderId, body }) => {
      console.log("Received message:", {
        roomId,
        senderUsername,
        senderId,
        body,
      });

      let actualSenderUsername = senderUsername;

      // Look up username from senderId if not provided
      if (!actualSenderUsername && senderId) {
        try {
          const user = await User.findById(senderId);
          actualSenderUsername = user ? user.username : "Unknown";
        } catch (err) {
          console.error("Error looking up user:", err);
          actualSenderUsername = "Unknown";
        }
      }

      try {
        // Create new message
        const newMessage = new Message({
          roomId,
          senderId: senderId || null,
          senderUsername: actualSenderUsername || "Unknown",
          body: body.trim(),
          timestamp: new Date(),
          displayToClient: true,
          msgId: Date.now(),
        });

        const savedMessage = await newMessage.save();
        console.log("Message saved to database:", savedMessage._id);

        // Prepare message for broadcast
        const messageForBroadcast = {
          _id: savedMessage._id,
          msgId: savedMessage.msgId,
          roomId: savedMessage.roomId,
          senderId: savedMessage.senderId,
          senderUsername: savedMessage.senderUsername,
          body: savedMessage.body,
          timestamp: savedMessage.timestamp.toISOString(),
          displayToClient: savedMessage.displayToClient,
        };

        // Broadcast to room
        io.to(roomId).emit("chat message", messageForBroadcast);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const SOCKET_PORT = 9091; // Changed from 9090 to 9091
server.listen(SOCKET_PORT, () => {
  console.log(`Socket.IO server running on port ${SOCKET_PORT}`);
  console.log("Real-time messaging ready!");
});
