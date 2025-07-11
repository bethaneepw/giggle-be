const seed = require("../db/seeds/seed");
const data = require("../db/data/test/index");
const { mongoose } = require("mongoose");
const { userSchema } = require("../db/schema/userSchema");
const { ticketSchema } = require("../db/schema/ticketSchema");
const { eventSchema } = require("../db/schema/eventSchema");
const { chatSchema } = require("../db/schema/chatSchema");
const { messageSchema } = require("../db/schema/messageSchema");
const { test, expect, describe, beforeEach } = require("@jest/globals");

beforeAll(() => {
  return seed(data);
});
afterAll(() => {
  return mongoose.disconnect();
});

const User = mongoose.model("users", userSchema);
const Ticket = mongoose.model("tickets", ticketSchema);
const Event = mongoose.model("events", eventSchema);
const Chat = mongoose.model("chats", chatSchema);
const Message = mongoose.model("messages", messageSchema);

describe("Seed", () => {
  describe("Users collection", () => {
    test("Users collection exists", async () => {
      const users = await User.find({});
      expect(users.length).toBeGreaterThan(0);
    });

    test("Users has the required data of the correct variable type", async () => {
      const users = await User.find({});
      expect(users.length).toBeGreaterThan(0);
      users.forEach((user) => {
        expect(user).toHaveProperty("_id");
        expect(typeof user.firstName).toBe("string");
        expect(typeof user.lastName).toBe("string");
        expect(typeof user.username).toBe("string");
        expect(typeof user.location).toBe("object");
        expect(typeof user.location.town).toBe("string");
        expect(typeof user.location.postcode).toBe("string");
        expect(typeof user.preferences).toBe("object");
        expect(
          user.preferences.drinkPreference === null ||
            typeof user.preferences.drinkPreference === "string"
        ).toBe(true);
        expect(
          user.preferences.seatPreference === null ||
            typeof user.preferences.seatPreference === "string"
        ).toBe(true);
        expect(typeof user.preferences.giggingStyle).toBe("object");
        expect(typeof user.preferences.giggingStyle.mosher).toBe("boolean");
        expect(typeof user.preferences.giggingStyle.singalong).toBe("boolean");
        expect(typeof user.preferences.giggingStyle.photographer).toBe(
          "boolean"
        );
        expect(typeof user.biography).toBe("string" || null);
        expect(user.dateOfBirth instanceof Date).toBe(true);
        expect(typeof user.gender).toBe("string");
        expect(typeof user.trustRating).toBe("number");
        expect(typeof user.isVerified).toBe("boolean");
        expect(user.memberSince instanceof Date).toBe(true);
        expect(Array.isArray(user.interestedEvents)).toBe(true);
        expect(typeof user.profilePictureURL).toBe("string");
      });
    });

    test("Users with interested events can return event details", async () => {
      const user = await User.findOne({ username: "TheBoss" }).populate(
        "interestedEvents"
      );
      expect(user.interestedEvents[0].event_artist).toBe("Megan Thee Stallion");
      expect(user.interestedEvents[0].event_location).toBe("Leeds");
      expect(user.interestedEvents[0].event_venue).toBe(
        "Brudenell Social Club"
      );
      expect(user.interestedEvents[0].event_date.toISOString()).toBe(
        "2026-02-14T00:21:00.000Z"
      );
      expect(user.interestedEvents[0]._id.toString()).toBe(
        "66679e9e54711517579556f3"
      );
    });

    test("Allows null or missing options", async () => {
      const user = new User({
        firstName: "Test",
        lastName: "Smith",
        username: "tester102",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {
          drinkPreference: null,
          seatPreference: null,
          giggingStyle: {},
        },
        dateOfBirth: new Date("2000-01-01"),
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        password: "password",
        email: "testseed@email.com",
      });
      await expect(user.validate()).resolves.toBeUndefined();
    });

    test("Defaults giggingStyle booleans to be false", async () => {
      const user = await User.create({
        firstName: "Test",
        lastName: "Smith",
        username: "tester101",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        dateOfBirth: new Date("2000-01-01"),
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        password: "password",
        email: "testseed2@email.com",
      });
      expect(user.preferences.giggingStyle.mosher).toBe(false);
      expect(user.preferences.giggingStyle.singalong).toBe(false);
      expect(user.preferences.giggingStyle.photographer).toBe(false);
    });

    test("Rejects duplicate usernames", async () => {
      const userData = {
        firstName: "Test",
        lastName: "Smith",
        username: "unique",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        dateOfBirth: new Date("2000-01-01"),
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        password: "password",
        email: "testseed3@email.com",
      };
      await User.create(userData);
      await expect(User.create(userData)).rejects.toThrow(
        new Error(
          'E11000 duplicate key error collection: giggle_test.users index: username_1 dup key: { username: "unique" }'
        )
      );
    });

    test("Rejects when required fields are missing", async () => {
      const userData = {
        firstName: "Test",
        lastName: "Smith",
        username: "noDateOfBirth",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        // Missing dateOfBirth
        password: "password",
        email: "testseed4@email.com",
      };
      await expect(User.create(userData)).rejects.toThrow(
        new Error(
          "users validation failed: dateOfBirth: Path `dateOfBirth` is required."
        )
      );
    });

    test("Rejects invalid values", async () => {
      const userData = {
        firstName: "Test",
        lastName: "Smith",
        username: "Tester101",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        dateOfBirth: new Date("2000-01-01"),
        gender: "Alien", // Invalid
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        password: "password",
        email: "testseed5@email.com",
      };
      await expect(User.create(userData)).rejects.toThrow(
        new Error(
          "users validation failed: gender: Validator failed for path `gender` with value `Alien`"
        )
      );
    });

    test("Rejects trustRating outside 0-1 range", async () => {
      const userData = {
        firstName: "Test",
        lastName: "Smith",
        username: "unique",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        dateOfBirth: new Date("2000-01-01"),
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        trustRating: 1.5,
        password: "password",
        email: "testseed6@email.com",
      };
      await expect(User.create(userData)).rejects.toThrow(
        new Error(
          "users validation failed: trustRating: Path `trustRating` (1.5) is more than maximum allowed value (1)."
        )
      );
    });

    test("Rejects username outside of permitted range", async () => {
      const userData = {
        firstName: "Test",
        lastName: "Smith",
        username: "longestusernameeveris",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        dateOfBirth: new Date("2000-01-01"),
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        password: "password",
        email: "testseed7@email.com",
      };

      await expect(User.create(userData)).rejects.toThrow(
        new Error(
          "users validation failed: username: Path `username` (`longestusernameeveris`) is longer than the maximum allowed length (20)."
        )
      );
    });

    test("Rejects duplicate emails", async () => {
      const userData1 = {
        firstName: "Test",
        lastName: "Smith",
        username: "uniqueEmails1",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        dateOfBirth: new Date("2000-01-01"),
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        password: "password",
        email: "notunique@email.com",
      };
      const userData2 = {
        firstName: "Test",
        lastName: "Smith",
        username: "uniqueEmails2",
        location: { town: "Testville", postcode: "TS1 1TS" },
        preferences: {},
        dateOfBirth: new Date("2000-01-01"),
        gender: "Woman",
        interestedEvents: [],
        profilePictureURL: "http://testURL.com/test.jpg",
        password: "password",
        email: "notunique@email.com",
      };
      await User.create(userData1);
      await expect(User.create(userData2)).rejects.toThrow(
        new Error(
          'E11000 duplicate key error collection: giggle_test.users index: email_1 dup key: { email: "notunique@email.com" }'
        )
      );
    });
    
  });

  describe("Events collection", () => {
    test("Events collection exists", async () => {
      const events = await Event.find({});
      expect(events.length).toBeGreaterThan(0);
    });

    test("Events has the required data of the correct variable type", async () => {
      const events = await Event.find({});
      expect(events.length).toBeGreaterThan(0);
      events.forEach((event) => {
        expect(typeof event.event_artist).toBe("string");
        expect(typeof event.event_location).toBe("string");
        expect(typeof event.event_venue).toBe("string");
        expect(event.event_date instanceof Date).toBe(true);
      });
    });

    test("Events accepts optional data of the correct type", async () => {
      const event = await Event.create({
        event_artist: "Testing Artist",
        event_location: "Testville",
        event_venue: "TestArena",
        event_date: "2025-08-01T00:20:00Z",
        event_img: "testurl.com/test.jpg",
      });
      expect(typeof event.event_img).toBe("string");
    });

    test("Rejects when required fields are missing", async () => {
      const eventData = {
        event_artist: "Testing Artist",
        event_location: "Testville",
        // Missing venue
        event_date: "2025-08-01T00:20:00Z",
        event_img: "testurl.com/test.jpg",
      };
      await expect(Event.create(eventData)).rejects.toThrow(
        new Error(
          "events validation failed: event_venue: Path `event_venue` is required."
        )
      );
    });

    test("Rejects invalid values", async () => {
      const eventData = {
        event_artist: "Testing Artist",
        event_location: "Testville",
        event_venue: "Test Arena",
        event_date: "ThisIsADate",
        event_img: "testurl.com/test.jpg",
      };
      await expect(Event.create(eventData)).rejects.toThrow(
        new Error(
          `events validation failed: event_date: Cast to date failed for value "ThisIsADate" (type string) at path "event_date"`
        )
      );
    });
  });

  describe("Tickets collection", () => {
    test("Tickets collection exists", async () => {
      const tickets = await Ticket.find({});
      expect(tickets.length).toBeGreaterThan(0);
    });

    test("Tickets had the required data of the correct variable type", async () => {
      const tickets = await Ticket.find({}).populate("eventDetails");
      expect(tickets.length).toBeGreaterThan(0);
      tickets.forEach((ticket) => {
        expect(typeof ticket.owner_username).toBe("string");
        expect(typeof ticket.seating).toBe("string");
        expect(typeof ticket.eventDetails).toBe("object");
        expect(ticket.eventDetails).toHaveProperty("event_artist");
        expect(ticket.eventDetails).toHaveProperty("event_location");
        expect(ticket.eventDetails).toHaveProperty("event_venue");
        expect(ticket.eventDetails).toHaveProperty("event_date");
        expect(typeof ticket.hasBeenClaimed).toBe("boolean");
      });
    });

    test("Tickets has the optional data of the correct variable type", async () => {
      const tickets = await Ticket.find({ notes: { $exists: true } });
      expect(tickets.length).toBeGreaterThan(0);
      tickets.forEach((ticket) => {
        expect(typeof ticket.notes).toBe("string");
      });
    });

    test("Defaults hasBeenClaimed to be false", async () => {
      const ticket = await Ticket.create({
        owner_username: "Tester101",
        seating: "Seating",
        eventDetails: "66679e9e54711517579556f3",
        notes: "Default should be false!",
      });
      expect(ticket.hasBeenClaimed).toBe(false);
    });

    test("Rejects invalid values", async () => {
      const ticketData = {
        owner_username: "Tester101",
        seating: "Seating",
        eventDetails: "7424972947",
        notes: "Default should be false!",
      };
      await expect(Ticket.create(ticketData)).rejects.toThrow(
        new Error(
          `tickets validation failed: eventDetails: Cast to ObjectId failed for value "7424972947" (type string) at path "eventDetails" because of "BSONError"`
        )
      );
    });

    test("Rejects seating value outside of permitted values", async () => {
      const ticketData = {
        owner_username: "Tester101",
        seating: "Lying Down",
        eventDetails: "66679e9e54711517579556f3",
      };

      await expect(Ticket.create(ticketData)).rejects.toThrow(
        new Error(
          "tickets validation failed: seating: Validator failed for path `seating` with value `Lying Down`"
        )
      );
    });

    test("Rejects when required values are missing", async () => {
      const ticketData = {
        seating: "Standing",
        eventDetails: "66679e9e54711517579556f3",
      };
      await expect(Ticket.create(ticketData)).rejects.toThrow(
        "tickets validation failed: owner_username: Path `owner_username` is required."
      );
    });
  });

  describe("Chats collection", () => {
    test("Chats collection exists", async () => {
      const chats = await Chat.find({});
      expect(chats.length).toBeGreaterThan(0);
    });

    test("Chats contains the required data of the correct variable type", async () => {
      const chats = await Chat.find({});
      expect(chats.length).toBeGreaterThan(0);
      chats.forEach((chat) => {
        const plainChat = chat.toObject();
        expect(plainChat).toMatchObject({
          _id: expect.any(Object),
          user_ids: expect.any(Array),
        });
        expect(chat.user_ids).toHaveLength(2);
      });
    });

    test("Rejects chats with more than 2 users", async () => {
      const chatData = {
        user_ids: [
          "68405b9711f50eebe1b59521",
          "68405b9711f50eebe1b59523",
          "68405b9711f50eebe1b59522",
        ],
      };
      await expect(Chat.create(chatData)).rejects.toThrow(
        new Error("chats validation failed: user_ids: must contain 2 user_ids")
      );
    });

    test("Rejects invalid values", async () => {
      const chatData = {
        user_ids: "68405b9711f50eebe1b59521" + "68405b9711f50eebe1b59523",
      };
      await expect(Chat.create(chatData)).rejects.toThrow(
        new Error("chats validation failed: user_ids: must contain 2 user_ids")
      );
    });

    test("Rejects missings fields", async () => {
      const chatData = {};
      await expect(Chat.create(chatData)).rejects.toThrow(
        new Error("chats validation failed: user_ids: must contain 2 user_ids")
      );
    });
  });

  describe("Messages collection", () => {
    test("Messages collection exists", async () => {
      const messages = await Message.find({});
      expect(messages.length).toBeGreaterThan(0);
    });

    test("Message contain the required data of the correct variable type", async () => {
      const messages = await Message.find({});
      expect(messages.length).toBeGreaterThan(0);
      messages.forEach((message) => {
        const plainMessage = message.toObject();
        expect(plainMessage).toMatchObject({
          _id: expect.any(Object),
          roomId: expect.any(Object),
          senderId: expect.any(Object),
          body: expect.any(String),
          timestamp: expect.any(Date),
          displayToClient: expect.any(Boolean),
        });
      });
    });

    test("Messages require body property to have content", async () => {
      const messageData = {
        user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
        roomId: "68405d38239a61ea5b7ad207",
        senderId: "68405b9711f50eebe1b59523",
        body: "",
        displayToClient: true,
      };

      await expect(Message.create(messageData)).rejects.toThrow(
        new Error("messages validation failed: body: Path `body` is required.")
      );
    });

    test("Messages default displayToClient property as true", async () => {
      const message = await Message.create({
        user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
        roomId: "68405d38239a61ea5b7ad207",
        senderId: "68405b9711f50eebe1b59523",
        body: "hey champ!",
      });
      expect(message).toHaveProperty("displayToClient");
      expect(message.displayToClient).toBe(true);
    });

    test("Messages have a timestamp property as default without being explicitly passed", async () => {
      const message = await Message.create({
        user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
        roomId: "68405d38239a61ea5b7ad207",
        senderId: "68405b9711f50eebe1b59523",
        body: "hey champ!",
      });
      expect(message).toHaveProperty("timestamp");
      expect(message.timestamp instanceof Date).toBe(true);
    });

    test("Rejects invalid values", async () => {
      const messageData = {
        user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
        roomId: 420424,
        senderId: "68405b9711f50eebe1b59523",
        body: "testing",
        displayToClient: true,
      };

      await expect(Message.create(messageData)).rejects.toThrow(
        new Error(
          `messages validation failed: roomId: Cast to ObjectId failed for value "420424" (type number) at path "roomId" because of "BSONError"`
        )
      );
    });

    test("Rejects missing fields", async () => {
      const messageData = {
        user_ids: ["68405b9711f50eebe1b59521", "68405b9711f50eebe1b59523"],
        senderId: "68405b9711f50eebe1b59523",
        body: "testing",
        displayToClient: true,
      };

      await expect(Message.create(messageData)).rejects.toThrow(
        new Error(
          "messages validation failed: roomId: Path `roomId` is required."
        )
      );
    });
  });
});
