const express = require("express");
const app = express();
app.get("/", (req, res)=>{
    return res.json({message: "Success"});
});
app.post("/user/:id", (req, res)=>{
    return res.json(req.params);
});

app.listen(4000, ()=> console.log("Server is running 🦄"));
