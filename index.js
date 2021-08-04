require("dotenv").config();
const express = require("express");

// mongoose connection
const connectDB = require("./connection")

const app = express();
app.get("/", (req, res)=>{
    return res.json({message: " Success"});
});
app.post("/user/:id", (req, res)=>{
    return res.json(req.params);
});

app.listen(4000, ()=> 
 connectDB()
    .then((data) => console.log("Server is running 🦄", data))
    .catch((error)=> console.log(error))
);
