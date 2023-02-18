import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { HttpCode, MainAppError } from "./utlis/MainAppError";
import { errorHandlers } from "./utlis/OtherErrors";
import user from "./routers/userRouter";
import usage from "./routers/usageRouter";

import os from "os";
import axios from "axios";

export const mainApp = (app: Application) => {
  // call all neccessary middles for this app
  app
    .use(express.json())

    .use(cors({ origin: "*" }))

    //all routes
    .use("/api/user", user)
    .use("/api/usage", usage)
    .use("/get", async (req, res) => {
      await axios
        .get(
          "https://ipgeolocation.abstractapi.com/v1/?api_key=13d114e76253410796c509c40729459b",
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })

    .get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Welcome to a world of Possibility...!",
        });
      } catch (error) {
        console.log(error);
      }
    })

    //calling program error handles
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new MainAppError({
          message: `This route ${req.originalUrl} does not exist`,
          httpCode: HttpCode.NOT_FOUND,
          isOperational: true,
        }),
      );
    })

    // error handlers caused by users or client
    .use(errorHandlers);
};
