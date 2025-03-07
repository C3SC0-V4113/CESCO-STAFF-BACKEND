import { Request } from "express";

type Role = "admin" | "user";

export interface IGetUserRequest extends Request {
  uid: string;
  name: string;
  role: Role;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}
