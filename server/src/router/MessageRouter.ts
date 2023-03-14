import express, { Request, Response } from 'express';
import { Message } from '../model/Message';
import { messageService } from '../service/services';

export const messageRouter = express.Router();

/*
 * req is the request object from express and res is the response object.
 * The Request object has three different types of parameters: path parameters, query parameters, and body parameters.
 * Path parameters are parameters that are part of the path of the request URL.
 * Query parameters are parameters that are part of the query string of the request URL.
 * Body parameters are parameters that are part of the body of the request.
 */
messageRouter.get(
  '/chat/:chatId',
  async (
    req: Request<{ chatId: string }, {}, {}>,
    res: Response<Message[] | String>
  ) => {
    const chatId = req.params.chatId;
    if (!req.session.user) {
      res.status(401).send('You are not logged in');
      return;
    }
    try {
      const messages = await messageService.getMessages(chatId);
      res.status(200).send(messages);
    } catch (e: any) {
      res.status(404).send(e.message);
    }
  }
);

messageRouter.get(
  '/:id',
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<Message | String>
  ) => {
    if (!req.session.user) {
      res.status(401).send('You are not logged in');
      return;
    }
    try {
      const message = await messageService.getMessage(req.params.id);
      res.status(200).send(message);
    } catch (e: any) {
      if (e.message === 'Message not found') {
        res.status(404).send(e.message);
      } else {
        res.status(500).send(e.message);
      }
      return;
    }
  }
);

messageRouter.post(
  '/chat',
  async (
    req: Request<{}, {}, { chatId: string; content: string }>,
    res: Response<Message | String>
  ) => {
    const chatId = req.body.chatId;
    const content = req.body.content;
    if (!req.session.user) {
      res.status(401).send('You are not logged in');
      return;
    } else if (typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).send('Invalid chat content');
      return;
    }

    // Get author id from session, so we can associate the message with the author
    const authorId = req.session.user?.id;

    try {
      const message = {
        chatId,
        sender: authorId,
        content,
        systemMessage: false,
      };
      const ticket = await messageService.sendMessage(message);
      res.status(201).send(ticket);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
