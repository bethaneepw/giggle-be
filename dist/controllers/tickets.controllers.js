"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllTickets, selectTicketById, addNewTicket, deleteTicketById, } = require("../models/tickets.models");
// interface Ticket {
//   id: number;
//   event_id: number;
//   user_id: number;
// }
exports.getAllTickets = (req, res, next) => {
    return selectAllTickets()
        .then((tickets) => {
        res.status(200).send({ tickets });
    })
        .catch(next);
};
exports.getTicketById = (req, res, next) => {
    const { ticket_id } = req.params;
    return selectTicketById(ticket_id)
        .then((ticket) => {
        res.status(200).send({ ticket });
    })
        .catch(next);
};
exports.postTicket = (req, res, next) => {
    const { owner_username, seating, eventDetails, notes, hasBeenClaimed } = req.body;
    if (owner_username === "" ||
        seating === "" ||
        eventDetails === "" ||
        notes === "") {
        throw { msg: "Information cannot be blank!", status: 400 };
    }
    else {
        return addNewTicket(owner_username, seating, eventDetails, notes, hasBeenClaimed)
            .then((newTicket) => {
            res.status(201).send({ newTicket });
        })
            .catch(next);
    }
};
exports.deleteTicket = (req, res, next) => {
    const { ticket_id } = req.params;
    const pendingSelectTicketById = selectTicketById(ticket_id);
    const pendingDeleteTicketById = deleteTicketById(ticket_id);
    return Promise.all([pendingDeleteTicketById, pendingSelectTicketById])
        .then(() => {
        res.status(204).send();
    })
        .catch(next);
};
