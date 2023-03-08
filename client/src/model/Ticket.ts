import { UserInfo } from './User';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  open: boolean;
  owner: UserInfo;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewTicket extends Omit<Ticket, 'id' | 'open' | 'owner'> {}
