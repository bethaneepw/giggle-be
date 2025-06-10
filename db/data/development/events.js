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
    event_img:
      "https://images.unsplash.com/photo-1507901747481-84a4f64fda6d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
  new Event({
    _id: "6841ae037d69e77ef75f6b2f",
    event_artist: "The Tarnished",
    event_location: "London",
    event_venue: "Alexandra Palace",
    event_date: "2026-05-01T00:21:00Z",
    event_img:
      "https://images.unsplash.com/photo-1675446730884-fcf0321a7672?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
  new Event({
    _id: "6841b051cc1b8b8ee55b6e1d",
    event_artist: "The Modal Nodes",
    event_location: "Manchester",
    event_venue: "Manchester Apollo",
    event_date: "2026-07-18T00:19:00Z",
    event_img:
      "https://plus.unsplash.com/premium_vector-1737592300491-4cb3d2faee48?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
  new Event({
    _id: "6841b08fdd14c4583ebed053",
    event_artist: "The Stardews",
    event_location: "London",
    event_venue: "Roundhouse",
    event_date: "2026-07-11T00:19:00Z",
    event_img:
      "https://plus.unsplash.com/premium_photo-1661315669250-0a0255fb0e6b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
  new Event({
    _id: "6842aa5401b3d102a586c50a",
    event_artist: "J.J. Slider",
    event_location: "Leeds",
    event_venue: "Brudenell Social Club",
    event_date: "2026-08-01T00:20:00Z",
    event_img:
      "https://media.gettyimages.com/id/455935316/photo/angel-olsen-performs-at-the-brudenell-social-club-in-leeds.jpg?s=1024x1024&w=gi&k=20&c=vMX53hHUtblCsMUBvGHxmkGkKelI-jvsDBe8qDYiE04=",
  }),
  new Event({
    _id: "6841b11448f32b84af511461",
    event_artist: "J.J. Slider",
    event_location: "London",
    event_venue: "KOKO",
    event_date: "2026-08-03T00:20:00Z",
    event_img:
      "https://images.unsplash.com/photo-1713279766640-6ec28b7c8c4c?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
];
