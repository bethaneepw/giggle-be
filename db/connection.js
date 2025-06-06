const ENV = process.env.NODE_ENV || "development";
const { mongoose } = require("mongoose");

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

let uri = "";

if (ENV === "production") {
  uri = process.env.MONGODB_URI;
} else {
  uri = process.env.MONGO_DEV
}

if (!process.env.MONGO_DEV && !process.env.MONGODB_URI) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
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

module.exports = { mongoose, run };
