"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketById = exports.addNewTicket = exports.selectTicketById = exports.selectAllTickets = void 0;
const { mongoose } = require("../../db/connection");
const { ticketSchema } = require("../../db/schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);
const selectAllTickets = () => {
    return Ticket.find({}).then((tickets) => {
        return tickets;
    });
};
exports.selectAllTickets = selectAllTickets;
const selectTicketById = (ticketId) => {
    return Ticket.findById(ticketId)
        .orFail(() => {
        throw { msg: "Ticket does not exist!", status: 404 };
    })
        .then((ticket) => {
        return ticket;
    });
};
exports.selectTicketById = selectTicketById;
const addNewTicket = (owner_username, seating, eventDetails, notes, hasBeenClaimed) => {
    return Ticket.create({
        owner_username,
        seating,
        eventDetails,
        notes,
        hasBeenClaimed,
    }).then((newTicket) => {
        return newTicket;
    });
};
exports.addNewTicket = addNewTicket;
const deleteTicketById = (ticketId) => {
    return Ticket.findByIdAndDelete(ticketId).then(() => { });
};
exports.deleteTicketById = deleteTicketById;
