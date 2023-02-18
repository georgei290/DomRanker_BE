import express, { Router } from "express";
import { starterPlan } from "../controller/paymentController";

const router: Router = express.Router();

router.route("/starter").get(starterPlan);

export default router;
