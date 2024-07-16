import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "email is must required" }),
    password: z.string(),
  }),
});
