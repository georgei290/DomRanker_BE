"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlers = void 0;
const MainAppError_1 = require("./MainAppError");
const devErrorHandler = (err, res) => {
    res.status(MainAppError_1.HttpCode.INTERNAL_SERVER_ERROR).json({
        status: err.httpCode,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const errorHandlers = (err, req, res, next) => {
    devErrorHandler(err, res);
};
exports.errorHandlers = errorHandlers;
