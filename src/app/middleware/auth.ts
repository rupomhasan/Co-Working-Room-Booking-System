import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../Modules/User/user.interface";
import catchAsync from "../Utils/catchAsync";
import AppError from "../Errors/AppErrors";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../Modules/User/user.model";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.access_token as string,
    ) as JwtPayload;

    const { role, id } = decoded;
    const user = await User.findById(id);

    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User is not found");
    if (!requiredRoles.includes(role))
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route",
      );
    req.id = id;

    next();
  });
};
