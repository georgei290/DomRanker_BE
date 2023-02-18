import express, { Router } from "express";
import {
  getBingKeywords,
  getGoogleKeywords,
  // starterPlan
} from "../controller/uasageController";

const router: Router = express.Router();

router.route("/:id/get-google-search").post(getGoogleKeywords);
router.route("/:id/get-bing-search").post(getBingKeywords);

export default router;
