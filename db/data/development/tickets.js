const { mongoose } = require("mongoose");
const { ticketSchema } = require("../../schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);

module.exports = [
  new Ticket({
    owner_username: "freyja_redmane",
    seating: "Standing",
    eventDetails: "6841ade2e789d40979e235ca",
    notes: "Open to getting dinner and making an evening of it :)",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "bernahlk92",
    seating: "Seating",
    eventDetails: "6841ae037d69e77ef75f6b2f",
    notes: "seated pretty far back but should be alright",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "mirielLikesTurtles",
    seating: "Seating",
    eventDetails: "6841ae037d69e77ef75f6b2f",
    notes: "Hope it’s a fun night!",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "freyja_redmane",
    seating: "Standing",
    eventDetails: "6841b08fdd14c4583ebed053",
    notes: "Can't wait to dance!",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "lordKenneth",
    seating: "Seating",
    eventDetails: "6841b11448f32b84af511461",
    notes: "Hoping for a great performance!",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "scarlett_m",
    seating: "Standing",
    eventDetails: "6841b11448f32b84af511461",
    notes: "slider hyyyyype",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "hunter_jerren",
    seating: "Seating",
    eventDetails: "6841b051cc1b8b8ee55b6e1d",
    notes: "Buy me a drink 4 ticket",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "nepheli_99",
    seating: "Standing",
    eventDetails: "6841b051cc1b8b8ee55b6e1d",
    notes: "love meeting new Modal fans!",
    hasBeenClaimed: false,
  }),
];
