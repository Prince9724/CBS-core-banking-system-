// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   try {
//     // cookie se token lo
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({
//         status: false,
//         message: "No token found",
//       });
//     }

//     // token verify
//     const decoded = jwt.verify(token, "!@#$%^&*()");

//     // 🔥 sabse important line
//     req.user = decoded;

//     next();
//   } catch (err) {
//     return res.status(401).json({
//       status: false,
//       message: "Invalid token",
//       error: err.message,
//     });
//   }
// };
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    console.log("COOKIES:", req.cookies);

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    console.log("DECODED USER:", decoded);

    next();
  } catch (err) {
    console.log("TOKEN ERROR:", err.message);

    return res.status(401).json({
      status: false,
      message: "Invalid token",
    });
  }
};