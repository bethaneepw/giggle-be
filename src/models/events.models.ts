const { mongoose, run } = require("../../db/connection");
const { eventSchema } = require("../../db/schema/eventSchema");
const Event = mongoose.model("events", eventSchema);

export const selectAllEvents = () => {
  return Event.find({}).then((events) => {
    console.log(events);
    return events;
  });
};

export const selectEventById = (id) => {
return Event.findById(id).then((event) => {
  console.log(event)
  return event
})
}

selectEventById("66679e9e54711517579556f3")

export const addNewEvent = (event_artist, event_location, event_venue, event_date) => {
return Event.add({event_artist: event_artist, event_location: event_location, event_venue: event_venue, event_date: event_date })
.then((event) => {
  console.log(event)
  return event
})
}