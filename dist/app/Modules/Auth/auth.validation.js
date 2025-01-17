"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "email is must required" }),
        password: zod_1.z.string(),
    }),
});
