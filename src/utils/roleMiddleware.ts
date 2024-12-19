import { NextFunction, Request, Response } from "express";

export const roleMiddleware = (roles: string[]):any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role
    if (!roles.includes(userRole!!)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }
    next();
  };
};
