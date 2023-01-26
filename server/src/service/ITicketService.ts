import { Ticket, NewTicket } from "../model/Ticket";

export default interface ITicketService {
  getAllTickets(): Promise<Ticket[]>;
  getTicketById(id: number): Promise<Ticket[]>;
  getTicketsByAuthorId(id: number): Promise<Ticket[]>;
  getTicketsByAssigneeId(id: number): Promise<Ticket[]>;
  getTicketsByStatus(open: boolean): Promise<Ticket[]>;
  addNewTicket(ticket: NewTicket): Promise<Ticket>;
  updateTicket(ticket: Ticket): Promise<Ticket>;
  deleteTicketById(id: number): Promise<boolean>;
}
