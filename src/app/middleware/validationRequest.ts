import { AnyZodObject } from "zod";
import catchAsync from "../Utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validationRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const parseBody = await schema.parseAsync({
            body: req.body,
        });
        req.body = parseBody.body
        next();
    })
}


export default validationRequest