import type { Request, Response } from "express";

import bcrypt from "bcryptjs";

import { UserModel } from "../models/users.model.js";

import { signupSchema, loginSchema } from "../schemas/auth.schema.js";

import { generateToken } from "../lib/jwt.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const existingUser = await UserModel.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await UserModel.create({
      ...validatedData,

      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,

      secure: false,

      sameSite: "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        schoolName: user.schoolName,

        selectedClass: user.selectedClass,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await UserModel.findOne({
      email: validatedData.email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      validatedData.password,

      user.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,

      secure: false,

      sameSite: "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        schoolName: user.schoolName,

        selectedClass: user.selectedClass,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,

    message: "Logged out successfully",
  });
};

export const me = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,

    user: req.user,
  });
};
