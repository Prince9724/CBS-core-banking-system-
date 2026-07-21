import branch from "../model/branchModel.js"
import Auth from "../model/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
        const {name,email,contact,role,branchcode,branchname,password} = req.body
        const hash = await bcrypt.hash(password,12);
        const result = await Auth.create({name,email,contact,role,branchcode,branchname,password:hash});
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