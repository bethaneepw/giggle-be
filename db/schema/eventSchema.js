const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    event_artist: {type: String, required: true},
    event_location: {type: String, required: true},
    event_venue: {type: String, required: true},
    event_date: {type: Date, required: true},
    event_img: {type: String, required: false}
})

module.exports = {eventSchema}