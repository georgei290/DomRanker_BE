"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usageController_1 = require("../controller/usageController");
const router = express_1.default.Router();
// SERP: SEO
router.route("/:id/get-google-search").post(usageController_1.getGoogleKeywords);
router.route("/:id/get-bing-search").post(usageController_1.getBingKeywords);
router.route("/:id/get-yahoo-search").post(usageController_1.getYahooKeywords);
router.route("/:id/get-baidu-search").post(usageController_1.getBaiduKeywords);
router.route("/:id/get-the-baidu-search/:dataID").get(usageController_1.gettingBaiduKeywords);
exports.default = router;
