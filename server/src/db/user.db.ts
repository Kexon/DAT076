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
    select: false, // omit password field when querying by default
  },
  level: {
    type: Number,
    required: true,
  },
});

// creates a virtual id field that is the string representation of the _id field
userSchema.set("toJSON", {
  virtuals: true,
});

export const userModel = conn.model<User>("User", userSchema);
