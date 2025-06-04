"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { eventSchema } = require("../../db/schema/eventSchema");
const { mongoose } = require("mongoose");
const Event = mongoose.model("events", eventSchema);
const { selectAllEvents, selectEventById, addNewEvent, deleteEventByEventId, } = require("../models/events.models");
// interface Event {
//   id: number;
//   name: string;
//   date: string;
//   address: string;
// }
// res: Response<Event>
exports.getEvents = (req, res) => {
    return selectAllEvents().then((events) => {
        res.status(200).send({ events });
    });
};
exports.getEventById = (req, res, next) => {
    const { event_id } = req.params;
    return selectEventById(event_id)
        .then((event) => {
        res.status(200).send({ event });
    })
        .catch(next);
};
exports.postEvent = (req, res) => {
    const { event_artist, event_location, event_venue, event_date } = req.body;
    return addNewEvent(event_artist, event_location, event_venue, event_date).then((event) => {
        res.status(201).send({ event });
    });
};
exports.deleteEvent = (req, res) => {
    const { eventId } = req.params;
    return deleteEventByEventId(eventId).then(() => {
        res.status(204).send();
    });
};
