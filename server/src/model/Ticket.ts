export interface Ticket {
  id: number;
  title: string;
  description: string;
  open: boolean;
  authorId: number;
  assigneeId?: number;
}

// creates a sub-interface of Ticket with id, open removed
export interface NewTicket extends Omit<Ticket, "id" | "open"> {}
