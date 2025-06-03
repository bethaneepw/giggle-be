const {userSchema} = require("../../schema/userSchema")
const { mongoose } = require("mongoose");

const User = mongoose.model("users", userSchema)

module.exports = [
  new User({
    firstName: "Bruce",
    lastName: "Springsteen",
    username: "TheBoss",
    location: {
      town: "London",
      postcode: "SE10 0DX",
    },
    preferences: {
      drinkPreference: "A bit", //none, a bit, a lot
      seatPreference: "Standing",
      giggingStyle: {
        // possibly added in front end
        mosher: true,
        singalong: true,
        photographer: false,
      },
    },
    biography: "Coolest guy in NJ",
    dateOfBirth: "1949-09-23",
    gender: "Man",
    trustRating: 1.0,
    isVerified: true,
  }),
  new User({
    firstName: "Lucy",
    lastName: "Dacus",
    username: "BoygeniusMVP",
    location: {
      town: "Brighton",
      postcode: "BN2 1TW",
    },
    preferences: {
      drinkPreference: "None", //none, a bit, a lot
      seatPreference: "Standing",
      giggingStyle: {
        // possibly added in front end
        mosher: true,
        singalong: true,
        photographer: true,
      },
    },
    biography: "Best songwriter in Boygenius",
    dateOfBirth: "1995-05-02",
    gender: "Woman",
    trustRating: 1.0,
    isVerified: true,
  }),
  new User({
    firstName: "Colin",
    lastName: "Astley",
    username: "col99",
    location: {
      town: "Manchester",
      postcode: "M12 6AP",
    },
    preferences: {
      drinkPreference: "A lot", //none, a bit, a lot
      seatPreference: "Seating",
      giggingStyle: {
        // possibly added in front end
        mosher: false,
        singalong: false,
        photographer: true,
      },
    },
    biography: "Coolest guy in NJ",
    dateOfBirth: "1960-03-18",
    gender: "Man",
    trustRating: 0.6,
    isVerified: false,
  }),
];
