import { conn } from '../../db/conn';
import { userService } from '../../service/services';

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

test('If a user is registered it should found in the db', async () => {
  const { id: id } = await userService.register('test123', 'test');
  const user = await userService.getUser(id);
  expect(user.username).toBe('test123');
});
