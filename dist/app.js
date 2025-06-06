"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
const { getApi } = require("./controllers/controllers");
const { getTickets, getTicketById, postTicket, deleteTicket, patchTicket, } = require("./controllers/tickets.controllers");
const { getEvents, getEventById, postEvent, deleteEvent, } = require("./controllers/events.controllers");
const { getUsers, postUser, deleteUser, getUserById, patchUser, } = require("./controllers/users.controllers");
app.use(cors());
const { handleCustomErrors, catchAllErrors, handleMongoErrors, } = require("./controllers/error.controller");
// const { getChatbyId, } = require("./controllers/chats.controllers")
const { postMessagebyId, getMessagebyRoomId, patchMessagebyId} = require("./controllers/messages.controlers")
app.use(express.json());
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
// app.get("/api/chats/:chats_id", getChatbyId);
app.post("/api/messages/:roomId", postMessagebyId);
app.get("/api/messages/:roomId", getMessagebyRoomId);
app.delete("/api/messages/:message_id", deleteMessagebyId);
app.patch("/api/messages/:message_id", patchMessagebyId);

/*

To-do:

get users queries
get events queries
get tickets queries ? by user id?
patch/ tickets
*/
// Error handling
app.all("/*splat", (req, res) => {
    res.status(404).send({ msg: "Invalid url!" });
});
app.use(handleMongoErrors);
app.use(handleCustomErrors);
app.use(catchAllErrors);
module.exports = app;
