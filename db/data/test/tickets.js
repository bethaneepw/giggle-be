const {mongoose} = require("mongoose")
const {ticketSchema} = require("../../schema/ticketSchema")

const Ticket = mongoose.model("tickets", ticketSchema)

module.exports =[
    new Ticket({
    owner_username: "TheBoss",
    seating: "Standing",
    eventDetails: {
        event_artist: "Phoebe Bridgers",
        event_location: "Brighton",
        event_venue: "Concord",
        event_date: "2025-08-01T00:20:00Z"
    },
    notes: "Buy me a beer!",
    hasBeenClaimed: false
}),
new Ticket({
    owner_username: "BoygeniusMVP",
    seating: "Standing",
    eventDetails: {
        event_artist: "Megan Thee Stallion",
        event_location: "Leeds",
        event_venue: "Brudenell Social Club",
        event_date: "2026-02-14T00:21:00Z"
    },
    hasBeenClaimed: false
}),
new Ticket({
    owner_username: "col99",
    seating: "Seating",
    eventDetails: {
        event_artist: "Megan Thee Stallion",
        event_location: "Leeds",
        event_venue: "Brudenell Social Club",
        event_date: "2026-02-14T00:21:00Z"
    },
    notes: "Would love a friend to bring!!",
    hasBeenClaimed: true
})]