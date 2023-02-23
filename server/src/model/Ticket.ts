export interface Ticket {
  id: string;
  title: string;
  description: string;
  open: boolean;
  authorId: string;
  assigneeId?: string;
}

// creates a sub-interface of Ticket with id, open removed
export interface NewTicket extends Omit<Ticket, "id" | "open"> {}
