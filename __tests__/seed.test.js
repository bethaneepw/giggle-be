const seed = require("../db/seeds/seed");
const data = require("../db/data/test/index");
const {
  beforeAll,
  afterAll,
  describe,
  test,
  expect,
  xtest,
} = require("@jest/globals");
const { mongoose } = require("mongoose");
const { userSchema } = require("../db/schema/userSchema");
const { ticketSchema } = require("../db/schema/ticketSchema");
const { eventSchema } = require("../db/schema/eventSchema");
const { chatSchema } = require("../db/schema/chatSchema");

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

    test("Rejects when required feels are missing", async () => {
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
    
  })
});
