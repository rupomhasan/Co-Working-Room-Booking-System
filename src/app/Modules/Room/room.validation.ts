import { z } from "zod";

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number(),
    floorNo: z.number(),
    capacity: z.number(),
    pricePerSlot: z.number(),
    amenities: z.array(z.string()),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().optional(),
    capacity: z.number().optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string()).optional(),
  }),
});
export const roomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
