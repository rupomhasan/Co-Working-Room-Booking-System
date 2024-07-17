import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { authService } from "./auth.service";

const singUp = catchAsync(async (req, res) => {
  const result = await authService.signUp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { accessToken, user } = await authService.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `${user.role} logged in successfully`,
    token: accessToken,
    data: user,
  });
});

export const authController = {
  singUp,
  login,
};
