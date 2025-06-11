import { Request, Response } from "express";
const { mongoose } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);

const {
  selectUsers,
  addNewUser,
  deleteUserByUserId,
  selectUserByUserId,
  updateUser,
  selectUserByUsername,
} = require("../models/users.models");

// interface User {
//   id: number;
//   name: string;
//   profile_picture: string;
//   trustworthiness: number;
// }

exports.getUsers = (req: Request, res: Response<User>): Promise<void> => {
  return selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.postUser = (req: Request, res: Response<User>, next): Promise<void> => {
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
    password,
    email,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !username ||
    !location ||
    !location.town ||
    !location.postcode ||
    !dateOfBirth ||
    trustRating === undefined ||
    !profilePictureURL ||
    !password ||
    !email
  ) {
    throw { msg: "Invalid information!", status: 400 };
  } else {
    return addNewUser(
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
    )
      .then((newUser) => {
        res.status(201).send({ newUser });
      })
      .catch(next);
  }
};

exports.deleteUser = (req: Request, res: Response, next): Promise<void> => {
  const { user_id } = req.params;
  const pendingSelectUserByUserId = selectUserByUserId(user_id);
  const pendingDeleteUserByUserId = deleteUserByUserId(user_id);

  return Promise.all([pendingDeleteUserByUserId, pendingSelectUserByUserId])
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.getUserById = (
  req: Request,
  res: Response<User>,
  next
): Promise<void> => {
  const { user_id } = req.params;
  return selectUserByUserId(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.patchUser = (
  req: Request,
  res: Response<User>,
  next
): Promise<void> => {
  const dataToUpdate = req.body;
  const { user_id } = req.params;
  const pendingSelectUserByUserId = selectUserByUserId(user_id);
  const pendingUpdateUser = updateUser(user_id, dataToUpdate);
  return Promise.all([pendingUpdateUser, pendingSelectUserByUserId])
    .then(([updatedUser]) => {
      res.status(200).send({ updatedUser });
    })
    .catch(next);
};

exports.getUserByUsername = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { username } = req.params;
  return selectUserByUsername(username).then((user: any) => {
    res.status(200).send({ user });
  });
};
