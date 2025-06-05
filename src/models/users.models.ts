const { mongoose, run } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);

export const selectUsers = () => {
  return User.find({}).then((users) => {
    return users;
  });
};

export const selectUserByUserId = (userId) => {
  return User.findById(userId)
    .orFail(() => {
      throw { msg: "User does not exist!", status: 404 };
    })
    .then((user) => {
      return user;
    });
};
