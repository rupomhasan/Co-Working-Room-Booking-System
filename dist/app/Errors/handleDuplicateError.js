"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSource = [
        { path: "", message: `${extractedMessage} is already exists` },
    ];
    return {
        statusCode: 400,
        message: "DuplicateError",
        errorSource,
    };
};
exports.default = handleDuplicateError;
