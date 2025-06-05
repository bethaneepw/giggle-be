import { Request, Response } from "express";

const {
  selectUsers,
  addNewUser,
  deleteUserByUserId,
  selectUserByUserId,
} = require("../models/users.models");

interface User {
  id: number;
  name: string;
  profile_picture: string;
  trustworthiness: number;
}

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
  } = req.body;
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
      profilePictureURL
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
