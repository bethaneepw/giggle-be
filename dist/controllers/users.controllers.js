"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectUsers, addNewuser, deleteUserByUserId, selectUserByUserId, } = require("../models/users.models");
exports.getUsers = (req, res) => {
    return selectUsers().then((users) => {
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
exports.getUserById = (req, res, next) => {
    const { user_id } = req.params;
    return selectUserByUserId(user_id)
        .then((user) => {
        res.status(200).send({ user });
    })
        .catch(next);
};
