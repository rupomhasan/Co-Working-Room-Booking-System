import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import validationRequest from "../../middleware/validationRequest";
import {
  bookingValidationSchema,
  updateBookingValidationSchema,
} from "./booking.validation";

const router = Router();

router.post(
  "/",
  validationRequest(bookingValidationSchema),
  bookingControllers.createBooking,
);

router.get("/", bookingControllers.getAllBookings);

router.put(
  "/:id",
  validationRequest(updateBookingValidationSchema),
  bookingControllers.updateBooking,
);

router.delete("/:id", bookingControllers.deleteBooking);
export const BookingRoutes = router;
