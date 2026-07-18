import Auth from "../model/authModel.js"
import bcrypt from "bcrypt";
export const Authemiddle = async(req, res , next)=>{
    try{
        const {email,password,contact} = req.body
        // console.log("===> 2. Database me user dhoondh rha hu...");
        const auth = await Auth.find({email:email});
            // console.log("===> 3. Database query complete hui! User mila:", auth);
        if (!auth) {//agr user ki email nhi milli to agr mill gyi to ismatch check krega 
            res.status(404).json({
                status: false, message: "user not found"
            })
        }
        //  console.log("===> 3. User mil gaya. Password compare ho rha hai...");
        const isMatch = bcrypt.compare(password, auth.password);
        if(!isMatch){
            res.status(404).json({
                status: false, message: "password wrong !!"
            })  
        }
        // console.log("===> 4. Sab sahi hai, aage bhej rha hu...");
        next();
    }
    catch(err){
        res.json({
            status:true,
            message:"user password Worng",
            err:err.message
        })
    }
}
