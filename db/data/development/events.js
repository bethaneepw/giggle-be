const { mongoose } = require("mongoose");
const { eventSchema } = require("../../schema/eventSchema");

const Event = mongoose.model("events", eventSchema);

module.exports = [
  new Event({
    _id: "6841ade2e789d40979e235ca",
    event_artist: "Black Knives",
    event_location: "Brighton",
    event_venue: "Concorde 2",
    event_date: "2025-08-01T00:20:00Z",
  }),
  new Event({
    _id: "6841ae037d69e77ef75f6b2f",
    event_artist: "The Tarnished",
    event_location: "London",
    event_venue: "Alexandra Palace",
    event_date: "2026-05-01T00:21:00Z",
  }),
  new Event({
    _id: "6841b051cc1b8b8ee55b6e1d",
    event_artist: "The Modal Nodes",
    event_location: "Manchester",
    event_venue: "Manchester Apollo",
    event_date: "2026-07-18T00:19:00Z",
  }),
  new Event({
    _id: "6841b08fdd14c4583ebed053",
    event_artist: "The Stardews",
    event_location: "London",
    event_venue: "Roundhouse",
    event_date: "2026-07-11T00:19:00Z",
  }),
  new Event({
    _id: "6841b11448f32b84af511461", // double check this id it needs to change
    event_artist: "J.J. Slider",
    event_location: "Leeds",
    event_venue: "Brudenell Social Club",
    event_date: "2026-08-01T00:20:00Z",
  }),
  new Event({
    _id: "6841b11448f32b84af511461",
    event_artist: "J.J. Slider",
    event_location: "London",
    event_venue: "KOKO",
    event_date: "2026-08-03T00:20:00Z",
  }),
];
