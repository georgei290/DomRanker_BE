"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPResponse = exports.activatePlan = void 0;
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const userModel_1 = __importDefault(require("../model/userModel"));
const handlers_1 = require("./handlers");
const email_1 = require("../utlis/email");
dotenv_1.default.config();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)
const flw = new flutterwave_node_v3_1.default(process.env.FLW_PUBLIC_KEY_TEST, process.env.FLW_SECRET_KEY_TEST);
//  Generating the OTP that would be sent to the 
const getOTP = Math.floor(100000 + Math.random() * 900000);
let reCallCharge;
exports.activatePlan = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   getting users card input
        const { card_number, cvv, expiry_month, expiry_year, amount, pin } = req.body;
        const user = yield userModel_1.default.findById(req.params.id);
        // Building the neccessary payload for flutterwave geteway consumption
        const payload = {
            card_number,
            cvv,
            expiry_month,
            expiry_year,
            currency: "NGN",
            amount,
            redirect_url: "https://www.google.com",
            fullname: user === null || user === void 0 ? void 0 : user.fullName,
            email: user === null || user === void 0 ? void 0 : user.email,
            phone_number: user === null || user === void 0 ? void 0 : user.phone,
            enckey: process.env.FLW_ENCRYPTION_KEY_TEST,
            tx_ref: (0, uuid_1.v4)(),
        };
        console.log(getOTP);
        const response = yield flw.Charge.card(payload);
        console.log("Getting the Response: ");
        // Authorizing transactions
        // For PIN transactions
        if (response.meta.authorization.mode === "pin") {
            let payload2 = payload;
            payload2.authorization = {
                mode: "pin",
                fields: ["pin"],
                pin,
            };
            reCallCharge = yield flw.Charge.card(payload2);
            //  pin : 3310
            // Add the OTP to authorize the transaction
            // Testing this Part Off
            //   if (otpData === getOTP) {
            //     const callValidate = await flw.Charge.validate({
            //       otp: otpData,
            //       flw_ref: reCallCharge.data.flw_ref,
            //     });
            //     console.log("Getting the reCallCharge: ");
            //     // Displaying the results
            //     res.status(201).json({
            //       message: "payment recieved",
            //       data: callValidate,
            //     });
            //   } else {
            //     res.status(400).json({
            //       message: "OTP is wrong",
            //     });
            //   }
        }
        //   send the OTP via e-mail of the user!
        //   send the OTP via e-mail of the user!
        (0, email_1.OTPReceivedMail)(user, getOTP)
            .then((result) => {
            console.log("message been sent to you: ");
        })
            .catch((error) => console.log(error));
        res.status(201).json({
            message: "Getting the Response: ",
            data: response,
        });
        if (response.meta.authorization.mode === "redirect") {
            var url = response.meta.authorization.redirect;
            open(url);
        }
        console.log(response);
    }
    catch (error) {
        console.log("catches all Errors: ", error);
    }
}));
exports.OTPResponse = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otpData } = req.body;
        if (otpData === getOTP) {
            const callValidate = yield flw.Charge.validate({
                otp: otpData,
                flw_ref: reCallCharge.data.flw_ref,
            });
            console.log("Getting the reCallCharge: ");
            // Displaying the results
            res.status(201).json({
                message: "payment recieved",
                data: callValidate,
            });
        }
        else {
            res.status(400).json({
                message: "OTP is wrong",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Error found",
            data: error,
        });
    }
}));
