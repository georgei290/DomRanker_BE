import express, { Router } from "express";
import {
  getBaiduKeywords,
  getBingKeywords,
  getGoogleKeywords,
  getYahooKeywords,
  gettBacklinkSummary,
  getBusinessData,
  getBusinessDataInfo,
  // starterPlan
} from "../controller/usageController";

const router: Router = express.Router();

// SERP: SEO
router.route("/:id/get-google-search").post(getGoogleKeywords);
router.route("/:id/get-bing-search").post(getBingKeywords);
router.route("/:id/get-yahoo-search").post(getYahooKeywords);
router.route("/:id/get-baidu-search").post(getBaiduKeywords);
router.route("/:id/backlink-summary-search").post(gettBacklinkSummary);

// BusinessData API Call
router.route("/:id/business-data-search").post(getBusinessData);
router.route("/:id/business-data-info").post(getBusinessDataInfo);

//

export default router;
