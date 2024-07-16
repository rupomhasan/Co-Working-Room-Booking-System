import mongoose from "mongoose";
import {
  TErrorSource,
  TGenericErrorResponse,
} from "../Interface/error.interface";

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  return {
    statusCode: 400,
    message: "CastError",
    errorSource,
  };
};
export default handleCastError;
