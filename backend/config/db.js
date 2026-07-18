import mongoose from "mongoose";

// req, res hata dein, yeh normal function hai
const connectDb = async () => { 
    try {
        // Localhost issues se bachne ke liye 0.0.0.0 ka use best hai
        await mongoose.connect("mongodb://0.0.0.0:27017/cbs"); 
        console.log("mongodb connected Successfully !! ");
    } catch (err) {
        // err.message print karein taaki error details dikhein
        console.log("mongodb connection failed !! Error:", err.message); 
    }
};

export default connectDb;
