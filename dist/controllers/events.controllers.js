"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllEvents, selectEventById, addNewEvent, deleteEventByEventId, } = require("../models/events.models");
exports.getEvents = (req, res) => {
    return selectAllEvents().then((events) => {
        res.status(200).send({ events });
    });
};
exports.getEventById = (req, res) => {
    const { eventId } = req.params;
    return selectEventById(eventId).then((event) => {
        res.status(200).send({ event });
    });
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
