import { Response, Request, NextFunction } from "express";
import userModel from "../model/userModel";

export const asyncHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};


