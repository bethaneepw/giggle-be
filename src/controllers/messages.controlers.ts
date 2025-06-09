import { Request, Response } from "express";
import { AnyArray } from "mongoose";
const { messageSchema } = require("../../db/schema/messageSchema.js");
const {
  selectChatbyId,
  selectMessagebyRoomId,
  removeMessagebyId,
  modifyMessagebyId, allMessages
} = require("../models/messages.models");
const { mongoose } = require("mongoose");

const message = mongoose.model("messages", messageSchema);

exports.postMessagebyId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { roomId } = req.params;
  return selectChatbyId(roomId)
    .then((message) => {
      res.status(201).send({ message });
    })
    .catch(next);
};
exports.getMessagebyRoomId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { roomId } = req.params;
  return selectMessagebyRoomId(roomId)
    .then((message) => {
      res.status(200).send({ message });
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
    .then((message) => {
      res.status(204).send({ message });
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
    .then((message) => {
      res.status(204).send({ message });
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
        res.status(200).send({messages})
    })
    .catch(next)
  }

