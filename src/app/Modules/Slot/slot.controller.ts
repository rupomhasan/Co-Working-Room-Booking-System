import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { slotService } from "./slot.service";

const crateSlot = catchAsync(async (req, res) => {
    const result = await slotService.createSlotIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Room added successfully",
        result,
    });
});

const getSlots = catchAsync(async (req, res) => {

    const result = await slotService.getSlots(req.query)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Available slots retrieved successfully",
        result,
    });

})


export const slotControllers = {
    crateSlot,
    getSlots
}