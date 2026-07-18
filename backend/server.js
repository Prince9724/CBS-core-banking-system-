import express from "express"
import Router from "./routes/route.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
connectDb();
app.use(express.json());
app.use("/cbs",Router);
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
     
}))
app.use(cookieParser());
app.listen(5003,()=>{
    console.log("server started succesfully !!");
})