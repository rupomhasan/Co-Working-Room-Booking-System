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
exports.bookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = __importDefault(require("../../Errors/AppErrors"));
const room_model_1 = require("../Room/room.model");
const user_model_1 = require("../User/user.model");
const slot_model_1 = require("../Slot/slot.model");
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("./booking.model");
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { room, user, slots } = payload;
    const isUserExist = yield user_model_1.User.findById(user);
    const isRoomExist = yield room_model_1.Room.findById(room);
    if (!isUserExist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "User is not found");
    }
    if (!isRoomExist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Room is not found");
    }
    yield Promise.all(slots.map((slotId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(slotId)) {
            throw new AppErrors_1.default(http_status_1.default.BAD_REQUEST, "Invalid slot ID");
        }
        const slot = yield slot_model_1.Slot.findById(slotId);
        if (!slot) {
            throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, `Slot with ID ${slotId} not found`);
        }
        const isSlotBooked = yield booking_model_1.Booking.findOne({ slots: { $in: slotId } });
        if (isSlotBooked)
            throw new AppErrors_1.default(http_status_1.default.BAD_REQUEST, "this slot id is already exist");
        return slot;
    })));
    payload.totalAmount = isRoomExist.pricePerSlot * slots.length;
    const result = (yield (yield (yield booking_model_1.Booking.create(payload)).populate("room")).populate("user")).populate(["slots"]);
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ isDeleted: false })
        .populate("room")
        .populate(["slots"])
        .populate("user");
    return result;
});
const findMyBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: id });
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(id);
    if (!booking) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Booking is not found");
    }
    if (booking.isDeleted) {
        throw new AppErrors_1.default(http_status_1.default.BAD_REQUEST, "This booking already deleted");
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(id);
    if (!booking) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Booking is not found");
    }
    if (booking.isDeleted) {
        throw new AppErrors_1.default(http_status_1.default.BAD_REQUEST, "This booking is already deleted");
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.bookingService = {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking,
    findMyBooking,
};
