import { model, Schema } from "mongoose";
import { IClient } from "../interfaces/IClient";

const clientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Client = model<IClient>("Client", clientSchema);

export default Client;
