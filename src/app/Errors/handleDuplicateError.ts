import {
  TErrorSource,
  TGenericErrorResponse,
} from "../Interface/error.interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];
  const errorSource: TErrorSource = [
    { path: "", message: `${extractedMessage} is already exists` },
  ];
  return {
    statusCode: 400,
    message: "DuplicateError",
    errorSource,
  };
};

export default handleDuplicateError;
