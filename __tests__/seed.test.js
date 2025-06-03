const seed = require("../db/seeds/seed")
const data = require("../db/data/test/index")
const { beforeAll, afterAll } = require("@jest/globals");
const { mongoose } = require("mongoose")

beforeAll(()=> seed(data));
afterAll(() => mongoose.disconnect());