export interface Ticket {
  id: number;
  title: string;
  description: string;
  open: boolean;
  authorId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewTicket extends Omit<Ticket, 'id' | 'open'> {}
