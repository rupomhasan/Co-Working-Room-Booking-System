"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = __importDefault(require("../../Errors/AppErrors"));
const room_model_1 = require("../Room/room.model");
const slot_model_1 = require("./slot.model");
const slot_utils_1 = require("./slot.utils");
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { room } = payload;
    const isRoomExist = yield room_model_1.Room.findById(room);
    if (!isRoomExist)
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Room is not found ");
    const slots = (0, slot_utils_1.slotFunction)(payload);
    const result = yield slot_model_1.Slot.create(slots);
    return result;
});
const getSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const { roomId, date } = query;
    if (roomId) {
        filter.room = roomId;
    }
    if (date) {
        filter.date = date;
    }
    const result = yield slot_model_1.Slot.find(filter).populate("room");
    return result;
});
exports.slotService = {
    createSlotIntoDB,
    getSlots,
};
