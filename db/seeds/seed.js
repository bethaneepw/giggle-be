const { mongoose } = require("../connection");
const { userData, chatData } = require("../data/test/index");
const { userSchema } = require("./../schema/mongooseschema");
const User = mongoose.model("users", userSchema);

// const db = mongoose("giggle");

const seed = () => {
  User.createCollection().then(function (collection) {
    console.log("created collection");
  });
  console.log(mongoose.connection.collections);
  //   mongoose.connection.db.listCollections().toArray(function (err, names) {
  //     console.log(names);
  //   });
  //   return (
  //     db
  //       .collection("users")
  //       .drop()
  //       .then(() => {
  //         return db.collection("chat").drop();
  //       })
  // .then(() => {
  //   return db.collection("tickets").drop();
  // })
  // .then(() => {
  //   return db.collection("events").drop();
  // })
  // .then(() => {
  //   return db.createCollection("users");
  // })
  // .then(() => {
  //   return db.createCollection("chat");
  // })
  // .then(() => {
  //   return db.createCollection("tickets");
  // })
  // .then(() => {
  //   return db.createCollection("event");
  // })
  // .then(() => {
  //   return db.collection("users").insertMany(userData);
  // })
  // .then(() => {
  //   return db.collection("chats").insertMany(chatData);
  // })
  // .then(() => {
  //   return db.collection("users").find({}).toArray();
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  //   .finally(() => {
  //     mongoose.close();
  //   })
};

seed();
