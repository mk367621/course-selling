import jwt from "jsonwebtoken";
import { USER_JWT } from "../config.js";

export async function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }
  try {
    const decoded = jwt.verify(token, USER_JWT);

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
}
