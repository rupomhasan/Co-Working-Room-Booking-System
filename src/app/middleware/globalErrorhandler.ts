import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../Errors/handleZodError";
import { TErrorSource } from "../Interface/error.interface";
import AppError from "../Errors/AppErrors";
import handleValidationError from "../Errors/handleValidationError";
import handleCastError from "../Errors/handleCastError";
import handleDuplicateError from "../Errors/handleDuplicateError";

export const globalErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next,
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errorSource: TErrorSource = [
        {
            path: "",
            message,
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSource = simplifiedError?.errorSource);
    }
    if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSource = simplifiedError?.errorSource);
    }
    if (err.name === "CastError") {
        const simplifiedError = handleCastError(err);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSource = simplifiedError?.errorSource);
    }

    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        (statusCode = simplifiedError?.statusCode),
            (message = simplifiedError?.message),
            (errorSource = simplifiedError?.errorSource);
    }
    if (err instanceof AppError) {
        statusCode = err.statusCode,
            message = err.message

    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        err,
    });
};
