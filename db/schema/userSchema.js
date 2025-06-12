const mongoose = require("mongoose");
const bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
  },
  location: {
    town: { type: String, required: true },
    postcode: { type: String, required: true },
  },
  preferences: {
    drinkPreference: {
      type: String,
      validate: (value) =>
        value === "A bit" ||
        value === "A lot" ||
        value === "None" ||
        value === null,
    },
    seatPreference: {
      type: String,
      validate: (value) =>
        value === "Standing" || value === "Seating" || value === null,
    },
    giggingStyle: {
      mosher: { type: Boolean, default: false },
      singalong: { type: Boolean, default: false },
      photographer: { type: Boolean, default: false },
    },
  },
  biography: { type: String, required: false },
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    validate: (value) =>
      value === "Man" ||
      value === "Woman" ||
      value === "Non-binary" ||
      value === "Prefer not to say" ||
      value === "Other",
  },
  trustRating: { type: Number, default: 1.0, min: 0, max: 1.0 },
  isVerified: { type: Boolean, default: false },
  memberSince: { type: Date, default: Date.now },
  interestedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
  ],
  profilePictureURL: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error("Password comparison failed");
  }
};

module.exports = { userSchema };
