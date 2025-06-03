"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllEvents, selectEventById, addNewEvents, deleteEventByEventId, } = require("../models/events.models");
exports.getEvents = (req, res) => {
    return selectAllEvents().then((events) => {
        res.status(200).send({ events });
    });
};
exports.getEventById = (req, res) => {
    const { eventId } = req.params;
    return selectEventById(eventId).then((event) => {
        res.status(200).send(event);
    });
};
exports.postEvent = (req, res) => {
    const { eventId } = req.params;
    return addNewEvents(eventId).then((event) => {
        res.status(201).send(event);
    });
};
exports.deleteEvent = (req, res) => {
    const { eventId } = req.params;
    return deleteEventByEventId(eventId).then(() => {
        res.status(204).send();
    });
};
