"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message = mongoose.model("messages", messageSchema);
exports.postMessagebyId = (req, res, next) => {
    const { roomId } = req.params;
    return selectChatbyId(roomId)
        .then((message) => {
        res.status(201).send({ message });
    })
        .catch(next);
};
exports.getMessagebyRoomId = (req, res, next) => {
    const { roomId } = req.params;
    return selectMessagebyRoomId(roomId)
        .then((message) => {
        res.status(200).send({ message });
    })
        .catch(next);
};
exports.deleMessagebuId = (req, res, next) => {
    const { message_id } = req.params;
    return deletaMessagebyId(message_id)
        .then((message) => {
        res.status(204).send({ message });
    })
        .catch(next);
};
exports.patchMessagebyId = (req, res, next) => {
    const { message_id } = req.params;
    return patchMessagebyId(message_id)
        .then((message) => {
        res.status(204).send({ message });
    })
        .catch(next);
};
