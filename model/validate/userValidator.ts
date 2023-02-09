import userSchema from "./userSchema";
import { RequestHandler, Request, Response, NextFunction } from "express";
import validator from "./validate";

// creating the input Validation middleware functions

export const registerValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validator(userSchema.registerUser, req.body, next);
};

export const loginValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validator(userSchema.loginUser, req.body, next);
};
