import { Ticket, NewTicket } from "../../model/Ticket";
import ITicketService from "./ITicketService";
import { ticketModel } from "../../db/ticket.db";
import { messageService } from "../services";
import { UserInfo, UserLevel } from "../../model/User";

/**
 * TicketDBService is a class that handles all the requests to the server
 * related to the tickets.
 */
class TicketDBService implements ITicketService {
  async getAllTickets(): Promise<Ticket[]> {
    return ticketModel.find().populate("owner");
  }
  async getTicketById(ticketId: string): Promise<Ticket> {
    const ticket = await ticketModel
      .findById(ticketId)
      .populate("owner")
      .exec();
    if (ticket) return ticket;
    throw new Error("Ticket not found");
  }
  async getTicketsByAuthorId(authorId: string): Promise<Ticket[]> {
    return await ticketModel.find({ owner: authorId }).populate("owner").exec();
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

    let createdTicket = await ticketModel.create({
      title: ticket.title,
      open: true,
      owner: ticket.owner,
    });
    createdTicket = await createdTicket.populate("owner"); // populate the owner field

    const systemMessage = {
      chatId: createdTicket.id,
      sender: createdTicket.owner.id,
      content: "created a ticket",
      systemMessage: true,
    };
    // send a system message saying that the ticket was created
    await messageService.sendMessage(systemMessage);

    // Request the message to be created in message service
    const message = {
      chatId: createdTicket.id,
      sender: createdTicket.owner.id,
      content: ticket.description,
      systemMessage: false,
    };
    await messageService.sendMessage(message);

    return createdTicket;
  }

  async updateTicket(user: UserInfo, ticket: Ticket): Promise<Ticket> {
    const canUserEditTicket = () => {
      if (user.level >= UserLevel.ADMIN) return true; // admins can edit any ticket
      if (user.id === ticket.owner.id) return true; // users can edit their own tickets
      return false;
    };
    if (!canUserEditTicket())
      throw new Error("You are not authorized to do this");

    const status = ticket.open;
    const updatedTicket = await ticketModel
      .findByIdAndUpdate(ticket.id, ticket)
      .populate("owner")
      .exec();
    if (!updatedTicket) throw new Error("Failed to update ticket");

    /*
     * This code below will send a system message if the ticket status changes
     */
    if (updatedTicket.open !== status) {
      const message = {
        chatId: updatedTicket.id,
        sender: user.id,
        content: `${status ? "opened" : "closed"} the ticket`,
        systemMessage: true,
      };
      // if the ticket status changes, send a system message
      await messageService.sendMessage(message);
    }

    return updatedTicket;
  }
  // should we check if the user is allowed to delete the ticket here or in the router?
  async deleteTicketById(ticketId: string): Promise<boolean> {
    const deletedTicket = await ticketModel.findByIdAndDelete(ticketId).exec();
    if (deletedTicket) return true;
    return false;
  }
}

export default function makeTicketDBService(): ITicketService {
  return new TicketDBService();
}
