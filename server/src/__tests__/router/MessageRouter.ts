import { conn } from '../../db/conn';
import { app } from '../../start';

const session = require('supertest-session');

const testSession = session(app);

describe('MessageRouter when not logged in', () => {
  test('Should return 401 when trying to get a message', async () => {
    const res = await testSession.get('/message/1');
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to get a chat', async () => {
    const res = await testSession.get('/message/chat/1');
    expect(res.status).toBe(401);
  });

  test('Should return 401 when trying to POST a chat', async () => {
    const res = await testSession.post('/message/chat');
    expect(res.status).toBe(401);
  });
});

describe('MessageRouter when logged in', () => {
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
    // userid = res.body.id;
  });

  afterEach(async () => {
    const collection = conn.collections;
    let col = collection['messages'];
    await col.deleteMany({});
    col = collection['tickets'];
    await col.deleteMany({});
  });

  afterAll(async () => {
    const collection = conn.collections;
    for (const key in collection) {
      const col = collection[key];
      await col.deleteMany({});
    }
  });

  test('Test creating a ticket and verify that the second message is the description', async () => {
    const ticket = await testSession.post('/ticket').send({
      title: 'title',
      description: 'desc',
    });
    const chat = await testSession.get(`/message/chat/${ticket.body.id}`);
    expect(chat.body[1].content).toBe('desc'); // second message is the description, first is a system message
  });

  test('Invalid chat message should return error', async () => {
    const chat = await testSession.get('/message/zz');
    expect(chat.status).toBe(500);
  });

  test('Test getting a specific message by ID', async () => {
    const ticket = await testSession.post('/ticket').send({
      title: 'title',
      description: 'desc',
    });
    const chat = await testSession.get(`/message/chat/${ticket.body.id}`);
    const message = await testSession.get(`/message/${chat.body[1].id}`);
    expect(message.body.content).toBe('desc');
  });

  test('Test posting a message to a chat', async () => {
    const ticket = await testSession.post('/ticket').send({
      title: 'title',
      description: 'desc',
    });
    const chatId = ticket.body.id;
    const sentMessage = await testSession.post('/message/chat').send({
      chatId,
      content: 'test message',
    });
    const message = await testSession.get(`/message/${sentMessage.body.id}`);
    expect(message.body.content).toBe('test message');
  });
});
