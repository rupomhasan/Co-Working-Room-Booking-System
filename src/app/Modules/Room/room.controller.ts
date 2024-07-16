import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { roomServices } from "./room.service";

const crateRoom = catchAsync(async (req, res) => {
  const result = await roomServices.createRoomIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await roomServices.getAllRoomsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

const getRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomServices.getSingleRoomFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    data: result,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await roomServices.updateRoomInto(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomServices.deleteRoomFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room deleted successfully",
    data: result,
  });
});

export const roomControllers = {
  crateRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
