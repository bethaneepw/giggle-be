import { Request, Response } from "express";

const {
  selectAllEvents,
  selectEventById,
  addNewEvent,
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
    res.status(200).send({event});
  });
};

exports.postEvent = (req: Request, res: Response<Event>): Promise<void> => {
  const { event_artist, event_location, event_venue, event_date } = req.body;
  return addNewEvent(event_artist, event_location, event_venue, event_date).then((event) => {
    res.status(201).send({event});
  });
};

exports.deleteEvent = (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;
  return deleteEventByEventId(eventId).then(() => {
    res.status(204).send();
  });
};


