const express = require("express");
const app = express();
app.get("/",(req,res)=> res.send("Hello world"))

app.listen(9090, ()=> {
    console.log("Server is listening on 9090")
})