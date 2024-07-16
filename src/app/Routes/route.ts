import { Router } from "express";
import { RoomRoutes } from "../Modules/Room/room.route";
import { SlotsRoutes } from "../Modules/Slot/slot.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/slots",
    route: SlotsRoutes
  }
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);
