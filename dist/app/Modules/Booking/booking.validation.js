"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingValidationSchema = exports.bookingValidationSchema = void 0;
const zod_1 = require("zod");
exports.bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string(),
        slots: zod_1.z.array(zod_1.z.string()),
        user: zod_1.z.string(),
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            return regex.test(date);
        }, {
            message: "Invalid date format , expected YYYY-MM-DD",
        }),
    }),
});
exports.updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        isConfirmed: zod_1.z.string(),
    }),
});
