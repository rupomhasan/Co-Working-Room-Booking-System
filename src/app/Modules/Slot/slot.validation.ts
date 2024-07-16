import { z } from "zod";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected  "HH:MM" in 24 hours format ',
  },
);

const createSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string(),
      date: z.string().refine(
        (date) => {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return regex.test(date);
        },
        {
          message: "Invalid date format , expected YYYY-MM-DD",
        },
      ),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`2024-01-01T${body.startTime}:00`);
        const end = new Date(`2024-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: "Start time should be before end time",
      },
    ),
});

export const slotValidation = createSlotValidationSchema;
