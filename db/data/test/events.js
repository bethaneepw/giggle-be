const { mongoose } = require("mongoose");
const { eventSchema } = require("../../schema/eventSchema");

const Event = mongoose.model("events", eventSchema);

module.exports = [
  new Event({
    event_artist: "Phoebe Bridgers",
    event_location: "Brighton",
    event_venue: "Concorde 2",
    event_date: "2025-08-01T00:20:00Z",
    _id: "66679e9e54711517579556f1",
  }),
  new Event({
    event_artist: "Iggy Pop",
    event_location: "London",
    event_venue: "Alexandra Palace",
    event_date: "2026-05-01T00:21:00Z",
    _id: "66679e9e54711517579556f2",
  }),
  new Event({
    event_artist: "Megan Thee Stallion",
    event_location: "Leeds",
    event_venue: "Brudenell Social Club",
    event_date: "2026-02-14T00:21:00Z",
    _id: "66679e9e54711517579556f3",
  }),
];
