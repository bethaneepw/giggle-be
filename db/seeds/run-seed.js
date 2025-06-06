const devData = require("../data/development/index.js")
const seed = require("./seed.js")
const { mongoose } = require("mongoose")


const runSeed = () => {
    return seed(devData).then(()=>{
        mongoose.disconnect();
    })
}

runSeed();