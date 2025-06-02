const { MongoClient, ServerApiVersion } = require("mongodb");
const ENV = process.env.NODE_ENV || "development";
const uri = "mongodb://localhost:27017/giggle";
const { mongoose } = require("mongoose");
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const mongoose = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//     maxConnecting: 2,
//   },
// });

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    // await mongoose.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

module.exports = { mongoose };
