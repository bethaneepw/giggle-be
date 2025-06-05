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
          expect(msg).toBe("Missing information!");
        });
    });
  });
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

describe("DELETE /api/events/:event_id", () => {
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

describe("GET /api/tickets", () => {
  test("200: Returns an array of all tickets", () => {
    return request(app)
      .get("/api/tickets")
      .expect(200)
      .then(({ _body: { tickets } }) => {
        expect(tickets.length).toBe(3);
        tickets.map((ticket) => {
          expect(ticket).toMatchObject({
            owner_username: expect.any(String),
            seating: expect.any(String),
            eventDetails: expect.any(String),
            hasBeenClaimed: expect.any(Boolean),
          });
        });
      });
  });
});

describe("GET /api/tickets/:ticket_id", () => {
  test("200 responds with an object of specified ticket", () => {
    return request(app)
      .get("/api/tickets/56679e9e54711517579556f5")
      .expect(200)
      .then(({ body: { ticket } }) => {
        expect(ticket).toMatchObject({
          _id: "56679e9e54711517579556f5",
          owner_username: "col99",
          seating: "Seating",
          eventDetails: "66679e9e54711517579556f3",
          notes: "Would love a friend to bring!!",
          hasBeenClaimed: true,
        });
      });
  });
  describe("Errors", () => {
    test("404: Valid id that does not exist", () => {
      return request(app)
        .get("/api/tickets/46679e9e54711517579556f5")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Ticket does not exist!");
        });
    });
    test("400: Invalid ID", () => {
      return request(app)
        .get("/api/tickets/notValidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });
  });
});

describe("POST /api/tickets", () => {
  test("201: Posts a new ticket", () => {
    return request(app)
      .post("/api/tickets")
      .send({
        owner_username: "TheBoss",
        seating: "Standing",
        eventDetails: "66679e9e54711517579556f3",
        notes: "Patti can't come :(",
        hasBeenClaimed: false,
      })
      .expect(201)
      .then(({ body: { newTicket } }) => {
        expect(newTicket).toMatchObject({
          owner_username: "TheBoss",
          seating: "Standing",
          eventDetails: "66679e9e54711517579556f3",
          notes: "Patti can't come :(",
          hasBeenClaimed: false,
          _id: expect.any(String),
        });
      })
      .then(() => {
        return request(app)
          .get("/api/tickets")
          .expect(200)
          .then(({ body: { tickets } }) => {
            expect(tickets.length).toBe(4);
          });
      });
  });
  test("201: Posts a new ticket when given no optional notes", () => {
    return request(app)
      .post("/api/tickets")
      .send({
        owner_username: "TheBoss",
        seating: "Standing",
        eventDetails: "66679e9e54711517579556f3",
        hasBeenClaimed: false,
      })
      .expect(201)
      .then(({ body: { newTicket } }) => {
        expect(newTicket).toMatchObject({
          owner_username: "TheBoss",
          seating: "Standing",
          eventDetails: "66679e9e54711517579556f3",
          hasBeenClaimed: false,
          _id: expect.any(String),
        });
      })
      .then(() => {
        return request(app)
          .get("/api/tickets")
          .expect(200)
          .then(({ body: { tickets } }) => {
            expect(tickets.length).toBe(5);
          });
      });
  });
  describe("Errors", () => {
    test("400: Not all required keys present in ticket object", () => {
      return request(app)
        .post("/api/tickets")
        .send({
          seating: "Standing",
          eventDetails: "66679e9e54711517579556f3",
          notes: "Patti can't come :(",
          hasBeenClaimed: false,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Missing information!");
        });
    });
    test("400: Empty information sent", () => {
      return request(app)
        .post("/api/tickets")
        .send({
          owner_username: "TheBoss",
          seating: "Standing",
          eventDetails: "",
          notes: "Patti can't come :(",
          hasBeenClaimed: false,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Information cannot be blank!");
        });
    });
  });
});

describe("DELETE /api/tickets/:ticket_id", () => {
  test("204: Deletes specified ticket", () => {
    return request(app)
      .get("/api/tickets")
      .expect(200)
      .then(({ body: { tickets } }) => {
        const originalLength = tickets.length;
        return request(app)
          .delete("/api/tickets/56679e9e54711517579556f5")
          .expect(204)
          .then((res) => {
            return request(app)
              .get("/api/tickets")
              .expect(200)
              .then(({ body: { tickets } }) => {
                expect(tickets.length).toBe(originalLength - 1);
              });
          });
      });
  });
  describe("Errors", () => {
    test("400: Invalid ticket_id used", () => {
      return request(app)
        .delete("/api/tickets/invalidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });
    test("404: Valid ticket_id that does not exist", () => {
      return request(app)
        .delete("/api/tickets/36679e9e54711517579556f5")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Ticket does not exist!");
        });
    });
  });
});

describe("GET /api/users", () => {
  test("200 responds with an array containing all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(3);
        users.forEach((user) => {
          expect(user).toMatchObject({
            firstName: expect.any(String),
            lastName: expect.any(String),
            username: expect.any(String),
            location: {
              town: expect.any(String),
              postcode: expect.any(String),
            },
            preferences: {
              drinkPreference: expect.any(String),
              seatPreference: expect.any(String),
              giggingStyle: {
                mosher: expect.any(Boolean),
                singalong: expect.any(Boolean),
                photographer: expect.any(Boolean),
              },
            },
            biography: expect.any(String),
            dateOfBirth: expect.any(String),
            gender: expect.any(String),
            trustRating: expect.any(Number),
            isVerified: expect.any(Boolean),
            interestedEvents: expect.any(Array),
            profilePictureURL: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/users/:user_id", () => {
  test("200 responds with an object of specified user", () => {
    return request(app)
      .get("/api/users/68405b9711f50eebe1b59521")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject({
          _id: "68405b9711f50eebe1b59521",
          firstName: "Bruce",
          lastName: "Springsteen",
          username: "TheBoss",
          location: {
            town: "London",
            postcode: "SE10 0DX",
          },
          preferences: {
            drinkPreference: "A bit",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: true,
              singalong: true,
              photographer: false,
            },
          },
          biography: "Coolest guy in NJ",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 1.0,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
        });
      });
  });
  describe("Errors", () => {
    test("404: Valid id that does not exist", () => {
      return request(app)
        .get("/api/users/28405b9711f50eebe1b59521")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User does not exist!");
        });
    });
    test("400: Invalid ID", () => {
      return request(app)
        .get("/api/users/notValidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });
  });
});

describe("POST /api/users", () => {
  test("201: Posts a new user", () => {
    return request(app)
      .post("/api/users")
      .send({
        firstName: "Father John",
        lastName: "Misty",
        username: "PapaMisty",
        location: {
          town: "Leeds",
          postcode: "LS10 1JH",
        },
        preferences: {
          drinkPreference: "A lot",
          seatPreference: "Standing",
          giggingStyle: {
            mosher: false,
            singalong: true,
            photographer: false,
          },
        },
        biography: "People are boring.",
        dateOfBirth: "1989-09-23",
        gender: "Man",
        trustRating: 1.0,
        isVerified: true,
        interestedEvents: ["66679e9e54711517579556f3"],
        profilePictureURL: "aRealImageUrl",
      })
      .expect(201)
      .then(({ body: { newUser } }) => {
        expect(newUser).toMatchObject({
          firstName: "Father John",
          lastName: "Misty",
          username: "PapaMisty",
          location: {
            town: "Leeds",
            postcode: "LS10 1JH",
          },
          preferences: {
            drinkPreference: "A lot",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: false,
              singalong: true,
              photographer: false,
            },
          },
          biography: "People are boring.",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 1.0,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
          _id: expect.any(String),
        });
      })
      .then(() => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            expect(users.length).toBe(4);
          });
      });
  });

  describe("Errors", () => {
    test("400: Not all required keys present in user object", () => {
      return request(app)
        .post("/api/users")
        .send({
          lastName: "Misty",
          username: "PapaMisty",
          location: {
            town: "Leeds",
            postcode: "LS10 1JH",
          },
          preferences: {
            drinkPreference: "A lot",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: false,
              singalong: true,
              photographer: false,
            },
          },
          biography: "People are boring.",
          dateOfBirth: "1989-09-23",
          gender: "Man",
          trustRating: 1.0,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Missing information!");
        });
    });
    test("400: Empty information sent", () => {
      return request(app)
        .post("/api/users")
        .send({
          firstName: "",
          lastName: "Misty",
          username: "PapaMisty",
          location: {
            town: "Leeds",
            postcode: "LS10 1JH",
          },
          preferences: {
            drinkPreference: "A lot",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: false,
              singalong: true,
              photographer: false,
            },
          },
          biography: "People are boring.",
          dateOfBirth: "1989-09-23",
          gender: "Man",
          trustRating: 1.0,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Information cannot be blank!");
        });
    });
  });
});

describe("DELETE /api/users/:user_id", () => {
  test("204: Deletes specified user", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        const originalLength = users.length;
        return request(app)
          .delete("/api/users/68405b9711f50eebe1b59523")
          .expect(204)
          .then((res) => {
            return request(app)
              .get("/api/users")
              .expect(200)
              .then(({ body: { users } }) => {
                expect(users.length).toBe(originalLength - 1);
              });
          });
      });
  });
  describe("Errors", () => {
    test("400: Invalid user_id used", () => {
      return request(app)
        .delete("/api/users/invalidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });
    test("404: Valid user_id that does not exist", () => {
      return request(app)
        .delete("/api/users/28405b9711f50eebe1b59528")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User does not exist!");
        });
    });
  });
});

describe("PATCH /api/users/:user_id", () => {
  test("201: Updates specified user with new information, e.g. username", () => {
    return request(app)
      .patch("/api/users/68405b9711f50eebe1b59521")
      .send({ username: "BadScooter49" })
      .expect(200)
      .then(({ body: { updatedUser } }) => {
        expect(updatedUser).toMatchObject({
          _id: "68405b9711f50eebe1b59521",
          firstName: "Bruce",
          lastName: "Springsteen",
          username: "BadScooter49",
          location: {
            town: "London",
            postcode: "SE10 0DX",
          },
          preferences: {
            drinkPreference: "A bit",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: true,
              singalong: true,
              photographer: false,
            },
          },
          biography: "Coolest guy in NJ",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 1.0,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
        });
      });
  });
  test("201: Updates specified user with new information, e.g. trustRating", () => {
    return request(app)
      .patch("/api/users/68405b9711f50eebe1b59521")
      .send({ trustRating: 0.75 })
      .expect(200)
      .then(({ body: { updatedUser } }) => {
        expect(updatedUser).toMatchObject({
          _id: "68405b9711f50eebe1b59521",
          firstName: "Bruce",
          lastName: "Springsteen",
          username: "BadScooter49",
          location: {
            town: "London",
            postcode: "SE10 0DX",
          },
          preferences: {
            drinkPreference: "A bit",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: true,
              singalong: true,
              photographer: false,
            },
          },
          biography: "Coolest guy in NJ",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 0.75,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
        });
      });
  });
  test("201: Updates specified user with new information, e.g. town", () => {
    return request(app)
      .patch("/api/users/68405b9711f50eebe1b59521")
      .send({ location: { town: "Leeds", postcode: "LS10 1JH" } })
      .expect(200)
      .then(({ body: { updatedUser } }) => {
        expect(updatedUser).toMatchObject({
          _id: "68405b9711f50eebe1b59521",
          firstName: "Bruce",
          lastName: "Springsteen",
          username: "BadScooter49",
          location: {
            town: "Leeds",
            postcode: "LS10 1JH",
          },
          preferences: {
            drinkPreference: "A bit",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: true,
              singalong: true,
              photographer: false,
            },
          },
          biography: "Coolest guy in NJ",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 0.75,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
        });
      });
  });
  test("201: Updates specified user with new information, e.g. town", () => {
    return request(app)
      .patch("/api/users/68405b9711f50eebe1b59521")
      .send({ location: { town: "Leeds", postcode: "LS10 1JH" } })
      .expect(200)
      .then(({ body: { updatedUser } }) => {
        expect(updatedUser).toMatchObject({
          _id: "68405b9711f50eebe1b59521",
          firstName: "Bruce",
          lastName: "Springsteen",
          username: "BadScooter49",
          location: {
            town: "Leeds",
            postcode: "LS10 1JH",
          },
          preferences: {
            drinkPreference: "A bit",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: true,
              singalong: true,
              photographer: false,
            },
          },
          biography: "Coolest guy in NJ",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 0.75,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
        });
      });
  });
  test("201: Updates specified user with new information, e.g. interestedEvents", () => {
    return request(app)
      .patch("/api/users/68405b9711f50eebe1b59521")
      .send({ interestedEvents: "66679e9e54711517579556f2" })
      .expect(200)
      .then(({ body: { updatedUser } }) => {
        expect(updatedUser).toMatchObject({
          _id: "68405b9711f50eebe1b59521",
          firstName: "Bruce",
          lastName: "Springsteen",
          username: "BadScooter49",
          location: {
            town: "Leeds",
            postcode: "LS10 1JH",
          },
          preferences: {
            drinkPreference: "A bit",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: true,
              singalong: true,
              photographer: false,
            },
          },
          biography: "Coolest guy in NJ",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 0.75,
          isVerified: true,
          interestedEvents: [
            "66679e9e54711517579556f3",
            "66679e9e54711517579556f2",
          ],
          profilePictureURL: "aRealImageUrl",
        });
      });
  });
  test("201: Updates specified user with new information, e.g. boolean isVerified", () => {
    return request(app)
      .patch("/api/users/68405b9711f50eebe1b59521")
      .send({ isVerified: false })
      .expect(200)
      .then(({ body: { updatedUser } }) => {
        expect(updatedUser).toMatchObject({
          _id: "68405b9711f50eebe1b59521",
          firstName: "Bruce",
          lastName: "Springsteen",
          username: "BadScooter49",
          location: {
            town: "Leeds",
            postcode: "LS10 1JH",
          },
          preferences: {
            drinkPreference: "A bit",
            seatPreference: "Standing",
            giggingStyle: {
              mosher: true,
              singalong: true,
              photographer: false,
            },
          },
          biography: "Coolest guy in NJ",
          dateOfBirth: expect.any(String),
          gender: "Man",
          trustRating: 0.75,
          isVerified: false,
          interestedEvents: [
            "66679e9e54711517579556f3",
            "66679e9e54711517579556f2",
          ],
          profilePictureURL: "aRealImageUrl",
        });
      });
  });
  test.todo("error empty strings");
});
