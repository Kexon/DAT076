import { Ticket, NewTicket } from "../../model/Ticket";
import ITicketService from "./ITicketService";
import { ticketModel } from "../../db/ticket.db";
import { ObjectId } from "mongodb";

class TicketDBService implements ITicketService {
  async getAllTickets(): Promise<Ticket[]> {
    return ticketModel.find();
  }
  async getTicketById(ticketId: string): Promise<Ticket | undefined> {
    const ticket = await ticketModel.findById(new ObjectId(ticketId)).exec();
    if (ticket) return ticket;
    return undefined;
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
    return await ticketModel.create({ ...ticket, open: true });
  }

  // should we check if the user is allowed to update the ticket here or in the router?
  async updateTicket(ticket: Ticket): Promise<Ticket | undefined> {
    const updatedTicket = await ticketModel
      .findByIdAndUpdate(new ObjectId(ticket.id), ticket)
      .exec();
    if (updatedTicket) return updatedTicket;
    return undefined;
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
