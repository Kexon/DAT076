import { UserInfo } from "../model/User";

declare module "express-session" {
  // declare that all sessions has an optional user object
  // needed for typescript to recognize req.session.user
  interface SessionData {
    user?: UserInfo;
  }
}

export {};
