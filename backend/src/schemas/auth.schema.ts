import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2),

  email: z.email(),

  password: z.string().min(6),

  schoolName: z.string().min(2),

  selectedClass: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(6),
});
