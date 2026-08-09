// import mongoose from "mongoose";
// import dotenv from 'dotenv'

// dotenv.config()

// // req, res hata dein, yeh normal function hai
// const connectDb = async () => { 

//     console.log("-------------"+process.env.MONGO_URI);
//     try {
//         // Localhost issues se bachne ke liye 0.0.0.0 ka use best hai
//         await mongoose.connect(process.env.MONGO_URI); 
//         console.log("mongodb connected Successfully !! ");
//     } catch (err) {
//         // err.message print karein taaki error details dikhein
//         console.log("mongodb connection failed !! Error:", err.message); 
//     }
// };
// // "mongodb://0.0.0.0:27017/cbs"
// export default connectDb;

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDb = async () => {
//   try {
//     const mongoUri = process.env.MONGO_URI;

//     if (!mongoUri) {
//       throw new Error("MONGO_URI is not defined in .env");
//     }

//     console.log("Connecting to MongoDB...");

//     await mongoose.connect(mongoUri, {
//       serverSelectionTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//     });

//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);
//   }
// };

// MONGO_URI=mongodb://princegondrw123_db_user:jFUdZLdQs10K0VFx@ac-wularya-shard-00-00.jbngp6i.mongodb.net:27017,ac-wularya-shard-00-01.jbngp6i.mongodb.net:27017,ac-wularya-shard-00-02.jbngp6i.mongodb.net:27017/cbs?ssl=true&replicaSet=atlas-n5dgou-shard-0&authSource=admin&retryWrites=true&w=majority&appName=cbs

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDb;
