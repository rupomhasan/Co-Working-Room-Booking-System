"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const slot_validation_1 = require("./slot.validation");
const slot_controller_1 = require("./slot.controller");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)("admin"), (0, validationRequest_1.default)(slot_validation_1.slotValidation), slot_controller_1.slotControllers.crateSlot);
router.get("/availability", slot_controller_1.slotControllers.getSlots);
exports.SlotsRoutes = router;
