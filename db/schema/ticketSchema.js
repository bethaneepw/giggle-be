const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema({
  owner_username: { type: String, required: true },
  seating: {
    type: String,
    validate: (value) => value === "Standing" || value === "Seating",
  },
  eventDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  notes: { type: String, required: false },
  hasBeenClaimed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = { ticketSchema };
