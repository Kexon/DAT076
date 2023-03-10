import { UserInfo } from './User';

/**
 * Ticket model
 * @property {string} id - Ticket id
 * @property {string} title - Ticket title
 * @property {string} description - Ticket description
 * @property {boolean} open - Ticket open status
 * @property {UserInfo} owner - Ticket owner
 */
export interface Ticket {
  id: string;
  title: string;
  description: string;
  open: boolean;
  owner: UserInfo;
}

/**
 * New ticket model
 * This model omits the id, open and owner properties
 * because they are not needed when creating a new ticket
 * @property {string} title - Ticket title
 * @property {string} description - Ticket description
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewTicket extends Omit<Ticket, 'id' | 'open' | 'owner'> {}
