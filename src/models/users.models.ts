const { mongoose, run } = require("../../db/connection");
const { userSchema } = require("../../db/schema/userSchema");
const User = mongoose.model("users", userSchema);

export const selectAllUsers = () => {
  return User.find({}).then((users) => {
    return users;
  });
};

// selectAllUsers();
