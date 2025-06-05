import { Request, Response } from "express";

const {
  selectTickets,
  selectTicketById,
  addNewTicket,
  deleteTicketById,
  updateTicket,
} = require("../models/tickets.models");

// interface Ticket {
//   id: number;
//   event_id: number;
//   user_id: number;
// }

exports.getTickets = (
  req: Request,
  res: Response<Ticket>,
  next
): Promise<void> => {
  return selectTickets()
    .then((tickets) => {
      res.status(200).send({ tickets });
    })
    .catch(next);
};

exports.getTicketById = (
  req: Request,
  res: Response<Ticket>,
  next
): Promise<void> => {
  const { ticket_id } = req.params;
  return selectTicketById(ticket_id)
    .then((ticket) => {
      res.status(200).send({ ticket });
    })
    .catch(next);
};

exports.postTicket = (
  req: Request,
  res: Response<Ticket>,
  next
): Promise<void> => {
  const { owner_username, seating, eventDetails, notes, hasBeenClaimed } =
    req.body;
  if (
    owner_username === "" ||
    seating === "" ||
    eventDetails === "" ||
    notes === ""
  ) {
    throw { msg: "Information cannot be blank!", status: 400 };
  } else {
    return addNewTicket(
      owner_username,
      seating,
      eventDetails,
      notes,
      hasBeenClaimed
    )
      .then((newTicket) => {
        res.status(201).send({ newTicket });
      })
      .catch(next);
  }
};

exports.deleteTicket = (req: Request, res: Response, next): Promise<void> => {
  const { ticket_id } = req.params;
  const pendingSelectTicketById = selectTicketById(ticket_id);
  const pendingDeleteTicketById = deleteTicketById(ticket_id);

  return Promise.all([pendingDeleteTicketById, pendingSelectTicketById])
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.patchTicket = (
  req: Request,
  res: Response<Ticket>,
  next
): Promise<void> => {
  const dataToUpdate = req.body;
  const { ticket_id } = req.params;
  console.log(ticket_id, "ticket id"); //RETURNING NOT FOUND FOR ID BECAUSE OF BEFOREALL ISSUE - TICKET WAS DELETED EARLIER IN TESTS!ß
  const pendingSelectTicketById = selectTicketById(ticket_id);
  console.log(pendingSelectTicketById);
  const pendingUpdateTicket = updateTicket(ticket_id, dataToUpdate);
  return Promise.all([pendingUpdateTicket, pendingSelectTicketById])
    .then(([updatedTicket]) => {
      res.status(200).send({ updatedTicket });
    })
    .catch(next);
};
