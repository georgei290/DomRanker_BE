"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controller/paymentController");
const stripeController_1 = require("../controller/stripeController");
const router = express_1.default.Router();
router.route("/:id/starter").post(paymentController_1.activatePlan);
router.route("/getOTP").post(paymentController_1.OTPResponse);
router.route("/stripe-gateway").post(stripeController_1.stripePayment);
exports.default = router;
