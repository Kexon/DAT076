import { Ticket } from '../model/Ticket';

const MockUser = {
  id: '333',
  username: 'testuser',
  password: 'testpassword',
  level: 1,
};

const MockTicket: Ticket = {
  id: '666',
  title: 'Test Ticket',
  description: 'This is a test ticket',
  open: true,
  owner: MockUser,
};

export default MockTicket;
