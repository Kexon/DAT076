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
    const tickets = await ticketModel.find({ authorId: authorId }).exec();
    return tickets;
  }
  async getTicketsByAssigneeId(assigneeId: string): Promise<Ticket[]> {
    const tickets = await ticketModel.find({ assigneeId: assigneeId }).exec();
    return tickets;
  }
  async getTicketsByStatus(open: boolean): Promise<Ticket[]> {
    const tickets = await ticketModel.find({ open: open }).exec();
    return tickets;
  }
  async addNewTicket(ticket: NewTicket): Promise<Ticket> {
    const createdTicket = await ticketModel.create({ ...ticket, open: true });
    return {
      id: createdTicket._id.toString(),
      open: true,
      ...ticket,
    };
  }
  async updateTicket(ticket: Ticket): Promise<Ticket | undefined> {
    const updatedTicket = await ticketModel
      .findByIdAndUpdate(new ObjectId(ticket.id), ticket)
      .exec();
    if (updatedTicket) return updatedTicket;
    return undefined;
  }
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
