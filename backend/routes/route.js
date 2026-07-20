import express from "express"
import { addManager, deleteAuth, signIn, signUp, updateAuth } from "../controller/authController.js";
import { Authemiddle } from "../middleware/authMiddleware.js";
import { addBranch } from "../controller/adminController.js";

const Router = express.Router();
Router.post("/signin",Authemiddle,signIn)
Router.post("/signup",signUp)

Router.post("/addrole",addManager);
Router.put("/update",updateAuth)
Router.delete("/delete",deleteAuth);

/// branch

Router.post("/addbranch",addBranch);
export default Router ;