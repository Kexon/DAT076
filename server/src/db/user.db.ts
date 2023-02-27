import { Schema } from "mongoose";
import { User } from "../model/User";
import { conn } from "./conn";

const userSchema: Schema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

export const userModel = conn.model<User>("User", userSchema);
