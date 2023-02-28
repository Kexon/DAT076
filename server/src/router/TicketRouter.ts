import express, { Request, Response } from "express";
import makeTicketService from "../service/ticket/TicketService";
import { Ticket, NewTicket } from "../model/Ticket";
import { USE_DB } from "../../settings";
import ITicketService from "../service/ticket/ITicketService";
import makeTicketDBService from "../service/ticket/TicketDBService";
import { UserLevel } from "../model/User";

let ticketService: ITicketService;
if (USE_DB) ticketService = makeTicketDBService();
else ticketService = makeTicketService();

export const ticketRouter = express.Router();

/*
 * req is the request object from express and res is the response object.
 * The Request object has three different types of parameters: path parameters, query parameters, and body parameters.
 * Path parameters are parameters that are part of the path of the request URL.
 * Query parameters are parameters that are part of the query string of the request URL.
 * Body parameters are parameters that are part of the body of the request.
 */
ticketRouter.get(
  "/",
  async (
    req: Request<{ open: string }, {}, {}>,
    res: Response<Array<Ticket> | String>
  ) => {
    if (!req.session.user) {
      res.status(401).send("You are not logged in");
      return;
    }
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
    res: Response<Ticket | string>
  ) => {
    if (!req.session.user) {
      res.status(401).send("You are not logged in");
      return;
    }
    try {
      const id = req.params.id;
      if (id.trim().length === 0) {
        res.status(400).send("Invalid id");
        return;
      }
      /*       
      // This piece of code below was used when the id was a number
      if (isNaN(id)) {
        res.status(400).send("Invalid id");
        return; 
      }
        */
      const ticket = await ticketService.getTicketById(id);
      if (ticket) {
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
    if (!req.session.user) {
      res.status(401).send("You are not logged in");
      return;
    }
    try {
      if (
        typeof req.body.title != "string" ||
        typeof req.body.description != "string"
      ) {
        res.status(400).send("Invalid request");
        return;
      }
      const newTicket: NewTicket = {
        title: req.body.title,
        description: req.body.description,
        authorId: req.session.user.id,
      };
      const ticket: Ticket = await ticketService.addNewTicket(newTicket);
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
    if (!req.session.user) {
      res.status(401).send("You are not logged in");
      return;
    }
    try {
      const id = req.params.id;
      if (id.trim().length === 0) {
        res.status(400).send("Invalid id");
        return;
      }
      // This piece of code below was used when the id was a number
      /*if (isNaN(id)) {
        res.status(400).send("Invalid id");
        return;
      } */
      let changedParams = 0;
      const ticket = await ticketService.getTicketById(id);
      if (!ticket) {
        res.status(404).send("Ticket not found");
        return;
      }
      if (
        req.session.user.id !== ticket.authorId ||
        req.session.user.level < UserLevel.ADMIN
      ) {
        // only the author or admin can edit the ticket
        res.status(403).send("You do not have permission to edit this ticket");
        return;
      }
      if (typeof req.body.title == "string") {
        ticket.title = req.body.title;
        changedParams++;
      }
      if (typeof req.body.description == "string") {
        ticket.description = req.body.description;
        changedParams++;
      }
      if (typeof req.body.open == "boolean") {
        ticket.open = req.body.open;
        changedParams++;
      }
      if (changedParams !== Object.keys(req.body).length) {
        res.status(400).send("Invalid request");
        return;
      }
      await ticketService.updateTicket(ticket);
      res.status(200).send(ticket);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
