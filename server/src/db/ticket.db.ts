import { Schema } from "mongoose";
import { Ticket } from "../model/Ticket";

import { conn } from "./conn";

const ticketSchema: Schema = new Schema<Ticket>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  assigneeId: {
    type: String,
    required: false,
  },
});

export const ticketModel = conn.model<Ticket>("Ticket", ticketSchema);
