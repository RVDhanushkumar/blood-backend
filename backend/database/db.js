const mongoose=require("mongoose");
require('dotenv').config();
async function dbConnect(){
   try{
    await  mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected")
   }  
    catch(error){
        console.error("error connecting db",error);
    }
}
module.exports=dbConnect