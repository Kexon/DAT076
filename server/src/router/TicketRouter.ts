import express, { Request, Response } from "express";
import { Ticket, NewTicket } from "../model/Ticket";

import { UserLevel } from "../model/User";
import { ticketService } from "../service/services";

export const ticketRouter = express.Router();

/*
 * req is the request object from express and res is the response object.
 * The Request object has three different types of parameters: path parameters, query parameters, and body parameters.
 * Path parameters are parameters that are part of the path of the request URL.
 * Query parameters are parameters that are part of the query string of the request URL.
 * Body parameters are parameters that are part of the body of the request.
 */
ticketRouter.get(
  "",
  async (req: Request<{}, {}, {}>, res: Response<Array<Ticket> | String>) => {
    if (!req.session.user) {
      res.status(401).send("You are not logged in");
      return;
    }

    try {
      if (Object.keys(req.query).length === 0) {
        const tickets = await ticketService.getAllTickets();
        res.status(200).send(tickets);
      } else {
        const authorId = req.query.authorId;
        if (typeof authorId != "string") {
          res.status(400).send("Invalid request");
          return;
        }
        const tickets = await ticketService.getTicketsByAuthorId(authorId);
        res.status(200).send(tickets);
      }
    } catch (e: any) {
      res.status(500).send(e.message);
      return;
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
    const id = req.params.id;
    if (id.trim().length === 0) {
      res.status(400).send("Invalid id");
      return;
    }
    try {
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
      owner: req.session.user.id,
    };
    try {
      const ticket = await ticketService.addNewTicket(newTicket);
      res.status(201).send(ticket);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

ticketRouter.patch(
  "/:id",
  async (
    req: Request<{ id: string }, {}, { title?: string; open?: boolean }>,
    res: Response<Ticket | string>
  ) => {
    if (!req.session.user) {
      res.status(401).send("You are not logged in");
      return;
    }
    const id = req.params.id;
    if (id.trim().length === 0) {
      res.status(400).send("Invalid id");
      return;
    }
    let changedParams = 0;
    try {
      const ticket = await ticketService.getTicketById(id);
      if (typeof req.body.title == "string") {
        ticket.title = req.body.title;
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
      await ticketService.updateTicket(req.session.user, ticket);
      res.status(200).send(ticket);
    } catch (e: any) {
      if (e.message === "You are not allowed to edit this ticket") {
        res.status(403).send(e.message);
      }
      res.status(500).send(e.message);
    }
  }
);
