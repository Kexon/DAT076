import express, { Request, Response } from "express";
import makeUserService from "../service/user/UserService";
import { UserInfo } from "../model/User";

interface UserRequest {
  username: string;
  password: string;
}

const userService = makeUserService();
export const userRouter = express.Router();

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
  const user = await userService.getUser(req.session.user?.id || "");
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
    res: Response<UserInfo | string>
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
      req.body.newPassword,
      req.body.currentPassword
    );
    if (!updatedUser) {
      res.status(401).send("Wrong password entered");
      return;
    } else {
      req.session.user = updatedUser;
      res.status(200).send("Password successfully changed.");
      return;
    }
  }
);
