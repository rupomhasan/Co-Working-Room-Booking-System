import { Router } from "express";
import { RoomRoutes } from "../Modules/Room/room.route";
import { SlotsRoutes } from "../Modules/Slot/slot.route";
import { AuthRoutes } from "../Modules/Auth/auth.route";
import { BookingRoutes } from "../Modules/Booking/booking.route";
import { bookingControllers } from "../Modules/Booking/booking.controller";

export const router = Router();

const moduleRoutes = [
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/slots",
    route: SlotsRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/my-bookings",
    route: bookingControllers.findMyBooking,
  },
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);
