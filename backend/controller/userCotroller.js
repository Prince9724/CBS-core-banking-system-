import Auth from "../model/authModel.js"

export const postAuth = async(req , res)=>{
    try{
        
    }
    catch(err){
        res.json({
            status:false,
            message:"user post failed !!",
            err:err.message
        })
    }
}
export const getAuth = async(req , res)=>{
    try{

    }
    catch(err){
        res.json({
            status:false,
            message:"user fetching failed !!",
            err:err.message
        })
    }
}
export const updateAuth = async(req , res)=>{
    try{

    }
    catch(err){
        res.json({
            status:false,
            message:"user updation failed !!",
            err:err.message
        })
    }
}
export const delteAuth = async(req , res)=>{
    try{
        
    }
    catch(err){
        res.json({
            status:false,
            message:"user delted failed !!",
            err:err.message
        })
    }
}