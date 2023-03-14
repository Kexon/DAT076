import { conn } from '../../src/db/conn';
import { NewUser, UserLevel } from '../../src/model/User';
import { app } from '../../src/start';

const session = require('supertest-session');

const testSession = session(app);

let userid: string;

describe('TicketRouter when not logged in', () => {
  afterEach(async () => {
    const collection = conn.collections;
    const col = collection['users'];
    await col.deleteMany({});
  });

  test('Should return 401 when trying to get user', async () => {
    const res = await testSession.get('/user');
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to logout', async () => {
    const res = await testSession.post('/user/logout');
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to get a user by id', async () => {
    const res = await testSession.get('/user/1');
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to get all users', async () => {
    const res = await testSession.get('/user/all');
    expect(res.status).toBe(401);
  });

  test('Should return 400 when trying to register with invalid username', async () => {
    const res = await testSession.post('/user').send({
      username: 123,
      password: 'password',
    });
    expect(res.status).toBe(400);
  });

  test('Should return 201 when registering a user', async () => {
    const res = await testSession.post('/user').send({
      username: 'test user',
      password: 'password',
    });
    expect(res.status).toBe(201);
  });

  test('Should not be possible to register a user with the same username', async () => {
    const res = await testSession.post('/user').send({
      username: 'test user',
      password: 'password',
    });
    expect(res.status).toBe(201);
    const res2 = await testSession.post('/user').send({
      username: 'test user',
      password: 'password',
    });
    expect(res2.status).toBe(409);
  });
});

describe('TicketRouter when logged in', () => {
  beforeAll(async () => {
    await testSession
      .post('/user')
      .send({
        username: 'test user',
        password: 'password',
      })
      .expect(201);
    await testSession
      .post('/user/login')
      .send({
        username: 'test user',
        password: 'password',
      })
      .expect(200);

    const res = await testSession.get('/user');
    expect(res.status).toBe(200);
    userid = res.body.id;
  });

  afterAll(async () => {
    const collection = conn.collections;
    for (const key in collection) {
      const col = collection[key];
      await col.deleteMany({});
    }
  });

  test('Should be possible to get user', async () => {
    const res = await testSession.get('/user');
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('test user');
  });

  test('Should be possible for a user to update their password', async () => {
    const res = await testSession
      .patch('/user')
      .send({ newPassword: 'newPassword', currentPassword: 'password' });
    expect(res.status).toBe(200);
  });

  test('Should be possible to logout', async () => {
    const res = await testSession.post('/user/logout');
    expect(res.status).toBe(200);
  });

  test('Should be possible for a super admin to update a users password', async () => {
    const superAdmin: NewUser = {
      username: 'super_admin',
      password: 'password',
      level: UserLevel.SUPER_ADMIN,
    };
    await conn.collection('users').insertOne(superAdmin);
    await testSession.post('/user/login').send({
      username: 'super_admin',
      password: 'password',
    });

    const res = await testSession
      .patch(`/user/${userid}`)
      .send({ newPassword: 'newPassword' });
    expect(res.status).toBe(200);
    const collection = conn.collections;
    const col = collection['users'];
    await col.deleteOne({ username: 'super_admin' });
  });

  test('Should be possible for a super admin to get all users', async () => {
    const superAdmin: NewUser = {
      username: 'super_admin',
      password: 'password',
      level: UserLevel.SUPER_ADMIN,
    };
    await conn.collection('users').insertOne(superAdmin);
    await testSession.post('/user/login').send({
      username: 'super_admin',
      password: 'password',
    });

    const res = await testSession.get('/user/all');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    const collection = conn.collections;
    const col = collection['users'];
    await col.deleteOne({ username: 'super_admin' });
  });

  test('Should be possible for a super admin to get a user by id', async () => {
    const superAdmin: NewUser = {
      username: 'super_admin',
      password: 'password',
      level: UserLevel.SUPER_ADMIN,
    };
    await conn.collection('users').insertOne(superAdmin);
    await testSession.post('/user/login').send({
      username: 'super_admin',
      password: 'password',
    });
    const res = await testSession.get(`/user/${userid}`);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('test user');
    const collection = conn.collections;
    const col = collection['users'];
    await col.deleteOne({ username: 'super_admin' });
  });

  test('Should return 404 if user is not found', async () => {
    const res = await testSession.get('/user/63fdc1567000eb60806e718d');
    expect(res.status).toBe(404);
  });
});
