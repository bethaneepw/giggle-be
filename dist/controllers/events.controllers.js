"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { eventSchema } = require("../../db/schema/eventSchema");
const { mongoose } = require("mongoose");
const Event = mongoose.model("events", eventSchema);
const { selectEvents, selectEventById, addNewEvent, deleteEventByEventId, } = require("../models/events.models");
// interface Event {
//   id: number;
//   name: string;
//   date: string;
//   address: string;
// }
// res: Response<Event>
exports.getEvents = (req, res, next) => {
    const { sort_by, order, artist, town } = req.query;
    const allowedKeys = ["sort_by", "order", "artist", "town"];
    const invalidKeys = Object.keys(req.query).some((key) => !allowedKeys.includes(key));
    if (invalidKeys) {
        return Promise.reject({
            status: 400,
            msg: "Invalid or misspelt query parameter!",
        });
    }
    return selectEvents(sort_by, order, artist, town)
        .then((events) => {
        res.status(200).send({ events });
    })
        .catch(next);
};
exports.getEventById = (req, res, next) => {
    const { event_id } = req.params;
    return selectEventById(event_id)
        .then((event) => {
        res.status(200).send({ event });
    })
        .catch(next);
};
exports.postEvent = (req, res, next) => {
    const { event_artist, event_location, event_venue, event_date, event_img } = req.body;
    if (event_artist === "" ||
        event_location === "" ||
        event_venue === "" ||
        event_date === "") {
        throw { msg: "Information cannot be blank!", status: 400 };
    }
    else {
        return addNewEvent(event_artist, event_location, event_venue, event_date, event_img)
            .then((newEvent) => {
            res.status(201).send({ newEvent });
        })
            .catch(next);
    }
};
exports.deleteEvent = (req, res, next) => {
    const { event_id } = req.params;
    const pendingSelectEventById = selectEventById(event_id);
    const pendingDeleteEventByEventId = deleteEventByEventId(event_id);
    return Promise.all([pendingDeleteEventByEventId, pendingSelectEventById])
        .then(() => {
        res.status(204).send();
    })
        .catch(next);
};
