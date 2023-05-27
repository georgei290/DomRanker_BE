declare module "*nodemailer";
declare module "*bcrypt";
declare module "*jsonwebtoken";
declare module "*ejs";
declare module "*multer";
declare module "*crypto";
declare module "*cors";
declare module "*path";
declare module "*express";
declare module "*session";
declare module "*cloudinary";
declare module "*dotenv";
declare module "*mongoose";
declare module "*flutterwave-node-v3";
declare module "*validator/lib/isEmail";
declare module "*passport";
declare module "*passport-google-oauth20";

declare module "nodemailer" {
	interface TransportOptions {
		service?: string;
		auth: {
			type?: any;
			accessToken?: any;
			user?: any;
			refreshToken?: any;
			clientId?: any;
			clientSecret?: any;
			accessToken?: any;
		};
	}

	function createTransport(
		transport: TransportOptions | string,
		defaults?: TransportOptions,
	): Transporter;
}
