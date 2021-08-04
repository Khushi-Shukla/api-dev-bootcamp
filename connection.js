const mongoose = require("mongoose");
//congig is necessary. Without it we will be running the outdated version of monogoose
const connectToDB = async() => 
 mongoose.connect(process.env.MONGODB_URL ,{
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true, 
});
module.exports = connectToDB;