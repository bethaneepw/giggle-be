"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = exports.deleteTicketById = exports.addNewTicket = exports.selectTicketById = exports.selectTickets = void 0;
const { mongoose } = require("../../db/connection");
const { ticketSchema } = require("../../db/schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);
const { addNewEvent } = require("./events.models")

const selectTickets = () => {
    return Ticket.find({}).then((tickets) => {
        return tickets;
    });
};
exports.selectTickets = selectTickets;
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
 if(Ticket.find({}).populate("eventDetails")===undefined){
return {msg:"this event is not listed in or app, please add it to the events", status:404}
 }else {

 }

//  Ticket.find({}).populate("eventDetails")
//  .orFail(()=>{
//     throw { msg:"this event is not listed in or app, please add it to the events", status:404}
//     return 
//  })
    
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
const updateTicket = (ticketId, dataToUpdate) => {
    const { notes, hasBeenClaimed } = dataToUpdate;
    if (hasBeenClaimed === "") {
        //notes can be patched blank
        throw { msg: "Information cannot be blank!", status: 400 };
    }
    if (notes) {
        return Ticket.findByIdAndUpdate(ticketId, { notes: notes }, { new: true, runValidators: true }).then((updatedTicket) => {
            return updatedTicket;
        });
    }
    if (hasBeenClaimed === false || hasBeenClaimed === true) {
        return Ticket.findByIdAndUpdate(ticketId, { hasBeenClaimed: hasBeenClaimed }, { new: true, runValidators: true }).then((updatedTicket) => {
            return updatedTicket;
        });
    }
    if (hasBeenClaimed && hasBeenClaimed !== true && hasBeenClaimed !== false) {
        throw { msg: "Invalid information!", status: 400 };
    }
};
exports.updateTicket = updateTicket;
