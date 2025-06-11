import { Request, Response } from "express";
const {
  selectMessagesByRoomId,
  allMessages,
} = require("../models/messages.models");

exports.getMessagesByRoomId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { roomId } = req.params;
  return selectMessagesByRoomId(roomId)
    .then((messages) => {
      res.status(200).send({ messages });
    })
    .catch(next);
};

exports.getAllMessages = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  return allMessages()
    .then((messages) => {
      res.status(200).send({ messages });
    })
    .catch(next);
};


exports.postMessagebyId = (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
};

exports.deleteMessagebyId = (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
};

exports.patchMessagebyId = (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
};

