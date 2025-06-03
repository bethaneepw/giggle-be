const ENV = process.env.NODE_ENV || "development";
const { mongoose } = require("mongoose");

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

let uri = "";

if (ENV === "production") {
  uri = process.env.MONGO_DB_URL;
} else {
  uri = process.env.MONGO_DEV
}

async function run() {
  try {
    await mongoose.connect(uri);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error)
  }
}


run();

module.exports = { mongoose, run };
