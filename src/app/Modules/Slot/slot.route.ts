import { Router } from "express";
import validationRequest from "../../middleware/validationRequest";
import { slotValidation } from "./slot.validation";
import { slotControllers } from "./slot.controller";

const router = Router()


router.post('/', validationRequest(slotValidation), slotControllers.crateSlot)

router.get("/availability" , slotControllers.getSlots)
export const SlotsRoutes = router;