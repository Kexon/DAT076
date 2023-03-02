import { Schema } from "mongoose";
import { Message } from "../model/Message";
import { conn } from "./conn";

const messageSchema: Schema = new Schema<Message>({
  chatId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// creates a virtual id field that is the string representation of the _id field
messageSchema.set("toJSON", {
  virtuals: true,
});

export const messageModel = conn.model<Message>("Message", messageSchema);
