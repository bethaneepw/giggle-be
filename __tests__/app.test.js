const seed = require("../db/seeds/seed");
const data = require("../db/data/test/index");
const { mongoose } = require("mongoose");
// const { userSchema } = require("../db/schema/userSchema");
// const { ticketSchema } = require("../db/schema/ticketSchema");
// const { eventSchema } = require("../db/schema/eventSchema");
// const { chatSchema } = require("../db/schema/chatSchema");
const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../dist/app");

beforeAll(() => {
  return seed(data);
});

afterAll(() => {
  return mongoose.disconnect();
});

describe("GET /api/events", () => {
  test("200 responds with an array containing all events", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events.length).toBe(3);
        events.forEach((event) => {
          expect(event).toMatchObject({
            event_artist: expect.any(String),
            event_location: expect.any(String),
            event_venue: expect.any(String),
            event_date: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/events/:event_id", () => {
  test("200 responds with an object of specified event", () => {
    return request(app)
      .get("/api/events/66679e9e54711517579556f2")
      .expect(200)
      .then(({ body: { event } }) => {
        expect(event).toMatchObject({
          _id: "66679e9e54711517579556f2",
          event_artist: "Iggy Pop",
          event_location: "London",
          event_venue: "Alexandra Palace",
          event_date: "2026-05-01T00:21:00.000Z",
        });
      });
  });

  describe("Errors", () => {
    test("404: Valid id that does not exist", () => {
      return request(app)
        .get("/api/events/66679e9e54711517579556f9")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Event does not exist!");
        });
    });
    test("400: Invalid ID", () => {
      return request(app)
        .get("/api/events/notValidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });
  });
});

describe("POST /api/events", () => {
  test("201: Posts a new event", () => {
    return request(app)
      .post("/api/events")
      .send({
        event_artist: "Nick Cave",
        event_location: "Brighton",
        event_venue: "Concord",
        event_date: "2025-09-01T00:20:00Z",
      })
      .expect(201)
      .then(({ body: { newEvent } }) => {
        expect(newEvent).toMatchObject({
          event_artist: "Nick Cave",
          event_location: "Brighton",
          event_venue: "Concord",
          event_date: expect.any(String),
          _id: expect.any(String),
        });
      })
      .then(() => {
        return request(app)
          .get("/api/events")
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events.length).toBe(4);
          });
      });
  });
  describe("Errors", () => {
    test("400: Not all keys present in event object", () => {
      return request(app)
        .post("/api/events")
        .send({
          event_artist: "Nick Cave",
          event_location: "Brighton",
          event_venue: "Concord",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Missing event date information!");
        });
    });
  });
  describe("Errors", () => {
    test("400: Empty information sent", () => {
      return request(app)
        .post("/api/events")
        .send({
          event_artist: "Nick Cave",
          event_location: "Brighton",
          event_venue: "",
          event_date: "2025-09-01T00:20:00Z",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Information cannot be blank!");
        });
    });
  });
});

describe("DELETE /api/events/event_id", () => {
  test("204: Deletes specified event", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body: { events } }) => {
        const originalLength = events.length;
        return request(app)
          .delete("/api/events/66679e9e54711517579556f2")
          .expect(204)
          .then((res) => {
            return request(app)
              .get("/api/events")
              .expect(200)
              .then(({ body: { events } }) => {
                expect(events.length).toBe(originalLength - 1);
              });
          });
      });
  });
  describe("Errors", () => {
    test("400: Invalid event_id used", () => {
      return request(app)
        .delete("/api/events/invalidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });
    test("404: Valid event_id that does not exist", () => {
      return request(app)
        .delete("/api/events/66679e9e54711517579556f9")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Event does not exist!");
        });
    });
  });
});
