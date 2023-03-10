import { conn } from '../../db/conn';
import { NewTicket } from '../../model/Ticket';
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
  const user = await (await userService.getUser(userid)).id;
  const ticket: NewTicket = {
    title: 'test title',
    description: 'test description',
    owner: `${user}`,
  };
  const { id } = await ticketService.addNewTicket(ticket);
  const ticketFound = await ticketService.getTicketById(id);
  expect(ticketFound.title).toBe('test title');
  expect(ticketFound.owner.id).toBe(`${user}`);
});
