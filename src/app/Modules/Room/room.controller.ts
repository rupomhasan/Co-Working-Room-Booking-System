import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { roomServices } from "./room.service";
import { query } from "express";

const crateRoom = catchAsync(async (req, res) => {
  const result = await roomServices.createRoomIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await roomServices.getAllRoomsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    result,
  });
});

const getRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomServices.getSingleRoomFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    result,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await roomServices.updateRoomInto(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    result,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomServices.deleteRoomFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room deleted successfully",
    result,
  });
});

export const roomControllers = {
  crateRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
