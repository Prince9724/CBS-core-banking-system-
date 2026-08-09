 import Customer from "../model/customerModel.js"
 
 export const addCustomer = async(req , res)=>{
     try{
         const {name,email,phone,adress, aadhar,pan,branchname,} = req.body
          const exist = await Customer.findOne({ email }); 
         if(exist){
           return  res.status(400).json({
                 status:false,
                 message:"customer is already exit with email",
 
             });
         }
 
         const result = await Customer.create({
             name,email, phone, adress,aadhar,pan, branchname
         })
         return res.status(201).json({
             status: true,
             message: "Customer added successfully",
             data: result
         });
 //     {
 //    "name": "customer4",
 //       "email": "customer4@gmail.com",
 //       "phone": 1234567890,
 //       "adress": "hello ",
 //       "aadhar": "123456789012",
 //       "pan": "pan",
 //       "branchname": "branch1"
   
 // }
     }
     catch(err){
         res.json({
             status:false,
             message:"user post failed !!",
             err:err.message
         })
     }
 }
 export const getCustomer = async(req , res)=>{
     try{
         const result = await Customer.find(req.body)
         res.json({
             status:true,
             message:"customer get Succesfully !!",
             result
         })
     }
     catch(err){
         res.json({
             status:false,
             message:"user fetching failed !!",
             err:err.message
         })
     }
 }
 export const updateCustomer = async(req , res)=>{
     try{
         const result = await Customer.findByIdAndUpdate(req.body.id,req.body);
         res.json({
             status:true,
             message:"customer updated Succesfully !!",
             result
         })
     }
     catch(err){
         res.json({
             status:false,
             message:"user updation failed !!",
             err:err.message
         })
     }
 }
 export const deleteCustomer = async(req , res)=>{
     try{
         const id = req.query.id
         const result = await Customer.findByIdAndDelete(id);
         if(!result){
             return res.status(400).json({
                 status:false,
                 message:"id is wrong !!"
             })
         }
         res.json({
             status:true,
             message:"customer deleted Succesfully !!",
             result
         })   
     }
     catch(err){
         res.json({
             status:false,
             message:"user delted failed !!",
             err:err.message
         })
     }
 }