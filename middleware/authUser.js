import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware Autentikasi
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.user = user;
    next();
  });
};

// Middleware Otorisasi
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};

export { authenticateJWT, authorizeRole };
