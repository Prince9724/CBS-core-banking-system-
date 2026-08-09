import mongoose  from "mongoose";

const branchSchema = new mongoose.Schema({
    branchname:{type:String,required:true},
    address:{type:String},
    branchcode:{type:String,required:true, unique: true},
     totalcustomers: {
      type: Number,
      default: 0,
    },

    totalaccounts: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Active",
    },
},
{
    timestamps:true
})
export default mongoose.model("branch", branchSchema);
