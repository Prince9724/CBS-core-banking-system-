import branch from "../model/branchModel.js"
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