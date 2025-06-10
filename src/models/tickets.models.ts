const { mongoose } = require("../../db/connection");
const { ticketSchema } = require("../../db/schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);

export const selectTickets = () => {
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

export const addNewTicket = (
  owner_username,
  seating,
  eventDetails,
  notes,
  hasBeenClaimed
) => {
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

export const deleteTicketById = (ticketId) => {
  return Ticket.findByIdAndDelete(ticketId).then(() => {});
};

export const updateTicket = (ticketId, dataToUpdate) => {
  const { notes, hasBeenClaimed } = dataToUpdate;
  if (hasBeenClaimed === "") {
    //notes can be patched blank
    throw { msg: "Information cannot be blank!", status: 400 };
  }
  if (notes) {
    return Ticket.findByIdAndUpdate(
      ticketId,
      { notes: notes },
      { new: true, runValidators: true }
    ).then((updatedTicket) => {
      return updatedTicket;
    });
  }

  if (hasBeenClaimed === false || hasBeenClaimed === true) {
    return Ticket.findByIdAndUpdate(
      ticketId,
      { hasBeenClaimed: hasBeenClaimed },
      { new: true, runValidators: true }
    ).then((updatedTicket) => {
      return updatedTicket;
    });
  }
  if (hasBeenClaimed && hasBeenClaimed !== true && hasBeenClaimed !== false) {
    throw { msg: "Invalid information!", status: 400 };
  }
};

export const selectTicketByEventId = (event_id: any) => {
  return Ticket.find({ eventDetails: event_id })
    .orFail(() => {
      throw { msg: "No tickets found under that Event Id!", status: 404 };
    })
    .then((tickets: any) => {
      return tickets;
    });
};
