const ENV = process.env.NODE_ENV || "development";
const { mongoose } = require("mongoose");

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

let uri = "";

if (ENV === "production") {
  uri = process.env.MONGODB_URI;
} else {
  uri = process.env.MONGO_DEV;
}

if (!process.env.MONGO_DEV && !process.env.MONGODB_URI) {
  throw new Error("MONGO_DEV or MONGODB_URI not set");
}

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
    maxPoolSize: 200,
  },
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
  //  await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Failed to connect to mongoDB");
    console.log(error);
  }
}
if (ENV === "production") {
  run();
}

module.exports = { mongoose, run };
