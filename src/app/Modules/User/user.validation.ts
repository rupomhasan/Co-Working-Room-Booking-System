import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    phone: z
      .string()
      .length(11, { message: "Phone number must be exact 11 digits" }),
    email: z.string().email(),
    password: z.string(),
    address: z.string(),
    role: z.string().optional(),
  }),
});
