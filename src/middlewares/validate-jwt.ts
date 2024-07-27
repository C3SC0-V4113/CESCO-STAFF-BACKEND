import { Response, NextFunction, Request } from "express";
import { IGetUserRequest } from "../interfaces/IUser";
import { Secret, verify } from "jsonwebtoken";
import User from "../models/User";

export const validateJWT = async (
  req: IGetUserRequest | Request,
  res: Response,
  next: NextFunction
) => {
  /** x-token in headers */
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Request token is invalid",
    });
  }

  try {
    const SECRET_KEY: Secret = process.env.SECRET_JWT_SEED!;
    const payload = verify(token, SECRET_KEY);
    const { uid } = payload as IGetUserRequest;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Token is invalid",
      });
    }

    (req as IGetUserRequest).uid = user.id;
    (req as IGetUserRequest).name = user.name;
    (req as IGetUserRequest).role = user.role;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token is invalid",
    });
  }
};
