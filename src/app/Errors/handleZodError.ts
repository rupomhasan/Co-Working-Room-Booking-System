import { ZodError, ZodIssue } from "zod";
import {
    TErrorSource,
    TGenericErrorResponse,
} from "../Interface/error.interface";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });

    const statusCode = 400;
    return {
        statusCode,
        message: "Zod validation error",
        errorSource,

    };
};
export default handleZodError;
