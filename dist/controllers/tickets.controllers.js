"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllTickets, selectTicketById, } = require("../models/tickets.models");
// interface Ticket {
//   id: number;
//   event_id: number;
//   user_id: number;
// }
exports.getAllTickets = (req, res) => {
    return selectAllTickets().then((tickets) => {
        res.status(200).send({ tickets });
    });
};
exports.getTicketById = (req, res) => {
    const { ticket_id } = req.params;
    return selectTicketById(ticket_id).then((ticket) => {
        res.status(200).send({ ticket });
    });
};
exports.postTicket = () => { };
exports.deleteTicket = () => { };
