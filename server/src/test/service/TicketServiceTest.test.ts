import { conn } from '../../db/conn';
import { NewTicket, Ticket } from '../../model/Ticket';
import { ticketService, userService } from '../../service/services';

/*
 * Make sure to clear the database after each test
 * so that state from one test does not leak into another.
 */
afterEach(async () => {
  const collection = conn.collections;
  for (const key in collection) {
    const col = collection[key];
    await col.deleteMany({});
  }
});

test('If a ticket is created it should be found in the db', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: user,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const ticketFound = await ticketService.getTicketById(id);
  expect(ticketFound.title).toBe('test title');
  expect(ticketFound.owner.id).toBe(user);
});

test('A user should be able to get all tickets', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket1: NewTicket = {
    title: 'test ticket 1',
    description: 'test description 1',
    owner: user,
  };
  const ticket2: NewTicket = {
    title: 'test ticket 2',
    description: 'test description 2',
    owner: user,
  };
  const ticket3: NewTicket = {
    title: 'test ticket 3',
    description: 'test description 3',
    owner: user,
  };
  await ticketService.addNewTicket(ticket1);
  await ticketService.addNewTicket(ticket2);
  await ticketService.addNewTicket(ticket3);
  const tickets = await ticketService.getAllTickets();
  expect(tickets.length).toBe(3);
  expect(tickets[0].title).toBe('test ticket 1');
  expect(tickets[1].title).toBe('test ticket 2');
  expect(tickets[2].title).toBe('test ticket 3');
});

test('A user should be able to get all tickets by authorId', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket1: NewTicket = {
    title: 'test ticket 1',
    description: 'test description 1',
    owner: user,
  };
  const ticket2: NewTicket = {
    title: 'test ticket 2',
    description: 'test description 2',
    owner: user,
  };
  const ticket3: NewTicket = {
    title: 'test ticket 3',
    description: 'test description 3',
    owner: user,
  };
  await ticketService.addNewTicket(ticket1);
  await ticketService.addNewTicket(ticket2);
  await ticketService.addNewTicket(ticket3);
  const tickets = await ticketService.getTicketsByAuthorId(user);
  expect(tickets.length).toBe(3);
  expect(tickets[0].title).toBe('test ticket 1');
  expect(tickets[1].title).toBe('test ticket 2');
  expect(tickets[2].title).toBe('test ticket 3');
});

test('A user should be able to get all open tickets', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket1: NewTicket = {
    title: 'test ticket 1',
    description: 'test description 1',
    owner: user,
  };
  const ticket2: NewTicket = {
    title: 'test ticket 2',
    description: 'test description 2',
    owner: user,
  };
  const ticket3: NewTicket = {
    title: 'test ticket 3',
    description: 'test description 3',
    owner: user,
  };
  await ticketService.addNewTicket(ticket1);
  await ticketService.addNewTicket(ticket2);
  await ticketService.addNewTicket(ticket3);
  const tickets = await ticketService.getTicketsByStatus(true);
  expect(tickets.length).toBe(3);
  expect(tickets[0].title).toBe('test ticket 1');
  expect(tickets[1].title).toBe('test ticket 2');
  expect(tickets[2].title).toBe('test ticket 3');
});

test('A user should be able to get all closed tickets', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket1: NewTicket = {
    title: 'test ticket 1',
    description: 'test description 1',
    owner: user,
  };
  const ticket2: NewTicket = {
    title: 'test ticket 2',
    description: 'test description 2',
    owner: user,
  };
  const ticket3: NewTicket = {
    title: 'test ticket 3',
    description: 'test description 3',
    owner: user,
  };
  await ticketService.addNewTicket(ticket1);
  await ticketService.addNewTicket(ticket2);
  await ticketService.addNewTicket(ticket3);
  const tickets = await ticketService.getTicketsByStatus(false);
  expect(tickets.length).toBe(0);
});

test('A user should be able to delete a ticket', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: user,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const tickets_before = await ticketService.getAllTickets();
  expect(tickets_before.length).toBe(1);
  await ticketService.deleteTicketById(id);
  const tickets_after = await ticketService.getAllTickets();
  expect(tickets_after.length).toBe(0);
});

test('A user should not be able to delete a ticket that does not exist', async () => {
  expect(await ticketService.deleteTicketById('64022132132d81be5f8e9407')).toBe(
    false
  );
});

test('A user should be able to update a ticket', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = await userService.getUser(userid);
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: user.id,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const updatedTicket: Ticket = {
    id: id,
    title: 'test title updated',
    owner: user,
    open: true,
  };
  await ticketService.updateTicket(user, updatedTicket);
  const ticketFound = await ticketService.getTicketById(id);
  expect(ticketFound.title).toBe('test title updated');
});

test('A user should not be able to update someone else´s ticket', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = await userService.getUser(userid);
  const { id: userid2 } = await userService.register('other user', 'password');
  const otherUser = await userService.getUser(userid2);
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: user.id,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const updatedTicket: Ticket = {
    id: id,
    title: 'test title updated',
    owner: user,
    open: true,
  };
  await expect(
    ticketService.updateTicket(otherUser, updatedTicket)
  ).rejects.toThrow('You are not allowed to edit this ticket');
});

test('A user should be able to close a ticket', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = await userService.getUser(userid);
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: user.id,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const updatedTicket: Ticket = {
    id: id,
    title: 'test title',
    owner: user,
    open: false,
  };
  await ticketService.updateTicket(user, updatedTicket);
  const ticketFound = await ticketService.getTicketById(id);
  expect(ticketFound.open).toBe(false);
});
