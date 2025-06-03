const endpoints = require("../../endpoints.json");

import { Request, Response } from "express";

const { selectAllTickets, selectTicketById } = require("../models");

interface Ticket {
  id: number;
  event_id: number;
  user_id: number;
}

exports.getApi = (req: Request, res: Response): void => {
  res.status(200).send({ endpoints });
};

exports.getAllTickets = (
  req: Request,
  res: Response<Ticket>
): Promise<void> => {
  return selectAllTickets().then((tickets) => {
    res.status(200).send(tickets);
  });
};

exports.getTicketById = (
  req: Request,
  res: Response<Ticket>
): Promise<void> => {
  const { ticketId } = req.params;
  return selectTicketById(ticketId).then((ticket) => {
    res.status(200).send(ticket);
  });
};
