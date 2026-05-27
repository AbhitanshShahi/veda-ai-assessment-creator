import type { User } from "../models/users.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
