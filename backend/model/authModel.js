import mongoose from "mongoose";

 const userSchema =  new mongoose.Schema({
    name:{type:String,required:true},
    userid:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,required:true,
         enum: ["Admin", "manager", "teller"]
    },
    contact:{type:Number,required:true},
    password:{type:String,required:true},
    branchname:{type:String},
    branchcode:{type:String}

})
export default mongoose.model("auth",userSchema);
