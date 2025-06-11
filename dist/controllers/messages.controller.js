"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectMessagesByRoomId, allMessages, } = require("../models/messages.models");
exports.getMessagesByRoomId = (req, res, next) => {
    const { roomId } = req.params;
    return selectMessagesByRoomId(roomId)
        .then((messages) => {
        res.status(200).send({ messages });
    })
        .catch(next);
};
exports.getAllMessages = (req, res, next) => {
    return allMessages()
        .then((messages) => {
        res.status(200).send({ messages });
    })
        .catch(next);
};
// Stub the other functions so they don't crash
exports.postMessagebyId = (req, res) => {
    res.status(501).json({ error: "Not implemented" });
};
exports.deleteMessagebyId = (req, res) => {
    res.status(501).json({ error: "Not implemented" });
};
exports.patchMessagebyId = (req, res) => {
    res.status(501).json({ error: "Not implemented" });
};
// import { Request, Response } from "express";
// const {
//   selectMessagesByRoomId,
//   allMessages, selectChatById, removeMessageById, modifyMessagebyId
// } = require("../models/messages.models");
// const { mongoose } = require("mongoose");
// exports.postMessagebyId = (
//   req: Request,
//   res: Response,
//   next: any
// ): Promise<void> => {
//   const { roomId } = req.params;
//   return selectChatById(roomId)
//     .then((Message) => {
//       res.status(201).send({ Message });
//     })
//     .catch(next);
// };
// exports.getMessagesByRoomId = (
//   req: Request,
//   res: Response,
//   next: any
// ): Promise<void> => {
//   const { roomId } = req.params;
//   return selectMessagesByRoomId(roomId)
//     .then((messages) => {
//       res.status(200).send({ messages });
//     })
//     .catch(next);
// };
// exports.deleteMessagebyId = (
//   req: Request,
//   res: Response,
//   next: any
// ): Promise<void> => {
//   const { message_id } = req.params;
//   return removeMessageById(message_id)
//     .then((Message) => {
//       res.status(204).send({ Message });
//     })
//     .catch(next);
// };
// exports.patchMessagebyId = (
//   req: Request,
//   res: Response,
//   next: any
// ): Promise<void> => {
//   const { message_id } = req.params;
//   return modifyMessagebyId(message_id)
//     .then((Message) => {
//       res.status(204).send({ Message });
//     })
//     .catch(next);
// };
// exports.getAllMessages = (
//   req: Request,
//   res: Response,
//   next: any
// ): Promise<void> => {
//   return allMessages()
//     .then((messages) => {
//       res.status(200).send({ messages });
//     })
//     .catch(next);
// };
