import express from "express"
import {deleteAuth, logout, signIn, signUp, updateAuth } from "../controller/authController.js";
// import { Authemiddle } from "../middleware/authMiddleware.js";
import { addBranch, addManager, deleteBranch, getBranch, getBranchByCode, getSingleBranch, getUsers, otpSend, otpVerify, updateBranch } from "../controller/adminController.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminOnly } from "../middleware/adminOnly.js";

const Router = express.Router();
Router.post("/signin",signIn)
Router.post("/signup",signUp)
//manger add krne ke liye 
Router.post("/addrole",authMiddleware,adminOnly,addManager);
Router.put("/update",updateAuth)
Router.delete("/delete",deleteAuth);
Router.post("/logout",logout)
/// branch

Router.post("/addbranch",authMiddleware,adminOnly,addBranch);
Router.get("/getbranch",getBranch);
Router.delete("/deletebranch",deleteBranch);
Router.put("/updatebranch/:id",updateBranch)
Router.get("/branchcode/:branchcode", getBranchByCode);
Router.get("/branch/:id",getSingleBranch);
Router.post ("/sendotp",otpSend)
Router.post ("/verifyotp",otpVerify)
Router.get("/getusers", authMiddleware, adminOnly, getUsers);
export default Router ;