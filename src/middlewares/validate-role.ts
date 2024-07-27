import { NextFunction, Request, Response } from "express";
import { IGetUserRequest } from "../interfaces/IUser";
import User from "../models/User";

export const validateRole = async (
  req: IGetUserRequest | Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as IGetUserRequest).uid;
  try {
    const user = await User.findById(userId);
    if (user && user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "Access denied, admin role required",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};
