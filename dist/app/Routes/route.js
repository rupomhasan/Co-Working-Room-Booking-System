"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const room_route_1 = require("../Modules/Room/room.route");
const slot_route_1 = require("../Modules/Slot/slot.route");
const auth_route_1 = require("../Modules/Auth/auth.route");
const booking_route_1 = require("../Modules/Booking/booking.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/rooms",
        route: room_route_1.RoomRoutes,
    },
    {
        path: "/slots",
        route: slot_route_1.SlotsRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/my-bookings",
        route: booking_route_1.MyBooking,
    },
];
moduleRoutes.forEach((moduleRoute) => exports.router.use(moduleRoute.path, moduleRoute.route));
