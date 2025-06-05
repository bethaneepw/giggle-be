import { Request, Response } from "express";

const {
  selectUsers,
  addNewuser,
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

exports.postUser = (req: Request, res: Response<User>): Promise<void> => {
  const { userId } = req.params;

  return addNewuser(userId).then((user) => {
    res.status(201).send(user);
  });
};

exports.deleteUser = (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  return deleteUserByUserId(userId).then(() => {
    res.status(204).send();
  });
};

exports.getUserById = (req: Request, res: Response<User>): Promise<void> => {
  const { userId } = req.params;
  return selectUserByUserId(userId).then((user) => {
    res.status(200).send(user);
  });
};
