import express, { NextFunction, Request, Response } from "express";
import { userData } from "../model/dataInterface";
import { asyncHandler } from "./handlers";

//function for creating creating
export const createUser = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    return res.status(201).json({
      message: "User has been created successfully...!",
    });
  },
);
