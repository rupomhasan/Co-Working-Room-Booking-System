"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../Errors/handleZodError"));
const AppErrors_1 = __importDefault(require("../Errors/AppErrors"));
const handleValidationError_1 = __importDefault(require("../Errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../Errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../Errors/handleDuplicateError"));
const globalErrorHandler = (err, req, res) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errorSource = [
        {
            path: "",
            message,
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
    }
    if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        message = simplifiedError.message;
    }
    if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        errorSource = simplifiedError.errorSource;
    }
    if (err instanceof AppErrors_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
