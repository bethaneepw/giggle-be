const { mongoose } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

export const selectUsers = () => {
  return User.find({}).then((users: any) => {
    return users;
  });
};

export const selectUserByUserId = (userId: any) => {
  return User.findById(userId)
    .orFail(() => {
      throw { msg: "User does not exist!", status: 404 };
    })
    .then((user: any) => {
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
  profilePictureURL,
  password,
  email
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
    password,
    email,
  })
    .then((newUser: any) => {
      return newUser;
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw { msg: "Invalid information!", status: 400 };
      } else {
        return err;
      }
    });
};

export const deleteUserByUserId = (userId: any) => {
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

  if (
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    location === "" ||
    biography === "" ||
    dateOfBirth === "" ||
    trustRating === "" ||
    profilePictureURL === ""
  ) {
    throw { msg: "Information cannot be blank!", status: 400 };
  }

  if (firstName) {
    return User.findByIdAndUpdate(
      userId,
      { firstName: firstName },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (lastName) {
    return User.findByIdAndUpdate(
      userId,
      { lastName: lastName },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (username) {
    return User.findByIdAndUpdate(
      userId,
      { username: username },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (location) {
    return User.findByIdAndUpdate(
      userId,
      { location: location },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (preferences) {
    return User.findByIdAndUpdate(
      userId,
      { preferences: preferences },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (biography) {
    return User.findByIdAndUpdate(
      userId,
      { biography: biography },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (dateOfBirth) {
    return User.findByIdAndUpdate(
      userId,
      { dateOfBirth: dateOfBirth },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (gender) {
    return User.findByIdAndUpdate(
      userId,
      { gender: gender },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (trustRating) {
    return User.findByIdAndUpdate(
      userId,
      { trustRating: trustRating },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (isVerified === false || isVerified === true) {
    return User.findByIdAndUpdate(
      userId,
      { isVerified: isVerified },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (interestedEvents) {
    return User.findByIdAndUpdate(
      userId,
      { $push: { interestedEvents: interestedEvents } },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
  if (profilePictureURL) {
    return User.findByIdAndUpdate(
      userId,
      { profilePictureURL: profilePictureURL },
      { new: true, runValidators: true }
    ).then((updatedUser) => {
      return updatedUser;
    });
  }
};

export const selectUserByUsername = (username: any) => {
  console.log(username);
  return User.find({ username: username }).then((user: any) => {
    return user[0];
  });
};
