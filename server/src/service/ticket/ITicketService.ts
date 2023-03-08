import { Ticket, NewTicket } from "../../model/Ticket";
import { UserInfo } from "../../model/User";

export default interface ITicketService {
  getAllTickets(): Promise<Ticket[]>;
  getTicketById(id: string): Promise<Ticket>;
  getTicketsByAuthorId(id: string): Promise<Ticket[]>;
  getTicketsByAssigneeId(id: string): Promise<Ticket[]>;
  getTicketsByStatus(open: boolean): Promise<Ticket[]>;
  addNewTicket(ticket: NewTicket): Promise<Ticket>;
  updateTicket(user: UserInfo, ticket: Ticket): Promise<Ticket>;
  deleteTicketById(id: string): Promise<boolean>;
}
