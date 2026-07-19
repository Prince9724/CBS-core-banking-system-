import express from "express"
import { deleteAuth, signIn, signUp, updateAuth } from "../controller/authController.js";
import { Authemiddle } from "../middleware/authMiddleware.js";

const Router = express.Router();
Router.post("/signin",Authemiddle,signIn)
Router.post("/signup",signUp)

Router.put("/update",updateAuth)
Router.put("/delete",deleteAuth);
export default Router ;