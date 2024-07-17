"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const room_validation_1 = require("./room.validation");
const room_controller_1 = require("./room.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("admin"), (0, validationRequest_1.default)(room_validation_1.roomValidations.createRoomValidationSchema), room_controller_1.roomControllers.crateRoom);
router.get("/", room_controller_1.roomControllers.getAllRooms);
router.get("/:id", room_controller_1.roomControllers.getRoom);
router.put("/:id", (0, auth_1.auth)("admin"), (0, validationRequest_1.default)(room_validation_1.roomValidations.updateRoomValidationSchema), room_controller_1.roomControllers.updateRoom);
router.delete("/:id", (0, auth_1.auth)("admin"), room_controller_1.roomControllers.deleteRoom);
exports.RoomRoutes = router;
