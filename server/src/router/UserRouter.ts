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
