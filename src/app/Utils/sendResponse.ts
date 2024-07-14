import { Response } from "express";

type TResponse<T> = {
    statusCode: number,
    success: boolean,
    message: string,
    result: T
}
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        result: data.result,
    });
};
