import { Request, Response, NextFunction } from "express";
const { selectChats, selectChatById } = require("../models/chats.models");
const { selectUserByUserId } = require("../models/users.models");
const {
  selectMessagesByRoomId,
  getMessageCountByRoomId,
  getLastMessageByRoomId,
  selectChatsByUserId,
} = require("../models/messages.models");

export const getChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chats = await selectChats();

    const chatsWithUserInfo = await Promise.all(
      chats.map(async (chat: any) => {
        const userPromises = chat.user_ids.map((userId: string) =>
          selectUserByUserId(userId).catch(() => null)
        );
        const users = (await Promise.all(userPromises)).filter(
          (user: any) => user !== null
        );

        const messageCount = await getMessageCountByRoomId(chat._id);

        const lastMessage = await getLastMessageByRoomId(chat._id);

        return {
          ...chat.toObject(),
          users: users.map((user: any) => ({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          })),
          messageCount,
          lastMessage: lastMessage
            ? {
                body: lastMessage.body,
                timestamp: lastMessage.timestamp,
                senderUsername: lastMessage.senderUsername,
              }
            : null,
        };
      })
    );

    res.status(200).send({ chatsWithUserInfo });
  } catch (error) {
    next(error);
  }
};

export const getChatById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chat_id } = req.params;

    const chat = await selectChatById(chat_id);

    const messages = await selectMessagesByRoomId(chat_id);

    const chatWithMessages = {
      ...chat.toObject(),
      msgs: messages,
    };

    res.status(200).send({ chatWithMessages });
  } catch (error) {
    console.error("=== Error in getChatById:", error);
    next(error);
  }
};

export const getChatsByUserId = (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { user_id } = req.params;
  console.log("CONTROLELR!");
  return selectChatsByUserId(user_id)
    .then((chats: any) => {
      res.status(200).send({ chats });
    })
    .catch(next);
};
