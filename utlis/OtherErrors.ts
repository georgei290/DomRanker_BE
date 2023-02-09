import { Request, Response, NextFunction } from "express";
import { HttpCode, MainAppError } from "./MainAppError";

const devErrorHandler = (err: MainAppError, res: Response) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: err.httpCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const errorHandlers = (
  err: MainAppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  devErrorHandler(err, res);
};
