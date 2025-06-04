const seed = require("../db/seeds/seed");
const data = require("../db/data/test/index");
const { mongoose } = require("mongoose");
const { userSchema } = require("../db/schema/userSchema");
const { ticketSchema } = require("../db/schema/ticketSchema");
const { eventSchema } = require("../db/schema/eventSchema");
const { chatSchema } = require("../db/schema/chatSchema");
const { test, expect, describe } = require("@jest/globals");
const tickets = require("../db/data/test/tickets");

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

describe("Seed", () => {
  describe("Users collection", () => {
    test("Users collection exists", async () => {
      const users = await User.find({});
      expect(users.length).toBe(3);
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
        expect(typeof user.preferences.drinkPreference).toBe("string" || null);
        expect(typeof user.preferences.seatPreference).toBe("string" || null);
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
      };

      await expect(User.create(userData)).rejects.toThrow(
        new Error(
          "users validation failed: username: Path `username` (`longestusernameeveris`) is longer than the maximum allowed length (20)."
        )
      );
    });
  });

  describe("Events collection", () => {
    test("Events collection exists", async () => {
      const events = await Event.find({});
      expect(events.length).toBe(3);
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
      expect(tickets.length).toBe(3);
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
      await expect(Ticket.create(ticketData)).rejects.toThrow("tickets validation failed: owner_username: Path `owner_username` is required.")
    });

  });

  describe("Chats collection", () => {
    test("Chats collection exists", async () => {
        const chats = await Chat.find({})
        expect(chats.length).toBe(2)
    })

    test("Chats contains the required data of the correct variable type", async () => {
        const chats = await Chat.find({})
        expect(chats.length).toBeGreaterThan(0)
        chats.forEach((chat)=>{
            console.log(chat.msgs)
            expect(Array.isArray(chat.user_ids)).toBe(true)
            expect(chat.user_ids).toHaveLength(2)
            expect(Array.isArray(chat.msgs)).toBe(true)
            expect(typeof chat.msgs.msgId).toBe("number")
            expect(typeof chat.msgs.senderUsername).toBe("string")
            expect(typeof chat.msgs.body).toBe("string")
            expect(chat.msgs.timestamp instanceof Date).toBe(true)
            expect(typeof chat.msgs.displayToClient).toBe("boolean")
        })

    })
    
    test("Rejects chats with more than 2 users", () => {

    })

    test("msgs array objects displayToClients property defaults as true", () => {

    })

    test("msgs array objects body property must contain content", () => {

    })

    test("Rejects invalid values", () => {

    })

    test("Rejects missings fields", () => {

    })

  })

});
