import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB } from "./utlis/mongoDB";
import { mainApp } from "./mainApp";

dotenv.config();

const app: Application = express();

const port = process.env.PORT;

//calling database
connectDB();

//calling the mainApp file
mainApp(app);

// starting up server

const server = app.listen(port, () => {
	console.log("Let's do this...!");
});

// activating process call to access root app

process.on("uncaughtException", (err: Error) => {
	console.log(
		"an uncaughtException error was encountered, shutting down server!",
	);
	console.log(err.message);
	process.exit(1);
});

// caught any form of unhandled err and shut down server

process.on("unhandledRejection", (reason: any) => {
	console.log(reason);
	server.close(() => {
		process.exit(1);
	});
});
