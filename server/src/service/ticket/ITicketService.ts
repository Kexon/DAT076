import { Ticket, NewTicket } from "../../model/Ticket";

export default interface ITicketService {
  getAllTickets(): Promise<Ticket[]>;
  getTicketById(id: string): Promise<Ticket | undefined>;
  getTicketsByAuthorId(id: string): Promise<Ticket[]>;
  getTicketsByAssigneeId(id: string): Promise<Ticket[]>;
  getTicketsByStatus(open: boolean): Promise<Ticket[]>;
  addNewTicket(ticket: NewTicket): Promise<Ticket>;
  updateTicket(ticket: Ticket): Promise<Ticket | undefined>;
  deleteTicketById(id: string): Promise<boolean>;
}
