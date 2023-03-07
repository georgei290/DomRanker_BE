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
const passport_1 = __importDefault(require("passport"));
const userModel_1 = __importDefault(require("../model/userModel"));
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// 2233
const GOOGLE_ID = "1054310070984-g0j7k7btj1ne7hpofa0glpht7nudfrf2.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
passport_1.default.use(new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield userModel_1.default.findOne({ email: profile._json.email });
    if (checkUser) {
        return callback(null, profile);
    }
    else {
        yield userModel_1.default.create({
            // _id: profile.id,
            fullName: profile.displayName,
            email: profile._json.email,
            userName: profile.name.familyName,
            avatar: profile.photos[0].value,
            status: "General",
            token: "",
            verified: profile._json.email_verified,
        }, function (err, user) {
            return callback(null, user);
        });
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
