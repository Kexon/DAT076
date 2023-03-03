import { Schema } from "mongoose";
import { Ticket } from "../model/Ticket";

import { conn } from "./conn";

const ticketSchema: Schema = new Schema<Ticket>({
  title: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  assigneeId: {
    type: String,
    required: false,
  },
});

// creates a virtual id field that is the string representation of the _id field
ticketSchema.set("toJSON", {
  virtuals: true,
});

export const ticketModel = conn.model<Ticket>("Ticket", ticketSchema);
