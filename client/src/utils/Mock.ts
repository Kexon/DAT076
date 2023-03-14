import Message from '../model/Message';
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

export const MockMessage: Message = {
  id: '777',
  content: 'This is a test message',
  chatId: '666',
  timestamp: '2020-01-01T00:00:00.000Z',
  sender: MockUser,
  systemMessage: false,
};
