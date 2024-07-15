import express from "express";
import validationRequest from "../../middleware/validationRequest";
import { roomValidations } from "./room.validation";
import { roomControllers } from "./room.controller";
const router = express.Router();

router.post(
  "/",
  validationRequest(roomValidations.createRoomValidationSchema),
  roomControllers.crateRoom,
);
router.get("/", roomControllers.getAllRooms);
router.get("/:id", roomControllers.getRoom);
router.put(
  "/:id",
  validationRequest(roomValidations.updateRoomValidationSchema),
  roomControllers.updateRoom,
);
router.delete("/:id", roomControllers.deleteRoom);

export const RoomRoutes = router;
