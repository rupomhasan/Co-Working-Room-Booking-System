import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBooking(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Booking crated successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const findMyBooking = catchAsync(async (req, res) => {
  const result = await bookingService.findMyBooking(req.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingService.updateBooking(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "booking updated successfully",
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingService.deleteBooking(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "booking deleted successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBookings,
  findMyBooking,
  updateBooking,
  deleteBooking,
};
