
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : req.cookies?.token;

  console.log("Token:", token);

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
