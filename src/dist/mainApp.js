"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const MainAppError_1 = require("./utlis/MainAppError");
const OtherErrors_1 = require("./utlis/OtherErrors");
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const usageRouter_1 = __importDefault(require("./routers/usageRouter"));
const paymentRouter_1 = __importDefault(require("./routers/paymentRouter"));
const mainApp = (app) => {
    // call all neccessary middles for this app
    app
        .use(express_1.default.json())
        .use((0, cors_1.default)({ origin: "*" }))
        //all routes
        .use("/api/user", userRouter_1.default)
        .use("/api/usage", usageRouter_1.default)
        .use("/api/payment", paymentRouter_1.default)
        .use("/", (req, res) => {
        return res.status(200).json({
            message: "Let's do this...!",
        });
    })
        .get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Welcome to a world of Possibility...!",
            });
        }
        catch (error) {
            console.log(error);
        }
    })
        //calling program error handles
        .all("*", (req, res, next) => {
        next(new MainAppError_1.MainAppError({
            message: `This route ${req.originalUrl} does not exist`,
            httpCode: MainAppError_1.HttpCode.NOT_FOUND,
            isOperational: true,
        }));
    })
        // error handlers caused by users or client
        .use(OtherErrors_1.errorHandlers);
};
exports.mainApp = mainApp;
