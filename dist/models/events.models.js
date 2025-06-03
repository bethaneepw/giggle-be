"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAllEvents = void 0;
const { mongoose, run } = require("../../db/connection");
const { eventSchema } = require("../../db/schema/eventSchema");
const Event = mongoose.model("events", eventSchema);
const selectAllEvents = () => {
    return Event.find({}).then((events) => {
        console.log(events);
        return events;
    });
};
exports.selectAllEvents = selectAllEvents;
(0, exports.selectAllEvents)();
