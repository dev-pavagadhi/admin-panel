import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: IUser;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split("")[1];

  if (!token)
    return res.status(401).json({ message: "No Token , authorization denied" });

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as IUser;
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid" });
  }
};
