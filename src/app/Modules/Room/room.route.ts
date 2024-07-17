import express from "express";
import validationRequest from "../../middleware/validationRequest";
import { roomValidations } from "./room.validation";
import { roomControllers } from "./room.controller";
import { auth } from "../../middleware/auth";
const router = express.Router();

router.post(
  "/",
  auth("admin"),
  validationRequest(roomValidations.createRoomValidationSchema),
  roomControllers.crateRoom,
);
router.get("/", roomControllers.getAllRooms);
router.get("/:id", roomControllers.getRoom);
router.put(
  "/:id",
  auth("admin"),
  validationRequest(roomValidations.updateRoomValidationSchema),
  roomControllers.updateRoom,
);
router.delete("/:id", auth("admin"), roomControllers.deleteRoom);

export const RoomRoutes = router;
