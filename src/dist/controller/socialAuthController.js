"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    //   clientID: process.env.GOOGLE_ID_AUTH,
    //   clientSecret: process.env.GOOGLE_SCRETE_AUTH,
    clientID: "1054310070984-nlkjhta3o2ajbmvhk09o87aj9qjdu125.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
    scope: ["profile, email"],
}, function (accessToken, refreshToken, profile, callback) {
    callback(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
