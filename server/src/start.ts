import "dotenv/config";
import express from "express";
import cors from "cors";
import { ticketRouter } from "./router/TicketRouter";
import { userRouter } from "./router/UserRouter";
import session from "express-session";

export const app = express();

if (!process.env.SECRET_KEY) {
  throw new Error("Secret key not found");
}

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/ticket", ticketRouter);
app.use("/user", userRouter);
