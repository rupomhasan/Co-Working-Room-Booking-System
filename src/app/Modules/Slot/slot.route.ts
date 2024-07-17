import { Router } from "express";
import validationRequest from "../../middleware/validationRequest";
import { slotValidation } from "./slot.validation";
import { slotControllers } from "./slot.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validationRequest(slotValidation),
  slotControllers.crateSlot,
);

router.get("/availability", slotControllers.getSlots);
export const SlotsRoutes = router;
