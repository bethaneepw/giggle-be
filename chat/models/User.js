const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  location: {
    town: String,
    postcode: String,
  },
  preferences: {
    drinkPreference: String,
    seatPreference: String,
    giggingStyle: {
      mosher: Boolean,
      singalong: Boolean,
      photographer: Boolean,
    },
  },
  biography: String,
  dateOfBirth: Date,
  gender: String,
  trustRating: Number,
  isVerified: Boolean,
  interestedEvents: [String],
  profilePictureURL: String,
});

module.exports = mongoose.model("User", userSchema);
