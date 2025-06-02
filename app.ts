


const express = require("express");
const app = express();
const cors = require('cors');

const{getApi, getEvents, getEventById, postEvent, deleteEvent, getAllUsers, postUser, deleteUser, getUserById, getAllTickets, getTicketById} = require("./src/controllers/controllers")
app.use(cors())

app.use(express.json());

app.get("/api", getApi);

app.get("/api/events", getEvents)

app.get("/api/events/:event_id", getEventById)

app.post("api/events/:event_id", postEvent)

app.delete("api/events/:event_id", deleteEvent)

app.get("/api/users", getAllUsers)

app.post("/api/users/:user_id", postUser)

app.delete("api/users/:user_id", deleteUser)

app.get("api/users/:user_id", getUserById)

app.get("api/tickets", getAllTickets)

app.get("api/tickets/:ticket_id", getTicketById)

// app.post("api/ticket/")

/*

To-do:

get users + queries
patch users
get tickets + queries
post/patch/delete tickets
*/

module.exports = app;