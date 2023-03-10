import express, { Request, Response } from "express";
import { UserInfo, UserLevel } from "../model/User";
import { userService } from "../service/services";

interface UserRequest {
  username: string;
  password: string;
}

export const userRouter = express.Router();

userRouter.get("/all", async (req, res: Response<UserInfo[] | string>) => {
  if (!req.session.user) {
    res.status(401).send("You are not logged in");
    return;
  }
  if (req.session.user.level < UserLevel.ADMIN) {
    res.status(401).send("You are not authorized to do this");
    return;
  }

  const users = await userService.getAllUsers();
  if (!users) {
    res.status(401).send(`Failed to get users`);
    return;
  }
  res.status(201).send(users);
  return;
});

userRouter.get(
  "/:id",
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<UserInfo | string>
  ) => {
    // TODO: This only checks if the user is logged in, not if the user is the same as the one requested
    // We most likely want to check if the user is admin or the same user
    if (!req.session.user) {
      res.status(401).send("You are not logged in");
      return;
    }
    const user = await userService.getUser(req.params.id);
    if (!user) {
      res.status(401).send("User does not exist");
      return;
    }
    res.status(201).send(user);
    return;
  }
);

userRouter.get("/", async (req, res: Response<UserInfo | string>) => {
  if (!req.session.user) {
    res.status(401).send("You are not logged in");
    return;
  }
  const user = await userService.getUser(req.session.user.id);
  if (!user) {
    res.status(401).send(`Failed to get user`);
    return;
  }
  res.status(201).send(user);
  return;
});

/*
 * Some security flaws:
 * We don't check if the user is logged in
 *  Password and username can be empty
 */
userRouter.post(
  "/",
  async (
    req: Request<{}, {}, UserRequest>,
    res: Response<UserInfo | string>
  ) => {
    if (typeof req.body.username !== "string") {
      res
        .status(400)
        .send(
          `Bad POST call to ${
            req.originalUrl
          } --- username has type ${typeof req.body.username}`
        );
      return;
    }

    if (typeof req.body.password !== "string") {
      res
        .status(400)
        .send(
          `Bad POST call to ${
            req.originalUrl
          } --- password has type ${typeof req.body.password}`
        );
      return;
    }

    const user = await userService.register(
      req.body.username,
      req.body.password
    );
    if (!user) {
      res
        .status(409)
        .send(`User with username ${req.body.username} already exists`);
      return;
    }
    req.session.user = user;
    res.status(201).send(user);
    return;
  }
);

/*
 * Some security flaws:
 * We don't check if the user is logged in
 */
userRouter.post("/login", async (req, res: Response<UserInfo | string>) => {
  if (typeof req.body.username !== "string") {
    res
      .status(400)
      .send(
        `Bad POST call to ${req.originalUrl} --- username has type ${typeof req
          .body.username}`
      );
    return;
  }

  if (typeof req.body.password !== "string") {
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
    res.status(401).send("Wrong username or password");
    return;
  }
});

/*
 * Some security flaws: You can enter the same password as the current password
 * Password can be empty
 */
userRouter.patch(
  "/", // The endpoint can be /password or /changepassword
  async (
    req: Request<{}, {}, { newPassword: string; currentPassword: string }>,
    res: Response<string>
  ) => {
    if (!req.session.user) {
      res
        .status(401)
        .send(`Authentication failed. Please log in to change your password.`);
      return;
    }

    if (typeof req.body.newPassword !== "string") {
      res
        .status(400)
        .send(
          `Bad PATCH call to ${
            req.originalUrl
          } --- new password has type ${typeof req.body.newPassword}`
        );
      return;
    }

    if (typeof req.body.currentPassword !== "string") {
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
      res.status(401).send("Wrong password entered");
      return;
    } else {
      res.status(200).send("Password successfully changed.");
      return;
    }
  }
);

userRouter.patch(
  "/:id",
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
      res.status(401).send(`Authentication failed.`);
      return;
    }
    if (!req.body.newPassword && !req.body.level) {
      // user is required to change either password or level
      res.status(400).send(`Bad PATCH call to ${req.originalUrl}`);
      return;
    }
    let user = await userService.getUser(req.params.id);
    if (!user) {
      res.status(401).send(`User does not exist`);
      return;
    }
    if (req.body.newPassword) {
      const updatedUser = await userService.changePassword(
        req.session.user.id,
        req.params.id,
        req.body.newPassword
      );
      if (!updatedUser) {
        res.status(401).send("Failed to change password");
        return;
      }
    }
    if (req.body.level) {
      const success = await userService.setUserLevel(
        req.session.id,
        user.id,
        req.body.level
      );
      if (!success) {
        res.status(401).send("Failed to change user level");
        return;
      }
      user.level = req.body.level;
    }
    res
      .status(200)
      .send({ id: user.id, username: user.username, level: user.level });
  }
);

userRouter.post("/logout", async (req, res: Response<string>) => {
  if (!req.session.user) {
    res.status(401).send("You are not logged in");
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Failed to log out");
      return;
    }
    res.status(200).send("Successfully logged out");
    return;
  });
});
