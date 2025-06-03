const endpoints = require("../../endpoints.json");

import { Request, Response } from "express";

const {
  selectAllEvents,
  selectEventById,
  addNewEvents,
  deleteEventByEventId,
  selectAllTickets,
  selectTicketById,
} = require("../models");

interface Event {
  id: number;
  name: string;
  date: string;
  address: string;
}

interface Ticket {
  id: number;
  event_id: number;
  user_id: number;
}

exports.getApi = (req: Request, res: Response): void => {
  res.status(200).send({ endpoints });
};

exports.getEvents = (req: Request, res: Response<Event>): Promise<void> => {
  return selectAllEvents().then((events) => {
    res.status(200).send(events);
  });
};

exports.getEventById = (req: Request, res: Response<Event>): Promise<void> => {
  const { eventId } = req.params;
  return selectEventById(eventId).then((event) => {
    res.status(200).send(event);
  });
};

exports.postEvent = (req: Request, res: Response<Event>): Promise<void> => {
  const { eventId } = req.params;

  return addNewEvents(eventId).then((event) => {
    res.status(201).send(event);
  });
};

exports.deleteEvent = (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;

  return deleteEventByEventId(eventId).then(() => {
    res.status(204).send();
  });
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
