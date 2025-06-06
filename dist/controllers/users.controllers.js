"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { mongoose } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);
const { selectUsers, addNewUser, deleteUserByUserId, selectUserByUserId, updateUser, } = require("../models/users.models");
// interface User {
//   id: number;
//   name: string;
//   profile_picture: string;
//   trustworthiness: number;
// }
exports.getUsers = (req, res) => {
    return selectUsers().then((users) => {
        res.status(200).send({ users });
    });
};
exports.postUser = (req, res, next) => {
    const { firstName, lastName, username, location, preferences, biography, dateOfBirth, gender, trustRating, isVerified, interestedEvents, profilePictureURL, } = req.body;
    if (firstName === "" ||
        lastName === "" ||
        username === "" ||
        location === "" ||
        biography === "" ||
        dateOfBirth === "" ||
        trustRating === "" ||
        profilePictureURL === "") {
        throw { msg: "Information cannot be blank!", status: 400 };
    }
    else {
        return addNewUser(firstName, lastName, username, location, preferences, biography, dateOfBirth, gender, trustRating, isVerified, interestedEvents, profilePictureURL)
            .then((newUser) => {
            res.status(201).send({ newUser });
        })
            .catch(next);
    }
};
exports.deleteUser = (req, res, next) => {
    const { user_id } = req.params;
    const pendingSelectUserByUserId = selectUserByUserId(user_id);
    const pendingDeleteUserByUserId = deleteUserByUserId(user_id);
    return Promise.all([pendingDeleteUserByUserId, pendingSelectUserByUserId])
        .then(() => {
        res.status(204).send();
    })
        .catch(next);
};
exports.getUserById = (req, res, next) => {
    const { user_id } = req.params;
    return selectUserByUserId(user_id)
        .then((user) => {
        res.status(200).send({ user });
    })
        .catch(next);
};
exports.patchUser = (req, res, next) => {
    const dataToUpdate = req.body;
    const { user_id } = req.params;
    const pendingSelectUserByUserId = selectUserByUserId(user_id);
    const pendingUpdateUser = updateUser(user_id, dataToUpdate);
    return Promise.all([pendingUpdateUser, pendingSelectUserByUserId])
        .then(([updatedUser]) => {
        res.status(200).send({ updatedUser });
    })
        .catch(next);
};
