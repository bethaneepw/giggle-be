"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewUser = exports.selectUserByUserId = exports.selectUsers = void 0;
const { mongoose, run } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);
const selectUsers = () => {
    return User.find({}).then((users) => {
        return users;
    });
};
exports.selectUsers = selectUsers;
const selectUserByUserId = (userId) => {
    return User.findById(userId)
        .orFail(() => {
        throw { msg: "User does not exist!", status: 404 };
    })
        .then((user) => {
        return user;
    });
};
exports.selectUserByUserId = selectUserByUserId;
const addNewUser = (firstName, lastName, username, location, preferences, biography, dateOfBirth, gender, trustRating, isVerified, interestedEvents, profilePictureURL) => {
    return User.create({
        firstName,
        lastName,
        username,
        location,
        preferences,
        biography,
        dateOfBirth,
        gender,
        trustRating,
        isVerified,
        interestedEvents,
        profilePictureURL,
    }).then((newUser) => {
        return newUser;
    });
};
exports.addNewUser = addNewUser;
