import { Ticket, NewTicket } from "../../model/Ticket";
import ITicketService from "./ITicketService";
import { ticketModel } from "../../db/ticket.db";
import { ObjectId } from "mongodb";
import { messageService } from "../services";

class TicketDBService implements ITicketService {
  async getAllTickets(): Promise<Ticket[]> {
    return ticketModel.find();
  }
  async getTicketById(ticketId: string): Promise<Ticket> {
    const ticket = await ticketModel.findById(new ObjectId(ticketId)).exec();
    if (ticket) return ticket;
    throw new Error("Ticket not found");
  }
  async getTicketsByAuthorId(authorId: string): Promise<Ticket[]> {
    return await ticketModel.find({ authorId: authorId }).exec();
  }
  async getTicketsByAssigneeId(assigneeId: string): Promise<Ticket[]> {
    return await ticketModel.find({ assigneeId: assigneeId }).exec();
  }
  async getTicketsByStatus(open: boolean): Promise<Ticket[]> {
    return await ticketModel.find({ open: open }).exec();
  }
  async addNewTicket(ticket: NewTicket): Promise<Ticket> {
    // Create the ticket in DB
    const createdTicket = await ticketModel.create({
      title: ticket.title,
      open: true,
      authorId: ticket.authorId,
    });

    // Request the message to be created in message service
    messageService.sendMessage(
      createdTicket.id,
      ticket.authorId,
      ticket.description
    );
    return createdTicket;
  }

  // should we check if the user is allowed to update the ticket here or in the router?
  async updateTicket(ticket: Ticket): Promise<Ticket> {
    const updatedTicket = await ticketModel
      .findByIdAndUpdate(new ObjectId(ticket.id), ticket)
      .exec();
    if (updatedTicket) return updatedTicket;
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
