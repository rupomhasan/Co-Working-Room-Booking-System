class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number, stack?: any) {
    super(message);
    this.statusCode = statusCode;
    stack
      ? (this.stack = stack)
      : Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
