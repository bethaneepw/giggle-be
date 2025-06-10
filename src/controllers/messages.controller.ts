import { Request, Response } from "express";
import { addMessageByRoomId } from "../models/messages.models";
const {
  selectMessagesbyRoomId,
  allMessages,
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
