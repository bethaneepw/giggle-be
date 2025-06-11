const { mongoose } = require("mongoose");
const { ticketSchema } = require("../../schema/ticketSchema");
const Ticket = mongoose.model("tickets", ticketSchema);

module.exports = [
  new Ticket({
    owner_username: "freyja_redmane",
    seating: "Standing",
    eventDetails: "6841ade2e789d40979e235ca", // Black Knives, Brighton
    notes: "Wouldn't mind getting dinner and making an evening of it :)",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "bernahlk92",
    seating: "Seating",
    eventDetails: "6841ae037d69e77ef75f6b2f", // The Tarnished
    notes: "seated pretty far back but should be alright",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "mirielLikesTurtles", // Modal Nodes
    seating: "Seating",
    eventDetails: "6841ae037d69e77ef75f6b2f",
    notes: "",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "freyja_redmane",
    seating: "Standing",
    eventDetails: "6841b08fdd14c4583ebed053", // The Stardews
    notes: "",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "lordKenneth",
    seating: "Standing",
    eventDetails: "6842aa5401b3d102a586c50a", // J.J. Slider
    notes: "Hoping for a great performance!",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "freyja_redmane",
    seating: "Seating",
    eventDetails: "6842aa5401b3d102a586c50a", // J.J. Slider
    notes: "Anyone confused about where the seats actually are in the Brude?!",
    hasBeenClaimed: true,
  }),
  new Ticket({
    owner_username: "mirielLikesTurtles",
    seating: "Standing",
    eventDetails: "6842aa5401b3d102a586c50a", // J.J. Slider
    notes: "Boy does JJ look like Angel Olsen!",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "bernahlk92",
    seating: "Standing",
    eventDetails: "6842aa5401b3d102a586c50a", // J.J. Slider
    notes: "Planning to go down early and get near the front :)",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "scarlett_m",
    seating: "Seating",
    eventDetails: "6842aa5401b3d102a586c50a", // J.J.Slider
    notes: "",
    hasBeenClaimed: true,
  }),
  new Ticket({
    owner_username: "scarlett_m",
    seating: "Standing",
    eventDetails: "6841b11448f32b84af511461", // J.J.Slider
    notes: "",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "hunter_jerren",
    seating: "Seating",
    eventDetails: "6841b051cc1b8b8ee55b6e1d", // Modal Nodes
    notes: "Buy me a drink 4 ticket",
    hasBeenClaimed: false,
  }),
  new Ticket({
    owner_username: "nepheli_99",
    seating: "Standing",
    eventDetails: "6841b051cc1b8b8ee55b6e1d", // Modal Nodes
    notes: "",
    hasBeenClaimed: false,
  }),
];
