import { conn } from '../../db/conn';
import { NewTicket } from '../../model/Ticket';
import {
  messageService,
  ticketService,
  userService,
} from '../../service/services';

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

afterAll(async () => {
  await conn.close();
});

test('A user should be able to send a message', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: `${user}`,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const message = {
    chatId: id,
    sender: user,
    content: 'test message',
    systemMessage: false,
  };
  await messageService.sendMessage(message);
  const messages = await messageService.getMessages(id);
  /*
   * When a ticket is created two messages are automatically created
   * So we expect the length to be 3 and the last message to be the one we sent
   */
  expect(messages.length).toBe(3);
  expect(messages[2].content).toBe('test message');
});

test('A user should be able to get a message', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: `${user}`,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const message = {
    chatId: id,
    sender: user,
    content: 'test message',
    systemMessage: false,
  };
  const { id: messageid } = await messageService.sendMessage(message);
  const message2 = await messageService.getMessage(messageid);
  expect(message2.content).toBe('test message');
});

test('A user should not be able to get a message that does not exist', async () => {
  await expect(
    messageService.getMessage('5e9b3d3d9c1c1b1d0c2e2f2c')
  ).rejects.toThrow('Message not found');
});

test('A user should be able to update a message', async () => {
  const { id: userid } = await userService.register('user', 'password');
  const user = (await userService.getUser(userid)).id;
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: `${user}`,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const message = {
    chatId: id,
    sender: user,
    content: 'test message',
    systemMessage: false,
  };
  const { id: messageid } = await messageService.sendMessage(message);
  await messageService.updateMessage(messageid, 'new message');
  const message2 = await messageService.getMessage(messageid);
  expect(message2.content).toBe('new message');
});

test('A user should not be able to update a message that does not exist', async () => {
  await expect(
    messageService.updateMessage('5e9b3d3d9c1c1b1d0c2e2f2c', 'new message')
  ).rejects.toThrow('Message not found');
});
