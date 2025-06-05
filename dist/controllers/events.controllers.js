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
    if (event_artist === "" ||
        event_location === "" ||
        event_venue === "" ||
        event_date === "") {
        throw { msg: "Information cannot be blank!", status: 400 };
    }
    else {
        return addNewEvent(event_artist, event_location, event_venue, event_date).then((newEvent) => {
            res.status(201).send({ newEvent });
        });
    }
};
exports.deleteEvent = (req, res) => {
    const { event_id } = req.params;
    const pendingSelectEventById = selectEventById(event_id);
    const pendingDeleteEventByEventId = deleteEventByEventId(event_id);
    return Promise.all([
        pendingDeleteEventByEventId,
        pendingSelectEventById,
    ]).then(() => {
        res.status(204).send();
    });
};
