import "dotenv/config";
import express from "express";
import cors from "cors";
import { ticketRouter } from "./router/TicketRouter";
import { userRouter } from "./router/UserRouter";
import session from "express-session";
import { messageRouter } from "./router/MessageRouter";

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
app.use("/message", messageRouter);
