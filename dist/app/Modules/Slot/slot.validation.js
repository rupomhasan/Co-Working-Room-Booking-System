"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotValidation = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
}, {
    message: 'Invalid time format , expected  "HH:MM" in 24 hours format ',
});
const createSlotValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        room: zod_1.z.string(),
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            return regex.test(date);
        }, {
            message: "Invalid date format , expected YYYY-MM-DD",
        }),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    })
        .refine((body) => {
        const start = new Date(`2024-01-01T${body.startTime}:00`);
        const end = new Date(`2024-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: "Start time should be before end time",
    }),
});
exports.slotValidation = createSlotValidationSchema;
