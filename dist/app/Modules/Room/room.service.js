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
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomServices = void 0;
const room_model_1 = require("./room.model");
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomNo, floorNo } = payload;
    const isRoomExist = yield room_model_1.Room.findOne({ floorNo, roomNo });
    if (isRoomExist)
        throw Error("Room already exist with this floor number and room number");
    const result = yield room_model_1.Room.create([payload], { new: true });
    return result;
});
const getAllRoomsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.find({ isDeleted: false });
    return result;
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findOne({ id, isDeleted: false });
    return result;
});
const updateRoomInto = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.roomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomsFromDB,
    updateRoomInto,
    deleteRoomFromDB,
};
