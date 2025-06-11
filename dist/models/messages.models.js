"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastMessageByRoomId = exports.getMessageCountByRoomId = exports.addNewMessage = exports.selectMessagesByRoomId = exports.selectMessageByMessageId = exports.selectMessages = void 0;
const { mongoose } = require("../../db/connection");
const { messageSchema } = require("../../db/schema/messageSchema");
const Message = mongoose.model("messages", messageSchema);
const selectChatById = require("./chats.models");
const { chatSchema } = require("../../db/schema/chatSchema");
const Chat = mongoose.model("chats", chatSchema);
const selectMessages = () => {
    return Message.find({}).then((messages) => {
        return messages;
    });
};
exports.selectMessages = selectMessages;
const selectMessageByMessageId = (messageId) => {
    return Message.findById(messageId)
        .orFail(() => {
        throw { msg: "Message does not exist!", status: 404 };
    })
        .then((message) => {
        return message;
    });
};
exports.selectMessageByMessageId = selectMessageByMessageId;
const selectMessagesByRoomId = (roomId) => {
    console.log("=== selectMessagesByRoomId called with roomId:", roomId);
    console.log("=== roomId type:", typeof roomId);
    // Convert string to ObjectId if needed
    const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
        ? new mongoose.Types.ObjectId(roomId)
        : roomId;
    console.log("=== Using queryRoomId:", queryRoomId);
    return Message.find({
        roomId: queryRoomId,
        displayToClient: true
    })
        .sort({ timestamp: 1 })
        .then((messages) => {
        console.log(`=== Database query returned ${messages.length} messages for roomId ${roomId}`);
        return messages || [];
    })
        .catch((error) => {
        console.error("=== Error querying messages:", error);
        return []; // Return empty array on error instead of throwing
    });
};
exports.selectMessagesByRoomId = selectMessagesByRoomId;
const addNewMessage = (roomId, senderId, body, senderUsername = null, displayToClient = true) => {
    if (!roomId || !senderId || !body) {
        throw { msg: "roomId, senderId, and body are required!", status: 400 };
    }
    if (body.trim() === "") {
        throw { msg: "Message body cannot be empty!", status: 400 };
    }
    return Message.create({
        roomId,
        senderId,
        senderUsername,
        body: body.trim(),
        timestamp: new Date(),
        displayToClient,
        msgId: Date.now(),
    }).then((newMessage) => {
        return newMessage;
    });
};
exports.addNewMessage = addNewMessage;
const getMessageCountByRoomId = (roomId) => {
    // Convert to ObjectId if needed for consistency
    const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
        ? new mongoose.Types.ObjectId(roomId)
        : roomId;
    return Message.countDocuments({
        roomId: queryRoomId,
        displayToClient: true
    }).then((count) => {
        return count;
    });
};
exports.getMessageCountByRoomId = getMessageCountByRoomId;
const getLastMessageByRoomId = (roomId) => {
    // Convert to ObjectId if needed for consistency
    const queryRoomId = mongoose.Types.ObjectId.isValid(roomId)
        ? new mongoose.Types.ObjectId(roomId)
        : roomId;
    return Message.findOne({
        roomId: queryRoomId,
        displayToClient: true
    })
        .sort({ timestamp: -1 })
        .then((message) => {
        return message;
    });
};
exports.getLastMessageByRoomId = getLastMessageByRoomId;
module.exports = {
    selectMessages: exports.selectMessages,
    selectMessageByMessageId: exports.selectMessageByMessageId,
    selectMessagesByRoomId: exports.selectMessagesByRoomId,
    addNewMessage: exports.addNewMessage,
    getMessageCountByRoomId: exports.getMessageCountByRoomId,
    getLastMessageByRoomId: exports.getLastMessageByRoomId,
    allMessages: exports.selectMessages
};
// const { mongoose } = require("../../db/connection");
// const { messageSchema } = require("../../db/schema/messageSchema");
// const Message = mongoose.model("messages", messageSchema);
// export const selectMessages = () => {
//   return Message.find({}).then((messages) => {
//     return messages;
//   });
// };
// export const selectMessageByMessageId = (messageId) => {
//   return Message.findById(messageId)
//     .orFail(() => {
//       throw { msg: "Message does not exist!", status: 404 };
//     })
//     .then((message) => {
//       return message;
//     });
// };
// export const selectMessagesByRoomId = (roomId: any) => {  
//   return Message.find({ 
//     roomId: roomId,
//     displayToClient: true 
//   })
//     .sort({ timestamp: 1 })
//     .then((messages) => {
//       return messages || [];
//     });
// };
// export const addNewMessage = (
//   roomId,
//   senderId,
//   body,
//   senderUsername = null,
//   displayToClient = true
// ) => {
//   if (!roomId || !senderId || !body) {
//     throw { msg: "roomId, senderId, and body are required!", status: 400 };
//   }
//   if (body.trim() === "") {
//     throw { msg: "Message body cannot be empty!", status: 400 };
//   }
//   return Message.create({
//     roomId,
//     senderId,
//     senderUsername,
//     body: body.trim(),
//     timestamp: new Date(),
//     displayToClient,
//     msgId: Date.now(),
//   }).then((newMessage) => {
//     return newMessage;
//   });
// };
// export const getMessageCountByRoomId = (roomId) => {
//   return Message.countDocuments({ 
//     roomId: roomId,
//     displayToClient: true 
//   }).then((count) => {
//     return count;
//   });
// };
// export const getLastMessageByRoomId = (roomId) => {
//   return Message.findOne({ 
//     roomId: roomId,
//     displayToClient: true 
//   })
//     .sort({ timestamp: -1 })
//     .then((message) => {
//       return message;
//     });
// };
// module.exports = {
//   selectMessages,
//   selectMessageByMessageId,
//   selectMessagesbyRoomId: selectMessagesByRoomId,
//   addNewMessage,
//   getMessageCountByRoomId,
//   allMessages: selectMessages,
// };
// const { mongoose } = require("../../db/connection");
// const { messageSchema } = require("../../db/schema/messageSchema");
// const Message = mongoose.model("messages", messageSchema);
// export const selectMessages = () => {
//   return Message.find({}).then((messages) => {
//     return messages;
//   });
// };
// export const selectMessageByMessageId = (messageId) => {
//   return Message.findById(messageId)
//     .orFail(() => {
//       throw { msg: "Message does not exist!", status: 404 };
//     })
//     .then((message) => {
//       return message;
//     });
// };
// export const selectMessagesByRoomId = (roomId: any) => {  
//   return Message.find({ 
//     roomId: roomId,
//     displayToClient: true 
//   })
//     .sort({ timestamp: 1 })
//     .then((messages) => {
//       return messages || [];
//     });
// };
// export const addNewMessage = (
//   roomId,
//   senderId,
//   body,
//   senderUsername = null,
//   displayToClient = true
// ) => {
//   if (!roomId || !senderId || !body) {
//     throw { msg: "roomId, senderId, and body are required!", status: 400 };
//   }
//   if (body.trim() === "") {
//     throw { msg: "Message body cannot be empty!", status: 400 };
//   }
//   return Message.create({
//     roomId,
//     senderId,
//     senderUsername,
//     body: body.trim(),
//     timestamp: new Date(),
//     displayToClient,
//     msgId: Date.now(),
//   }).then((newMessage) => {
//     return newMessage;
//   });
// };
// export const getMessageCountByRoomId = (roomId) => {
//   return Message.countDocuments({ 
//     roomId: roomId,
//     displayToClient: true 
//   }).then((count) => {
//     return count;
//   });
// };
// export const getLastMessageByRoomId = (roomId) => {
//   return Message.findOne({ 
//     roomId: roomId,
//     displayToClient: true 
//   })
//     .sort({ timestamp: -1 })
//     .then((message) => {
//       return message;
//     });
// };
// // Keep the exports simple
// module.exports = {
//   selectMessages,
//   selectMessageByMessageId,
//   selectMessagesByRoomId,
//   addNewMessage,
//   getMessageCountByRoomId,
//   getLastMessageByRoomId,
// };
// // const { mongoose } = require("../../db/connection");
// // const { messageSchema } = require("../../db/schema/messageSchema");
// // const Message = mongoose.model("messages", messageSchema);
// // const selectChatById = require("./chats.models");
// // const { chatSchema } = require("../../db/schema/chatSchema");
// // const Chat = mongoose.model("chats", chatSchema);
// // export const selectMessages = () => {
// //   return Message.find({}).then((messages) => {
// //     return messages;
// //   });
// // };
// // export const selectMessageByMessageId = (messageId) => {
// //   return Message.findById(messageId)
// //     .orFail(() => {
// //       throw { msg: "Message does not exist!", status: 404 };
// //     })
// //     .then((message) => {
// //       return message;
// //     });
// // };
// // export const selectMessagesByRoomId = (roomId: any) => {
// //   console.log("=== selectMessagesByRoomId called with roomId:", roomId);
// //   console.log("=== roomId type:", typeof roomId);
// //   const queryRoomId = mongoose.Types.ObjectId.isValid(roomId) 
// //     ? new mongoose.Types.ObjectId(roomId) 
// //     : roomId;
// //   console.log("=== Using queryRoomId:", queryRoomId);
// //   return Message.find({ 
// //     roomId: queryRoomId,
// //     displayToClient: true 
// //   })
// //     .sort({ timestamp: 1 })
// //     .then((messages) => {
// //       console.log(`=== Database query returned ${messages.length} messages for roomId ${roomId}`);
// //       return messages || [];
// //     })
// //     .catch((error) => {
// //       console.error("=== Error querying messages:", error);
// //       return []; 
// //     });
// // };
// // export const addNewMessage = (
// //   roomId,
// //   senderId,
// //   body,
// //   senderUsername = null,
// //   displayToClient = true
// // ) => {
// //   if (!roomId || !senderId || !body) {
// //     throw { msg: "roomId, senderId, and body are required!", status: 400 };
// //   }
// //   if (body.trim() === "") {
// //     throw { msg: "Message body cannot be empty!", status: 400 };
// //   }
// //   return Message.create({
// //     roomId,
// //     senderId,
// //     senderUsername,
// //     body: body.trim(),
// //     timestamp: new Date(),
// //     displayToClient,
// //     msgId: Date.now(),
// //   }).then((newMessage) => {
// //     return newMessage;
// //   });
// // };
// // export const getMessageCountByRoomId = (roomId) => {
// //   // Convert to ObjectId if needed for consistency
// //   const queryRoomId = mongoose.Types.ObjectId.isValid(roomId) 
// //     ? new mongoose.Types.ObjectId(roomId) 
// //     : roomId;
// //   return Message.countDocuments({ 
// //     roomId: queryRoomId,
// //     displayToClient: true 
// //   }).then((count) => {
// //     return count;
// //   });
// // };
// // export const getLastMessageByRoomId = (roomId) => {
// //   // Convert to ObjectId if needed for consistency
// //   const queryRoomId = mongoose.Types.ObjectId.isValid(roomId) 
// //     ? new mongoose.Types.ObjectId(roomId) 
// //     : roomId;
// //   return Message.findOne({ 
// //     roomId: queryRoomId,
// //     displayToClient: true 
// //   })
// //     .sort({ timestamp: -1 })
// //     .then((message) => {
// //       return message;
// //     });
// // };
// // // Fix the module.exports to match what your controllers are importing
// // module.exports = {
// //   selectMessages,
// //   selectMessageByMessageId,
// //   selectMessagesByRoomId,  // Note: this is now camelCase to match your function name
// //   selectMessagesbyRoomId: selectMessagesByRoomId,  // Add alias for backward compatibility
// //   addNewMessage,
// //   getMessageCountByRoomId,
// //   getLastMessageByRoomId,
// //   allMessages: selectMessages  // Add alias since your controller uses this
// // };
// // const { mongoose } = require("../../db/connection");
// // const { messageSchema } = require("../../db/schema/messageSchema");
// // const Message = mongoose.model("messages", messageSchema);
// // const selectChatById = require("./chats.models");
// // const { chatSchema } = require("../../db/schema/chatSchema");
// // const Chat = mongoose.model("chats", chatSchema);
// // export const selectMessages = () => {
// //   return Message.find({}).then((messages) => {
// //     return messages;
// //   });
// // };
// // export const selectMessageByMessageId = (messageId) => {
// //   return Message.findById(messageId)
// //     .orFail(() => {
// //       throw { msg: "Message does not exist!", status: 404 };
// //     })
// //     .then((message) => {
// //       return message;
// //     });
// // };
// // export const selectMessagesByRoomId = (roomId: any) => {  
// //   return Message.find({ 
// //     roomId: roomId,
// //     displayToClient: true 
// //   })
// //     .sort({ timestamp: 1 })
// //     .then((messages) => {
// //       if (!messages || messages.length === 0) {
// //         return []; 
// //       }
// //       return messages;
// //     });
// // };
// // export const addNewMessage = (
// //   roomId,
// //   senderId,
// //   body,
// //   senderUsername = null,
// //   displayToClient = true
// // ) => {
// //   if (!roomId || !senderId || !body) {
// //     throw { msg: "roomId, senderId, and body are required!", status: 400 };
// //   }
// //   if (body.trim() === "") {
// //     throw { msg: "Message body cannot be empty!", status: 400 };
// //   }
// //   return Message.create({
// //     roomId,
// //     senderId,
// //     senderUsername,
// //     body: body.trim(),
// //     timestamp: new Date(),
// //     displayToClient,
// //     msgId: Date.now(),
// //   }).then((newMessage) => {
// //     return newMessage;
// //   });
// // };
// // export const getMessageCountByRoomId = (roomId:any) => {
// //   console.log("=== selectMessagesByRoomId called with roomId:", roomId);
// //   console.log("=== roomId type:", typeof roomId);
// //   return Message.countDocuments({ 
// //     roomId: roomId,
// //     displayToClient: true 
// //   }).then((count) => {
// //     return count;
// //   });
// // };
// // export const getLastMessageByRoomId = (roomId) => {
// //   return Message.findOne({ 
// //     roomId: roomId,
// //     displayToClient: true 
// //   })
// //     .sort({ timestamp: -1 })
// //     .then((message) => {
// //       return message;
// //     });
// // };
// // module.exports = {
// //   selectMessages,
// //   selectMessageByMessageId,
// //   selectMessagesByRoomId, 
// //   getMessageCountByRoomId,
// //   getLastMessageByRoomId,
// // };
