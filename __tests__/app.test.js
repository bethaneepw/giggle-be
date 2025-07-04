const seed = require("../db/seeds/seed");
const data = require("../db/data/test/index");
const mongoose = require("mongoose");
// const { userSchema } = require("../db/schema/userSchema");
// const { ticketSchema } = require("../db/schema/ticketSchema");
// const { eventSchema } = require("../db/schema/eventSchema");
// const { chatSchema } = require("../db/schema/chatSchema");
const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../dist/app");

// const { run } = require("../db/connection");

// beforeAll(async () => {
//   await run();
// });

beforeAll(() => {
  //needs to be accounted for in tests, not reseeding before every test with beforeEach because of hardcoded ids - mongodb can't remake the database with same ids
  return seed(data);
});

afterAll(async () => {
  await mongoose.disconnect();
});
describe("Events Model", () => {
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
            expect(msg).toBe("Invalid information!");
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

  describe("GET /api/events?sort= query", () => {
    test("200: Get all events, sorted by artist", () => {
      return request(app)
        .get("/api/events?sort_by=event_artist")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBe(4);
          expect(events).toBeSortedBy("event_artist", { ascending: true });
        });
    });
  });
  describe("GET /api/events?order=sort= queries", () => {
    test("200: Get all events, sorted by location and ordered desc", () => {
      return request(app)
        .get("/api/events?sort_by=event_location&order=desc")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBe(4);
          expect(events).toBeSortedBy("event_location", { descending: true });
        });
    });
    test("200: Get all events, sorted by location and ordered asc", () => {
      return request(app)
        .get("/api/events?sort_by=event_location&order=asc")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBe(4);
          expect(events).toBeSortedBy("event_location", { ascending: true });
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

  describe("GET /api/events?town= query", () => {
    test("200: Query by town", () => {
      return request(app)
        .get("/api/events?town=Leeds")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBe(1);
          expect(events[0]).toMatchObject({
            event_artist: "Megan Thee Stallion",
            event_location: "Leeds",
            event_venue: "Brudenell Social Club",
            event_date: expect.any(String),
            _id: "66679e9e54711517579556f3",
          });
        });
    });
  });
  describe("GET /api/events?town= query works with case insensitivity", () => {
    test("200: Query by town", () => {
      return request(app)
        .get("/api/events?town=leeDs")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBe(1);
          expect(events[0]).toMatchObject({
            event_artist: "Megan Thee Stallion",
            event_location: "Leeds",
            event_venue: "Brudenell Social Club",
            event_date: expect.any(String),
            _id: "66679e9e54711517579556f3",
          });
        });
    });
  });

  describe("GET /api/events?artist= query", () => {
    test("200: Query by artist", () => {
      return request(app)
        .get("/api/events?artist=Phoebe+Bridgers")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBe(1);
          expect(events[0]).toMatchObject({
            event_artist: "Phoebe Bridgers",
            event_location: "Brighton",
            event_venue: "Concorde 2",
            event_date: expect.any(String),
            _id: "66679e9e54711517579556f1",
          });
        });
    });
  });
  describe("GET /api/events?artist= query works with partial search", () => {
    test("200: Query by artist", () => {
      return request(app)
        .get("/api/events?artist=Phoe")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBe(1);
          expect(events[0]).toMatchObject({
            event_artist: "Phoebe Bridgers",
            event_location: "Brighton",
            event_venue: "Concorde 2",
            event_date: expect.any(String),
            _id: "66679e9e54711517579556f1",
          });
        });
    });
  });
  describe("POST /api/events additional img functionality", () => {
    test("201: Posts a new event works with img_url", () => {
      return request(app)
        .post("/api/events")
        .send({
          event_artist: "Angel Olsen",
          event_location: "Leeds",
          event_venue: "Brudenell Social Club",
          event_date: "2026-09-01T00:20:00Z",
          event_img:
            "https://images.unsplash.com/photo-1713279766640-6ec28b7c8c4c?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        })
        .expect(201)
        .then(({ body: { newEvent } }) => {
          expect(newEvent).toMatchObject({
            event_artist: "Angel Olsen",
            event_location: "Leeds",
            event_venue: "Brudenell Social Club",
            event_date: expect.any(String),
            event_img:
              "https://images.unsplash.com/photo-1713279766640-6ec28b7c8c4c?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  });
});
describe("Tickets Model", () => {
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
            expect(msg).toBe("Invalid information!");
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
      }),
        test("404:Ticket posted for an event not found in the database", () => {
          return request(app)
            .post("/api/tickets/andadam93")
            .send({
              _id: "56679e9e54711517579556f5",
              owner_username: "col99",
              seating: "Seating",
              eventDetails: "This event it does not exist",
              notes: "Would love a friend to bring!!",
              hasBeenClaimed: true,
            })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Invalid url!");
            });
        });
    });
  });
  describe("PATCH /api/tickets/:ticket_id", () => {
    test("201: Updates specified ticket with new information, e.g. notes", () => {
      return request(app)
        .patch("/api/tickets/56679e9e54711517579556f4")
        .send({ notes: "Really, really, REALLY want a friend to take!" })
        .expect(200)
        .then(({ body: { updatedTicket } }) => {
          expect(updatedTicket).toMatchObject({
            _id: "56679e9e54711517579556f4",
            owner_username: "BoygeniusMVP",
            seating: "Standing",
            eventDetails: "66679e9e54711517579556f3",
            notes: "Really, really, REALLY want a friend to take!",
            hasBeenClaimed: false,
          });
        });
    });
    test("201: Updates specified ticket with new information, e.g. hasBeenClaimed", () => {
      return request(app)
        .patch("/api/tickets/56679e9e54711517579556f4")
        .send({ hasBeenClaimed: true })
        .expect(200)
        .then(({ body: { updatedTicket } }) => {
          expect(updatedTicket).toMatchObject({
            _id: "56679e9e54711517579556f4",
            owner_username: "BoygeniusMVP",
            seating: "Standing",
            eventDetails: "66679e9e54711517579556f3",
            notes: "Really, really, REALLY want a friend to take!",
            hasBeenClaimed: true,
          });
        });
    });

    describe("Errors", () => {
      test("400: Information that does not conform to schema sent, e.g. hasBeenClaimed non-boolean", () => {
        return request(app)
          .patch("/api/tickets/56679e9e54711517579556f4")
          .send({ hasBeenClaimed: "Invalid" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid information!");
          });
      });
      test("404: Valid but non-existent id used", () => {
        return request(app)
          .patch("/api/tickets/16679e9e54711517579556f9")
          .send({ notes: "Anyone?" })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Ticket does not exist!");
          });
      });
      test("400: Invalid id used", () => {
        return request(app)
          .patch("/api/tickets/invalidId")
          .send({ notes: "Anyone?" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid request!");
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
  describe("GET: /api/tickets/events/:event_id", () => {
    test("200: Returns an array of tickets by given event Id", () => {
      return request(app)
        .get("/api/tickets/events/66679e9e54711517579556f3")
        .expect(200)
        .then(({ body: { tickets } }) => {
          expect(tickets.length).toBe(3);
          tickets.forEach((ticket) => {
            expect(ticket).toMatchObject({
              _id: expect.any(String),
              owner_username: expect.any(String),
              eventDetails: "66679e9e54711517579556f3",
              //  notes: expect.any(String),
              hasBeenClaimed: expect.any(Boolean),
            });
          });
        });
    });

    test("400: Bad request when given invalid event id", () => {
      return request(app)
        .get("/api/tickets/events/NotAValidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });

    test("404: Not found when given valid ID that is not in database", () => {
      return request(app)
        .get("/api/tickets/events/66679e9e54711517579556f2")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("No tickets found under that Event Id!");
        });
    });
  });
});
describe("Users Model", () => {
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
          password: "password123",
          email: "misty89@email.com",
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
            password: expect.any(String),
            email: "misty89@email.com",
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

    test("201: Password should be hashed when a user is created", () => {
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
          password: "password123",
          email: "misty89@email.com",
        })
        .expect(201)
        .then(({ body: { newUser } }) => {
          expect(newUser.password).not.toBe("password123");
        });
    });

    describe("Errors", () => {
      test("400: Not all required keys present in user object", () => {
        return request(app)
          .post("/api/users")
          .send({
            // firstName missing
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
            password: "password",
            email: "notallpresent@email.com",
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid information!");
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
            expect(msg).toBe("Invalid information!");
          });
      });
    });
  });
  describe("GET /api/users/usernames/:username", () => {
    test("200 responds with an object of specified user", () => {
      return request(app)
        .get("/api/users/username/TheBoss")
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
            dateOfBirth: "1949-09-23T00:00:00.000Z",
            gender: "Man",
            trustRating: 1.0,
            isVerified: true,
            interestedEvents: ["66679e9e54711517579556f3"],
            profilePictureURL: "aRealImageUrl",
          });
        });
    });
    test("404: Username that does not exist", () => {
      return request(app)
        .get("/api/users/usernames/fakeUser")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid url!");
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
    describe("Errors", () => {
      test("400: Empty patch sent", () => {
        return request(app)
          .patch("/api/users/68405b9711f50eebe1b59521")
          .send({ firstName: "" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Information cannot be blank!");
          });
      });
      test("400: Information that does not conform to schema sent, e.g. Male gender", () => {
        return request(app)
          .patch("/api/users/68405b9711f50eebe1b59521")
          .send({ gender: "Male" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid information!");
          });
      });
      test("404: Valid but non-existent id used", () => {
        return request(app)
          .patch("/api/users/18405b9711f50eebe1b59521")
          .send({ gender: "Woman" })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User does not exist!");
          });
      });
      test("400: Invalid id used", () => {
        return request(app)
          .patch("/api/users/invalidId")
          .send({ gender: "Woman" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Invalid request!");
          });
      });
    });
  });

  describe("GET /api/users AUTHENTICATION", () => {
    test("200 Users have an email, and password is NOT returned", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBeGreaterThan(0);
          users.forEach((user) => {
            expect(user).toMatchObject({
              email: expect.any(String),
            });
            expect(user.password).toBeUndefined;
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

  describe("POST /api/login", () => {
    test("200: Responds with the correct logged in user", async () => {
      const {
        body: { newUser },
      } = await request(app)
        .post("/api/users")
        .send({
          firstName: "Auth",
          lastName: "Test",
          username: "AuthTest",
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
          biography: "This user is for testing authentication.",
          dateOfBirth: "1989-09-23",
          gender: "Man",
          trustRating: 1.0,
          isVerified: true,
          interestedEvents: ["66679e9e54711517579556f3"],
          profilePictureURL: "aRealImageUrl",
          password: "password123",
          email: "authtest@email.com",
        });

      const {
        body: { loggedInUser },
      } = await request(app)
        .post("/api/login")
        .send({ email: "authtest@email.com", password: "password123" })
        .expect(201);

      expect(loggedInUser).toMatchObject({
        _id: newUser._id,
        firstName: "Auth",
        lastName: "Test",
        username: "AuthTest",
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
        biography: "This user is for testing authentication.",
        dateOfBirth: "1989-09-23T00:00:00.000Z",
        gender: "Man",
        trustRating: 1.0,
        isVerified: true,
        interestedEvents: ["66679e9e54711517579556f3"],
        profilePictureURL: "aRealImageUrl",
        email: "authtest@email.com",
      });
    });
  });
});

describe("Messages Model", () => {
  describe.skip("GET /api/messages", () => {
    test("200 responds with an array containing all messages", () => {
      return request(app)
        .get("/api/messages")
        .expect(200)
        .then(({ body: { messages } }) => {
          expect(messages.length).toBe(7);
          messages.forEach((message) => {
            expect(message).toMatchObject({
              _id: expect.any(String),
              roomId: expect.any(String),
              senderId: expect.any(String),
              body: expect.any(String),
              timestamp: expect.any(String),
              displayToClient: expect.any(Boolean),
            });
          });
        });
    });
  });

  describe("GET /api/messages/:roomId", () => {
    test("200: Responds with all messages by room ID that are being displayed to client", () => {
      return request(app)
        .get("/api/messages/68405d38239a61ea5b7ad204")
        .expect(200)
        .then(({ body: { messages } }) => {
          expect(messages.length).toBe(2);
          messages.forEach((message) => {
            expect(message).toMatchObject({
              _id: expect.any(String),
              roomId: "68405d38239a61ea5b7ad204",
              senderId: expect.any(String),
              body: expect.any(String),
              timestamp: expect.any(String),
              displayToClient: expect.any(Boolean),
            });
          });
        });
    });

    // test("200: Responds with an empty array if no messages exist", () => {
    //   return request(app)
    //     .get("/api/messages/6847fefbcccbf3a1bacece94")
    //     .expect(200)
    //     .then(({ body: messages }) => {
    //       expect(Array.isArray(messages)).toBe(true);
    //       expect(messages.length).toBe(0);
    //     });
    // });

    test("400: Bad request when given invalid ID", () => {
      return request(app)
        .get("/api/messages/banana")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });

    test("404: Not found when given valid ID not in database", () => {
      return request(app)
        .get("/api/messages/6848003706c41f2402f1bb44")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Chat Room does not exist!");
        });
    });
  });

  describe("POST /api/messages/:roomId", () => {
    test("201: Successfully adds a message to the chat room", () => {
      return request(app)
        .post("/api/messages/68405d38239a61ea5b7ad207")
        .send({
          senderId: "68405b9711f50eebe1b59523",
          body: "Hellooooooooooo?",
        })
        .expect(201)
        .then(({ body: { message } }) => {
          expect(message).toMatchObject({
            senderId: "68405b9711f50eebe1b59523",
            body: "Hellooooooooooo?",
            _id: expect.any(String),
            timestamp: expect.any(String),
            displayToClient: true,
          });
        });
    });
    test("400: Bad Request if body is empty", () => {
      return request(app)
        .post("/api/messages/68405d38239a61ea5b7ad207")
        .send({
          senderId: "68405b9711f50eebe1b59523",
          body: "",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Body must not be empty");
        });
    });
    test("400: Bad request if sender is valid but not in the chatroom", () => {
      return request(app)
        .post("/api/messages/68405d38239a61ea5b7ad207")
        .send({
          senderId: "68405b9711f50eebe1b59522",
          body: "Helloooooo!",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid user for this chat!");
        });
    });
    test("400: Bad request if sender ID is invalid but not in the chatroom", () => {
      return request(app)
        .post("/api/messages/68405d38239a61ea5b7ad207")
        .send({
          senderId: "AnInvalidId",
          body: "Invalid id!",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid user for this chat!");
        });
    });
    test("400: Bad reqeust if roomID is invalid", () => {
      return request(app)
        .post("/api/messages/InvalidRoomId")
        .send({
          senderId: "68405b9711f50eebe1b59522",
          body: "Helloooooo!",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });

    test("400: Bad request if roomID is valid but not found", () => {
      return request(app)
        .post("/api/messages/6848372e473a76bbb2e567d4")
        .send({
          senderId: "68405b9711f50eebe1b59522",
          body: "Helloooooo!",
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Chat Room does not exist!");
        });
    });
  });

  describe.skip("PATCH: /api/messages/:message_id", () => {
    test("200: Successfully updates message", () => {
      return request(app)
        .patch("/api/messages/68417f91c0cadf7869342c42")
        .send({ displayToClient: false })
        .expect(200)
        .then(({ body: { updatedMessage } }) => {
          expect(updatedMessage).toMatchObject({
            _id: "68417f91c0cadf7869342c42",
            roomId: "68405d38239a61ea5b7ad207",
            senderId: "68405b9711f50eebe1b59521",
            body: "What did you want?",
            timestamp: "2025-01-26T00:05:00.000Z",
            displayToClient: false,
          });
        });
    });

    test("400: Bad request when updating message with info not aligned with schema", () => {
      return request(app)
        .patch("/api/messages/68417f99cc80869edc3c3931")
        .send({ displayToClient: "This Isn't Aligned To Schema" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });

    test("400: Bad request when message Id is invalid", () => {
      return request(app)
        .patch("/api/messages/InvalidMessageId")
        .send({ displayToClient: false })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });

    test("404: Not found when message Id is not in database", () => {
      return request(app)
        .patch("/api/messages/68405b9711f50eebe1b59521")
        .send({ displayToClient: false })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Message does not exist!");
        });
    });

    // Success
    // Error: Sent Info Not aligned to Schema
    // Invalid ID
    // Not Found Id
  });
});

describe("Chats Model", () => {
  describe("GET /api/chats", () => {
    test("GET /api/chats", () => {
      return request(app)
        .get("/api/chats")
        .expect(200)
        .then(({ body: { chatsWithUserInfo } }) => {
          expect(chatsWithUserInfo.length).toBeGreaterThan(0);
        });
    });
  });
  describe("GET /api/chats/:chat_id", () => {
    test("200: Gets Chat by Chat ID", () => {
      return request(app)
        .get("/api/chats/68405d38239a61ea5b7ad207")
        .expect(200)
        .then(({ body: { chatWithMessages } }) => {
          expect(chatWithMessages).toMatchObject({
            _id: "68405d38239a61ea5b7ad207",
            user_ids: expect.any(Array),
          });
          expect(chatWithMessages.user_ids.length).toBe(2);
        });
    });

    test("400: When given invalid id", () => {
      return request(app)
        .get("/api/chats/NotValidId")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid request!");
        });
    });

    test("404: Not found when given valid id not in database", () => {
      return request(app)
        .get("/api/chats/684811d9d7f3b6a405f6e9b0")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Chat does not exist!");
        });
    });
  });

  describe.skip("GET /api/chats/users/:user_id", () => {
    test("200: Responds with chats according to specific User ID", () => {
      return request(app)
        .get("/api/chats/users/68405b9711f50eebe1b59522")
        .expect(200)
        .then(({ body: { chats } }) => {
          expect(chats.length).toBe(2);
          chats.forEach((chat) => {
            expect(chat).toMatchObject({
              _id: expect.any(String),
              user_ids: expect.arrayContaining(["68405b9711f50eebe1b59522"]),
            });
          });
        });
    });

    test("404: Not found when given invalid string for UserID", () => {
      return request(app)
        .get("/api/chats/users/NotValidId")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Chat does not exist!");
        });
    });

    test("404: Not found when given valid id not in database", () => {
      return request(app)
        .get("/api/chats/users/684811d9d7f3b6a405f6e9b0")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Chat does not exist!");
        });
    });
  });
});
