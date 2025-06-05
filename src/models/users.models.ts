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

export const updateUser = (userId, dataToUpdate) => {
  const {
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
  } = dataToUpdate;
  if (firstName) {
    return User.updateById();
  }
  if (lastName) {
  }
  if (username) {
    return User.findByIdAndUpdate(
      userId,
      { username: username },
      { new: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (location) {
    return User.findByIdAndUpdate(
      userId,
      { location: location },
      { new: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (preferences) {
  }
  if (biography) {
  }
  if (dateOfBirth) {
  }
  if (gender) {
  }

  if (trustRating) {
    return User.findByIdAndUpdate(
      userId,
      {
        trustRating: trustRating,
      },
      { new: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (isVerified === false || isVerified === true) {
    console.log("in is verif");
    return User.findByIdAndUpdate(
      userId,
      {
        isVerified: isVerified,
      },
      { new: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (interestedEvents) {
    return User.findByIdAndUpdate(
      userId,
      { $push: { interestedEvents: interestedEvents } },
      { new: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (profilePictureURL) {
    return User.findByIdAndUpdate(
      userId,
      {
        profilePictureURL: profilePictureURL,
      },
      { new: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
};
