import express, { Request, Response } from 'express';
import { UserInfo, UserLevel } from '../model/User';
import { userService } from '../service/services';

interface UserRequest {
  username: string;
  password: string;
}

export const userRouter = express.Router();

userRouter.get('/all', async (req, res: Response<UserInfo[] | string>) => {
  if (!req.session.user) {
    res.status(401).send('You are not logged in');
    return;
  }
  const users = await userService.getAllUsers(req.session.user);
  if (!users) {
    res.status(401).send(`Failed to get users`);
    return;
  }
  res.status(200).send(users);
  return;
});

userRouter.get(
  '/:id',
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<UserInfo | string>
  ) => {
    if (!req.session.user) {
      res.status(401).send('You are not logged in');
      return;
    }
    try {
      const user = await userService.getUser(req.params.id);
      res.status(200).send(user);
      return;
    } catch (e: any) {
      if (e.message === 'User not found') {
        res.status(404).send(e.message);
        return;
      }
      res.status(500).send(e.message);
      return;
    }
  }
);

userRouter.get('/', async (req, res: Response<UserInfo | string>) => {
  if (!req.session.user) {
    res.status(401).send('You are not logged in');
    return;
  }
  try {
    const user = await userService.getUser(req.session.user.id);
    res.status(200).send(user);
    return;
  } catch (e: any) {
    res.status(500).send(e.message);
    return;
  }
});

/*
 * Some security flaws:
 * We don't check if the user is logged in
 *  Password and username can be empty
 */
userRouter.post(
  '/',
  async (
    req: Request<{}, {}, UserRequest>,
    res: Response<UserInfo | string>
  ) => {
    if (typeof req.body.username !== 'string') {
      res
        .status(400)
        .send(
          `Bad POST call to ${
            req.originalUrl
          } --- username has type ${typeof req.body.username}`
        );
      return;
    }

    if (typeof req.body.password !== 'string') {
      res
        .status(400)
        .send(
          `Bad POST call to ${
            req.originalUrl
          } --- password has type ${typeof req.body.password}`
        );
      return;
    }

    try {
      const user = await userService.register(
        req.body.username,
        req.body.password
      );
      req.session.user = user;
      res.status(201).send(user);
      return;
    } catch (e: any) {
      if (e.message === 'Username already exists') {
        res.status(409).send(e.message);
      } else {
        res.status(500).send(e.message);
      }
      return;
    }
  }
);

/*
 * Some security flaws:
 * We don't check if the user is logged in
 */
userRouter.post('/login', async (req, res: Response<UserInfo | string>) => {
  if (typeof req.body.username !== 'string') {
    res
      .status(400)
      .send(
        `Bad POST call to ${req.originalUrl} --- username has type ${typeof req
          .body.username}`
      );
    return;
  }

  if (typeof req.body.password !== 'string') {
    res
      .status(400)
      .send(
        `Bad POST call to ${req.originalUrl} --- password has type ${typeof req
          .body.password}`
      );
    return;
  }
  const user = await userService.login(req.body.username, req.body.password);
  if (user) {
    req.session.user = user;
    res.status(200).send(user);
    return;
  } else {
    res.status(401).send('Wrong username or password');
    return;
  }
});

/*
 * Some security flaws: You can enter the same password as the current password
 * Password can be empty
 */
userRouter.patch(
  '/', // The endpoint can be /password or /changepassword
  async (
    req: Request<{}, {}, { newPassword: string; currentPassword: string }>,
    res: Response<string>
  ) => {
    if (!req.session.user) {
      res.status(401).send('You are not logged in');
      return;
    }

    if (typeof req.body.newPassword !== 'string') {
      res
        .status(400)
        .send(
          `Bad PATCH call to ${
            req.originalUrl
          } --- new password has type ${typeof req.body.newPassword}`
        );
      return;
    }

    if (typeof req.body.currentPassword !== 'string') {
      res
        .status(400)
        .send(
          `Bad PATCH call to ${
            req.originalUrl
          } --- current password has type ${typeof req.body.currentPassword}`
        );
      return;
    }
    const user = req.session.user;
    const updatedUser = await userService.changePassword(
      user.id,
      user.id,
      req.body.newPassword,
      req.body.currentPassword
    );
    if (!updatedUser) {
      res.status(401).send('Wrong password entered');
      return;
    } else {
      res.status(200).send('Password successfully changed.');
      return;
    }
  }
);

userRouter.patch(
  '/:id',
  async (
    req: Request<
      { id: string },
      {},
      { newPassword?: string; level?: UserLevel }
    >,
    res: Response<UserInfo | string>
  ) => {
    if (!req.session.user || req.session.user.level !== UserLevel.SUPER_ADMIN) {
      // only super admins are allowed to use this endpoint
      res.status(401).send('You are not allowed to perform this operation');
      return;
    }
    if (!req.body.newPassword && !req.body.level) {
      // user is required to change either password or level
      res.status(400).send(`Bad PATCH call to ${req.originalUrl}`);
      return;
    }
    try {
      let user = await userService.getUser(req.params.id);
      if (req.body.newPassword) {
        const updatedUser = await userService.changePassword(
          req.session.user.id,
          req.params.id,
          req.body.newPassword
        );
        if (!updatedUser) {
          res.status(401).send('Failed to change password');
          return;
        }
      }
      if (req.body.level) {
        await userService.setUserLevel(req.session.id, user.id, req.body.level);
        user.level = req.body.level;
      }
      res
        .status(200)
        .send({ id: user.id, username: user.username, level: user.level });
    } catch (e: any) {
      res.status(500).send(`Caught error: ${e.message}`);
    }
  }
);

userRouter.post('/logout', async (req, res: Response<string>) => {
  if (!req.session.user) {
    res.status(401).send('You are not logged in');
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Failed to log out');
      return;
    }
    res.status(200).send('Successfully logged out');
    return;
  });
});
