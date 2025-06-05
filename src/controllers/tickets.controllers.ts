import { Request, Response } from "express";

const {
  selectAllTickets,
  selectTicketById,
} = require("../models/tickets.models");

// interface Ticket {
//   id: number;
//   event_id: number;
//   user_id: number;
// }

exports.getAllTickets = (
  req: Request,
  res: Response<Ticket>
): Promise<void> => {
  return selectAllTickets().then((tickets) => {
    res.status(200).send({ tickets });
  });
};

exports.getTicketById = (
  req: Request,
  res: Response<Ticket>
): Promise<void> => {
  const { ticket_id } = req.params;
  return selectTicketById(ticket_id).then((ticket) => {
    res.status(200).send({ ticket });
  });
};

exports.postTicket = () => {};

exports.deleteTicket = () => {};
