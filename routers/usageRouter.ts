import express, { Router } from "express";
import {
  getBaiduKeywords,
  getBingKeywords,
  getGoogleKeywords,
  getYahooKeywords,
  gettingBaiduKeywords,
  // starterPlan
} from "../controller/usageController";

const router: Router = express.Router();

// SERP: SEO
router.route("/:id/get-google-search").post(getGoogleKeywords);
router.route("/:id/get-bing-search").post(getBingKeywords);
router.route("/:id/get-yahoo-search").post(getYahooKeywords);
router.route("/:id/get-baidu-search").post(getBaiduKeywords);
router.route("/:id/get-the-baidu-search/:dataID").get(gettingBaiduKeywords);

export default router;
