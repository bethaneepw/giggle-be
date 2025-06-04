"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = require("../../endpoints.json");
const { selectAllTickets, selectTicketById } = require("../models/tickets.models");
exports.getApi = (req, res) => {
    res.status(200).send({ endpoints });
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
