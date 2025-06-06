const { userSchema } = require("../schema/userSchema");
const { mongoose } = require("mongoose");
const { chatSchema } = require("../schema/chatSchema");
const { eventSchema } = require("../schema/eventSchema");
const { ticketSchema } = require("../schema/ticketSchema");
const { run } = require("../connection");
const { messageSchema } = require("../schema/messageSchema");

const User = mongoose.model("users", userSchema);
const Chat = mongoose.model("chats", chatSchema);
const Event = mongoose.model("events", eventSchema);
const Ticket = mongoose.model("tickets", ticketSchema);
const Message = mongoose.model("messages", messageSchema);

const seed = async ({
  userData,
  chatData,
  eventData,
  ticketData,
  messageData,
}) => {
  try {
    await run();
    console.log("Seeding database...");
    try {
      await Ticket.deleteMany({});
      console.log("Successfully deleted old Ticket Data");
    } catch (err) {
      console.log("failed to delete tickets", err);
    }

    try {
      await Message.deleteMany({});
      console.log("Successfully deleted old Messages Data");
    } catch (err) {
      console.log("failed to delete messages", err);
    }

    try {
      await Chat.deleteMany({});
      console.log("Successfully deleted old Chat Data");
    } catch (err) {
      console.log("failed to delete chats", err);
    }

    try {
      await User.deleteMany({});
      console.log("Successfully deleted old User Data");
    } catch (err) {
      console.log("failed to delete users", err);
    }

    try {
      await Event.deleteMany({});
      console.log("Successfully deleted old Event Data");
    } catch (err) {
      console.log("failed to delete events", err);
    }

    try {
      await Event.create(eventData);
      console.log("Successfully created Event Data");
    } catch (err) {
      console.log("failed to create events", err);
    }

    try {
      await User.create(userData);
      console.log("Successfully created User Data");
    } catch (err) {
      console.log("failed to create users", err);
    }

    try {
      await Chat.create(chatData);
      console.log("Successfully created Chat Data");
    } catch (err) {
      console.log("failed to create chats", err);
    }

    try {
      await Message.create(messageData);
      console.log("Successfully created Message Data");
    } catch (err) {
      console.log("failed to create messages", err);
    }

    try {
      await Ticket.create(ticketData);
      console.log("Successfully created Ticket Data");
    } catch (err) {
      console.log("failed to creae tickets", err);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
