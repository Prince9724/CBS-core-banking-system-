import mongoose  from "mongoose";

const branchSchema = new mongoose.Schema({
    branchname:{type:String,required:true},
    address:{type:String},
    branchcode:{type:String,required:true, unique: true,}
},
{
    timestamps:true
})
export default mongoose.model("branch", branchSchema);
