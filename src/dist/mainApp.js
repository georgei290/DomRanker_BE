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
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
require("./controller/socialAuthController");
const socialRouter_1 = __importDefault(require("./routers/socialRouter"));
const mainApp = (app) => {
    // call all neccessary middlewares for this app
    app
        .use(express_1.default.json())
        .use((0, cors_1.default)({ origin: "*" }))
        .use((0, cookie_session_1.default)({
        name: "session",
        keys: ["DOMRANKER"],
        maxAge: 2 * 60 * 60 * 100,
    }))
        .use(function (req, res, next) {
        if (req.session && !req.session.regenerate) {
            req.session.regenerate = (cb) => {
                cb();
            };
        }
        if (req.session && !req.session.save) {
            req.session.save = (cb) => {
                cb();
            };
        }
        next();
    })
        .use(passport_1.default.initialize())
        .use(passport_1.default.session())
        //all routes
        .use("/api/user", userRouter_1.default)
        .use("/api/usage", usageRouter_1.default)
        .use("/", socialRouter_1.default)
        .use("/api/payment", paymentRouter_1.default)
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
