import TRoom from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async (payload: TRoom) => {
  const { roomNo, floorNo } = payload;
  const isRoomExist = await Room.findOne({ floorNo, roomNo });

  if (isRoomExist)
    throw Error("Room already exist with this floor number and room number");
  const result = await Room.create([payload], { new: true });

  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findOne({ id, isDeleted: false });
  return result;
};

const updateRoomInto = async (id: string, payload: Partial<TRoom>) => {
  const result = await Room.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};
export const roomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomsFromDB,
  updateRoomInto,
  deleteRoomFromDB,
};
