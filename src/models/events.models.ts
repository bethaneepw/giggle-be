const { mongoose, run } = require("../../db/connection");
const { eventSchema } = require("../../db/schema/eventSchema");
const Event = mongoose.model("events", eventSchema);

export const selectAllEvents = () => {
  return Event.find({}).then((events) => {
    return events;
  });
};

export const selectEventById = (id) => {
  return Event.findById(id)
    .orFail(() => {
      throw { msg: "Event does not exist!", status: 404 };
    })
    .then((event) => {
      return event;
    });
};

export const addNewEvent = (
  event_artist,
  event_location,
  event_venue,
  event_date
) => {
  return Event.create({
    event_artist: event_artist,
    event_location: event_location,
    event_venue: event_venue,
    event_date: event_date,
  }).then((newEvent) => {
    return newEvent;
  });
};
