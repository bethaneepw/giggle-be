const express = require("express");
const app = express();
const cors = require("cors");

import { Request, Response } from "express";
const {
  getApi,
  getEvents,
  getEventById,
  postEvent,
  deleteEvent,
  getAllTickets,
  getTicketById,
} = require("./src/controllers/controllers");

const {
  getAllUsers,
  postUser,
  deleteUser,
  getUserById,
} = require("./src/controllers/users.controllers");

app.use(cors());

const {
  handleCustomErrors,
  catchAllErrors,
} = require("./src/controllers/error.controller");

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

// Error handling

app.all("/*splat", (req: Request, res: Response) => {
  res.status(404).send({ msg: "Invalid url!" });
});

app.use(handleCustomErrors);

app.use(catchAllErrors);

module.exports = app;
