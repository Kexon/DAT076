import { conn } from '../../db/conn';
import { app } from '../../start';

const session = require('supertest-session');

const testSession = session(app);

let userid: string;

describe('TicketRouter when not logged in', () => {
  test('Should return 401 when trying to get tickets', async () => {
    const res = await testSession.get('/ticket');
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to post a ticket', async () => {
    const res = await testSession.post('/ticket').send({
      title: 'title',
      description: 'desc',
    });
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to get a ticket', async () => {
    const res = await testSession.get('/ticket/1');
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to update a ticket', async () => {
    const res = await testSession.patch('/ticket/1');
    expect(res.status).toBe(401);
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

  afterEach(async () => {
    const collection = conn.collections;
    const col = collection['tickets'];
    await col.deleteMany({});
  });

  afterAll(async () => {
    const collection = conn.collections;
    for (const key in collection) {
      const col = collection[key];
      await col.deleteMany({});
    }
  });

  test('Should return 200 when trying to access /tickets', async () => {
    const res = await testSession.get('/ticket');
    expect(res.status).toBe(200);
  });

  test('A ticket should be posted with correct title and description', async () => {
    const res = await testSession
      .post('/ticket')
      .send({ title: 'title', description: 'desc' });
    expect(res.status).toEqual(201);
    expect(res.body.title).toBe('title');
    expect(res.body.owner.username).toBe('test user');
  });

  test('It should be possible to get tickets by authorId', async () => {
    await testSession.post('/ticket').send({
      title: 'title test ticket',
      description: 'desc',
    });
    const res = await testSession.get(`/ticket?authorId=${userid}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('title test ticket');
  });

  test('It should be possible to get a ticket by id', async () => {
    const res = await testSession.post('/ticket').send({
      title: 'title test ticket',
      description: 'desc',
    });
    const id = res.body.id;
    const res2 = await testSession.get(`/ticket/${id}`);
    expect(res2.status).toBe(200);
    expect(res2.body.title).toBe('title test ticket');
  });

  test('It should be possible to update a ticket', async () => {
    const res = await testSession.post('/ticket').send({
      title: 'title test ticket',
      description: 'desc',
    });
    const id = res.body.id;
    const res2 = await testSession.patch(`/ticket/${id}`).send({
      title: 'updated title',
    });
    expect(res2.status).toBe(200);
    expect(res2.body.title).toBe('updated title');
  });
});
