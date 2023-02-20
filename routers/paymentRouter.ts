import express, { Router } from "express";
import { activatePlan, OTPResponse } from "../controller/paymentController";
import { stripePayment } from "../controller/stripeController";

const router: Router = express.Router();

router.route("/:id/starter").post(activatePlan);
router.route("/getOTP").post(OTPResponse);
router.route("/stripe-gateway").post(stripePayment);

export default router;
