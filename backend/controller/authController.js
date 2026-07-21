import Auth from "../model/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import cookieparser from "cookie"
export const signUp = async (req, res) => {
    try {
        const {name,email,contact,password,role,userid} = req.body
        const hash = await bcrypt.hash(password,12);
        const result = await Auth.create({name,userid,email,contact,role,password:hash});
        res.status(200).json({
            status: false,
            message: "user post succesfully !!",
            data:result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user post failed !!",
            err: err.message
        })
    }
}
//signIn for admin
export const signIn = async (req, res) => {
    try {
    //    console.log("===> 5. Controller hit hua! Token ban rha hai...");
    const token = await jwt.sign({email:req.body.email},"!@#$%^&*()",{
        expiresIn:"1h",
    })
    res.cookie("token",token,{
        httpOnly:true,
        maxAge: 1000* 60* 60 //1 hour
    })
    res.status(200).json({
        status:true,
        message:"user signIn succesfully !!",
        token:token
    })
    }   
    catch (err) {
        res.json({
            status: false,
            message: "user fetching failed !!",
            err: err.message
        })
    }
}
        
       
export const updateAuth = async (req, res) => {
    try {
        
        const result = await Auth.findByIdAndUpdate(req.body._id,req.body,{new:true})
        if(!result){
            return res.json({
                status:false,
                message:"Id nahi milla ye Id data base me nhi hai ",
                data:null
            })
        }
        res.json({
            status:true,
            message:"manager updation succesfully !!",
            data:result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user updation failed !!",
            err: err.message
        })
    }
}
export const deleteAuth = async (req, res) => {
    try {
        const result = await Auth.findByIdAndDelete(req.query.id)
        res.json({
            status:true,
            message:"manager deleted succesfully !!",
            data:result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user delted failed !!",
            err: err.message
        })
    }
}

export const forgetPassword = async(req ,res)=>{

}