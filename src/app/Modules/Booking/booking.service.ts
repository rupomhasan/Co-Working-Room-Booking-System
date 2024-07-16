import httpStatus from "http-status";
import AppError from "../../Errors/AppErrors";
import { Room } from "../Room/room.model";
import { TBooking } from "./booking.interface";
import { User } from "../User/user.model";
import { Slot } from "../Slot/slot.model";
import mongoose from "mongoose";
import { Booking } from "./booking.model";

const createBooking = async (payload: TBooking) => {
  const { room, user, slots } = payload;
  const isUserExist = await User.findById(user);
  const isRoomExist = await Room.findById(room);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found");
  }

  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Room is not found");
  }
  await Promise.all(
    slots.map(async (slotId) => {
      if (!mongoose.Types.ObjectId.isValid(slotId)) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid slot ID");
      }
      const slot = await Slot.findById(slotId);
      if (!slot) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Slot with ID ${slotId} not found`,
        );
      }

      return slot;
    }),
  );
  payload.totalAmount = isRoomExist.pricePerSlot * slots.length;

  const result = (
    await (
      await (await Booking.create(payload)).populate("room")
    ).populate("user")
  ).populate(["slots"]);
  return result;
};
const getAllBookings = async () => {
  const result = await Booking.find({ isDeleted: false })
    .populate("room")
    .populate(["slots"])
    .populate("user");
  return result;
};

const findMyBooking = async () => {
  return;
};

const updateBooking = async (id: string, payload: Partial<TBooking>) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking is not found");
  }
  if (booking.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This booking already deleted");
  }

  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });

  return result;
};
const deleteBooking = async (id: string) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking is not found");
  }
  if (booking.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This booking is already deleted",
    );
  }
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  findMyBooking,
};
