import { Router } from "express";
import { RoomRoutes } from "../Modules/Room/room.route";

export const router = Router()

const moduleRoutes = [
    {
        path: '/rooms',
        route: RoomRoutes
    }
]

moduleRoutes.forEach((moduleRoute) => router.use(moduleRoute.path, moduleRoute.route))