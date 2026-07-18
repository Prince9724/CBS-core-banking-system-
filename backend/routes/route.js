import express from "express"
import { signIn, signUp } from "../controller/authController.js";
import { Authemiddle } from "../middleware/authMiddleware.js";

const Router = express.Router();
Router.post("/signin",Authemiddle,signIn)
Router.post("/signup",signUp)

export default Router ;