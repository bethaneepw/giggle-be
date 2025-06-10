import { Request, Response } from "express";

const {
  selectChatById,
  selectChatsByUserId,
} = require("../models/chats.models");
const chats = require("../../db/data/test/chats");

exports.getChatById = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { chats_id } = req.params;
  return selectChatById(chats_id)
    .then((chat: any) => {
      res.status(200).send({ chat });
    })
    .catch(next);
};

exports.getChatsByUserId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { user_id } = req.params;
  return selectChatsByUserId(user_id)
    .then((chats: any) => {
      res.status(200).send({ chats });
    })
    .catch(next);
};
