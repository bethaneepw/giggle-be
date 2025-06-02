const db = require("./connection")


db.dropDatabase("giggle")
db.use("giggle")

db.dropDatabase("giggle_test")
db.use("giggle_test")