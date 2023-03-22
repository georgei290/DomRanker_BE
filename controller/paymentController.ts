import Flutterwave from "flutterwave-node-v3";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import userModel from "../model/userModel";
import { asyncHandler } from "./handlers";
import { OTPReceivedMail } from "../utlis/email";
import Stripe from "stripe";
dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY_TEST,
  process.env.FLW_SECRET_KEY_TEST,
);

//  Generating the OTP that would be sent to the 
const getOTP = Math.floor(100000 + Math.random() * 900000);

let reCallCharge: any;

export const activatePlan = asyncHandler(async (req: any, res: any) => {
  try {
    //   getting users card input
    const { card_number, cvv, expiry_month, expiry_year, amount, pin } =
      req.body;

    const user = await userModel.findById(req.params.id);

    // Building the neccessary payload for flutterwave geteway consumption
    const payload: any = {
      card_number,
      cvv,
      expiry_month,
      expiry_year,
      currency: "NGN",
      amount,
      redirect_url: "https://www.google.com",
      fullname: user?.fullName,
      email: user?.email,
      phone_number: user?.phone!,
      enckey: process.env.FLW_ENCRYPTION_KEY_TEST,
      tx_ref: uuid(),
    };

    console.log(getOTP);
    const response = await flw.Charge.card(payload);
    console.log("Getting the Response: ");

    // Authorizing transactions

    // For PIN transactions
    if (response.meta.authorization.mode === "pin") {
      let payload2 = payload;

      payload2.authorization! = {
        mode: "pin",
        fields: ["pin"],
        pin,
      };

      reCallCharge = await flw.Charge.card(payload2);
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
    OTPReceivedMail(user, getOTP)
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
  } catch (error) {
    console.log("catches all Errors: ", error);
  }
});

export const OTPResponse = asyncHandler(async (req: any, res: any) => {
  try {
    const { otpData } = req.body;
    if (otpData === getOTP) {
      const callValidate = await flw.Charge.validate({
        otp: otpData,
        flw_ref: reCallCharge.data.flw_ref,
      });

      console.log("Getting the reCallCharge: ");

      // Displaying the results
      res.status(201).json({
        message: "payment recieved",
        data: callValidate,
      });
    } else {
      res.status(400).json({
        message: "OTP is wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error found",
      data: error,
    });
  }
});