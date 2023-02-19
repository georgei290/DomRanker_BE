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
exports.getBingKeywords = exports.getGoogleKeywords = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const handlers_1 = require("./handlers");
dotenv_1.default.config();
exports.getGoogleKeywords = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getBingKeywords = (0, handlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
