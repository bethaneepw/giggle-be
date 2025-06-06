// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Chat = require("../db/data/test/chats");
// const User = require("../db/data/test/users"); 

// const app = express();
// app.use(cors());
// app.use(express.json());

// // GET / - List all chats with user information
// app.get("/", async (req, res) => {
//   try {
//     const chats = await Chat.find({});
    
//     const chatsWithUserInfo = await Promise.all(
//       chats.map(async (chat) => {
//         const users = await User.find({ _id: { $in: chat.user_ids } });
//         return {
//           ...chat.toObject(),
//           users: users.map(user => ({
//             _id: user._id,
//             username: user.username,
//             firstName: user.firstName,
//             lastName: user.lastName
//           }))
//         };
//       })
//     );
    
//     console.log("Returning chats:", chatsWithUserInfo);
//     res.json(chatsWithUserInfo);
//   } catch (error) {
//     console.error("Error fetching chats:", error);
//     res.status(500).json({ error: "Failed to fetch chats" });
//   }
// });

// // GET /api/chats/:roomId - Get specific chat history
// app.get("/api/chats/:roomId", async (req, res) => {
//   try {
//     const { roomId } = req.params;
//     console.log(`Fetching chat for roomId: ${roomId}`);
    
//     const chat = await Chat.findById(roomId);
    
//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" });
//     }

//     console.log("Found chat:", chat);
//     res.json(chat);
//   } catch (error) {
//     console.error("Error fetching chat:", error);
//     res.status(500).json({ error: "Failed to fetch chat" });
//   }
// });

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/giggle-be");

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);
  
//   socket.on("join room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room ${roomId}`);
//   });
  
//   socket.on("chat message", async ({ roomId, senderUsername, senderId, body }) => {
//     console.log("Received message:", { roomId, senderUsername, senderId, body });
    

//     let actualSenderUsername = senderUsername;
    
//     if (!actualSenderUsername && senderId) {

//       try {
//         const user = await User.findById(senderId);
//         actualSenderUsername = user ? user.username : "Unknown";
//       } catch (err) {
//         console.error("Error looking up user:", err);
//         actualSenderUsername = "Unknown";
//       }
//     }
    
//     const message = {
//       msgId: Date.now(),
//       roomId,
//       senderId: senderId || null,
//       senderUsername: actualSenderUsername || "Unknown",
//       body,
//       timestamp: new Date().toISOString(),
//       displayToClient: true
//     };
    
//     console.log("Broadcasting message:", message);
    
//     // Save to chat if it exists
//     try {
//       const chat = await Chat.findById(roomId);
//       if (chat) {
//         if (chat.msgs) {
//           chat.msgs.push(message);
//           await chat.save();
//         }
//       }
//     } catch (err) {
//       console.error("Error saving message to chat:", err);
//     }
    
 
//     io.to(roomId).emit("chat message", message);
//   });
  
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// server.listen(9090, () => {
//   console.log("Socket.IO server running on port 9090");
//   console.log("Available test room IDs:");
//   console.log("- 68405d38239a61ea5b7ad204 (Bruce & Lucy)");
//   console.log("- 68405d38239a61ea5b7ad207 (Bruce & Colin)");
// });





// //original server.js

// // const express = require("express");
// // const { log } = require("node:console");
// // const { createServer } = require("node:http");
// // const { join } = require("node:path");
// // const { Server } = require("socket.io");

// // const app = express();
// // const server = createServer(app);
// // const io = new Server(server);

// // // app.get("/", (req, res) => res.send("Hello world"));

// // app.get("/", (req, res) => {
// //   res.sendFile(join(`${__dirname}`, "index.html"));
// // });

// // io.on("connection", (socket) => {
// //   console.log("a user connected");
// //   socket.on("disconnect", () => {
// //     console.log("user disconnected");
// //   });
// //   socket.on("chat message", (msg) => {
// //     console.log("message: " + msg);
// //   });
// // });

// // server.listen(9090, () => {
// //   console.log("Server is listening on 9090");
// // });