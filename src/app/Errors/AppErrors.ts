class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string, stack?: any) {
    super(message);
    this.statusCode = statusCode;
    stack
      ? (this.stack = stack)
      : Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
