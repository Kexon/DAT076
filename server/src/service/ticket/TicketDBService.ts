import { Ticket, NewTicket } from "../../model/Ticket";
import ITicketService from "./ITicketService";
import { ticketModel } from "../../db/ticket.db";
import { ObjectId } from "mongodb";
import { messageService } from "../services";

class TicketDBService implements ITicketService {
  async getAllTickets(): Promise<Ticket[]> {
    return ticketModel.find().populate("owner");
  }
  async getTicketById(ticketId: string): Promise<Ticket> {
    const ticket = await ticketModel
      .findById(new ObjectId(ticketId))
      .populate("owner")
      .exec();
    if (ticket) return ticket;
    throw new Error("Ticket not found");
  }
  async getTicketsByAuthorId(authorId: string): Promise<Ticket[]> {
    return await ticketModel
      .find({ owner: new ObjectId(authorId) })
      .populate("owner")
      .exec();
  }
  async getTicketsByAssigneeId(assigneeId: string): Promise<Ticket[]> {
    return await ticketModel
      .find({ assigneeId: assigneeId })
      .populate("owner")
      .exec();
  }
  async getTicketsByStatus(open: boolean): Promise<Ticket[]> {
    return await ticketModel.find({ open: open }).populate("owner").exec();
  }
  async addNewTicket(ticket: NewTicket): Promise<Ticket> {
    // Create the ticket in DB
    const createdTicket = await ticketModel.create({
      title: ticket.title,
      open: true,
      owner: ticket.owner,
    });

    const message = {
      chatId: createdTicket.id,
      sender: createdTicket.owner.id,
      content: "created a ticket",
      systemMessage: true,
    };

    // send a system message saying that the ticket was created
    messageService.sendMessage(message);
    return createdTicket;
  }

  // should we check if the user is allowed to update the ticket here or in the router?
  async updateTicket(ticket: Ticket): Promise<Ticket> {
    const status = ticket.open;
    const updatedTicket = await ticketModel
      .findByIdAndUpdate(new ObjectId(ticket.id), ticket)
      .populate("owner")
      .exec();
    if (!updatedTicket) throw new Error("Failed to update ticket");
    if (updatedTicket.open !== status) {
      const message = {
        chatId: updatedTicket.id,
        sender: updatedTicket.owner.id,
        content: `${status ? "opened" : "closed"} a ticket`,
        systemMessage: true,
      };
      // if the ticket status changes, send a system message
      messageService.sendMessage(message);
    }

    throw new Error("Ticket not found");
  }
  // should we check if the user is allowed to delete the ticket here or in the router?
  async deleteTicketById(ticketId: string): Promise<boolean> {
    const deletedTicket = await ticketModel
      .findByIdAndDelete(new ObjectId(ticketId))
      .exec();
    if (deletedTicket) return true;
    return false;
  }
}

export default function makeTicketDBService(): ITicketService {
  return new TicketDBService();
}
