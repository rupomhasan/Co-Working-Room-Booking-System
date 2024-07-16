import httpStatus from "http-status";
import AppError from "../../Errors/AppErrors";
import { Room } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { slotFunction } from "./slot.utils";

const createSlotIntoDB = async (payload: TSlot) => {
  const { room } = payload;

  const isRoomExist = await Room.findById(room);

  if (!isRoomExist)
    throw new AppError(httpStatus.NOT_FOUND, "Room is not found ");

  const slots = slotFunction(payload);

  const result = await Slot.create(slots);
  return result;
};

const getSlots = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {};
  const { roomId, date } = query;
  if (roomId) {
    filter.room = roomId;
  }
  if (date) {
    filter.date = date;
  }

  const result = await Slot.find(filter).populate("room");

  return result;
};

export const slotService = {
  createSlotIntoDB,
  getSlots,
};
