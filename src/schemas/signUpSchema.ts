import { z } from "zod";

export const usernameValidation = z
  .string()
  .max(20, "Username too long")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
});
