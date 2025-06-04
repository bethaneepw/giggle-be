const { userSchema } = require("../../schema/userSchema");
const { mongoose } = require("mongoose");

const User = mongoose.model("users", userSchema);

module.exports = [
  new User({
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
    dateOfBirth: "1949-09-23",
    gender: "Man",
    trustRating: 1.0,
    isVerified: true,
    interestedEvents: [
      "66679e9e54711517579556f3"
    ],
    profilePictureURL: "aRealImageUrl",
  }),
  new User({
    _id: "68405b9711f50eebe1b59522",
    firstName: "Lucy",
    lastName: "Dacus",
    username: "BoygeniusMVP",
    location: {
      town: "Brighton",
      postcode: "BN2 1TW",
    },
    preferences: {
      drinkPreference: "None",
      seatPreference: "Standing",
      giggingStyle: {
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
    interestedEvents: [],
    profilePictureURL: "aRealImageUrl",
  }),
  new User({
    _id: "68405b9711f50eebe1b59523",
    firstName: "Colin",
    lastName: "Astley",
    username: "col99",
    location: {
      town: "Manchester",
      postcode: "M12 6AP",
    },
    preferences: {
      drinkPreference: "A lot",
      seatPreference: "Seating",
      giggingStyle: {
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
    interestedEvents: [],
    profilePictureURL: "aRealImageUrl",
  }),
];
