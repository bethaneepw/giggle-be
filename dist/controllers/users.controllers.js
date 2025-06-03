"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllUsers, addNewuser, deleteUserByUserId, selectUserByUserId, } = require("../models/users.models.ts");
exports.getAllUsers = (req, res) => {
    return selectAllUsers().then((users) => {
        res.status(200).send({ users });
    });
};
exports.postUser = (req, res) => {
    const { userId } = req.params;
    return addNewuser(userId).then((user) => {
        res.status(201).send(user);
    });
};
exports.deleteUser = (req, res) => {
    const { userId } = req.params;
    return deleteUserByUserId(userId).then(() => {
        res.status(204).send();
    });
};
exports.getUserById = (req, res) => {
    const { userId } = req.params;
    return selectUserByUserId(userId).then((user) => {
        res.status(200).send(user);
    });
};
