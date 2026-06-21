import jwt from "jsonwebtoken";
import { ADMIN_JWT } from "../config.js";

export async function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, ADMIN_JWT);

    req.adminId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
}