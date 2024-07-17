"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z
            .string()
            .length(11, { message: "Phone number must be exact 11 digits" }),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        address: zod_1.z.string(),
        role: zod_1.z.string().optional(),
    }),
});
