const { userSchema } = require("../schema/userSchema");
const { mongoose } = require("mongoose");
const { chatSchema } = require("../schema/chatSchema");
const { eventSchema } = require("../schema/eventSchema");
const { ticketSchema } = require("../schema/ticketSchema");
const { run } = require("../connection");

const User = mongoose.model("users", userSchema);
const Chat = mongoose.model("chats", chatSchema);
const Event = mongoose.model("events", eventSchema);
const Ticket = mongoose.model("tickets", ticketSchema);

const seed = async ({ userData, chatData, eventData, ticketData }) => {

  try {
    await run()
    await User.deleteMany().then(() => {
      console.log("Successfully deleted old User Data");
    });
    await User.create(userData).then(() => {
      console.log("Successfully created User Data");
    });

    await Chat.deleteMany().then(function () {
      console.log("Successfully deleted old Chat Data");
    });

    await Chat.create(chatData).then(
      console.log("Successfully created Chat Data")
    );

    await Event.deleteMany().then(function () {
      console.log("Successfully deleted old Event Data");
    });

    await Event.create(eventData).then(
      console.log("Successfully created Event Data")
    );

    await Ticket.deleteMany().then(function () {
      console.log("Successfully deleted old Ticket Data");
    });

    await Ticket.create(ticketData).then(
      console.log("Successfully created Ticket Data")
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
