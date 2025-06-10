import { Request, Response } from "express";

const { selectChatById } = require("../models/chats.models");
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
