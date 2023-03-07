"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/now-in", (req, res) => {
    return res.status(200).json({
        message: "user found",
        // data: {
        //   ...info,
        // },
    });
});
router.get("/success", (req, res) => {
    return res.status(200).json({
        message: "This is Login Page page",
    });
});
router.get("/failure", (req, res) => {
    return res.status(200).json({
        message: "This is bad page",
    });
});
router.get("/google/auth", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/failure",
}));
router.get("/gitbub/auth", passport_1.default.authenticate("github", { scope: ["profile", "user:email"] }));
router.get("/auth/github/callback", passport_1.default.authenticate("github", {
    successRedirect: "/success",
    failureRedirect: "/failure",
}));
exports.default = router;
