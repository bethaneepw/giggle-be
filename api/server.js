const express = require("express");
const { log } = require("node:console");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

// app.get("/", (req, res) => res.send("Hello world"));

app.get("/", (req, res) => {
  res.sendFile(join(`${__dirname}`, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

server.listen(9090, () => {
  console.log("Server is listening on 9090");
});
