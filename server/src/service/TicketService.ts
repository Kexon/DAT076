import { Ticket, NewTicket } from "../model/Ticket";
import ITicketService from "./ITicketService";

class TicketService implements ITicketService {
  tickets: Array<Ticket> = [];

  async getAllTickets(): Promise<Ticket[]> {
    return this.tickets;
  }

  /*/
   *  This method returns a single ticket wrapped in an array.
   *  If it cannot find a ticket with the given id, it returns an empty array.
   */
  async getTicketById(id: number): Promise<Ticket[]> {
    const ticket: Array<Ticket> = [];
    const foundTicket = this.tickets.find((ticket) => ticket.id === id);

    if (foundTicket) {
      ticket.push(foundTicket);
    }

    return ticket;
  }
  async getTicketsByAuthorId(id: number): Promise<Ticket[]> {
    return this.tickets.filter((ticket) => ticket.authorId === id);
  }
  async getTicketsByAssigneeId(id: number): Promise<Ticket[]> {
    return this.tickets.filter((ticket) => ticket.assigneeId === id);
  }
  async getTicketsByStatus(open: boolean): Promise<Ticket[]> {
    return this.tickets.filter((ticket) => ticket.open === open);
  }
  async addNewTicket(ticket: NewTicket): Promise<Ticket> {
    const newTicket: Ticket = {
      id: Date.now(),
      open: true,
      ...ticket,
    };
    this.tickets.push(newTicket);
    return newTicket;
  }
  async updateTicket(ticket: Ticket): Promise<Ticket> {
    const index = this.tickets.findIndex((t) => t.id === ticket.id);
    this.tickets[index] = ticket;
    return ticket;
  }
  async deleteTicketById(id: number): Promise<boolean> {
    const index = this.tickets.findIndex((t) => t.id === id);
    this.tickets.splice(index, 1);
    return true;
  }
}

export default function makeTicketService(): ITicketService {
  return new TicketService();
}
