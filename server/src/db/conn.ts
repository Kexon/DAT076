import "dotenv/config";
import { createConnection } from "mongoose";

if (!process.env.DB_URI) {
  throw new Error("DB_URI not found");
}

export const conn = createConnection(process.env.DB_URI);
