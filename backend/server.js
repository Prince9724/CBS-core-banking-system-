// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// dotenv.config();

// import Router from "./routes/route.js";
// import connectDb from "./config/db.js";

// const app = express();

// const startServer = async () => {
//   try {
//     await connectDb();

//     app.use(
//       cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//       })
//     );

//     app.use(express.json());
//     app.use(cookieParser());

//     app.use("/cbs", Router);

//     const PORT = process.env.PORT || 5003;
//     app.listen(PORT, () => {
//       console.log(`Server started successfully on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//     process.exit(1);
//   }
// };

// startServer();

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import Router from "./routes/route.js";
import connectDb from "./config/db.js";
// import { use } from "react";
import CustomerRoute from "./routes/customerRoutes.js";

const app = express();

const startServer = async () => {
  try {
    await connectDb();

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    app.use(express.json());
    app.use(cookieParser());

    app.use("/cbs", Router);
    app.use("/cbs/customer",CustomerRoute)

    const PORT = process.env.PORT || 5003;
    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();