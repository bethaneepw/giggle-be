const devData = require("../data/") // FILE NEEDS TO BE ADDED
const seed = require("./seed.js")
const db = require("../connection.js")


const runSeed = () => {
    return seed(devData).then(()=>{
        db.end();
    })
}

runSeed();