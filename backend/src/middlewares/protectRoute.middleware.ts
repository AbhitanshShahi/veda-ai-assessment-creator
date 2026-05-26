import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { UserModel } from "../models/users.model.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,

        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch {
    return res.status(401).json({
      success: false,

      message: "Invalid token",
    });
  }
};
