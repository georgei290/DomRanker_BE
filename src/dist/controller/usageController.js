"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnPagesData = exports.postOnPagesData = exports.getBusinessInfo = exports.postBusinessInfo = exports.gettBacklinkSummary = exports.getSeznamKeywords = exports.postSeznamKeywords = exports.getNaverKeywords = exports.postNaverKeywords = exports.getBaiduKeywords = exports.postBaiduKeywords = exports.getYahooKeywords = exports.getBingKeywords = exports.getGoogleKeywords = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const handlers_1 = require("./handlers");
dotenv_1.default.config();
const LOCATION_KEY = "13d114e76253410796c509c40729459b";
const LOCATION = "https://ipgeolocation.abstractapi.com/v1/?";
// GOOGLE SEO
exports.getGoogleKeywords = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${LOCATION}api_key=${LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let language_name = "English (United Kingdom)";
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        console.log("Location: ", location_name);
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_name,
                location_name: "Lagos,Nigeria",
                keyword: keywords,
            },
        ];
        if (user) {
            //  getting user's searched result
            return yield (0, axios_1.default)({
                method: "post",
                url: process.env.GOOGLE_URL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// BING SEO
exports.getBingKeywords = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${LOCATION}api_key=${LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let language_name = "English (United Kingdom)";
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_name,
                location_name,
                keyword: keywords,
            },
        ];
        if (user) {
            //  getting user's searched result
            return yield (0, axios_1.default)({
                method: "post",
                url: process.env.BING_URL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// YAHOO SEO
exports.getYahooKeywords = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${LOCATION}api_key=${LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let language_name = "English (United Kingdom)";
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_name,
                location_name,
                keyword: keywords,
            },
        ];
        if (user) {
            //  getting user's searched result
            return yield (0, axios_1.default)({
                method: "post",
                url: process.env.YAHOO_URL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// BAUIDU SEO: Has a two call system to show the results
// First to request for the search result
exports.postBaiduKeywords = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${LOCATION}api_key=${LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_code: "en",
                location_name,
                keyword: keywords,
                postback_data: "regular",
            },
        ];
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.BAIDU_URL}/task_post`;
            return yield (0, axios_1.default)({
                method: "post",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                console.log("getting results: ");
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// Secondly to get/view the requested search result
exports.getBaiduKeywords = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.BAIDU_URL}/task_get/advanced/${req.params.myIDs}`;
            return yield (0, axios_1.default)({
                method: "get",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// NAVER SEO: Has a two call system to show the results
// First to request for the search result
exports.postNaverKeywords = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${process.env.LOCATION}api_key=${process.env.LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let language_name = "English (United Kingdom)";
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_code: "en",
                location_name,
                keyword: keywords,
                postback_data: "regular",
            },
        ];
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.NAVER_URL}/task_post`;
            return yield (0, axios_1.default)({
                method: "post",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                console.log("getting results: ");
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// Secondly to get/view the requested search result
exports.getNaverKeywords = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.NAVER_URL}/task_get/regular/${req.params.myIDs}`;
            return yield (0, axios_1.default)({
                method: "get",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// SEZNAM SEO: Has a two call system to show the results
// First to request for the search result
exports.postSeznamKeywords = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${LOCATION}api_key=${LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let language_name = "English (United Kingdom)";
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_code: "en",
                location_name,
                keyword: keywords,
                postback_data: "regular",
            },
        ];
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.SEZNAM_URL}/task_post`;
            return yield (0, axios_1.default)({
                method: "post",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                console.log("getting results: ");
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// Secondly to get/view the requested search result
exports.getSeznamKeywords = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.SEZNAM_URL}/task_get/advanced/${req.params.myIDs}`;
            return yield (0, axios_1.default)({
                method: "get",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// Backline summary
exports.gettBacklinkSummary = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                target: "explodingtopics.com",
                internal_list_limit: 10,
                include_subdomains: true,
                backlinks_filters: ["dofollow", "=", true],
                backlinks_status_type: "all",
            },
        ];
        if (user) {
            //  getting user's searched result
            const mainURL = `${process.env.BACKLINK_SUMMARY_URL}`;
            return yield (0, axios_1.default)({
                method: "post",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
//  Business Data API
exports.postBusinessInfo = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${process.env.LOCATION}api_key=${process.env.LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let language_name = "English (United Kingdom)";
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_code: "en",
                location_name,
                keyword: keywords,
            },
        ];
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.BUSINESS_INFO_URL}/task_post`;
            return yield (0, axios_1.default)({
                method: "post",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                console.log("getting results: ");
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
exports.getBusinessInfo = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${process.env.LOCATION}api_key=${process.env.LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        let language_name = "English (United Kingdom)";
        let location_name = `${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.city},${myLocationData === null || myLocationData === void 0 ? void 0 : myLocationData.country}`;
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { keywords } = req.body;
        let searchedData = [
            {
                language_name,
                location_name,
                keyword: keywords,
            },
        ];
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.BUSINESS_INFO_URL}/task_get/${req.params.myID}`;
            return yield (0, axios_1.default)({
                method: "get",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
//  onPages API
exports.postOnPagesData = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Search has to be location base to get the best of Result
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { word } = req.body;
        console.log("New Data Search");
        let searchedData = [
            {
                target: word,
                max_crawl_pages: 10,
            },
        ];
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.ONPAGE_URL}/task_post`;
            console.log(mainURL);
            return yield (0, axios_1.default)({
                method: "post",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    var result = response["data"]["tasks"];
                    // Result data
                    console.log(result[0].id);
                    console.log(result);
                    return res.status(200).json({
                        message: "seen",
                        data: result,
                    });
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "Error",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
exports.getOnPagesData = (0, handlers_1.asyncHandler)((req, res, dataID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myLocationData = {};
        // Search has to be location base to get the best of Result
        //   getting user's location
        yield axios_1.default
            .get(`${process.env.LOCATION}api_key=${process.env.LOCATION_KEY}`)
            .then((response) => {
            myLocationData = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        //   checking for the validity of a user
        const user = yield userModel_1.default.findById(req.params.id);
        //    getting user's search words
        const { dataID } = req.body;
        let searchedData = [
            {
                id: dataID,
                filters: [
                    ["resource_type", "=", "html"],
                    "and",
                    ["meta.scripts_count", ">", 40],
                ],
                order_by: ["meta.content.plain_text_word_count,desc"],
                limit: 10,
            },
        ];
        if (user) {
            //  getting business's searched result
            const mainURL = `${process.env.ONPAGE_URL}/pages`;
            return yield (0, axios_1.default)({
                method: "post",
                url: mainURL,
                auth: {
                    username: process.env.LOGIN_ID,
                    password: process.env.LOGIN_KEY,
                },
                data: searchedData,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then(function (response) {
                var result = response["data"]["tasks"];
                // Result data
                return res.status(200).json({
                    message: "seen",
                    data: result,
                });
            })
                .catch(function (error) {
                console.log(error);
                return res.status(200).json({
                    message: "seen",
                    data: error,
                });
            });
        }
        else {
            return res.status(200).json({
                message: "You do not have access right for this Operation",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
}));
// Business Info
