import { Request, Response } from "express";
import { addMessageByRoomId } from "../models/messages.models";
const {
  selectMessagesByRoomId,
  selectMessages,
  modifyMessageById,
} = require("../models/messages.models");
const { mongoose } = require("mongoose");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

exports.postMessagebyId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { roomId } = req.params;
  const { senderId, body } = req.body;

  if (!body) {
    throw { msg: "Body must not be empty", status: 400 };
  }

  return Chat.findById(roomId)
    .orFail(() => {
      throw { msg: "Chat Room does not exist!", status: 404 };
    })
    .then((validChats: any) => {
      return Chat.find({ _id: roomId, user_ids: { $in: [senderId] } }).orFail(
        () => {
          throw { msg: "Invalid user for this chat!", status: 400 };
        }
      );
    })
    .then(() => {
      return addMessageByRoomId(roomId, senderId, body);
    })
    .then((message) => {
      res.status(201).send({ message });
    })
    .catch(next);
};
exports.getMessagesbyRoomId = (
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

exports.patchMessagebyId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { message_id } = req.params;
  const dataToUpdate = req.body;
  return modifyMessageById(message_id, dataToUpdate)
    .then((message) => {
      res.status(200).send({ message });
    })
    .catch(next);
};
exports.getAllMessages = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  return selectMessages()
    .then((messages) => {
      res.status(200).send({ messages });
    })
    .catch(next);
};
