import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // cookie se token lo
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token found",
      });
    }

    // token verify
    const decoded = jwt.verify(token, "!@#$%^&*()");

    // 🔥 sabse important line
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid token",
      error: err.message,
    });
  }
};