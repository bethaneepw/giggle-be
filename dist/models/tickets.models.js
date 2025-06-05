"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTicketById = exports.selectAllTickets = void 0;
const { mongoose } = require("../../db/connection");
const { ticketSchema } = require("../../db/schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);
const selectAllTickets = () => {
    return Ticket.find({}).then((tickets) => {
        return tickets;
    });
};
exports.selectAllTickets = selectAllTickets;
const selectTicketById = () => {
};
exports.selectTicketById = selectTicketById;
