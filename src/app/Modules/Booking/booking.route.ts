import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import validationRequest from "../../middleware/validationRequest";
import {
  bookingValidationSchema,
  updateBookingValidationSchema,
} from "./booking.validation";
import { auth } from "../../middleware/auth";

const router = Router();
const myRouter = Router();
router.post(
  "/",
  auth("user"),
  validationRequest(bookingValidationSchema),
  bookingControllers.createBooking,
);

router.get("/", auth("admin"), bookingControllers.getAllBookings);

router.put(
  "/:id",
  auth("admin"),
  validationRequest(updateBookingValidationSchema),
  bookingControllers.updateBooking,
);

router.delete("/:id", auth("admin"), bookingControllers.deleteBooking);

export const MyBooking = myRouter.get(
  "/",
  auth("user"),
  bookingControllers.findMyBooking,
);

export const BookingRoutes = router;
