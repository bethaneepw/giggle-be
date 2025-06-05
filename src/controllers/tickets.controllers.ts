import { Request, Response } from "express";

const { selectAllTickets, selectTicketById } = require("../models/tickets.models");

interface Ticket {
    id: number;
    event_id: number;
    user_id: number;
  }
  

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
  