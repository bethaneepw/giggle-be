const { userData, chatData } = require("../data/test/index");
const { userSchema} = require("../schema/userSchema")
const Chat = require("../schema/chatSchema")
const {mongoose} = require("mongoose");
const { run } = require("../connection");

const User = mongoose.model("users", userSchema)

const seed = async () => {

    try {
        // User.createCollection().then(() => {
        //     console.log("Successfully create User Collection")
        // }).catch((err) => {
        //     console.log(err)
        // })
    await User.deleteMany().then(() => {
        console.log("Successfully deleted old User Data")
    })
    await User.create(userData).then(() => {
        console.log("Successfully created User Data")
    })
     } catch (error) {
        console.log(error)
     }
  


    // User.deleteMany().then(() => {
    //     console.log("Successfully deleted old User Data")
    // }).catch((err) => {
    //     console.log(err)
    // })

    // User.create(userData).then(() => {
    //     console.log("Successfully created User Data")
    // }).catch((err) => {
    //     console.log(err, "<<< ERROR !!")
    // })



    // await Chat.createCollection().then(
    //     console.log("Successfully create Chat Collection")
    // ).catch((err) => {
    //     console.log(err)
    // })

    // await Chat.deleteMany().then(function () {
    //     console.log("Successfully deleted old Chat Data")
    // }).catch((err) => {
    //     console.log(err)
    // })

    //   await Chat.create(chatData).then(
    //     console.log("Successfully created Chat Data")
    // ).catch((err) => {
    //     console.log(err)
    // })

    
    
};


seed();
