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
	postOnPagesData,
	getOnPagesData,
	getTestBacklinkSummary,
	postYahooKeywords,
	// starterPlan
} from "../controller/usageController";

const router: Router = express.Router();

// SERP: SEO
router.route("/:id/get-google-search").post(getGoogleKeywords);
router.route("/:id/get-bing-search").post(getBingKeywords);

// Yahoo
router.route("/:id/get-yahoo-search").post(postYahooKeywords);
router.route("/:id/:myIDs/get-yahoo-search").get(getYahooKeywords);

// BAIDU
router.route("/:id/get-baidu-search").post(postBaiduKeywords);
router.route("/:id/:myIDs/get-baidu-search").get(getBaiduKeywords);

// NAVER
router.route("/:id/get-naver-search").post(postNaverKeywords);
router.route("/:id/:myIDs/get-naver-search").get(getNaverKeywords);

// SEZNAM
router.route("/:id/get-seznam-search").post(postSeznamKeywords);
router.route("/:id/:myIDs/get-seznam-search").get(getSeznamKeywords);

//  Backlink Call
router.route("/:id/backlink-summary-search").post(gettBacklinkSummary);
router.route("/:id/test-backlink-summary-search").post(getTestBacklinkSummary);

// BusinessData API Call
router.route("/:id/business-data-search").post(postBusinessInfo);
router.route("/:id/:myID/business-data-search").get(getBusinessInfo);

// onPage API Call
router.route("/:id/on-page-search").post(postOnPagesData);
router.route("/:id/read-on-page-search").post(getOnPagesData);

export default router;
