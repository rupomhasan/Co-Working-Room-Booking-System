"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", (0, validationRequest_1.default)(user_validation_1.userValidationSchema), auth_controller_1.authController.singUp);
router.post("/login", (0, validationRequest_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.authController.login);
exports.AuthRoutes = router;
