import { Request, Response } from "express";
const {
  selectMessagesbyRoomId,
  allMessages,
} = require("../models/messages.models");
const { mongoose } = require("mongoose");

exports.postMessagebyId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { roomId } = req.params;
  return selectChatbyId(roomId)
    .then((Message) => {
      res.status(201).send({ Message });
    })
    .catch(next);
};
exports.getMessagesbyRoomId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { roomId } = req.params;
  return selectMessagesbyRoomId(roomId)
    .then((messages) => {
      res.status(200).send({ messages });
    })
    .catch(next);
};
exports.deleteMessagebyId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { message_id } = req.params;
  return removeMessagebyId(message_id)
    .then((Message) => {
      res.status(204).send({ Message });
    })
    .catch(next);
};
exports.patchMessagebyId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { message_id } = req.params;
  return modifyMessagebyId(message_id)
    .then((Message) => {
      res.status(204).send({ Message });
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
