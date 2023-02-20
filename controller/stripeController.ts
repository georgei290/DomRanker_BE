require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
import { Request, Response } from "express";
import { asyncHandler } from "./handlers";

export const stripePayment = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const session = await stripe.checkout.session.create({
        mode: "payment",
        seccess_url: "",
        cancel_url: "",
        payment_method_types: ["card"],
        line_items: [
          {
            price: 20000,
            quantity: 1,
          },
        ],
      });

      return res.status(201).json({
        url: session.url,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error recorded",
        data: error.message,
      });
    }
  },
);
