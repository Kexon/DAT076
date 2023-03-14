import { conn } from '../../db/conn';
import { userService } from '../../service/services';
import { NewUser, UserLevel } from '../../model/User';
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

test('If a user is registered it should found in the db', async () => {
  const { id: id } = await userService.register('test123', 'test');
  const user = await userService.getUser(id);
  expect(user.username).toBe('test123');
});

test('A registered user should be able to login', async () => {
  await userService.register('user123', 'test');
  const user = await userService.login('user123', 'test');
  expect(user.username).toBe('user123');
});

test('All registered users should be found in the db', async () => {
  await userService.register('user1', 'password');
  await userService.register('user2', 'password');
  await userService.register('user3', 'password');
  const users = await userService.getAllUsers({
    // this method requires a super admin
    id: '1',
    username: 'mockadmin',
    level: UserLevel.SUPER_ADMIN,
  });
  expect(users.length).toBe(3);
  expect(users[0].username).toBe('user1');
  expect(users[1].username).toBe('user2');
  expect(users[2].username).toBe('user3');
});

test('No users should be found in the db', async () => {
  const users = await userService.getAllUsers({
    id: '1',
    username: 'mockadmin',
    level: UserLevel.SUPER_ADMIN,
  });
  expect(users.length).toBe(0);
});

test('A user should not be able to login with an incorrect password', async () => {
  await userService.register('user123', 'test');
  await expect(userService.login('user123', 'wrongPassword')).rejects.toThrow(
    'Invalid username or password'
  );
});

test('A user should be able to update their password', async () => {
  const { id: id } = await userService.register('test123', 'test');
  await userService.changePassword(id, id, 'newPassword', 'test');
  expect(await userService.login('test123', 'newPassword')).toBeTruthy();
});

test('A user should not be able to update their password with an incorrect current password', async () => {
  const { id: id } = await userService.register('test123', 'test');
  await expect(
    userService.changePassword(id, id, 'newPassword', 'wrongPassword')
  ).rejects.toThrow('Failed to change password');
});

test('A super admin should be able to update another users password', async () => {
  const super_admin: NewUser = {
    username: 'super_admin',
    password: 'password',
    level: UserLevel.SUPER_ADMIN,
  };
  const superAdminId = (
    await conn.collection('users').insertOne(super_admin)
  ).insertedId.toString();
  const { id: userId } = await userService.register('user', 'password');
  await userService.changePassword(
    superAdminId,
    userId,
    'newPassword',
    'password'
  );
  expect(await userService.login('user', 'newPassword')).toBeTruthy();
});

test('A super admin should be able to set a users user level', async () => {
  const superAdmin: NewUser = {
    username: 'super_admin',
    password: 'password',
    level: UserLevel.SUPER_ADMIN,
  };
  const superAdminId = (
    await conn.collection('users').insertOne(superAdmin)
  ).insertedId.toString();

  const { id: userId } = await userService.register('user', 'password');
  await userService.setUserLevel(superAdminId, userId, UserLevel.ADMIN);
  const user = await userService.getUser(userId);
  expect(user.level).toBe(UserLevel.ADMIN);
});
