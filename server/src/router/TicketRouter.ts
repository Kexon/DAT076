import express, { Request, Response } from "express";
import makeTicketService from "../service/TicketService";
import Ticket from "../model/Ticket";

const ticketService = makeTicketService();
export const ticketRouter = express.Router();

ticketRouter.get(
  "/",
  async (req: Request<{}, {}, {}>, res: Response<Array<Ticket> | String>) => {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).send(tickets);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

ticketRouter.post(
  "/",
  async (
    req: Request<{}, {}, { title: string; description: string }>,
    res: Response<Ticket | string>
  ) => {
    try {
      if (
        typeof req.body.title != "string" ||
        typeof req.body.description != "string"
      ) {
        res.status(400).send("Title and description are required");
        return;
      }
      const tickets = await ticketService.getAllTickets();
      const ticket: Ticket = {
        id: tickets.length,
        title: req.body.title,
        description: req.body.description,
        open: true,
        authorid: 1,
      };
      await ticketService.addNewTicket(ticket);
      res.status(201).send(ticket);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
