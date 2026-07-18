import mongoose from "mongoose"

const connectDb = async(req , res)=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/cbs")
        console.log("mongodb connected Successfully !! ");
    }
    catch(err){
        console.log("mongodb connection failed !!")
    }
}

export default connectDb;
//   res.status(200).json({
//             status:true,
//             message:"mongodb connected succesfully !!",
            
//         })
//          res.json({
//             status:false,
//             message:"mongodb connection failled !! ",
//             err:err.message
//         })