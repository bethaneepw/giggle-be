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
    event_img:
      "https://images.unsplash.com/photo-1507901747481-84a4f64fda6d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
  new Event({
    event_artist: "Iggy Pop",
    event_location: "London",
    event_venue: "Alexandra Palace",
    event_date: "2026-05-01T00:21:00Z",
    _id: "66679e9e54711517579556f2",
    event_img:
      "https://images.unsplash.com/photo-1675446730884-fcf0321a7672?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
  new Event({
    event_artist: "Megan Thee Stallion",
    event_location: "Leeds",
    event_venue: "Brudenell Social Club",
    event_date: "2026-02-14T00:21:00Z",
    _id: "66679e9e54711517579556f3",
    event_img:
      "https://images.unsplash.com/photo-1713279766640-6ec28b7c8c4c?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
];
