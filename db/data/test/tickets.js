const { mongoose } = require("mongoose");
const { ticketSchema } = require("../../schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);

module.exports = [
  new Ticket({
    owner_username: "TheBoss",
    seating: "Standing",
    eventDetails: "66679e9e54711517579556f1",
    notes: "Buy me a beer!",
    hasBeenClaimed: false,
  }),
  new Ticket({
    _id: "56679e9e54711517579556f4",
    owner_username: "BoygeniusMVP",
    seating: "Standing",
    eventDetails: "66679e9e54711517579556f3",
    notes: "Anyone fancy it?",
    hasBeenClaimed: false,
  }),
  new Ticket({
    _id: "56679e9e54711517579556f5",
    owner_username: "col99",
    seating: "Seating",
    eventDetails: "66679e9e54711517579556f3",
    notes: "Would love a friend to bring!!",
    hasBeenClaimed: true,
  }),
];
