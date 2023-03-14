import { UserInfo } from "./User";
export interface Ticket {
  id: string;
  title: string;
  open: boolean;
  owner: UserInfo;
  assigneeId?: string;
}

/**
 * NewTicket is a class that represents a new ticket that is sent to the server.
 * It is used to create a new ticket in the database, and does not contain the
 * id as this is generated on creation.
 *
 * New ticket also contains the description of the ticket, which is then used to
 * create the first message in the ticket.
 */
export interface NewTicket {
  title: string;
  owner: string; // id of the user
  description: string;
}
