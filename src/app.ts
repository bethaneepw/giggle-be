const express = require("express");
const app = express();
const cors = require("cors");

import { Request, Response } from "express";
const { getApi } = require("./controllers/controllers");

const {
  getTickets,
  getTicketById,
  postTicket,
  deleteTicket,
} = require("./controllers/tickets.controllers");

const {
  getEvents,
  getEventById,
  postEvent,
  deleteEvent,
} = require("./controllers/events.controllers");

const {
  getUsers,
  postUser,
  deleteUser,
  getUserById,
} = require("./controllers/users.controllers");

app.use(cors());

const {
  handleCustomErrors,
  catchAllErrors,
  handleMongoErrors,
} = require("./controllers/error.controller");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/events", getEvents);

app.get("/api/events/:event_id", getEventById);

app.post("/api/events", postEvent);

app.delete("/api/events/:event_id", deleteEvent);

app.get("/api/users", getUsers);

app.post("/api/users", postUser);

app.delete("/api/users/:user_id", deleteUser);

app.get("/api/users/:user_id", getUserById);

app.get("/api/tickets", getTickets);

app.get("/api/tickets/:ticket_id", getTicketById);

app.post("/api/tickets", postTicket);

app.delete("/api/tickets/:ticket_id", deleteTicket);

/*

To-do:

get users queries
patch users - add new event id, update preferences etc 
get events queries
get tickets queries ? by id? 
patch/ tickets
*/

// Error handling

app.all("/*splat", (req: Request, res: Response) => {
  res.status(404).send({ msg: "Invalid url!" });
});

app.use(handleMongoErrors);

app.use(handleCustomErrors);

app.use(catchAllErrors);

module.exports = app;
