import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { HttpCode, MainAppError } from "./utlis/MainAppError";
import { errorHandlers } from "./utlis/OtherErrors";
import user from "./routers/userRouter";
import usage from "./routers/usageRouter";
import payment from "./routers/paymentRouter";
import cookieSession from "cookie-session";
import passport from "passport";
import "./controller/socialAuthController";
import social from "./routers/socialRouter";

export const mainApp = (app: Application) => {
  // call all neccessary middlewares for this app
  app
    .use(express.json())

    .use(cors({ origin: "*" }))

    .use(
      cookieSession({
        name: "session",
        keys: ["DOMRANKER"],
        maxAge: 2 * 60 * 60 * 100,
      }),
    )

    .use(function (req: any, res: any, next: any) {
      if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb: any) => {
          cb();
        };
      }
      if (req.session && !req.session.save) {
        req.session.save = (cb: any) => {
          cb();
        };
      }
      next();
    })
    .use(passport.initialize())
    .use(passport.session())

    //all routes
    .use("/api/user", user)
    .use("/api/usage", usage)
    .use("/", social)
    .use("/api/payment", payment)

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
