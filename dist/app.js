"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { run } = require("../db/connection");
if (process.env.NODE_ENV !== "production") {
    run();
}
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { getApi } = require("./controllers/controllers");
const { getTickets, getTicketById, postTicket, deleteTicket, patchTicket, getTicketsByEventId, } = require("./controllers/tickets.controllers");
const { getEvents, getEventById, postEvent, deleteEvent, } = require("./controllers/events.controllers");
const { getUsers, postUser, deleteUser, getUserById, patchUser, getUserByUsername, postLoginUser, } = require("./controllers/users.controllers");
const { handleCustomErrors, catchAllErrors, handleMongoErrors, } = require("./controllers/error.controller");
const { getMessagesbyRoomId, patchMessagebyId, postMessageByRoomId, } = require("./controllers/messages.controller");
const { getChatById, getChats, getChatsByUserId, } = require("./controllers/chats.controllers");
app.get("/api", getApi);
app.get("/api/events", getEvents);
//queries to add still: date
app.get("/api/events/:event_id", getEventById);
app.post("/api/events", postEvent);
app.delete("/api/events/:event_id", deleteEvent);
app.get("/api/users", getUsers);
app.post("/api/users", postUser);
app.delete("/api/users/:user_id", deleteUser);
app.get("/api/users/:user_id", getUserById);
app.patch("/api/users/:user_id", patchUser);
app.get("/api/tickets", getTickets);
app.get("/api/tickets/:ticket_id", getTicketById);
app.post("/api/tickets", postTicket);
app.delete("/api/tickets/:ticket_id", deleteTicket);
app.patch("/api/tickets/:ticket_id", patchTicket);
// app.get("/api/messages", getAllMessages);
app.get("/api/messages/:roomId", getMessagesbyRoomId);
app.get("/api/chats/:chat_id", getChatById);
app.get("/api/chats", getChats);
app.post("/api/messages/:roomId", postMessageByRoomId);
app.get("/api/tickets/events/:event_id", getTicketsByEventId);
app.patch("/api/messages/:message_id", patchMessagebyId);
app.get("/api/users/username/:username", getUserByUsername);
app.post("/api/login", postLoginUser);
app.get("/api/chats/users/:user_id", getChatsByUserId);
// Error handling
app.all("/*splat", (req, res, next) => {
    res.status(404).send({ msg: "Invalid url!" });
});
app.use(handleMongoErrors);
app.use(handleCustomErrors);
app.use(catchAllErrors);
module.exports = app;
