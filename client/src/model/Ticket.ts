export interface Ticket {
  id: string;
  title: string;
  description: string;
  open: boolean;
  authorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewTicket extends Omit<Ticket, 'id' | 'open' | 'authorId'> {}
