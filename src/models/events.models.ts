const { mongoose } = require("../../db/connection");
const { eventSchema } = require("../../db/schema/eventSchema");
const Event = mongoose.model("events", eventSchema);

export const selectEvents = (sort_by, order, artist, town) => {
  const orderGreenList = ["asc", "desc"];
  const sortByGreenList = ["event_artist", "event_location"];
  if (order && !orderGreenList.includes(order.toLowerCase())) {
    throw { msg: "Invalid order request!", status: 400 };
  }
  if (sort_by && !sortByGreenList.includes(sort_by.toLowerCase())) {
    throw { msg: "Invalid sort_by request!", status: 400 };
  }

  const queries = {};
  if (town) {
    queries.event_location = { $regex: new RegExp(town, "ig") };
  }

  if (artist) {
    queries.event_artist = { $regex: new RegExp(artist, "ig") };
  }
  const sortOrderQueries = {};
  if (sort_by) {
    if (!order) {
      //if no order, do default: ascending
      sortOrderQueries[sort_by] = "asc";
    } else {
      sortOrderQueries[sort_by] = order.toLowerCase();
    }
  }
  return Event.find(queries)
    .sort(sortOrderQueries)
    .then((events) => {
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
  event_date,
  event_img
) => {
  return Event.create({
    event_artist: event_artist,
    event_location: event_location,
    event_venue: event_venue,
    event_date: event_date,
    event_img: event_img,
  }).then((newEvent) => {
    return newEvent;
  });
};

export const deleteEventByEventId = (eventId) => {
  return Event.findByIdAndDelete(eventId).then(() => {});
};
