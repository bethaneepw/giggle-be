const seed = require("../db/seeds/seed");
const data = require("../db/data/test/index");
const { mongoose } = require("mongoose");
const { userSchema } = require("../db/schema/userSchema");
const { ticketSchema } = require("../db/schema/ticketSchema");
const { eventSchema } = require("../db/schema/eventSchema");
const { chatSchema } = require("../db/schema/chatSchema");
const { test, expect, describe } = require("@jest/globals");
const request = require("supertest")
const app = require("../dist/app")

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    return mongoose.disconnect()
})

describe('GET /api/events', () => {
test("200 responds with an array containing all events", () => {
    return request(app)
    .get("/api/events")
    .expect(200)
    .then(({body: {events}}) => {
    expect(events.length).toBe(3)
    events.forEach((event) => {
        expect(event).toMatchObject({event_artist: expect.any(String), event_location: expect.any(String), event_venue: expect.any(String), event_date: expect.any(String)})
    })
    })
})
})

