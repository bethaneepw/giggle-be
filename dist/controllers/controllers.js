"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = require("../../endpoints.json");
const { selectAllEvents, selectEventById, addNewEvents, deleteEventByEventId, selectAllUsers, addNewuser, deleteUserByUserId, selectUserByUserId, selectAllTickets, selectTicketById, } = require("../models");
exports.getApi = (req, res) => {
    res.status(200).send({ endpoints });
};
exports.getEvents = (req, res) => {
    return selectAllEvents().then((events) => {
        res.status(200).send(events);
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
exports.getAllUsers = (req, res) => {
    return selectAllUsers().then((users) => {
        res.status(200).send(usersData);
    });
};
exports.postUser = (req, res) => {
    const { userId } = req.params;
    return addNewuser(userId).then((user) => {
        res.status(201).send(user);
    });
};
exports.deleteUser = (req, res) => {
    const { userId } = req.params;
    return deleteUserByUserId(userId).then(() => {
        res.status(204).send();
    });
};
exports.getUserById = (req, res) => {
    const { userId } = req.params;
    return selectUserByUserId(userId).then((user) => {
        res.status(200).send(user);
    });
};
exports.getAllTickets = (req, res) => {
    return selectAllTickets().then((tickets) => {
        res.status(200).send(tickets);
    });
};
exports.getTicketById = (req, res) => {
    const { ticketId } = req.params;
    return selectTicketById(ticketId).then((ticket) => {
        res.status(200).send(ticket);
    });
};
