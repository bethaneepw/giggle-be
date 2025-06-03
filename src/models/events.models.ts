const { mongoose, run } = require("../../db/connection");
const { eventSchema } = require("../../db/schema/eventSchema");
const Event = mongoose.model("events", eventSchema);

export const selectAllEvents = () => {
  return Event.find({}).then((events) => {
    console.log(events);
    return events;
  });
};

selectAllEvents();
