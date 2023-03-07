"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
// creating model for the users
const userModel = new mongoose_1.default.Schema({
    status: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    fullName: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowerCase: true,
        trim: true,
        required: [true, "Please enter your Email"],
        validate: [isEmail_1.default, "Please enter a valid email"],
    },
    password: {
        type: String,
        // required: [true, "Please enter your password"],
    },
    token: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// preparing the models for export and usage
exports.default = mongoose_1.default.model("users", userModel);
