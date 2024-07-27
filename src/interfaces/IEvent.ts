import { Types } from "mongoose";

export interface IEvent {
  title: string;
  description: string;
  users: Types.ObjectId[];
  clients: Types.ObjectId[];
  startDateTime: Date;
  endDateTime: Date;
  status: "completed" | "pending" | "canceled";
}
