"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUsers = void 0;
const { mongoose, run } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);
const selectUsers = () => {
    return User.find({}).then((users) => {
        return users;
    });
};
exports.selectUsers = selectUsers;
// selectAllUsers();
