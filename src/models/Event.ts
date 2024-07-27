import { model, Schema, Types } from "mongoose";
import { IEvent } from "../interfaces/IEvent";

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  clients: [
    {
      type: Types.ObjectId,
      ref: "Client",
      required: true,
    },
  ],
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "pending", "canceled"],
    required: true,
  },
});

const Event = model<IEvent>("Event", eventSchema);

export default Event;
