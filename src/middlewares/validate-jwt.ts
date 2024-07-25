import { Response, NextFunction } from "express";
import { IGetUserRequest } from "../interfaces/IUser";
import { Secret, verify } from "jsonwebtoken";

export const validateJWT = (
  req: IGetUserRequest,
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
    const { uid, name } = payload as IGetUserRequest;

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token is invalid",
    });
  }

  next();
};
