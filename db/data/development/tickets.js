const {mongoose} = require("mongoose")
const {ticketSchema} = require("../../schema/ticketSchema")
const Ticket = mongoose.model("tickets", ticketSchema)

module.exports =[
    new Ticket({}),
    new Ticket({}),
    new Ticket({}),
    new Ticket({}),
    new Ticket({}),
    new Ticket({}),
]