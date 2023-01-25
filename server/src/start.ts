import express from "express";
import { ticketRouter } from "./router/TicketRouter";

export const app = express();

app.use(express.json());
app.use("/tickets", ticketRouter);
