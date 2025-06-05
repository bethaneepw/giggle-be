"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
const { getApi } = require("./controllers/controllers");
const { getAllTickets, getTicketById, postTicket, deleteTicket, } = require("./controllers/tickets.controllers");
const { getEvents, getEventById, postEvent, deleteEvent, } = require("./controllers/events.controllers");
const { getAllUsers, postUser, deleteUser, getUserById, } = require("./controllers/users.controllers");
app.use(cors());
const { handleCustomErrors, catchAllErrors, handleMongoErrors, } = require("./controllers/error.controller");
app.use(express.json());
app.get("/api", getApi);
app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEventById);
app.post("/api/events", postEvent);
app.delete("/api/events/:event_id", deleteEvent);
app.get("/api/users", getAllUsers);
app.post("/api/users", postUser);
app.delete("/api/users/:user_id", deleteUser);
app.get("/api/users/:user_id", getUserById);
app.get("/api/tickets", getAllTickets);
app.get("/api/tickets/:ticket_id", getTicketById);
app.post("/api/tickets", postTicket);
app.delete("/api/tickets/:ticket_id", deleteTicket);
/*

To-do:

get users + queries
patch users
get tickets + queries
post/patch/delete tickets
*/
// Error handling
app.all("/*splat", (req, res) => {
    res.status(404).send({ msg: "Invalid url!" });
});
app.use(handleMongoErrors);
app.use(handleCustomErrors);
app.use(catchAllErrors);
module.exports = app;
