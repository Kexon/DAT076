export interface Ticket {
  id: string;
  title: string;
  open: boolean;
  authorId: string;
  assigneeId?: string;
}

export interface NewTicket {
  title: string;
  authorId: string;
  description: string;
}
