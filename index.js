require("dotenv").config();
const express = require("express");

// mongoose connection
const connectDB = require("./connection");
const userModel = require("./user");

const app = express();

//congiguration
app.use(express.json());

//route: /
//description: to get all user
//parameter: none
app.get("/",async (req, res)=>{

    const user=await userModel.find();
    return res.json({user});

})

//route: /user/name
//description: to add new user
//parameter: none
// request body: user object
app.post("/user/new", async(req, res)=>{
    const {newUser}=req.body;
    await userModel.create(newUser);
    return res.json({message: "User created"});
});

//route: /user/type/:type
//description: to get all user
//parameter: type
app.get("/user/type/:type", async(req, res)=>{
    const { type } = req.params;
    const user= await userModel.find({userType:type});
    
    if(!user){
        return res.json({message:"No user found"});
    }
    return res.json({user});
});


//route: /user/:id
//description: to get all user based on id
//parameter: type
app.get("/user/:_id", async(req, res)=>{
    const {_id}=req.params;
    const user = await userModel.findById(_id); 
    if(!user){
        return res.json({message:"No user found"});
    }
    return res.json({user});
})

// app.get("/", (req, res)=>{
//     return res.json({message: " Success"});
// });  
// app.post("/user/:id", (req, res)=>{
//     return res.json(req.params);
// });

app.listen(4000, ()=> 
 connectDB()
    .then(() => console.log("Server is running 🦄"))
    .catch((error)=> console.log(error))
);
