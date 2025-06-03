import { Request, Response } from "express";

const {
  selectAllEvents,
  selectEventById,
  addNewEvents,
  deleteEventByEventId,
} = require("../models/events.models");

interface Event {
  id: number;
  name: string;
  date: string;
  address: string;
}

exports.getEvents = (req: Request, res: Response<Event>): Promise<void> => {
  return selectAllEvents().then((events) => {
    res.status(200).send({ events });
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
