import branch from "../model/branchModel.js"
import Auth from "../model/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generatorOtp, transpoter } from "./otpController.js"
import OTP from "../model/otpModel.js"
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
        await OTP.create({email:req.body.email,otp,expiry})
        await transpoter.sendMail({
            from:`"cbs"<${process.env.USEREMAIL}>`,
            to:req.body.email,
            subject:"forget your password do not share Otp",
            text:`your otp is ${otp} it is expire in 2 minute !`
        })
        res.json({
            status:true,
            message:"otp send succesfully !!",
        })
    }   
    catch(err){
        res.json({
            status:false,
            message:"can't otp send",
            err:err.message
        })
    }
}
export const otpVerify = async(req, res)=>{
    const {email , otp} = req.body
    const result = await OTP.findOne({email , otp});
    if(!result){//agar otp find nhi hua to 
        res.json({
            status:false,
            message:"Otp Invalid !!",
            err:err.message
        })
    }
    if(result.expiry> new Date(Date.now())){//agar otp expire hone se pahle enter hai to 
         res.status(200).json({
            status:true,
            message:"Otp verification successfully !! ",

        })
    }

    else{
        res.json({
            status:false,
            message:"otp Expire !! ",
            
        })
    }
}