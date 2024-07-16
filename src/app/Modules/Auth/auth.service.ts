import { isPasswordMatched } from "./auth.utils";
import httpStatus from "http-status";
import AppError from "../../Errors/AppErrors";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLogin } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const signUp = async (payload: TUser) => {
  const { email } = payload;

  const user = await User.findOne({ email });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const result = await User.create([payload], { new: true });

  return result;
};
const login = async (payload: TLogin) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const passwordMatched = await isPasswordMatched(password, user.password);

  if (!passwordMatched) throw new Error("Password not matched");

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.access_token as string, {
    expiresIn: "1d",
  });

  return { accessToken, user };
};

export const authService = {
  signUp,
  login,
};
