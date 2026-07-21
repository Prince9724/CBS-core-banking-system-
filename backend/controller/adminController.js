import branch from "../model/branchModel.js"
import Auth from "../model/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generatorOtp } from "./otpController.js"
export const addBranch = async (req , res)=>{
   
    try{
        const result = await branch.create(req.body);
        res.status(200).json({
            status:true,
            message:"branch added succefully !!",
            data:result
        })    
    }
    catch(err){
        res.json({
            status:false,
            message:"branch Added failled !! ",
            err:err.message
        })
    }
}
//add user for admin 
export const addManager = async(req ,res)=>{
    try{
        const {name,email,contact,role,branchcode,branchname,password,userid} = req.body
        const hash = await bcrypt.hash(password,12);
        const result = await Auth.create({name,userid,email,contact,role,branchcode,branchname,password:hash});
        res.status(200).json({
            status: true,
            message: "user post succesfully !!",
            data:result
        })
    }
    catch(err){
        res.json({
            status:false,
            message:"manager added failed !!",
            err:err.message
        })
    }
}
export const otpSend = async(req , res)=>{
    try{
        const otp = generatorOtp();
        const expiry = new Date(Date.now()+1000 *60*20);//20 minute ka expiry hai otp ka 
        const Otp = await otp.create()
    }   
    catch(err){
        res.json({
            status:false,
            message:"can't otp send",
            err:err.message
        })
    }
}