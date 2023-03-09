"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoDB_1 = require("./utlis/mongoDB");
const mainApp_1 = require("./mainApp");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
//calling database
(0, mongoDB_1.connectDB)();
//calling the mainApp file
(0, mainApp_1.mainApp)(app);
// starting up server
const server = app.listen(port, () => {
    console.log("Let's do this...!");
});
// activating process call to access root app
process.on("uncaughtException", (err) => {
    console.log("an uncaughtException error was encountered, shutting down server!");
    console.log(err.message);
    process.exit(1);
});
// caught any form of unhandled err and shut down server
process.on("unhandledRejection", (reason) => {
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
