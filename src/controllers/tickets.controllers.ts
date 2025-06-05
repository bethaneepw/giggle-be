import { Request, Response } from "express";

const {
  selectAllTickets,
  selectTicketById,
  addNewTicket,
} = require("../models/tickets.models");

// interface Ticket {
//   id: number;
//   event_id: number;
//   user_id: number;
// }

exports.getAllTickets = (
  req: Request,
  res: Response<Ticket>,
  next
): Promise<void> => {
  return selectAllTickets()
    .then((tickets) => {
      res.status(200).send({ tickets });
    })
    .catch(next);
};

exports.getTicketById = (
  req: Request,
  res: Response<Ticket>,
  next
): Promise<void> => {
  const { ticket_id } = req.params;
  return selectTicketById(ticket_id)
    .then((ticket) => {
      res.status(200).send({ ticket });
    })
    .catch(next);
};

exports.postTicket = (
  req: Request,
  res: Response<Event>,
  next
): Promise<void> => {
  const { owner_username, seating, eventDetails, notes, hasBeenClaimed } =
    req.body;
  if (
    owner_username === "" ||
    seating === "" ||
    eventDetails === "" ||
    notes === ""
  ) {
    throw { msg: "Information cannot be blank!", status: 400 };
  } else {
    return addNewTicket(
      owner_username,
      seating,
      eventDetails,
      notes,
      hasBeenClaimed
    )
      .then((newTicket) => {
        res.status(201).send({ newTicket });
      })
      .catch(next);
  }
};

exports.deleteTicket = () => {};
