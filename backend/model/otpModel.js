import mongoose  from "mongoose";

 const otpSchema = new mongoose.Schema({
    otp:{type:Number,required:true},
    email:{type:String,required:true},
    expiry:{type:Date}
})

export default mongoose.model("otp",otpSchema);