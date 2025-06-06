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

const seed = async ({ userData, chatData, eventData, ticketData, messageData }) => {
  try {
    await run();

    await Event.deleteMany().then(() => {
      console.log("Successfully deleted old Event Data");
    });

    await User.deleteMany().then(() => {
      console.log("Successfully deleted old User Data");
    });

    await Chat.deleteMany().then(() => {
      console.log("Successfully deleted old Chat Data");
    });

    await Message.deleteMany().then(() => {
      console.log("Successfully deleted old Messages Data");
    });

    await Ticket.deleteMany().then(() => {
      console.log("Successfully deleted old Ticket Data");
    });

    await Event.create(eventData).then(() => {
      console.log("Successfully created Event Data");
    });

    await User.create(userData).then(() => {
      console.log("Successfully created User Data");
    });

    await Ticket.create(ticketData).then(() => {
      console.log("Successfully created Ticket Data");
    });

    await Chat.create(chatData).then(() => {
      console.log("Successfully created Chat Data");
    });

    await Message.create(messageData).then(() => {
      console.log("Successfully created Message Data");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
