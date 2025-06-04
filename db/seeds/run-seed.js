const devData = require("../data/test/index.js")
// path needs to be changed back to /data/development once development data created
const seed = require("./seed.js")
const { mongoose } = require("mongoose")


const runSeed = () => {
    return seed(devData).then(()=>{
        mongoose.disconnect();
    })
}

runSeed();