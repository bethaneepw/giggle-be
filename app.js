var express = require("express");
var app = express();
var cors = require('cors');
var _a = require("./src/controllers/controllers"), getApi = _a.getApi, getEvents = _a.getEvents, getEventById = _a.getEventById, postEvent = _a.postEvent, deleteEvent = _a.deleteEvent, getAllUsers = _a.getAllUsers, postUser = _a.postUser, deleteUser = _a.deleteUser, getUserById = _a.getUserById, getAllTickets = _a.getAllTickets, getTicketById = _a.getTicketById;
app.use(cors());
app.use(express.json());
app.get("/api", getApi);
app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEventById);
app.post("api/events/:event_id", postEvent);
app.delete("api/events/:event_id", deleteEvent);
app.get("/api/users", getAllUsers);
app.post("/api/users/:user_id", postUser);
app.delete("api/users/:user_id", deleteUser);
app.get("api/users/:user_id", getUserById);
app.get("api/tickets", getAllTickets);
app.get("api/tickets/:ticket_id", getTicketById);
// app.post("api/ticket/")
/*

To-do:

get users + queries
patch users
get tickets + queries
post/patch/delete tickets
*/
module.exports = app;
