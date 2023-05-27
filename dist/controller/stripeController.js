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
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripePayment = void 0;
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
const handlers_1 = require("./handlers");
exports.stripePayment = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.session.create({
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
    }
    catch (error) {
        return res.status(400).json({
            message: "Error recorded",
            data: error.message,
        });
    }
}));
