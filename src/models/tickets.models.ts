const { mongoose } = require("../../db/connection");
const { ticketSchema } = require("../../db/schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);

export const selectAllTickets = () => {
  return Ticket.find({}).then((tickets) => {
    return tickets;
  });
};

export const selectTicketById = (ticketId) => {
  return Ticket.findById(ticketId)
    .orFail(() => {
      throw { msg: "Ticket does not exist!", status: 404 };
    })
    .then((ticket) => {
      return ticket;
    });
};
