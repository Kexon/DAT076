import { Ticket, NewTicket } from "../../model/Ticket";
import ITicketService from "./ITicketService";
import { v4 as uuidv4 } from "uuid";

class TicketService implements ITicketService {
  tickets: Array<Ticket> = [];

  async getAllTickets(): Promise<Ticket[]> {
    return this.tickets;
  }

  /*/
   *  This method returns a single ticket wrapped in an array.
   *  If it cannot find a ticket with the given id, it returns an empty array.
   */
  async getTicketById(ticketId: string): Promise<Ticket | undefined> {
    const foundTicket = this.tickets.find((ticket) => ticket.id === ticketId);
    if (foundTicket) {
      return foundTicket;
    }

    return undefined;
  }
  async getTicketsByAuthorId(authorId: string): Promise<Ticket[]> {
    return this.tickets.filter((ticket) => ticket.authorId === authorId);
  }
  async getTicketsByAssigneeId(assigneeId: string): Promise<Ticket[]> {
    return this.tickets.filter((ticket) => ticket.assigneeId === assigneeId);
  }
  async getTicketsByStatus(open: boolean): Promise<Ticket[]> {
    return this.tickets.filter((ticket) => ticket.open === open);
  }
  async addNewTicket(ticket: NewTicket): Promise<Ticket> {
    const newTicket: Ticket = {
      id: uuidv4(),
      open: true,
      ...ticket,
    };
    this.tickets.push(newTicket);
    return newTicket;
  }
  async updateTicket(ticket: Ticket): Promise<Ticket> {
    const index = this.tickets.findIndex((ticket) => ticket.id === ticket.id);
    this.tickets[index] = ticket;
    return ticket;
  }
  async deleteTicketById(ticketId: string): Promise<boolean> {
    const index = this.tickets.findIndex((t) => t.id === ticketId);
    this.tickets.splice(index, 1);
    return true;
  }
}

export default function makeTicketService(): ITicketService {
  return new TicketService();
}
