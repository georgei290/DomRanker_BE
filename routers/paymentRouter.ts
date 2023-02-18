import express, { Router } from "express";
import { activatePlan, OTPResponse } from "../controller/paymentController";

const router: Router = express.Router();

router.route("/:id/starter").post(activatePlan);
router.route("/getOTP").post(OTPResponse);

export default router;
