const { mongoose, run } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);

export const selectUsers = () => {
  return User.find({}).then((users) => {
    return users;
  });
};

export const selectUserByUserId = (userId) => {
  return User.findById(userId)
    .orFail(() => {
      throw { msg: "User does not exist!", status: 404 };
    })
    .then((user) => {
      return user;
    });
};

export const addNewUser = (
  firstName,
  lastName,
  username,
  location,
  preferences,
  biography,
  dateOfBirth,
  gender,
  trustRating,
  isVerified,
  interestedEvents,
  profilePictureURL
) => {
  return User.create({
    firstName,
    lastName,
    username,
    location,
    preferences,
    biography,
    dateOfBirth,
    gender,
    trustRating,
    isVerified,
    interestedEvents,
    profilePictureURL,
  }).then((newUser) => {
    return newUser;
  });
};

export const deleteUserByUserId = (userId) => {
  return User.findByIdAndDelete(userId).then(() => {});
};