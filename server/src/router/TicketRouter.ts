import express, { Request, Response } from "express";
import makeTicketService from "../service/TicketService";
import Ticket from "../model/Ticket";

const ticketService = makeTicketService();
export const ticketRouter = express.Router();

ticketRouter.get(
  "/",
  async (req: Request<{}, {}, {}>, res: Response<Array<Ticket> | String>) => {
    try {
      const tasks = await ticketService.getAllTickets();
      res.status(200).send(tasks);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
