import mongoose from "mongoose";

 const userSchema =  new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,required:true},
    contact:{type:Number,required:true},
    password:{type:String},

})
export default mongoose.model("auth",userSchema);
