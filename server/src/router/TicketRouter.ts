import express, { Request, Response } from "express";
import makeTicketService from "../service/TicketService";
import Ticket from "../model/Ticket";

const ticketService = makeTicketService();
export const ticketRouter = express.Router();

ticketRouter.get(
  "/",
  async (
    req: Request<{ open: string }, {}, {}>,
    res: Response<Array<Ticket> | String>
  ) => {
    try {
      if (Object.keys(req.query).length === 0) {
        const tickets = await ticketService.getAllTickets();
        res.status(200).send(tickets);
      } else {
        const open = req.query.open === "true";
        console.log(open);
        // add more stuff to filter with here later
        const tickets = await ticketService.getTicketsByStatus(open);
        res.status(200).send(tickets);
      }
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

ticketRouter.get(
  "/:id",
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<Ticket[] | string>
  ) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).send("Invalid id");
        return;
      }
      const ticket = await ticketService.getTicketById(id);
      if (ticket.length > 0) {
        res.status(200).send(ticket);
      } else {
        res.status(404).send("Ticket not found");
      }
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
        res.status(400).send("Invalid request");
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

ticketRouter.patch(
  "/:id",
  async (
    req: Request<
      { id: string },
      {},
      { title?: string; description?: string; open?: boolean }
    >,
    res: Response<Ticket | string>
  ) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).send("Invalid id");
        return;
      }
      let changedParams = 0;
      const ticket = await ticketService.getTicketById(id);
      if (ticket.length > 0) {
        if (typeof req.body.title == "string") {
          ticket[0].title = req.body.title;
          changedParams++;
        }
        if (typeof req.body.description == "string") {
          ticket[0].description = req.body.description;
          changedParams++;
        }
        if (typeof req.body.open == "boolean") {
          ticket[0].open = req.body.open;
          changedParams++;
        }
        if (changedParams !== Object.keys(req.body).length) {
          res.status(400).send("Invalid request");
          return;
        }
        await ticketService.updateTicket(ticket[0]);
        res.status(200).send(ticket[0]);
      } else {
        res.status(404).send("Ticket not found");
      }
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
