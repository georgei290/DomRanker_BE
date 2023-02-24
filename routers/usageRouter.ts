import express, { Router } from "express";
import {
  postBaiduKeywords,
  getBaiduKeywords,
  getSeznamKeywords,
  postSeznamKeywords,
  postNaverKeywords,
  getNaverKeywords,
  getBingKeywords,
  getGoogleKeywords,
  getYahooKeywords,
  gettBacklinkSummary,
  postBusinessInfo,
  getBusinessInfo,
  // starterPlan
} from "../controller/usageController";

const router: Router = express.Router();

// SERP: SEO
router.route("/:id/get-google-search").post(getGoogleKeywords);
router.route("/:id/get-bing-search").post(getBingKeywords);
router.route("/:id/get-yahoo-search").post(getYahooKeywords);

  // BAIDU
router.route("/:id/get-baidu-search").post(postBaiduKeywords);
router.route("/:id/:myIDs/get-baidu-search").get(getBaiduKeywords);


  // NAVER
router.route("/:id/get-naver-search").post(postNaverKeywords);
router.route("/:id/:myIDs/get-naver-search").get(getNaverKeywords);

  // SEZNAM
router.route("/:id/get-seznam-search").post(postSeznamKeywords);
router.route("/:id/:myIDs/get-seznam-search").get(getSeznamKeywords);


router.route("/:id/backlink-summary-search").post(gettBacklinkSummary);

// BusinessData API Call
router.route("/:id/business-data-search").post(postBusinessInfo);
router.route("/:id/:myID/business-data-search").get(getBusinessInfo);

// 

export default router;
