import mongoose from "mongoose"
const transactionSchema = new mongoose.Schema({
    accountNumber:{
        type:String,
        required :true
    },
    type:{
        type:String,
        enum:["deposit","withdraw","transfer-credit","transfer-debit"]
    },
    amount:{
        type:Number,
        required:true
    },
    balanceAfter:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    branchcode:String,
    branchname:String,

    perfomerdBy:String // manager ke userid ke liye 
},{
    timestamps:true
}) ;
export default mongoose.model("Transaction", transactionSchema);