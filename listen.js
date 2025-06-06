const app = require("./dist/app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

// const app = require("./dist/app.js");

// app.listen(1313, () => {
//   console.log("Server is listening on port 1313");
// });
