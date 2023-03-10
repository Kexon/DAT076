import { Ticket } from '../model/Ticket';
import { UserInfo } from '../model/User';

/**
 * These mock classes is used in the tests.
 */
export const MockUser: UserInfo = {
  id: '333',
  username: 'testuser',
  level: 1,
};

export const MockTicket: Ticket = {
  id: '666',
  title: 'Test Ticket',
  description: 'This is a test ticket',
  open: true,
  owner: MockUser,
};
