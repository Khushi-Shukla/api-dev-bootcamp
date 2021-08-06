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
    try{
        const user=await userModel.find();
        return res.json({user});

    }catch(error){
        return res.status(500).json({ error:error.message });
    }
    
});

//route: /user/name
//description: to add new user
//parameter: none
// request body: user object
app.post("/user/new", async(req, res)=>{
    try{
    const { newUser }=req.body;
    await userModel.create(newUser);
    return res.json({message: "User created"});
    }
    catch(error){
        return res.status(500).json({ error:error.message });
    }
});

//route: /user/type/:type
//description: to get all user
//parameter: type
app.get("/user/type/:type", async(req, res)=>{
    try{
    const { type } = req.params;
    const user= await userModel.find({userType:type});
    
    if(!user){
        return res.json({message:"No user found"});
    }
    return res.json({ user });
}
catch(error){
    return res.status(500).json({ error:error.message });
}
});


//route: /user/:id
//description: to get all user based on id
//parameter: type
app.get("/user/:_id", async(req, res)=>{
    try{
        const { _id }=req.params;
        const user = await userModel.findById(_id); 
        if(!user){
            return res.json({ message:"No user found" });
        }
        return res.json({ user });
    }
    catch(error){
    return res.status(500).json({ error:error.message });
}
})


//route: /user/update/:_id
//description: to add new user
//parameter: _id
// request body: user object
app.put("/user/update/:_id", async(req, res)=>{
    try{
        const { _id }=req.params;
        const { userData }=req.body;

        const updateUser = await userModel.findOneAndUpdate(
            _id, 
            {$set: userData }, 
            {new:true}

        );
        return res.json({ user:updateUser });
    }
    catch(error){
        return res.status(500).json({ error:error.message });
    }
})

//route: /user/delete/:_id
//description: to add new user
//parameter: _id
// request body: name
app.delete("/user/delete/:_id", async (req, res)=>{
    try{
    const { _id } = req.params;
    await userModel.findByIdAndDelete( _id );
    return res.json({ message:"User deleted🎈" });
    }
    catch(error){
        return res.status(500).json({ error:error.message });
    }
})

//route: /user/delete/type:userType
//description: to add new user
//parameter: userType
// request body: name
app.delete("/user/delete/type/:userType", async (req, res) => {
    try {
      const { userType } = req.params;
  
      await userModel.findOneAndDelete({ userType });
  
      return res.json({ message: "User deleted! 😈" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  

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
