import { z } from "zod";

export const bookingValidationSchema = z.object({
  body: z.object({
    room: z.string(),
    slots: z.array(z.string()),
    user: z.string(),
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
      },
      {
        message: "Invalid date format , expected YYYY-MM-DD",
      },
    ),
  }),
});

export const updateBookingValidationSchema = z.object({
  body: z.object({
    isConfirmed: z.string(),
  }),
});
