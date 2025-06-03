"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAllUsers = void 0;
const { mongoose, run } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);
const selectAllUsers = () => {
    return User.find({}).then((users) => {
        return users;
    });
};
exports.selectAllUsers = selectAllUsers;
(0, exports.selectAllUsers)();
