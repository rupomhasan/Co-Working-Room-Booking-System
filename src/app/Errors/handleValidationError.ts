import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../Interface/error.interface";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {

    const errorSource: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.CastError | mongoose.Error.ValidatorError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSource
    }

}

export default handleValidationError