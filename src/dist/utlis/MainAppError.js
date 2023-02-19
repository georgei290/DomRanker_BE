"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAppError = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["CONFLICT"] = 409] = "CONFLICT";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode = exports.HttpCode || (exports.HttpCode = {}));
class MainAppError extends Error {
    constructor(args) {
        super(args.message);
        this.isOperational = true;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name || "Error";
        this.httpCode = args.httpCode;
        // Check if is operational or developer error
        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }
        Error.captureStackTrace(this);
    }
}
exports.MainAppError = MainAppError;
