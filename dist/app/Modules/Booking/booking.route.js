"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = exports.MyBooking = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const booking_validation_1 = require("./booking.validation");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
const myRouter = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)("user"), (0, validationRequest_1.default)(booking_validation_1.bookingValidationSchema), booking_controller_1.bookingControllers.createBooking);
router.get("/", (0, auth_1.auth)("admin"), booking_controller_1.bookingControllers.getAllBookings);
router.put("/:id", (0, auth_1.auth)("admin"), (0, validationRequest_1.default)(booking_validation_1.updateBookingValidationSchema), booking_controller_1.bookingControllers.updateBooking);
router.delete("/:id", (0, auth_1.auth)("admin"), booking_controller_1.bookingControllers.deleteBooking);
exports.MyBooking = myRouter.get("/", (0, auth_1.auth)("user"), booking_controller_1.bookingControllers.findMyBooking);
exports.BookingRoutes = router;
