import nodemailer from "nodemailer"
import dotenv from "dotenv";    
import OTP from "../model/otpModel.js"

dotenv.config();

export const transpoter = nodemailer.transpoter({
    service:"gmail",
    auth:{
        user:process.env.USEREMAIL,
        pass:process.env.EMAILPASS
    }
})
export const generatorOtp =()=>{
    return Math.floor(100000+Math.random()*900000)
}
//152002 